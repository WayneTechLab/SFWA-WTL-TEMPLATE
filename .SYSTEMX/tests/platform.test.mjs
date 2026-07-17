import assert from 'node:assert/strict'
import test from 'node:test'
import { browserOpenCommand, detectPlatform, executableName, nativePathFlavor } from '../lib/platform.mjs'
import { resolveInvocation } from '../lib/process.mjs'

test('detects supported host combinations', () => {
  assert.equal(detectPlatform({ platform: 'darwin', arch: 'arm64' }).platformId, 'macos-arm64')
  assert.equal(detectPlatform({ platform: 'win32', arch: 'x64' }).platformId, 'windows-x64')
  assert.equal(detectPlatform({ platform: 'win32', arch: 'arm64' }).platformId, 'windows-arm64')
})

test('explicit override wins and unsupported hosts fail', () => {
  assert.equal(detectPlatform({ platform: 'darwin', arch: 'arm64', override: 'windows-x64' }).platformId, 'windows-x64')
  assert.throws(() => detectPlatform({ platform: 'aix', arch: 'ppc64' }), /Unsupported host/)
  assert.throws(() => detectPlatform({ override: 'windows-32' }), /Unsupported platform override/)
})

test('resolves Windows commands, paths, and browser opening', () => {
  const windows = detectPlatform({ platform: 'win32', arch: 'arm64' })
  assert.equal(executableName('npm', windows), 'npm.cmd')
  assert.equal(executableName('git', windows), 'git')
  assert.equal(nativePathFlavor(windows).sep, '\\')
  assert.equal(browserOpenCommand('https://example.com', windows).command, 'pwsh.exe')
  const invocation = resolveInvocation('npm', ['run', 'test'], windows)
  assert.ok(invocation.executable === process.execPath || invocation.executable === 'npm.cmd')
  assert.ok(invocation.args.includes('test'))
})
