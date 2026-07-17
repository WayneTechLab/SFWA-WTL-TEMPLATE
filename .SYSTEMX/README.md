# SFWA-WTL-G1 SYSTEMX

`.SYSTEMX` is the cross-platform operational layer for **SFWA-WTL-G1 —
Standard Firebase Web App, Wayne Tech Lab Generation 1**. The application lives
at the repository root; this directory owns setup, diagnostics, governance,
packets, security gates, versioning, logging, Firebase deployment, and agent
coordination.

Shared behavior lives in [`cli/systemx.mjs`](cli/systemx.mjs) and reusable
modules under [`lib/`](lib/). Bash, PowerShell, and CMD files are launchers; new
business logic must not be duplicated across shells.

## Platform contract

- `macos-arm64`: supported on Apple Silicon with Zsh/Bash.
- `windows-x64`: supported on Windows 11 with PowerShell 7.
- `windows-arm64`: supported on Windows 11 ARM64 with explicit emulation gates
  for tools that lack native vendor builds.
- Ubuntu/WSL: experimental compatibility lane.

Detection can be inspected with `npm run wtl:platform` and overridden for tests
with `--platform`. The resolved platform, shell, architecture, and SYSTEMX
version are included in doctor output, setup packets, state, and operation logs.

Read [Platform Matrix](docs/PLATFORM-MATRIX.md) and
[Windows Setup](docs/WINDOWS-SETUP.md) before provisioning a new machine.

## Entry points

```console
npm run wtl:menu
npm run wtl:setup -- --check
npm run wtl:doctor -- --json
npm run system:audit
npm run sync:system:check
npm run deploy -- --target hosting --dry-run
```

macOS compatibility launchers are `../wtl-menu`, `../wtl-setup`, `../wtl-agi`,
`WSG-MENU.sh`, and scripts under `scripts/`. Windows launchers are the matching
root `.ps1`/`.cmd` files plus `systemx.ps1` and `systemx.cmd`.

## Directory map

| Path | Responsibility |
| --- | --- |
| `cli/`, `lib/` | Shared Node.js command and platform implementation |
| `platforms/` | Support and tool architecture contracts |
| `scripts/` | Launchers, security validators, CI smoke, and Windows bootstrap |
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
`npm run sync:system` and `npm run sync:system:check`. Before parallel work,
read [Agent Operations](docs/AGENT-OPERATIONS.md); subagents multiply token,
tool, and review usage.

## Release gate

```console
npm ci
npm run ci:all
node .SYSTEMX/scripts/ci-smoke.mjs
npm run deploy -- --target hosting --preflight
```

All required macOS and Windows GitHub-hosted jobs must be green before the
repository advertises a support change.
