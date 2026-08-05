import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { request as httpRequest } from 'node:http'
import { readFile } from 'node:fs/promises'
import { test, before, after } from 'node:test'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { findAvailablePort } from '../Builder/runtime/port-utils.mjs'

const testDirectory = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(testDirectory, '../../..')
const serverFile = resolve(repoRoot, '.SYSTEMX/LAN/server.mjs')

let child
let baseUrl
let sessionToken
let childOutput = ''

async function getJson(pathname, options = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, options)
  const body = await response.json()
  return { response, body }
}

function requestStatus(pathname, headers = {}) {
  return new Promise((resolveStatus, rejectStatus) => {
    const request = httpRequest(`${baseUrl}${pathname}`, { headers }, (response) => {
      response.resume()
      response.once('end', () => resolveStatus(response.statusCode))
    })
    request.once('error', rejectStatus)
    request.end()
  })
}

async function waitForHealth() {
  const deadline = Date.now() + 5000

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/api/health`)
      if (response.ok) return
    } catch {
      // The child may still be binding its loopback socket.
    }

    await delay(50)
  }

  throw new Error(`SYSTEMX LAN test server did not start. Output: ${childOutput}`)
}

before(async () => {
  const port = await findAvailablePort(7400, 30)
  baseUrl = `http://127.0.0.1:${port}`

  child = spawn(process.execPath, [serverFile], {
    cwd: repoRoot,
    env: {
      ...process.env,
      SYSTEMX_APP_PORT: '7410',
      SYSTEMX_LAN_PORT: String(port),
      SYSTEMX_STRICT_PORT: 'true',
      SYSTEMX_LAN_TEST_MODE: 'true',
      SYSTEMX_SESSION_ID: `characterization-${process.pid}`,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  child.stdout.on('data', (chunk) => {
    childOutput += chunk.toString()
  })
  child.stderr.on('data', (chunk) => {
    childOutput += chunk.toString()
  })

  await waitForHealth()

  const dashboard = await fetch(`${baseUrl}/`)
  const html = await dashboard.text()
  const tokenMatch = html.match(/meta name="systemx-session" content="([^"]+)"/)
  sessionToken = tokenMatch?.[1]

  assert.ok(sessionToken, `dashboard did not expose a session token: ${childOutput}`)
})

after(async () => {
  if (!child) return

  child.kill('SIGTERM')
  await new Promise((resolveExit) => {
    child.once('exit', resolveExit)
    setTimeout(resolveExit, 2000)
  })
})

test('loopback health and dashboard remain local-only', async () => {
  const { response, body } = await getJson('/api/health')

  assert.equal(response.status, 200)
  assert.deepEqual(
    {
      status: body.status,
      mode: body.mode,
      host: body.host,
    },
    {
      status: 'online',
      mode: 'local-only',
      host: '127.0.0.1',
    },
  )

  const dashboard = await fetch(`${baseUrl}/`)
  assert.equal(dashboard.status, 200)
  assert.match(await dashboard.text(), /SYSTEMX Local Control/)
})

test('host and origin guards reject non-local callers', async () => {
  const wrongHost = await requestStatus('/api/health', { host: 'external.example' })
  const wrongOrigin = await fetch(`${baseUrl}/api/health`, {
    headers: { origin: 'https://external.example' },
  })

  assert.equal(wrongHost, 403)
  assert.equal(wrongOrigin.status, 403)
})

test('read models expose the current repository without cloud authority', async () => {
  const status = await getJson('/api/status')
  const workspace = await getJson('/api/builder/workspace')
  const tools = await getJson('/api/tools')

  assert.equal(status.response.status, 200)
  assert.equal(workspace.response.status, 200)
  assert.equal(tools.response.status, 200)
  assert.equal(workspace.body.target, 'current-repo')
  assert.equal(workspace.body.repository.branch, 'main')
  assert.ok(Array.isArray(workspace.body.pages))
  assert.ok(Array.isArray(workspace.body.providers))
  assert.equal(tools.body.environment, 'local-only')
})

test('mutating routes reject missing or incorrect session authority', async () => {
  const missing = await fetch(`${baseUrl}/api/builder/page`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ operation: 'create-page' }),
  })
  assert.equal(missing.status, 403)

  const incorrect = await fetch(`${baseUrl}/api/builder/page`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-systemx-session': 'not-the-session-token',
    },
    body: JSON.stringify({ operation: 'create-page' }),
  })
  assert.equal(incorrect.status, 403)
})

test('source writes fail closed for paths outside the allowlist', async () => {
  const response = await fetch(`${baseUrl}/api/builder/source`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-systemx-session': sessionToken,
    },
    body: JSON.stringify({
      path: 'package.json',
      content: '{}',
      confirmation: 'SAVE LOCAL CHANGE',
    }),
  })
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.match(body.error, /allowlist/i)
})

test('source writes require confirmation and reject secret-shaped content', async () => {
  const missingConfirmation = await fetch(`${baseUrl}/api/builder/source`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-systemx-session': sessionToken,
    },
    body: JSON.stringify({
      path: 'src/router.tsx',
      content: 'unchanged',
    }),
  })
  assert.equal(missingConfirmation.status, 400)
  assert.match(await missingConfirmation.text(), /SAVE LOCAL CHANGE/)

  const secretContent = await fetch(`${baseUrl}/api/builder/source`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-systemx-session': sessionToken,
    },
    body: JSON.stringify({
      path: 'src/router.tsx',
      content: 'const key = "sk_live_characterization-only"',
      confirmation: 'SAVE LOCAL CHANGE',
    }),
  })
  assert.equal(secretContent.status, 400)
  assert.match(await secretContent.text(), /secret-shaped/i)
})

test('LAN does not expose runtime folders or arbitrary API commands', async () => {
  const runtimeFolder = await fetch(`${baseUrl}/Temp/operations.jsonl`)
  const arbitraryApi = await fetch(`${baseUrl}/api/exec?command=whoami`)

  assert.equal(runtimeFolder.status, 404)
  assert.equal(arbitraryApi.status, 404)
})

test('package metadata remains readable for the characterization harness', async () => {
  const packageJson = JSON.parse(await readFile(resolve(repoRoot, 'package.json'), 'utf8'))
  const capabilityManifest = JSON.parse(await readFile(resolve(repoRoot, '.SYSTEMX/LAN/Builder/contracts/capability-manifest.json'), 'utf8'))
  assert.equal(packageJson.name, 'sfwa-wtl-template')
  assert.equal(packageJson.scripts['dev:systemx'], 'node .SYSTEMX/LAN/dev-session.mjs')
  assert.equal(packageJson.scripts['docs:links'], 'node .SYSTEMX/scripts/validate-markdown-links.mjs')
  assert.equal(capabilityManifest.researchProgram.sourceCount, 200)
  assert.ok(capabilityManifest.supported.some((item) => item.id === 'lan.loopback-control'))
})
