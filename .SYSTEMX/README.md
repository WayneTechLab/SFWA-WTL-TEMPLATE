# SFWA-WTL-G1 SYSTEMX

`.SYSTEMX` is the cross-platform operational layer for **SFWA-WTL-G1 —
Standard Firebase Web App, Wayne Tech Lab Generation 1**. The application lives
at the repository root; this directory owns setup, diagnostics, governance,
packets, security gates, versioning, logging, Firebase deployment, and agent
coordination.

`.SYSTEMX/LAN` is the local-only WEBPORTAL surface. It is committed as template
source but served only from a loopback Node server at `127.0.0.1:7331`; it is
not a Vite route, Firebase Hosting route, public asset folder, or production
build input.

The public template is operated as a compact single-main repository. Temporary
task branches may exist during bounded work, but `.SYSTEMX` status, runbooks,
and Wiki guidance should always be reconciled back to one current `main` state.

`.SYSTEMX` is the default root for operational files. Keep setup scripts,
security scripts, local files, sanitized logs, AI coordination docs, status
boards, and portal assets here. Repository root is reserved for required app
runtime files, package manager files, GitHub/Firebase configuration, standard
public-project docs, required coding-agent adapter entry points, and thin
launcher shims.

Shared behavior lives in [`cli/systemx.mjs`](cli/systemx.mjs) and reusable
modules under [`lib/`](lib/). Bash, PowerShell, and CMD files are launchers; new
business logic must not be duplicated across shells.

## Platform contract

- `macos-arm64`: supported on Apple Silicon with Zsh/Bash.
- `windows-x64`: supported on Windows 11 with PowerShell 7.
- `windows-arm64`: supported on Windows 11 ARM64 with explicit emulation gates
  for tools that lack native vendor builds.
- `ubuntu-x64` and `ubuntu-arm64`: supported Ubuntu 24.04 release lanes.
- `wsl2-x64` and `wsl2-arm64`: supported compatibility lanes with Windows-host
  VS Code integration.
- Debian 12+ and other apt/dnf Linux distributions: compatibility lanes with
  explicit vendor-package limitations.

Detection can be inspected with `npm run wtl:platform` and overridden for tests
with `--platform`. The resolved platform, shell, architecture, and SYSTEMX
version are included in doctor output, setup packets, state, and operation logs.

Read [Platform Matrix](docs/PLATFORM-MATRIX.md) and
[Linux Setup](docs/LINUX-SETUP.md) or [Windows Setup](docs/WINDOWS-SETUP.md)
before provisioning a new machine.

## One-line workstation install

