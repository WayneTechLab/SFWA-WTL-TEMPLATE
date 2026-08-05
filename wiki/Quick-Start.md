# Quick Start

Get a running app in minutes. The starter boots **even before** Firebase is
configured, so you can see it work immediately.

## Prerequisites

- **Node.js 24 LTS baseline** + npm (the selected Cloud Functions module may
  target its separately documented runtime)
- **Git**
- *(optional, for deploy)* Firebase CLI via `npx --yes firebase-tools` or a
  global `firebase` install.
- *(optional)* [GitHub CLI](https://cli.github.com/) `gh`

See **[Setup Playbook → Step 00](Setup-Playbook)** for the full prerequisite list
(gcloud, Stripe CLI, etc.).

## One-command tooling bootstrap

The local bootstrap can install or verify optional tools on supported shells. It
does not create cloud projects or silently handle credentials. Inspect it first
and use check mode when you only need verification:

```bash
bash .SYSTEMX/WSG-MENU.sh                          # → 1) 🚀 Start Template into Production
# …or directly:
bash .SYSTEMX/scripts/bootstrap.sh --with-stripe --with-mcp --interactive-login
bash .SYSTEMX/scripts/bootstrap.sh --with-stripe --with-mcp --with-m365 --with-godaddy --interactive-login
bash .SYSTEMX/scripts/bootstrap.sh --check         # verify only (no changes)
```

It is intended to be idempotent. Native Windows PowerShell launchers are not
part of this revision; use the shared Node commands in [Windows Setup](Windows-Setup).

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
4. **Firebase / Google config** — capture approved public client configuration
   or point at `GoogleService-Info.plist` / `google-services.json` (processed
   **once**); never paste server secrets or private keys
5. **Seed env files** — writes `.env.local` (client) + `.secrets.env`
   (server, `chmod 600`) securely
6. **Prompt Ingest** — point at your project build-spec `.md`; it's copied to
   `PROMPT-INGEST.md` for your AI agent to build on top of the template
7. **Verify** — `npm install` + production build
8. **Deploy** — Firebase login/project select + deploy (optional)
9. **Security wrap-up** — confirms the never-paste secret policy and rotation path

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
npm test
npm run dev          # → usually http://127.0.0.1:5173
```

…or click the green **“Use this template”** button on the
[repo page](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE).

## Option B — Clone and run

```bash
git clone https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE.git my-app
cd my-app
npm install
npm run dev          # → usually http://127.0.0.1:5173
```

## Option C — Run the app plus SYSTEMX Local Control

Use this when you want the local builder, provider readiness, source/file
lanes, logs, and current-template management screen beside the Vite app:

```bash
npm run dev:systemx
```

The command prints the active URLs. Defaults are:

```text
http://127.0.0.1:5173/             # public Vite app
http://127.0.0.1:5173/__systemx/   # SYSTEMX LAN through the Vite bridge
http://127.0.0.1:7331/             # SYSTEMX LAN direct loopback service
```

If another local project already owns those ports, SYSTEMX moves to the next
safe free ports and records only this project's owned processes. Check or stop
the session with:

```bash
npm run systemx:session:status
npm run systemx:session:stop
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
| `npm run dev:systemx` | Start Vite plus SYSTEMX LAN builder with safe auto-ports |
| `npm run systemx:lan` | Start only the direct LAN loopback service |
| `npm run systemx:session:status` | Show the active owned local session |
| `npm run systemx:session:stop` | Stop only the owned local session |
| `npm test` | Run the SYSTEMX LAN characterization suite |
| `npm run docs:links` | Validate local Markdown and extensionless Wiki links |
| `npm run ci:lint` | ESLint with `--max-warnings=0` (CI gate) |
| `npm run ci:security` | Rules/config/audit/account-level security gate |
| `npm run ci:build` | Production build (CI gate) |

## Next steps

- Want the **full guided build** (payments, Functions, local verification,
  monitoring)? Go to the
  **[Setup Playbook](Setup-Playbook)**.
- Want the local visual builder/control screen? Open
  **[SYSTEMX LAN Builder](SYSTEMX-LAN-Builder)** and
  **[SYSTEMX Logs and Evidence](SYSTEMX-Logs-and-Evidence)**.
- Curious about the tech choices? See **[Architecture & Stack](Architecture-and-Stack)**.
