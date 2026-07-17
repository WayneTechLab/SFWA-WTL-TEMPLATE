# Windows 11 Setup

Use Windows Terminal and start from Windows PowerShell 5.1 or PowerShell 7:

```powershell
.\.SYSTEMX\scripts\bootstrap-windows.ps1 -Check
```

The bootstrap installs PowerShell 7 when absent and relaunches itself. It
downloads the current Node.js 24 LTS x64 or ARM64 archive, verifies the SHA-256
checksum from Node.js, installs dependencies, and starts the shared SYSTEMX
doctor.

```powershell
.\wtl-menu.ps1
.\wtl-setup.ps1 --check
.\.SYSTEMX\systemx.ps1 doctor --json
```

CMD launchers are also provided. Windows does not require Bash or WSL.

On ARM64, Node.js, Git, GitHub CLI, and Firebase tooling use native paths.
Google Cloud CLI and Stripe CLI may use x64 emulation; test a read-only command
and authentication before any deployment or payment operation.
