# One-Line Workstation Start

The current public template does **not** publish a remote `install.sh`,
`install.ps1`, or `bootstrap-windows.ps1` endpoint. Do not pipe an unreviewed
remote script into a shell. The supported one-line commands below clone the
template, install its pinned npm dependency graph, run the local characterization
test, and start the loopback-only app plus SYSTEMX LAN.

## macOS, Linux, or WSL2

```bash
git clone https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE.git my-app && cd my-app && npm install && npm test && npm run dev:systemx
```

## Windows 11 PowerShell

```powershell
git clone https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE.git my-app; Set-Location my-app; npm install; npm test; npm run dev:systemx
```

These start the repository-local development services only. They do not create
cloud projects, authenticate accounts, deploy, install VS Code, or collect
secrets. The printed ports are authoritative because SYSTEMX selects free
loopback ports for this checkout rather than assuming another project is
stopped.

## Existing checkout

```text
npm install
npm test
npm run dev:systemx
```

Use the direct bootstrap only after inspecting it and only from a visible local
terminal:

```bash
bash .SYSTEMX/scripts/bootstrap.sh --check
```

The bootstrap currently provides the deepest macOS/Linux/WSL guidance. Native
PowerShell launcher and package-manager installation support remains a tracked
cross-platform follow-up; the current Node scripts themselves run from
PowerShell when Node, npm, and Git are already installed.

## Verify or stop the owned local session

```bash
npm run systemx:session:status
npm run systemx:session:stop
```

`systemx:session:stop` only stops processes recorded as owned by this repo. It
must not terminate another project’s Vite, Firebase emulator, or control port.

## Next checks

```bash
npm run typecheck
npm run lint
npm run build
npm run sync:system:check
npm run system:audit
```

Read [Quick Start](Quick-Start), [Windows Setup](Windows-Setup), [Linux Setup](Linux-Setup),
and [Platform Matrix](Platform-Matrix) before adding Firebase, Google Cloud, or
optional provider tooling.
