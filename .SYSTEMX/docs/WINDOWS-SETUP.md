# Windows 11 Setup

## Requirements

- Windows 11 x64 or ARM64.
- Windows Terminal.
- `winget` available from App Installer.
- A normal user account; elevate only when a vendor installer requires it.

## Bootstrap

From a repository clone in Windows PowerShell 5.1 or PowerShell 7:

```powershell
.\.SYSTEMX\scripts\bootstrap-windows.ps1 -Check
```

The script installs PowerShell 7 when missing and relaunches itself. If Node is
missing, it downloads the latest Node.js 24 LTS archive for the detected x64 or
ARM64 architecture, verifies the SHA-256 value from Node.js `SHASUMS256.txt`,
and adds that runtime to the user path. It then installs project dependencies
and runs the shared SYSTEMX doctor.

Optional tools can be requested explicitly:

```powershell
.\.SYSTEMX\scripts\bootstrap-windows.ps1 -WithStripe -WithM365
.\wtl-menu.ps1
.\.SYSTEMX\systemx.ps1 doctor --json
```

CMD users can run `wtl-menu.cmd`, `wtl-setup.cmd`, or
`.SYSTEMX\systemx.cmd doctor --json`. No Bash, WSL, or command translation is
required.

## ARM64 verification

Node.js, Git, GitHub CLI, and npm-based Firebase tooling should report ARM64.
Google Cloud CLI and Stripe CLI may run under x64 emulation. SYSTEMX reports
that limitation; validate authentication and a harmless read-only command
before any deployment or payment operation.

## Authentication

Use `gh auth login`, `gcloud auth login`, and `npx --no-install firebase login`
locally. Use OIDC or Application Default Credentials in CI. Do not generate or
store legacy Firebase CI tokens.
