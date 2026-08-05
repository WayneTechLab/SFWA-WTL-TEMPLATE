#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  cleanStalePidFiles,
  clearSession,
  findAvailablePort,
  removePidFile,
  writePidFile,
  writeSession,
} from './Builder/runtime/port-utils.mjs'

const lanRoot = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = resolve(lanRoot, '..', '..')
const viteBin = join(repoRoot, 'node_modules', 'vite', 'bin', 'vite.js')
const lanServer = join(lanRoot, 'server.mjs')
const host = process.env.SYSTEMX_DEV_HOST ?? '127.0.0.1'
const preferredAppPort = Number.parseInt(process.env.SYSTEMX_APP_PORT ?? '5173', 10)
const preferredLanPort = Number.parseInt(process.env.SYSTEMX_LAN_PORT ?? '7331', 10)
const sessionId = `systemx-${Date.now()}-${process.pid}`

if (!existsSync(viteBin)) {
  throw new Error('Missing local Vite dependency. Run npm install first.')
}

const children = []

cleanStalePidFiles(repoRoot)
const appPort = await findAvailablePort(preferredAppPort)
const lanPort = await findAvailablePort(preferredLanPort)

function start(label, executable, args, env = {}) {
  const child = spawn(executable, args, {
    cwd: repoRoot,
    env: {
      ...process.env,
      SYSTEMX_APP_PORT: String(appPort),
      SYSTEMX_LAN_PORT: String(lanPort),
      SYSTEMX_STRICT_PORT: 'true',
      SYSTEMX_SESSION_ID: sessionId,
      SYSTEMX_SESSION_OWNER_PID: String(process.pid),
      ...env,
    },
    shell: false,
    stdio: ['inherit', 'pipe', 'pipe'],
  })

  child.stdout.on('data', (chunk) => process.stdout.write(`[${label}] ${chunk}`))
  child.stderr.on('data', (chunk) => process.stderr.write(`[${label}] ${chunk}`))
  child.on('exit', (code, signal) => {
    if (signal) {
      process.stderr.write(`[${label}] stopped by ${signal}\n`)
      return
    }
    process.stderr.write(`[${label}] exited with ${code ?? 0}\n`)
  })

  children.push(child)
  return child
}

const lanChild = start('LAN', process.execPath, [lanServer])
const viteChild = start('VITE', process.execPath, [viteBin, '--host', host, '--port', String(appPort)])

writePidFile(repoRoot, `local-lan-${lanPort}.pid`, lanChild.pid)
writePidFile(repoRoot, `local-vite-${appPort}.pid`, viteChild.pid)
writeSession(repoRoot, {
  schemaVersion: 1,
  sessionId,
  ownerPid: process.pid,
  processes: { session: process.pid, lan: lanChild.pid, vite: viteChild.pid },
  ports: { lan: lanPort, app: appPort },
  urls: {
    lan: `http://${host}:${lanPort}/`,
    app: `http://${host}:${appPort}/`,
    bridge: `http://${host}:${appPort}/__systemx/`,
  },
  mode: 'combined',
  startedAt: new Date().toISOString(),
})

process.stdout.write('\nSYSTEMX local session starting:\n')
process.stdout.write(`  Public app:      http://${host}:${appPort}/\n`)
process.stdout.write(`  LAN direct:      http://${host}:${lanPort}/\n`)
process.stdout.write(`  LAN via Vite:    http://${host}:${appPort}/__systemx/\n\n`)

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  removePidFile(repoRoot, `local-lan-${lanPort}.pid`, lanChild.pid)
  removePidFile(repoRoot, `local-vite-${appPort}.pid`, viteChild.pid)
  clearSession(repoRoot, sessionId)
}

process.on('SIGINT', () => {
  shutdown()
  process.exit(130)
})
process.on('SIGTERM', () => {
  shutdown()
  process.exit(143)
})
process.on('SIGHUP', () => {
  shutdown()
  process.exit(129)
})
