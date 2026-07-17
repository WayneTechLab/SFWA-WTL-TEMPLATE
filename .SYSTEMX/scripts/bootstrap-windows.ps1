#Requires -Version 5.1
[CmdletBinding()]
param(
  [switch]$Check,
  [switch]$WithStripe,
  [switch]$WithM365,
  [switch]$DryRun,
  [Parameter(ValueFromRemainingArguments = $true)][string[]]$RemainingArguments
)

$ErrorActionPreference = 'Stop'
$Root = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$Tooling = Join-Path $Root '.SYSTEMX/tooling'

function Test-Command([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command 'pwsh')) {
  if (-not (Test-Command 'winget')) { throw 'PowerShell 7 is required. Install it from https://aka.ms/powershell before continuing.' }
  Write-Host 'Installing PowerShell 7 with winget...'
  & winget install --id Microsoft.PowerShell --exact --source winget --accept-package-agreements --accept-source-agreements
  $Pwsh = Join-Path $env:ProgramFiles 'PowerShell/7/pwsh.exe'
  if (-not (Test-Path $Pwsh)) { throw 'PowerShell 7 installation completed but pwsh.exe was not found.' }
  $Forward = @('-NoLogo', '-NoProfile', '-File', $PSCommandPath)
  if ($Check) { $Forward += '-Check' }
  if ($WithStripe) { $Forward += '-WithStripe' }
  if ($WithM365) { $Forward += '-WithM365' }
  if ($DryRun) { $Forward += '-DryRun' }
  $Forward += $RemainingArguments
  & $Pwsh @Forward
  exit $LASTEXITCODE
}

if ($PSVersionTable.PSEdition -ne 'Core') {
  $Forward = @('-NoLogo', '-NoProfile', '-File', $PSCommandPath)
  if ($Check) { $Forward += '-Check' }
  if ($WithStripe) { $Forward += '-WithStripe' }
  if ($WithM365) { $Forward += '-WithM365' }
  if ($DryRun) { $Forward += '-DryRun' }
  $Forward += $RemainingArguments
  & pwsh @Forward
  exit $LASTEXITCODE
}

$Architecture = if ($env:PROCESSOR_ARCHITECTURE -eq 'ARM64') { 'arm64' } else { 'x64' }
$NodeNeedsInstall = -not (Test-Command 'node')
if (-not $NodeNeedsInstall) {
  $NodeVersion = (& node --version)
  $NodeNeedsInstall = $NodeVersion -notmatch '^v24\.'
}
if ($NodeNeedsInstall) {
  if ($DryRun) {
    Write-Host "[dry-run] Download and checksum-verify Node.js 24 LTS for Windows $Architecture."
  } else {
    New-Item -ItemType Directory -Force -Path $Tooling | Out-Null
    $Release = (Invoke-RestMethod 'https://nodejs.org/dist/index.json' | Where-Object { $_.version -like 'v24.*' } | Select-Object -First 1).version
    if (-not $Release) { throw 'Could not resolve the current Node.js 24 LTS release.' }
    $ArchiveName = "node-$Release-win-$Architecture.zip"
    $Archive = Join-Path $env:TEMP $ArchiveName
    $BaseUrl = "https://nodejs.org/dist/$Release"
    Invoke-WebRequest "$BaseUrl/$ArchiveName" -OutFile $Archive
    $Checksums = (Invoke-WebRequest "$BaseUrl/SHASUMS256.txt").Content -split "`n"
    $Expected = (($Checksums | Where-Object { $_ -match "\s$([regex]::Escape($ArchiveName))\s*$" }) -split '\s+')[0].ToLowerInvariant()
    $Actual = (Get-FileHash $Archive -Algorithm SHA256).Hash.ToLowerInvariant()
    if (-not $Expected -or $Actual -ne $Expected) { throw 'Node.js archive checksum validation failed.' }
    Expand-Archive -LiteralPath $Archive -DestinationPath $Tooling -Force
    $NodeHome = Join-Path $Tooling "node-$Release-win-$Architecture"
    $env:Path = "$NodeHome;$env:Path"
    $UserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if ($UserPath -notlike "*$NodeHome*") { [Environment]::SetEnvironmentVariable('Path', "$NodeHome;$UserPath", 'User') }
    Remove-Item $Archive -Force
  }
}

if ($DryRun) { exit 0 }
if (-not (Test-Command 'git') -and (Test-Command 'winget')) {
  & winget install --id Git.Git --exact --source winget --accept-package-agreements --accept-source-agreements
}

Push-Location $Root
try {
  & npm.cmd install --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) { throw 'npm install failed.' }
  $Arguments = @('setup')
  if ($Check) { $Arguments += '--check' } else { $Arguments += '--install' }
  if ($WithStripe) { $Arguments += '--with-stripe' }
  if ($WithM365) { $Arguments += '--with-m365' }
  $Arguments += $RemainingArguments
  & node '.SYSTEMX/cli/systemx.mjs' @Arguments
  exit $LASTEXITCODE
} finally {
  Pop-Location
}
