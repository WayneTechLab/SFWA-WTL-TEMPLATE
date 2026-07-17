# Quick Start

## Create and install

Install Node.js 24 LTS, Git, and npm 11 or newer, then create a repository:

```console
gh repo create my-app --template WayneTechLab/SFWA-WTL-TEMPLATE --private --clone
cd my-app
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and provide the Firebase web configuration.
Do not place service-account keys, private keys, server secrets, or tokens in
the repository.

## macOS Apple Silicon

```console
./wtl-setup --check
./wtl-menu
npm run deploy -- --target hosting --dry-run
```

## Windows 11 x64 or ARM64

```powershell
.\.SYSTEMX\scripts\bootstrap-windows.ps1 -Check
.\wtl-menu.ps1
npm run deploy -- --target hosting --dry-run
```

No Bash, WSL, or command translation is needed on Windows. Read
[Windows Setup](Windows-Setup) before installing optional x64-only tooling on
ARM64.

## Verify before changing the app

```console
npm run wtl:doctor -- --json
npm run sync:system:check
npm run system:audit
npm run deploy -- --target hosting --preflight
```
