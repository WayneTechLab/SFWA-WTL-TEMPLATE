# Quick Start

## Install the workstation with one command

The installer detects the operating system and architecture, displays the
installation plan, installs VS Code and the required development tools, clones
or safely reuses the template, runs diagnostics, and asks before starting the
Setup & Tooling menu phase.

### macOS, Ubuntu, Debian, Linux, or WSL2 Terminal

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/.SYSTEMX/scripts/install.sh)"
```

### Windows 11 PowerShell

```powershell
irm https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/.SYSTEMX/scripts/install.ps1 | iex
```

See [One-Line Install](One-Line-Install) for review-first and unattended
variants. Read [Linux Setup](Linux-Setup) or [Windows Setup](Windows-Setup) for
architecture-specific behavior.

## What happens next

After installation and diagnostics, SYSTEMX asks:

```text
Proceed to the menu-driven Setup & Tooling phase now? [Y/n]
```

Choose **Yes** to enter the setup phase. Choose **No** to stop without
authenticating or changing cloud resources. Resume later:

```console
cd ~/SFWA-WTL-G1
npm run wtl:menu -- --setup-phase
```

The setup phase provides readiness checks, dependency/tool refresh,
authentication readiness, setup-packet export, detailed doctor output, and the
production playbook.

## Create a separately named project

If GitHub CLI is already authenticated:

```console
gh repo create my-app --template WayneTechLab/SFWA-WTL-TEMPLATE --private --clone
cd my-app
npm ci
npm run wtl:menu -- --setup-phase
```

Copy `.env.example` to `.env.local` and provide only public Firebase web
configuration. Never commit service-account files, private keys, tokens, or
server secrets.

## Verify before deployment

```console
npm run wtl:platform
npm run wtl:doctor -- --json
npm run sync:system:check
npm run system:audit
npm run deploy -- --target hosting --preflight
```
