# SFWA-WTL-G1

**Standard Firebase Web App, Wayne Tech Lab Generation 1** is a public,
cross-platform TypeScript + React + Vite + Firebase starter and an operational
SYSTEMX toolkit for repeatable setup, quality control, and deployment.

[![CI](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/actions/workflows/ci.yml/badge.svg)](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/actions/workflows/ci.yml)
[![CodeQL](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/actions/workflows/codeql.yml/badge.svg)](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/actions/workflows/codeql.yml)

## Wayne Tech Lab LLC notice

SFWA-WTL-G1 is provided by **Wayne Tech Lab LLC** under the
[MIT License](LICENSE), as-is and without warranty. Use it at your own risk. You
are responsible for reviewing, securing, testing, configuring, and legally
operating every derived application.

The template may change daily. Fork, clone, copy, and modify it only after
reviewing the current version. If this repository or `.SYSTEMX` is a substantial
base for your project, please retain the license and ask Wayne Tech Lab LLC for
appropriate credit or provide visible attribution.

This public template was derived from the private
[WayneTechLab/webapp-stack-g1](https://github.com/WayneTechLab/webapp-stack-g1)
and incorporates reusable SYSTEMX coordination patterns. It is not the source
repository for Networks.Chat or WayneTechLab.com and does not publish private
portfolio or business application code.

Repository flow is intentionally kept compact: `main` is the single live branch
for the public template, with short-lived task branches or automation branches
expected to merge quickly or be closed out. Keep stale branches and open PRs
trimmed so `.SYSTEMX`, the README, and the GitHub Wiki describe one current
state instead of several drifting states.

Subagents are powerful and multiply token, tool, and review usage. Use bounded
lanes, least privilege, and parent-agent verification; see
[Agent Operations](.SYSTEMX/docs/AGENT-OPERATIONS.md).

## Supported platforms

| Platform | Shell | Status |
| --- | --- | --- |
| macOS on Apple Silicon | Zsh/Bash | Supported |
| macOS on Intel | Zsh/Bash | Compatibility |
| Windows 11 x64 | PowerShell 7 / Windows Terminal | Supported |
| Windows 11 ARM64 | PowerShell 7 / Windows Terminal | Supported with explicit x64-emulation gates |
| Ubuntu 24.04 x64 | Bash | Supported and release-blocking |
| Ubuntu 24.04 ARM64 | Bash | Supported; hosted runner is public preview |
| WSL2 x64 / ARM64 | Bash + Windows host integration | Supported compatibility lane |
| Debian 12+ x64 / ARM64 | Bash | Compatibility |
| Other apt/dnf Linux | Bash | Community compatibility |

Windows 10 is not a support target. SYSTEMX auto-detects its host as
macOS, Windows, native Ubuntu/Debian/Linux, or WSL2 on x64/ARM64. Use
`--platform <id>` only for testing or controlled automation. See the
[platform matrix](.SYSTEMX/docs/PLATFORM-MATRIX.md).

## Quick start

Install the workstation baseline and clone the template with one command. The
installer shows its plan, installs VS Code and required OS tools, validates the
checkout, and then asks before opening the Setup & Tooling menu phase.

### macOS, Ubuntu, Debian, Linux, or WSL2 Terminal

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/.SYSTEMX/scripts/install.sh)"
```

### Windows 11 PowerShell

```powershell
irm https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/.SYSTEMX/scripts/install.ps1 | iex
```

The baseline includes Node.js 24 with checksum verification, Git, GitHub CLI,
VS Code, Google Cloud CLI, Chrome/Chromium, the pinned Firebase CLI, and project
dependencies. It does not authenticate, create cloud projects, deploy, or
collect secrets. Read [Linux Setup](.SYSTEMX/docs/LINUX-SETUP.md),
[Windows Setup](.SYSTEMX/docs/WINDOWS-SETUP.md), or the
[Wiki one-line installer](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/wiki/One-Line-Install).

`npm run dev` also starts the local-only SYSTEMX LAN dashboard at
`http://127.0.0.1:7331/`. The dashboard source lives under `.SYSTEMX/LAN`, runs
on a separate loopback server, and is guarded from entering the public
production `dist` build. Use `npm run dev:public` for the public Vite app only.
If the default local ports are already in use by another project, SYSTEMX
selects the next open loopback port and records the owned PIDs in
`.SYSTEMX/LAN/session-current.json`.

To create a differently named repository from the template instead:

```console
gh repo create my-app --template WayneTechLab/SFWA-WTL-TEMPLATE --private --clone
cd my-app
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` and fill only the public Firebase web
configuration. Never commit service-account keys, private keys, tokens, or
server secrets.

### Resume the menu-driven setup phase

```console
npm run wtl:menu -- --setup-phase
npm run wtl:setup -- --check
npm run deploy -- --target hosting --dry-run
```

The historical macOS/Linux `.sh` paths remain compatible:

```console
bash .SYSTEMX/scripts/bootstrap.sh --check
bash .SYSTEMX/WSG-MENU.sh
```

Windows PowerShell/CMD launchers remain available after installation:

