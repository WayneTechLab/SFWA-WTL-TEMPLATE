# 07 Master Plan

## Delivery target

Deliver **SFWA-WTL-G1 as a local-first template editing and co-management
system**. `.SYSTEMX/LAN` is the operator surface for the current checkout:
visual page editing, backend/source maintenance, tool execution, diagnostics,
provider readiness, mission evidence, and deploy preflight. It is not a public
website route, a hosted admin console, or an unrestricted terminal.

## Canonical outcomes

- The current template can be inspected and edited in place.
- Frontend and backend work use the same allowlist, backup, diff, secret scan,
  confirmation, and post-write verification contract.
- Named tools such as TypeScript, ESLint, tests, Vite, Firebase CLI, GCloud,
  Stripe test tooling, Playwright, and SYSTEMX audits run through one
  cross-platform action registry.
- Every action produces a humanized `planned`, `running`, `done`, `broken`,
  `blocked`, `needs-review`, or `skipped` result plus sanitized JSONL evidence.
- Start-of-day and end-of-day flows recover missions, verify ports, run gates,
  archive logs, and hand off unresolved work without touching other projects.
- The LAN shows provider/emulator status, last preflight/deploy evidence, target
  project, branch, commit, rollback information, and the reason a gate is
  allowed or blocked.
- The public production build contains no LAN source, control API, session
  token, runtime log, or management route.

## Phases that need the most detail

1. **Control-plane contracts:** typed action registry, run result, mission,
   checkpoint, log, deploy-evidence, and backend edit schemas.
2. **Safe tool execution:** Node argument arrays, `shell: false`, OS-neutral
   command resolution, environment allowlists, cancellation, timeouts, and
   sanitized output.
3. **Backend/source editing:** functions, rules, SQL Connect schema/operations,
   provider configuration, AST/symbol discovery, backup/diff/restore, and
   post-write type/security checks.
4. **Provider and emulator operations:** Firebase Auth/Firestore/Storage,
   Firebase SQL Connect/Cloud SQL, GCloud, Drive, GCS, and Stripe test mode.
5. **Evidence and ownership:** start/end day, Agent 0 mission/wave/checkpoint,
   subagent summaries, operation logs, last deploy, and rollback handoff.
6. **Release boundary:** local LAN isolation, public-build leakage tests,
   production deploy authority, and template documentation.

## Dependencies between product, security, and deploy work

```text
repository/tool contracts
          ↓
read-only diagnostics and evidence
          ↓
quality runner and checkpoint state
          ↓
allowlisted frontend/backend source editing
          ↓
emulator/provider preflight
          ↓
deploy evidence and explicit handoff
          ↓
existing .SYSTEMX deploy authority
```

No later stage may silently bypass an earlier gate. A green Vite preview is
not a green production build; a configured provider is not an authenticated
production target; and an available CLI is not permission to mutate cloud
resources.

## Definition of 100% done

- [ ] Every LAN action is named, typed, cross-platform, allowlisted, and logged.
- [ ] Humanized results distinguish failure, block, review, and completion.
- [ ] Frontend and backend source edits share backup, diff, restore, secret
      scan, confirmation, and verification rules.
- [ ] TypeScript, lint, test, build, audit, SYSTEMX, emulator, and deploy
      preflight results are visible from the local control screen.
- [ ] Start/end-of-day flows create reproducible mission and handoff evidence.
- [ ] Last deploy/preflight evidence includes branch, commit, project, target,
      gates, rollback information, and operator decision.
- [ ] The LAN cannot execute arbitrary shell strings, expose secrets, or bypass
      production deployment authority.
- [ ] The public build and Firebase Hosting output contain no LAN artifacts.

The detailed execution contract is maintained in
[`../../LAN/CONTROL-PLANE-PLAN.md`](../../LAN/CONTROL-PLANE-PLAN.md).

## SYSTEMX LAN builder objective

- Target workspace: current `SFWA-WTL-G1` template checkout, edit in place.
- Builder mode: local-only visual management surface; do not generate a new
  website by default.
- Local runtime: Vite development server plus Firebase Emulator Suite, with a
  loopback LAN service and automatic per-session ports.
- Cloud path: Firebase-first; Firestore/Realtime Database for document and
  realtime use cases, Firebase SQL Connect/Cloud SQL PostgreSQL for relational
  use cases, Cloud Storage for Firebase for web media, and Google Drive/GCS for
  explicitly approved operator documents or archives.
- Authority: the `.SYSTEMX` CLI remains authoritative for setup, quality,
  security, versioning, and deployment.
- Builder source of truth: current repository files plus typed builder
  contracts and sanitized evidence; no hidden database-only mutations.

## Current builder checkpoint

- [x] Wave 0 contracts, current-repo importer, public-build boundary, and
      loopback port/session ownership are implemented.
- [x] Wave 1 LAN/Vite current-template workspace with page/component/token/KIT
      and provider inventory is implemented.
- [x] Wave 2 guarded local-edit vertical slice: source loader/saver, page
      metadata, typed node-tree fixtures, CMS/CRM records, user fixtures,
      backups, confirmation, and JSONL operation evidence.
- [x] Wave 2 module registry and inventory-only existing-project ingest:
      responsive component metadata, standardized export, safe project scan,
      review manifest, and no-write bridge boundary.
- [x] LAN workspace shell v2: compact top/bottom command bars, resizable and
      persisted side panels, grouped inspector tabs, canvas-width protection,
      responsive focus mode, and zero-overlap browser geometry validation.
- [ ] Wave 3 Firebase Emulator Suite detail cards and emulator-backed data
      adapters.
- [ ] Wave 4 SQL Connect/Cloud SQL relational adapter and source-to-node
      round-trip writer.

## Builder definition of 100% done

- [ ] LAN session starts with safe automatic ports and records ownership.
- [ ] LAN session ends without stopping other local projects.
- [x] Current routes, pages, components, tokens, collections, assets, and
      provider health are inspectable.
- [x] One existing page/source file can be edited locally through a backed-up,
      confirmed operation and previewed without generating a replacement site.
- [ ] Full source-to-node round-trip generation and restore UI are complete.
- [ ] Reviewed ingest manifests can produce an operator-approved adapter plan
      and backup-first SYSTEMX bridge installation.
- [ ] Provider adapters distinguish Firestore, Realtime Database, SQL Connect,
      Cloud Storage, Drive, and GCS by capability and security boundary.
- [ ] Emulator-first tests pass without contacting production.
- [ ] LAN/build isolation proves the builder cannot enter `dist` or Firebase
      Hosting output.
- [ ] Deploy remains preflight-first and uses the existing `.SYSTEMX` controls.

Detailed architecture and wave gates:
[`../../LAN/BUILDER-SYSTEM-PLAN.md`](../../LAN/BUILDER-SYSTEM-PLAN.md).
