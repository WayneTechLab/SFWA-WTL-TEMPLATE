#!/usr/bin/env node

import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { clearSession, findOpenPort, writeSession } from '../lib/local-session.mjs'

const lanRoot = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(lanRoot, '..', '..')
const systemxDir = path.resolve(lanRoot, '..')
const mode = process.argv[2] || 'vite'
const children = []
const startedAt = new Date().toISOString()

function start(label, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: rootDir,
    env: { ...process.env, ...options.env },
    shell: false,
    stdio: 'inherit',
    windowsHide: true,
  })
  children.push(child)
  child.on('exit', (code, signal) => {
    if (signal) return
    if (code && code !== 0) {
      console.error(`[SYSTEMX LAN] ${label} exited with ${code}`)
      shutdown(code)
    }
  })
  return child
}

function npxCommand(args) {
  return process.platform === 'win32'
    ? { command: 'cmd.exe', args: ['/d', '/s', '/c', 'npx', ...args] }
    : { command: 'npx', args }
}

function npxFirebase(args) {
  return npxCommand(['--no-install', 'firebase', ...args])
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  clearSession(systemxDir)
  process.exitCode = code
}

const lanPort = await findOpenPort(process.env.SYSTEMX_LAN_PORT || 7331)
const baseSession = {
  startedAt,
  mode,
  host: '127.0.0.1',
  ports: { lan: lanPort },
  processes: [{ label: 'runner', pid: process.pid }],
}

const lan = start('lan', process.execPath, [path.join(lanRoot, 'server.mjs')], {
  env: { SYSTEMX_LAN_PORT: String(lanPort) },
})
baseSession.processes.push({ label: 'lan', pid: lan.pid, port: lanPort })

if (mode === 'lan') {
  writeSession(systemxDir, baseSession)
  console.log(`SYSTEMX LAN: http://127.0.0.1:${lanPort}/`)
} else if (mode === 'vite') {
  const vitePort = await findOpenPort(process.env.SYSTEMX_VITE_PORT || 5173)
  const vite = npxCommand(['--no-install', 'vite', '--host', '127.0.0.1', '--port', String(vitePort)])
  const viteProcess = start('vite', vite.command, vite.args)
  baseSession.ports.vite = vitePort
  baseSession.processes.push({ label: 'vite', pid: viteProcess.pid, port: vitePort })
  writeSession(systemxDir, baseSession)
  console.log(`Public app: http://127.0.0.1:${vitePort}/`)
  console.log(`SYSTEMX LAN: http://127.0.0.1:${lanPort}/`)
} else if (mode === 'firebase') {
  const firebase = npxFirebase(['emulators:start', '--project', 'demo-systemx'])
  const firebaseProcess = start('firebase', firebase.command, firebase.args, { env: { VITE_USE_FIREBASE_EMULATORS: 'true' } })
  baseSession.ports.firebaseHosting = 5000
  baseSession.ports.firebaseUi = 4000
  baseSession.processes.push({ label: 'firebase', pid: firebaseProcess.pid, port: 5000 })
  writeSession(systemxDir, baseSession)
  console.log('Firebase Hosting emulator: http://127.0.0.1:5000/')
  console.log('Firebase Emulator UI: http://127.0.0.1:4000/')
  console.log(`SYSTEMX LAN: http://127.0.0.1:${lanPort}/`)
} else {
  console.error('Usage: node .SYSTEMX/LAN/runner.mjs lan|vite|firebase')
  shutdown(1)
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
