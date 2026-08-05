# .SYSTEMX LAN — Local Builder and Control Surface

`.SYSTEMX/LAN` is the local-only control plane for editing the current
checkout, previewing it through Vite and Firebase Emulator Suite, and checking
that the local project is synchronized with its Firebase and Google Cloud
configuration.

It is not a second public website, an admin route inside the product app, or a
replacement for the Firebase CLI. The LAN surface is a loopback tool that
helps an operator work on this repository safely.

Start the current-template builder session:

```bash
npm run systemx:lan
```

Open:

```text
http://127.0.0.1:7331/
```

When Vite is running, the same dashboard is also available through the dev-only
Vite bridge:

```text
http://127.0.0.1:5173/__systemx/
```

To start the public app and LAN shell together:

```bash
npm run dev:systemx
```

`dev:systemx` starts at app port `5173` and LAN port `7331`, then moves to the
next free ports when another local project already owns them. This keeps
SYSTEMX from closing or hijacking unrelated development servers.

The G1 builder can inspect controller health, the active Vite app, git state,
routes, provider plans, and important builder files. It also supports guarded
local edits: page metadata, typed local node-tree models, CMS/CRM fixture
records, local user fixtures, and allowlisted source files. Source writes
require a backup, the per-session token, secret-marker checks, and the exact
`SAVE LOCAL CHANGE` confirmation. Cloud writes remain a separate authenticated
and preflight-gated capability.

## Operating contract

```text
Current repository checkout
        │
        ├── public app source          → root src/ and required root config
        ├── .SYSTEMX/LAN/Builder       → local builder source and contracts
        ├── .SYSTEMX/LAN/Temp          → ignored session/runtime state
        ├── .SYSTEMX/LAN/Backup        → ignored pre-write snapshots
        └── .SYSTEMX/LAN/Files         → ignored operator imports/exports

Vite development app                   → loopback, usually 5173
Firebase Emulator Suite                → loopback, discovered ports
.SYSTEMX LAN control service           → loopback, discovered port
Vite /__systemx bridge                 → dev-only proxy to LAN
Firebase Hosting deploy                → root dist/ only
```

The builder target is `current-repo`. Its primary job is to inspect and edit
this template in place. It must not silently scaffold a separate website,
copy the LAN dashboard into `public/`, import LAN code into the product router,
or add LAN files to `dist/`.

## Local sessions

The start-of-day and end-of-day commands own the local session lifecycle:

1. discover an unused port from the approved range;
2. verify that an existing listener is a SYSTEMX-owned process before reuse or
   shutdown;
3. start Vite, the LAN service, and requested emulators with explicit child
   process arguments;
4. write a sanitized session record to ignored
   `.SYSTEMX/state/local-session.json`;
5. expose the active URLs in the menu, doctor output, and operation log;
6. stop only processes recorded by that session and verify the ports are free.

The end-of-day command must never kill a process merely because it happens to
be listening on a familiar port. This protects other local projects.

## Builder surfaces

The current local builder includes safe, reviewable local surfaces:

- current repository and route/page inventory;
- page, layout, component, and design-token inspection;
- visual preview against the running Vite app;
- content/data model inspection;
- Firebase Emulator Suite status;
- provider health and sync status;
- backup, validation, operation evidence, and local rollback material before a
  write;
- page metadata, node-tree module, local CMS/CRM, and local user fixture edits;
- an allowlisted source editor for the current React/Vite app;
- explicit publish preflight through the existing `.SYSTEMX` deploy command.

The next waves add emulator-backed persistence and provider adapters. The
current UI does not silently write production Firebase, SQL Connect, Google
Drive/GCS, or Stripe data.

The canvas is a projection of the current template. It is not a license to
rewrite arbitrary source files or to manufacture a new product without an
operator-selected target and evidence trail.

## Co-management control plane

The LAN is also the local backend for the backend: it is the planned home for
named TypeScript, lint, test, build, audit, emulator, provider-preflight, and
deploy-evidence actions. It reports humanized `done`, `broken`, `blocked`, and
`needs-review` states, keeps sanitized run logs, and ties Agent 0 missions and
subagent handoffs to start/end-of-day checkpoints.

The control plane may edit backend functions, rules, SQL Connect files, and
provider configuration only after each file class has its own allowlist,
validator, backup, diff, secret scan, exact confirmation, and post-write
quality gate. It will not expose an arbitrary shell endpoint or production
credentials in the browser.

Read the execution contract in
[`CONTROL-PLANE-PLAN.md`](CONTROL-PLANE-PLAN.md).

## Designer layout

The visual builder uses a viewport-locked editor shell: compact top command
bar, left structure rail and panel, center Vite canvas, right inspector panel
and grouped rail, and a bottom application bar with an on-demand Evidence
drawer. The side panels are docked grid tracks, not floating overlays. They
can be hidden independently or resized with mouse, touch, or keyboard; the
selected widths and active tabs persist locally.

