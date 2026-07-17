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

Subagents are powerful and multiply token, tool, and review usage. Use bounded
lanes, least privilege, and parent-agent verification; see
[Agent Operations](.SYSTEMX/docs/AGENT-OPERATIONS.md).

## Supported platforms

| Platform | Shell | Status |
| --- | --- | --- |
| macOS on Apple Silicon | Zsh/Bash | Supported |
| Windows 11 x64 | PowerShell 7 / Windows Terminal | Supported |
| Windows 11 ARM64 | PowerShell 7 / Windows Terminal | Supported with explicit x64-emulation gates |
| Ubuntu / WSL | Bash | Experimental, non-blocking |

Windows 10 is not a support target. SYSTEMX auto-detects its host as
`macos-arm64`, `windows-x64`, `windows-arm64`, or an experimental Ubuntu lane.
Use `--platform <id>` only for testing or controlled automation. See the
[platform matrix](.SYSTEMX/docs/PLATFORM-MATRIX.md).

## Quick start

Create a repository from the template or clone this one, then install Node.js
24 LTS and dependencies:

```console
gh repo create my-app --template WayneTechLab/SFWA-WTL-TEMPLATE --private --clone
cd my-app
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill only the public Firebase web
configuration. Never commit service-account keys, private keys, tokens, or
server secrets.

### macOS Apple Silicon

```console
./wtl-setup --check
./wtl-menu
npm run deploy -- --target hosting --dry-run
```

The historical `.sh` paths remain compatible:

```console
bash .SYSTEMX/scripts/bootstrap.sh --check
bash .SYSTEMX/WSG-MENU.sh
```

### Windows 11 x64 or ARM64

Start the bootstrap from Windows PowerShell 5.1 if needed. It installs
PowerShell 7, downloads the correct Node.js 24 archive, verifies its SHA-256
checksum, and relaunches in `pwsh`.

```powershell
.\.SYSTEMX\scripts\bootstrap-windows.ps1 -Check
.\wtl-menu.ps1
npm run deploy -- --target hosting --dry-run
```

CMD launchers are also included: `wtl-setup.cmd`, `wtl-menu.cmd`,
`wtl-agi.cmd`, and `.SYSTEMX\systemx.cmd`.

## Stable SYSTEMX commands

| Command | Purpose |
| --- | --- |
| `npm run wtl:menu` | Open the lifecycle menu and show the active platform |
| `npm run wtl:setup -- --check` | Verify runtime, SDK, CLI, and architecture contracts |
| `npm run wtl:doctor -- --json` | Produce machine-readable diagnostics |
| `npm run system:audit` | Check structure, docs, drift, secrets, and dependencies |
| `npm run sync:system:check` | Detect version and agent-adapter drift |
| `npm run diagnostics` | Run TypeScript and ESLint diagnostics |
| `npm run deploy -- --target hosting --dry-run` | Run shell-independent Firebase deployment |
| `npm run setup:packet:export` | Build a platform-stamped setup packet |

Non-secret local state is stored in ignored `.SYSTEMX/state/local.json`.
Runtime events are written as rotating, sanitized JSONL under `.SYSTEMX/logs/`.

## Tooling and ARM64 policy

Node.js 24, Git, GitHub CLI, and Firebase tooling have native Windows ARM64
paths. Google Cloud CLI and Stripe CLI can require x64 emulation; SYSTEMX labels
that path and requires operator verification. Firebase CLI is pinned locally at
`15.24.0` for reproducible emulation and deployment.

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
- GitHub-hosted macOS 15 ARM64, Windows 2025 x64, and Windows 11 ARM64 release
  gates, plus an experimental Ubuntu lane.

## Documentation

- [SYSTEMX operations](.SYSTEMX/README.md)
- [Windows setup](.SYSTEMX/docs/WINDOWS-SETUP.md)
- [Deployment runbook](.SYSTEMX/docs/DEPLOYMENT.md)
- [Security policy](SECURITY.md)
- [Setup playbook](.SYSTEMX/Template/README.md)
- [Project Wiki](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/wiki)
- [Contributing](CONTRIBUTING.md) and [support](SUPPORT.md)

Before release, run:

```console
npm ci
npm run ci:all
npm run deploy -- --target hosting --preflight
```
