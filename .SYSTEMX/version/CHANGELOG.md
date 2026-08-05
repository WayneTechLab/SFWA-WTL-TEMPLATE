# Changelog

All notable deploys are appended here automatically by
`.SYSTEMX/scripts/deploy.sh` (and version bumps by
`.SYSTEMX/scripts/version-bump.sh`).

Format: each deploy adds a timestamped section with the version and the files
that changed in that run.

## 2.4.0 - 2026-08-05

- Moved responsive controls into a centered editor application bar outside the
  preview and added persisted desktop, tablet, iOS, Android, exact-width, and
  Fit iframe preview modes.
- Converted the always-visible Evidence row into a button-controlled drawer.
- Added same-origin live preview inspection: hover/click selection,
  route/source/DOM location, right-click parent and source actions, Navigator
  handoff, and review-gated staging as a reusable module or component.
- Added source metadata to the current and starter app shells for header,
  footer, page navigation, help desk, and accessibility controls in development
  only.
- Added a mandatory post-build LAN isolation scan for local and CI builds.
- Added selected-text editing for safe leaf elements with DOM-only Preview and
  Revert, mapped-source opening, exact-occurrence validation, explicit
  `SAVE TEXT CHANGE`, and reuse of the existing backup/secret-scan/atomic-write
  source gate.
- Synchronized live preview selection across Settings, Navigator hierarchy,
  Components, breadcrumbs, and stack-location feedback.
- Promoted `.SYSTEMX/LAN` to the active local current-template builder and
  co-management layer for SFWA-WTL-G1.
- Rebuilt the LAN workspace shell with compact rails, docked resizable panels,
  persisted layout state, four grouped inspector modes, secondary tool tabs,
  automatic canvas-width protection, phone focus mode, and a bottom evidence
  row that cannot overlay the canvas.
- Added a 56-source official builder UX research register covering Webflow,
  Builder.io, Wix Studio, and Framer interaction contracts.
- Added the canvas-first LAN designer contract: left structure dock, center
  Vite preview, right tool rail, right inspector closed by default, and a
  `Layers` bottom dock for layer tree and page-model tools.
- Synchronized README, wiki, master plan, status files, and update log so the
  public template reads as an advanced local SYSTEMX builder rather than only a
  starter app.
- Documented local evidence locations for operations JSONL, backups, ingest
  manifests, component registry exports, owned sessions, and ignored runtime
  logs.
- Preserved the production boundary: LAN remains loopback-only, outside
  `public/`, outside `src/`, outside `dist/`, and subordinate to existing
  `.SYSTEMX` quality/deploy gates.

## 2.3.0 - 2026-07-31

- Added **WTL Brand Guide Standard Template v1.0** under
  `.SYSTEMX/KIT/Brand/`.
- Added `.SYSTEMX/KIT/Brand/SYSTEMX-KIT-INDEX.md` as the SYSTEMX-facing
  operator and LLM entry point for six-page PDF brand-guidelines production.
- Added the wiki Brand Guide Kit page and linked it from README, wiki home,
  sidebar, and wiki page map.
- Added Brand Kit integrity anchors to the SYSTEMX structure check.
- Preserved the kit source contract, examples, prompt ingest files, page
  prompts, preflight scripts, PDF stitching scripts, and checksum records.

## 2.2.0 - 2026-07-31

- Added **Wayne Tech Lab LLC. Master Production Kit v1.0** under
  `.SYSTEMX/KIT/Production/`.
- Added `.SYSTEMX/KIT/README.md`, `.SYSTEMX/KIT/Production/SYSTEMX-KIT-INDEX.md`,
  and the wiki Production Kit page.
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

- Added Wayne Tech Lab and SYSTEMX visual assets for the public README.
- Reworked the README into a website-style landing page with calls to action,
  beneficiary sections, and flow diagrams.
- Added a dedicated wiki update log so README stays focused on onboarding.
- Linked WayneTechLab.com, SYSTEMX AI standards, Playwright, Chrome DevTools MCP,
  setup, deployment, testing, and security documentation from the landing pages.
- Kept the public template generic and free of private project-specific vendor
  logic.
- Replaced the external router dependency with a lightweight local router and
  refreshed the root and starter lockfiles to zero high/critical audit findings.

## 2.0.0 - 2026-07-31

- Removed runner-based workflow automation from the public template.
- Added the `.SYSTEMX/AI` standard for Agent 0, subagents, MCP/browser tooling,
  connector adapters, and recovery playbooks.
- Added local drift checks for SYSTEMX AI standards.
