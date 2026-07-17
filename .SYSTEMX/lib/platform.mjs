import os from 'node:os'
import path from 'node:path'

export const PLATFORM_IDS = Object.freeze([
  'macos-arm64',
  'windows-x64',
  'windows-arm64',
  'ubuntu-x64-experimental',
  'ubuntu-arm64-experimental',
])

const PLATFORM_ALIASES = Object.freeze({
  auto: 'auto',
  mac: 'macos-arm64',
  macos: 'macos-arm64',
  'macos-arm64': 'macos-arm64',
  'windows-x64': 'windows-x64',
  win32: 'windows-x64',
  'win32-x64': 'windows-x64',
  'windows-arm64': 'windows-arm64',
  'win32-arm64': 'windows-arm64',
  linux: 'ubuntu-x64-experimental',
  ubuntu: 'ubuntu-x64-experimental',
  'ubuntu-x64': 'ubuntu-x64-experimental',
  'ubuntu-x64-experimental': 'ubuntu-x64-experimental',
  'ubuntu-arm64': 'ubuntu-arm64-experimental',
  'ubuntu-arm64-experimental': 'ubuntu-arm64-experimental',
})

export function normalizePlatformOverride(value = 'auto') {
  const normalized = String(value || 'auto').trim().toLowerCase()
  const platformId = PLATFORM_ALIASES[normalized]
  if (!platformId) {
    throw new Error(`Unsupported platform override: ${value}. Expected auto or ${PLATFORM_IDS.join(', ')}`)
  }
  return platformId
}

export function detectPlatform({
  platform = process.platform,
  arch = process.arch,
  override = 'auto',
  env = process.env,
} = {}) {
  const requested = normalizePlatformOverride(override)
  let platformId = requested

  if (requested === 'auto') {
    if (platform === 'darwin' && arch === 'arm64') platformId = 'macos-arm64'
    else if (platform === 'win32' && arch === 'arm64') platformId = 'windows-arm64'
    else if (platform === 'win32' && arch === 'x64') platformId = 'windows-x64'
    else if (platform === 'linux' && arch === 'arm64') platformId = 'ubuntu-arm64-experimental'
    else if (platform === 'linux' && arch === 'x64') platformId = 'ubuntu-x64-experimental'
    else throw new Error(`Unsupported host platform: ${platform}-${arch}`)
  }

  const windows = platformId.startsWith('windows-')
  const macos = platformId === 'macos-arm64'
  const experimental = platformId.endsWith('-experimental')
  const effectiveArch = platformId.includes('arm64') ? 'arm64' : 'x64'

  return Object.freeze({
    platformId,
    detectedPlatform: platform,
    detectedArch: arch,
    arch: effectiveArch,
    windows,
    macos,
    linux: experimental,
    experimental,
    shell: windows ? 'PowerShell 7' : macos ? 'zsh/bash' : 'bash',
    downloadsDir: windows
      ? path.join(env.USERPROFILE || os.homedir(), 'Downloads')
      : path.join(os.homedir(), 'Downloads'),
  })
}

export function executableName(command, platformInfo) {
  if (!platformInfo?.windows) return command
  if (['npm', 'npx', 'firebase', 'm365'].includes(command)) return `${command}.cmd`
  return command
}

export function browserOpenCommand(url, platformInfo) {
  if (platformInfo.windows) {
    return {
      command: 'pwsh.exe',
      args: ['-NoLogo', '-NoProfile', '-Command', 'Start-Process -FilePath $args[0]', url],
    }
  }
  if (platformInfo.macos) return { command: 'open', args: [url] }
  return { command: 'xdg-open', args: [url] }
}

export function nativePathFlavor(platformInfo) {
  return platformInfo.windows ? path.win32 : path.posix
}