macOS, Ubuntu, Debian, Linux, or WSL2 Terminal:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/.SYSTEMX/scripts/install.sh)"
```

Windows 11 PowerShell:

```powershell
irm https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/.SYSTEMX/scripts/install.ps1 | iex
```

Both installers show the operating-system plan, install the baseline tools,
validate Node and project dependencies, and ask before entering
`npm run wtl:menu -- --setup-phase`. They do not authenticate or deploy.

## Entry points

```console
npm run wtl:menu
npm run wtl:setup -- --check
npm run wtl:doctor -- --json
npm run system:audit
npm run wtl:bus -- summary --mission message-bus --wave wave-01
npm run sync:system:check
npm run lan
npm run deploy -- --target hosting --dry-run
```

macOS compatibility launchers are `../wtl-menu`, `../wtl-setup`, `../wtl-sync`,
`../wtl-agi` (deprecated alias), `WSG-MENU.sh`, and scripts under
`.SYSTEMX/scripts/`.
Windows launchers are the matching root `.ps1`/`.cmd` files plus
`systemx.ps1` and `systemx.cmd`.

## Directory map

| Path | Responsibility |
| --- | --- |
| `AI/` | AI docs, agent file map, prompt/routing standards, and adapter-governance notes |
| `cli/`, `lib/` | Shared Node.js command and platform implementation |
| `LAN/` | Local-only SYSTEMX WEBPORTAL source and loopback server |
| `platforms/` | Support and tool architecture contracts |
| `scripts/` | Launchers, security validators, CI smoke, and multi-OS workstation installers |
| `scripts/setup/` | Setup helpers that used to live in root `scripts/` |
| `scripts/security/` | Security shell wrappers and compatibility helpers |
| `state/` | Ignored non-secret local JSON state; legacy env state migrates once |
| `logs/` | Ignored rotating sanitized JSONL operation logs |
| `tests/` | Node test-runner coverage for platform, state, logs, Firebase, drift, packets |
| `Template/` | Ordered setup playbook and starter copy |
| `Unified-Setup-Process/` | Edition manifests, intake, standards, and packet schema |
| `Standard-MD-Files/` | Canonical portable setup Markdown |
| `Stock-Setup-Files/` | Stock mirror used by packet workflows |
| `status/` | Human/agent work coordination boards |
| `version/` | Synchronized SYSTEMX and product version state |

## State, logs, and secrets

`state/local.json` contains non-secret machine preferences only and is ignored.
Existing safe values from `status/setup-state.env` are read and migrated once.
Secret-like keys are rejected. On Windows, SYSTEMX restricts the file with NTFS
ACLs; on POSIX systems it uses owner-only mode.

`state/bus/` is the local-first Agent 0 coordination layer. `live.jsonl`
captures active lane packets, `archive/` stores closed waves, and `summaries/`
stores compact replay artifacts.

Each command appends a JSONL event with run ID, UTC timestamp, command,
platform, architecture, shell, version, result, duration, and exit code.
Credential-shaped fields and values are redacted, logs rotate at 5 MB, and no
command dumps the environment.

## Deployment

Deployment uses the pinned local Firebase CLI and argument-array process calls.
It supports targets, project override, semantic version bump, preflight,
dry-run, rollback information, browser opening, quality/security gates, and
Firebase deployment without shell translation. See
[Deployment](docs/DEPLOYMENT.md).

## MCP and agents

Run `npm run wtl:mcp` only after reading
[MCP and Agent Tooling](docs/MCP-AND-AGENTS.md). Generated Firebase and Chrome
DevTools MCP entries are opt-in and must use local or staging resources. Google
Cloud and Stripe remote MCP integrations require provider-specific consent and
least-privilege authentication.

The root `AGENTS.md` is canonical. Agent adapters are generated and checked by
`npm run wtl:sync`, `npm run sync:system`, and `npm run sync:system:check`.
Before parallel work, read [Agent Operations](docs/AGENT-OPERATIONS.md);
subagents multiply token, tool, and review usage. AI maps and non-vendor
instructions live in [AI/](AI/); required root/vendor adapter files stay only
where their tools discover them.

## Repository hygiene

- Prefer one live production line on `main`.
- Close or merge short-lived task branches quickly.
- Remove stale PR branches so status boards and docs do not drift from the
  shipped repository state.
- When contributors change the public collaboration model, update the README and
  the GitHub Wiki in the same pass.

## Release gate

```console
npm ci
npm run ci:all
node .SYSTEMX/scripts/ci-smoke.mjs
npm run deploy -- --target hosting --preflight
```

All required macOS, Windows, and Ubuntu x64/ARM64 GitHub-hosted jobs must be
green before the repository advertises a support change.

## SYSTEMX LAN boundary

`npm run dev` starts the public Vite app and the SYSTEMX LAN sidecar. Use
`npm run dev:public` when only the public app should run. Use `npm run lan` to
open the dashboard server by itself.

The local runner auto-detects occupied loopback ports and moves to the next
open port instead of interfering with another local project. Start-of-day and
end-of-day commands use `.SYSTEMX/LAN/session-current.json` to track only the
PIDs started by this repository.

The production build runs `node .SYSTEMX/scripts/assert-lan-isolation.mjs`.
That guard fails if `Website_Dashboard.html`, `.SYSTEMX/LAN`, `SYSTEMX LAN`, or
other local-control markers appear in `dist`.
