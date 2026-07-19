#!/usr/bin/env node

import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const lanRoot = fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(lanRoot, '..', '..')
const mode = process.argv[2] || 'vite'
const children = []

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

function npmScript(script) {
  return process.platform === 'win32'
    ? { command: 'cmd.exe', args: ['/d', '/s', '/c', 'npm', 'run', '-s', script] }
    : { command: 'npm', args: ['run', '-s', script] }
}

function npxFirebase(args) {
  return process.platform === 'win32'
    ? { command: 'cmd.exe', args: ['/d', '/s', '/c', 'npx', '--no-install', 'firebase', ...args] }
    : { command: 'npx', args: ['--no-install', 'firebase', ...args] }
}

function shutdown(code = 0) {
  for (const child of children) {
    if (!child.killed) child.kill('SIGTERM')
  }
  process.exitCode = code
}

start('lan', process.execPath, [path.join(lanRoot, 'server.mjs')])

if (mode === 'vite') {
  const vite = npmScript('dev:public')
  start('vite', vite.command, vite.args)
  console.log('Public app: http://127.0.0.1:5173/')
  console.log('SYSTEMX LAN: http://127.0.0.1:7331/')
} else if (mode === 'firebase') {
  const firebase = npxFirebase(['emulators:start', '--project', 'demo-systemx'])
  start('firebase', firebase.command, firebase.args, { env: { VITE_USE_FIREBASE_EMULATORS: 'true' } })
  console.log('Firebase Hosting emulator: http://127.0.0.1:5000/')
  console.log('Firebase Emulator UI: http://127.0.0.1:4000/')
  console.log('SYSTEMX LAN: http://127.0.0.1:7331/')
} else {
  console.error('Usage: node .SYSTEMX/LAN/runner.mjs vite|firebase')
  shutdown(1)
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))
