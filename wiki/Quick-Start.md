# Quick Start

Get a running app in minutes. The starter boots **even before** Firebase is
configured, so you can see it work immediately.

## Prerequisites

- Primary path: **macOS on Apple Silicon hardware** using Terminal or iTerm with
  `zsh` and Homebrew.
- **Node.js** ≥ 20 (22 recommended) + npm
- **Git**
- *(optional, for deploy)* Firebase CLI via `npx --yes firebase-tools` or a
  global `firebase` install.
- *(optional)* [GitHub CLI](https://cli.github.com/) `gh`

Windows is an edition target for **Windows x64** and **Windows ARM64**. Use
PowerShell or Windows Terminal and verify generated commands before production
use. Ubuntu/Linux support is planned soon; Linux/WSL notes are compatibility
guidance until that edition is validated.

See **[Setup Playbook → Step 00](Setup-Playbook)** for the full prerequisite list
(gcloud, Stripe CLI, etc.).

## WTL operating layer

From the repository root, these compatibility launchers expose the reusable
Wayne Tech Lab setup, governance sync, and interactive CLI menu:

```bash
./wtl-setup
./wtl-agi --check
./wtl-menu
```

Use `.SYSTEMX/docs/AGENT-OPERATIONS.md` for the AI/subagent read order, lane
ownership, checkpoints, and handoff format.

For the stricter coordinator/subagent loop, read
`.SYSTEMX/docs/project/agent-0-subagent-loop.md`. Subagents are optional and
powerful, but they multiply token, tool, and review usage.

## One-command tooling bootstrap

Instead of installing each tool by hand, let the bootstrap install, authenticate,
and verify everything (Node, Git, `gh`, `gcloud`, Firebase CLI, optional Stripe,
Chrome/MCP, Microsoft 365, and GoDaddy DNS):

```bash
bash .SYSTEMX/WSG-MENU.sh                          # → 1) 🚀 Start Template into Production
# …or directly:
bash .SYSTEMX/scripts/bootstrap.sh --with-stripe --with-mcp --interactive-login
bash .SYSTEMX/scripts/bootstrap.sh --with-stripe --with-mcp --with-m365 --with-godaddy --interactive-login
bash .SYSTEMX/scripts/bootstrap.sh --check         # verify only (no changes)
```

It's idempotent — safe to re-run any time. The primary lane is Apple Silicon
macOS, where it installs via Homebrew + npm. Windows x64/ARM64 should follow the
Windows edition notes, and Ubuntu/Linux command coverage is coming soon.

## 🚀 Start Template into Production (recommended)

The fastest path from a fresh clone to a live app is **menu option #1** — a
single guided, **one-time, secure** wizard:

```bash
bash .SYSTEMX/WSG-MENU.sh        # → 1) 🚀 Start Template into Production
```

Stages, in order:

1. **Tooling** — verify (and optionally install/auth) every SDK + CLI
2. **Identity** — project name / slug
3. **First-time setup intake** — fill the ordered `.md` files in
   `.SYSTEMX/Unified-Setup-Process/intake/`, then re-inject
   `06-AI-REINJECTION-PROMPT.md` into the AI/code tooling session
4. **Firebase / Google config** — paste your `firebaseConfig`, a raw `.env`
   block, or point at `GoogleService-Info.plist` / `google-services.json`
   (processed **once**)
5. **Seed env files** — writes `.env.local` (client) + `.secrets.env`
   (server, `chmod 600`) securely
6. **Prompt Ingest** — point at your project build-spec `.md`; it's copied to
   `PROMPT-INGEST.md` for your AI agent to build on top of the template
7. **Verify** — `npm install` + production build
8. **Deploy** — Firebase login/project select + deploy (optional)
9. **Security wrap-up** — reminds you to **delete the AI chat** (live keys handled)

### Make `WSG-MENU` typeable

```bash
bash .SYSTEMX/scripts/install-command.sh   # adds WSG-MENU to ~/.zshrc / ~/.bashrc
# then, in a new terminal:
WSG-MENU
```

## Option A — Use this template (recommended)

```bash
gh repo create my-app --template WayneTechLab/SFWA-WTL-TEMPLATE --private --clone
cd my-app
npm install
npm run dev          # → http://localhost:5173
```

…or click the green **“Use this template”** button on the
[repo page](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE).

## Option B — Clone and run

```bash
git clone https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE.git my-app
cd my-app
npm install
npm run dev          # → http://localhost:5173
```

## Add your Firebase config

The app runs without Firebase, but Auth/Firestore/Storage stay dormant until you
add credentials:

```bash
cp .env.example .env.local
# Fill VITE_FIREBASE_* from:
#   Firebase console → Project settings → General → Your apps → SDK setup & config
```

See **[Environment Variables](Environment-Variables)** for the full contract.

## Build & preview

```bash
npm run build        # production build → dist/
npm run preview      # serve the production build locally
```

## Deploy (optional)

```bash
bash .SYSTEMX/scripts/deploy.sh hosting --dry-run
bash .SYSTEMX/scripts/deploy.sh hosting --project your-firebase-project-id
```

Full details in **[Deployment](Deployment)**.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run typecheck` | TypeScript checks (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with autofix |
| `npm run ci:lint` | ESLint with `--max-warnings=0` (CI gate) |
| `npm run ci:security` | Rules/config/audit/account-level security gate |
| `npm run ci:build` | Production build (CI gate) |

## Next steps

- Want the **full guided build** (Stripe, Functions, CI, monitoring)? Go to the
  **[Setup Playbook](Setup-Playbook)**.
- Curious about the tech choices? See **[Architecture & Stack](Architecture-and-Stack)**.