The right inspector consolidates its tools into four groups:

- **Design:** Style and Settings;
- **Data:** CMS and Users;
- **Build:** controlled Code and Cloud/provider readiness;
- **Ops:** Agent 0, MCP, and quality/deployment Gates.

When the workspace cannot preserve the minimum canvas width, opening one heavy
panel closes the opposite panel. At phone widths, a panel uses focus mode and
replaces the canvas until the operator returns. The bottom application bar is
a dedicated editor row and never covers the preview.

The application bar centers quick breakpoint icons, the grouped device
selector, exact pixel width, and Fit mode for the actual preview iframe. Its
left side opens Evidence as a drawer; its right side controls Inspect/Interact
mode and shows the selected route, source file, and DOM path. The selector
includes desktop/laptop, Apple iOS/iPadOS, and Android phone/tablet lanes. The
selected device, custom width, inspection mode, and Evidence state persist
only as non-secret local layout preferences.

Through the same-origin Vite bridge, click any rendered element to select it.
Right-click exposes parent selection, mapped source, Navigator, and staging as
a reusable module or component. Header, footer, page menu, help desk, and
accessibility controls carry source metadata; normal page content resolves
through its route model. Turn Inspect off to exercise links and forms normally.
Direct LAN-port use remains read-only for iframe inspection because the app is
on a different origin. Source hints are emitted only in Vite development; the
mandatory post-build isolation scan rejects them from production `dist`.

Selecting a safe leaf-text element opens the Settings text field automatically.
The operator can preview a DOM-only change, revert it, open the mapped source,
or type `SAVE TEXT CHANGE` to persist one unambiguous source occurrence through
the existing backup/secret-scan/atomic-write gate. The live Navigator and
Components panel retain the same selected target and stack location. Nested
elements and ambiguous or unmapped source text fail closed to the controlled
source editor.

See
[`WEBFLOW-STYLE-DESIGNER.md`](WEBFLOW-STYLE-DESIGNER.md) for the panel contract,
workspace map, route rules, and acceptance checks. The supporting 56-source
official documentation review is in
[`WEB-BUILDER-UX-RESEARCH.md`](WEB-BUILDER-UX-RESEARCH.md).

## Directory rules

Committed local-control source belongs under `Builder/` and its contracts.
Runtime state, temporary imports, generated previews, and backups belong under
`Temp/`, `Files/`, and `Backup/` and remain ignored. The product's required
root files (`package.json`, `vite.config.ts`, `firebase.json`, `src/`, and
`dist/`) stay at the repository root because Vite, Firebase, TypeScript, and
their tooling require those standard entry points.

Read the implementation roadmap in
[`BUILDER-SYSTEM-PLAN.md`](./BUILDER-SYSTEM-PLAN.md) before adding a builder
feature.

The builder rails are independently docked. Use the chevron at the top of the
left rail or right rail to hide that panel; the central preview immediately
reclaims the column width. Selecting a tool on a hidden side reopens only that
side. Drag the slim divider beside a panel to resize it, or focus the divider
and press the left/right arrow keys. At narrow desktop widths, panel switching
protects the canvas budget instead of placing a menu over the editor.

The right toolbar chooses the inspector group; the tab row inside the open
inspector chooses the tool in that group. The context row retains `← Canvas`
and a collapse control. Clicking canvas chrome outside the preview, using
`← Canvas`, pressing Escape, or launching Preview collapses the active
inspector. Clicking a preview element retains or opens its Settings context.

The layer tree and page-model inspector live in a bottom canvas dock behind
the `Layers` control. The dock starts closed in `#canvas` so the running Vite
preview owns the center plane. Opening `Navigator` or pressing `Layers` shows
the page model tools; opening a right-side inspector closes that dock again.

## Reusable components and project ingest

Open the **Components** panel to inspect detected source components such as
navigation and footer files. Select a canvas node, choose its source (or keep
the local canvas model), add tags and slots, choose `fluid`, `contained`, or
`fixed` width behavior, and type `SAVE MODULE`. The result is a local
component-registry record that can be exported as
`systemx-component` JSON. It is a contract for the template; it is not a
production CMS publish operation.

The same panel provides **Inventory before install**. A staff member can type
an existing local project path and type `SCAN EXISTING PROJECT`. SYSTEMX scans
only metadata and safe file names for framework, routes, components, styles,
providers, and tooling. Secret files are not opened. The output is a review
manifest in ignored `.SYSTEMX/LAN/Temp/ingest/<run-id>/manifest.json` with
`detected`, `needs-review`, and `blocked` findings. Installing a SYSTEMX
bridge remains a separate, backup-first operation and is not implemented by
the inventory button.
