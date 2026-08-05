# Update Log

This page is the public-facing update log for S.F.W.A. Template. README is the
landing page; release history belongs here and in `.SYSTEMX/version/CHANGELOG.md`.

## 2.4.0 - 2026-08-05

- Moved responsive preview controls into a centered editor application bar
  outside the canvas, with exact pixel width, named Apple/Android presets, and
  Fit mode.
- Converted Evidence into an on-demand drawer instead of permanent screen
  content.
- Added same-origin live preview inspection with hover/click selection,
  route/source/DOM location, parent selection, source and Navigator actions,
  and review-gated module/component staging.
- Added a mandatory public-build isolation scan; developer source hints remain
  available to LAN in Vite development but are absent from `dist`.
- Added safe selected-text editing with automatic Settings context, local
  Preview/Revert, mapped source opening, explicit guarded save, and one shared
  target across Navigator, Components, breadcrumbs, and the canvas.
- Promoted `.SYSTEMX/LAN` from planning language to the active local
  current-template builder and co-management surface.
- Added the canvas-first LAN designer behavior: left structure dock, center
  Vite preview, right tool rail, closed-by-default inspector, and `Layers`
  bottom dock for page-model work.
- Documented the active local-edit vertical slice: routes/pages, source view
  and save, page metadata, typed node-tree fixtures, CMS/CRM fixtures, user
  fixtures, reusable component registry, and inventory-only existing-project
  ingest.
- Documented LAN evidence and log locations, including local operations JSONL,
  backup snapshots, ingest manifests, component registry exports, and SYSTEMX
  status/update files.
- Synchronized root README, wiki pages, `.SYSTEMX` status docs, and version
  metadata to the advanced SYSTEMX Local Control direction.

## 2.3.0 - 2026-07-31

- Added **WTL Brand Guide Standard Template v1.0** under
  `.SYSTEMX/KIT/Brand/`.
- Added the SYSTEMX-facing Brand Guide Kit index and wiki page.
- Documented the six-page PDF brand-guidelines workflow, prompt-ingest order,
  locked-logo rules, local Python preflight/stitch commands, and LLM entry
  prompt.
- Added Brand Kit anchors to the local structure check.

## 2.2.0 - 2026-07-31

- Added **Wayne Tech Lab LLC. Master Production Kit v1.0** under
  `.SYSTEMX/KIT/Production/`.
- Added `.SYSTEMX/KIT/README.md`, `.SYSTEMX/KIT/Production/SYSTEMX-KIT-INDEX.md`,
  and the wiki [Production Kit](Production-Kit) page.
- Documented dual use: local SYSTEMX production source and standalone GitHub
  folder for LLM/SDK/CLI/MCP/browser-agent consumption.
- Added kit integrity anchors to the SYSTEMX structure check.

## 2.1.1 - 2026-07-31

- Updated the SYSTEMX logo to the exact public product label:
  **S.F.W.A. Template — ".SYSTEMX Forever WebApp" — A Product Provided by Wayne Tech Lab LLC. — Version. Generation 1**.
- Added `docs/assets/systemx-logo.svg` as the deterministic vector master and
  refreshed `docs/assets/systemx-logo.png` as a compatibility render.
- Updated README and wiki home image references, alt text, and product-label copy.

## 2.1.0 - 2026-07-31

- Added Wayne Tech Lab and SYSTEMX visual assets.
- Reworked the README into a public landing page with calls to action, benefit
  sections, and Mermaid diagrams.
- Updated the wiki home page to read like a branded documentation landing page.
- Added this dedicated update log page.
- Linked WayneTechLab.com, SYSTEMX AI standards, Playwright, Chrome DevTools MCP,
  setup, testing, security, deployment, and wiki pages together.
- Kept connector and vendor language generic so private project-specific IP does
  not enter the public template.
- Replaced the external router dependency with a lightweight local router and
  refreshed the root and starter lockfiles to zero high/critical audit findings.

## 2.0.0 - 2026-07-31

- Removed runner-based workflow automation from the base public template.
- Added `.SYSTEMX/AI` as the generic home for Agent 0, subagent lanes, message
  envelopes, browser/MCP tooling, external connector adapters, and recovery
  playbooks.
- Added `npm run ai:standard:check`, `npm run browser:install`,
  `npm run browser:codegen`, and `npm run mcp:chrome`.
- Added the wiki page [Agent Mesh And Tooling Standard](Agent-Mesh-and-Tooling-Standard).
- Published tag `v2.0.0`.

## Log Policy

- Keep this page human-readable and public.
- Put operational detail in `.SYSTEMX/version/CHANGELOG.md`.
- Put deep process documentation in the relevant wiki page.
- Do not store secrets, private customer names, proprietary vendor workflows, or
  paid-service account details in the public update log.
