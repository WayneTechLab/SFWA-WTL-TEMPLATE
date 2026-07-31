# Changelog

All notable deploys are appended here automatically by
`.SYSTEMX/scripts/deploy.sh` (and version bumps by
`.SYSTEMX/scripts/version-bump.sh`).

Format: each deploy adds a timestamped section with the version and the files
that changed in that run.

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
