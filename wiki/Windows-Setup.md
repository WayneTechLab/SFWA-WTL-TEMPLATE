# Windows 11 Setup

## Support position

The shared Node/Vite/SYSTEMX LAN commands are intended to run on Windows 11
x64 and ARM64 when Node.js, npm, Git, and Firebase tooling are installed. This
checkout does not currently ship a native `.ps1` or `.cmd` SYSTEMX launcher and
does not expose a remote PowerShell installer. Those are planned capabilities,
not current acceptance claims.

## Existing clone

Run in Windows Terminal or PowerShell 7:

```powershell
git clone https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE.git my-app
Set-Location my-app
npm install
npm test
npm run dev:systemx
```

The Node runner selects free loopback ports and prints the public Vite URL,
the `/__systemx/` bridge, and the direct SYSTEMX LAN URL. Check ownership with:

```powershell
npm run systemx:session:status
```

Stop only this checkout’s owned processes with:

```powershell
npm run systemx:session:stop
```

## Validation

```powershell
npm run typecheck
npm run lint
npm run build
npm run sync:system:check
npm run system:audit
```

The build keeps `.SYSTEMX/LAN` outside the public artifact. `npm test` also
characterizes the loopback host/origin/session/path and read-model controls.

## Optional tooling

Install vendor tools through their official Windows installers or approved
package managers, then verify them locally. Firebase CLI can be installed with
the project’s npm dependency path or `npx --yes firebase-tools`; Google Cloud,
GitHub CLI, Chrome/Chromium, Playwright, and optional Stripe/MCP tools are
separate opt-in tools. Do not put credentials in PowerShell command history or
AI context.

Windows ARM64 uses native builds where the vendor provides them. If a provider
only supplies x64 tooling, use the vendor-supported emulation path and record
that limitation in the local setup evidence; never silently claim native ARM64
support.

## Git Bash or WSL

The legacy Bash bootstrap can be inspected and run from Git Bash or WSL:

```bash
bash .SYSTEMX/scripts/bootstrap.sh --check
```

This is optional and not required to run the Node-based app and LAN commands.
See [One-Line Workstation Start](One-Line-Install) and [Platform Matrix](Platform-Matrix).
