# TODO — SFWA-WTL-G1

Backlog for the generic template. Check items off or move to
[IN_PROGRESS.md](IN_PROGRESS.md) → [DONE.md](DONE.md).

## Next up

- [ ] SYSTEMX Message Bus and Wave Control mission
- [ ] Add local append-only agent message bus schema and archive policy
- [ ] Add Agent 0 wave start/end loop with mission, milestone, and checkpoint packets
- [ ] Add a Vitest + Playwright scaffold to `starter/` (currently playbook-only, Step 10)
- [ ] Add an optional `functions/` skeleton to `starter/` for projects that want it (Step 06)
- [ ] Provide a GitHub Actions deploy job example wired to `deploy.sh` (Step 09)

## Backlog

- [x] Linux/WSL auto-install path through `.SYSTEMX/scripts/install.sh`
- [ ] Optional Sentry wiring in the starter (`VITE_SENTRY_DSN`)
- [ ] `setup-github-secrets.sh` helper to push repo/Actions secrets (gated)
- [ ] Preview-channel deploy helper (`firebase hosting:channel:deploy`)
- [ ] Add `systemx bus` inspect/export/archive commands
- [ ] Add quiet-lane detection and stale-lane summary generation

## Future

- [ ] Generation 1.1: evaluate alternate hosts (Cloud Run / static) as a module
- [ ] i18n + PWA optional modules in the playbook
- [ ] Evaluate optional local IPC transport for live agent chat beyond JSONL files