```powershell
.\.SYSTEMX\scripts\bootstrap-windows.ps1 -Check
.\wtl-menu.ps1
npm run deploy -- --target hosting --dry-run
```

CMD launchers are also included: `wtl-setup.cmd`, `wtl-menu.cmd`,
`wtl-sync.cmd`, `wtl-agi.cmd` (deprecated alias), and `.SYSTEMX\systemx.cmd`.

## Stable SYSTEMX commands

| Command | Purpose |
| --- | --- |
| `npm run wtl:menu` | Open the lifecycle menu and show the active platform |
| `npm run wtl:menu -- --setup-phase` | Enter Setup & Tooling directly after workstation installation |
| `npm run wtl:setup -- --check` | Verify runtime, SDK, CLI, and architecture contracts |
| `npm run wtl:doctor -- --json` | Produce machine-readable diagnostics |
| `npm run system:audit` | Check structure, docs, drift, secrets, and dependencies |
| `npm run wtl:sync` | Synchronize managed SYSTEMX version and agent-adapter surfaces |
| `npm run wtl:bus -- summary --mission <id> --wave <id>` | Inspect Agent 0 / subagent wave status and quiet lanes |
| `npm run sync:system:check` | Detect version and agent-adapter drift |
| `npm run diagnostics` | Run TypeScript and ESLint diagnostics |
| `npm run deploy -- --target hosting --dry-run` | Run shell-independent Firebase deployment |
| `npm run setup:packet:export` | Build a platform-stamped setup packet |
| `npm run lan` | Start the local-only SYSTEMX LAN dashboard |
| `npm run wtl:start-day` | Start an owned local dev session without stealing ports |
| `npm run wtl:end-day` | Stop only the local processes recorded for this repo |
| `npm run wtl:local -- status` | Show recorded local session ports and PIDs |
| `npm run ci:lan-isolation` | Verify LAN dashboard files did not enter `dist` |

`npm run wtl:agi` remains available as a deprecated compatibility alias to the
same sync command. It does not enable autonomous AI behavior.

Non-secret local state is stored in ignored `.SYSTEMX/state/local.json`.
Runtime events are written as rotating, sanitized JSONL under `.SYSTEMX/logs/`.

## Tooling and ARM64 policy

Node.js 24, Git, GitHub CLI, VS Code, and Firebase tooling have native ARM64
paths on the supported platforms. Google Cloud provides a native Linux ARM64
archive; its Windows ARM64 package can use x64 emulation and must pass the
installer's read-only verification gate. Linux ARM64 uses Chromium when an
equivalent Google Chrome package is unavailable. Firebase CLI is pinned locally
at `15.24.0` for reproducible emulation and deployment.

Local developers use interactive provider authentication. CI uses OIDC or
Application Default Credentials with least privilege; legacy Firebase tokens
are not supported. Optional MCP servers require explicit opt-in, local/staging
targets, and no production secrets. Generate the verified Firebase and Chrome
DevTools configuration with `npm run wtl:mcp`; read
[MCP and agent tooling](.SYSTEMX/docs/MCP-AND-AGENTS.md) first.

## Coding-agent instruction standards

[`AGENTS.md`](AGENTS.md) is canonical. Generated drift-checked adapters are
provided for Claude Code, Gemini CLI, GitHub Copilot, Cursor, Windsurf, Cline,
Continue, Junie, and Amazon Q.

`CODEX.md`, `CoPilot.md`, and `GPT.md` are not recognized repository standards
and are intentionally not created. Codex reads `AGENTS.md`, Copilot uses
`.github/copilot-instructions.md`, and Gemini CLI uses `GEMINI.md`.

## Stack

- React 19, TypeScript 5.9, Vite 8, and Tailwind CSS 4.
- Firebase 12 client SDK, Hosting, Firestore rules/indexes, and Storage rules.
- Firebase CLI 15.24.0; optional Cloud Functions, Stripe, Google Cloud, and MCP.
- ESLint, Node test runner, Markdown lint/link checks, dependency audit, and
  CodeQL.
- GitHub-hosted macOS 15 ARM64, Windows 2025 x64, Windows 11 ARM64, Ubuntu
  24.04 x64, and Ubuntu 24.04 ARM64 release gates, plus a WSL2 compatibility
  smoke lane.

## Documentation

- [SYSTEMX operations](.SYSTEMX/README.md)
- [SYSTEMX WEBPORTAL](.SYSTEMX/LAN/SYSTEMX-WEBPORTAL.md)
- [Linux and WSL2 setup](.SYSTEMX/docs/LINUX-SETUP.md)
- [Windows setup](.SYSTEMX/docs/WINDOWS-SETUP.md)
- [Deployment runbook](.SYSTEMX/docs/DEPLOYMENT.md)
- [Security policy](SECURITY.md)
- [Setup playbook](.SYSTEMX/Template/README.md)
- [Project Wiki](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/wiki)
- [GitHub authors and contribution notes](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/wiki/GitHub-Authors-and-Contribution-Notes)
- [Contributing](CONTRIBUTING.md) and [support](SUPPORT.md)

Before release, run:

```console
npm ci
npm run ci:all
npm run deploy -- --target hosting --preflight
```
