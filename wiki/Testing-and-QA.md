# Testing & QA

The baseline ships a Node characterization suite for SYSTEMX LAN, plus
TypeScript, ESLint, build, audit, and security gates. Vitest/Testing Library
and Playwright are optional playbook additions that projects enable when their
application needs them.

> Detailed source:
> [Step 10 — Testing & QA](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/blob/main/.SYSTEMX/Template/steps/10-testing-qa.md).

## What ships in the baseline vs. the playbook

- **Baseline (repo root):** Node characterization tests for the LAN boundary,
  ESLint, TypeScript, and a build gate (`npm test · lint · typecheck · build`).
- **Playbook (Step 10):** adds Vitest, Playwright, and a11y/security audits.

## Unit / component tests (Vitest + Testing Library)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: { environment: 'jsdom', setupFiles: ['./vitest.setup.ts'], globals: true },
})
```

`vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Run them:

```bash
npm run test          # (wire this script to "vitest")
npx vitest run        # after installing the optional Vitest stack
```

## End-to-end tests (Playwright)

```bash
npm install -D @playwright/test
npx playwright install chromium
npx playwright codegen http://127.0.0.1:5173    # use the printed port if it moves
```

SYSTEMX also exposes package shortcuts:

```bash
npm run browser:install
npm run browser:codegen
npm run mcp:chrome
npm run ai:standard:check
```

Use Playwright for repeatable local browser flows and Chrome DevTools MCP for
live browser inspection, console/network evidence, screenshots, and popup
diagnostics. Keep the target on localhost, emulators, or staging by default.

`playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests',
  webServer: { command: 'npm run dev', url: 'http://localhost:5173', reuseExistingServer: true },
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry' },
})
```

Example smoke test (`tests/smoke.spec.ts`):

```ts
import { test, expect } from '@playwright/test'
test('home renders + no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto('/')
  await expect(page).toHaveTitle(/.+/)
  expect(errors, errors.join('\n')).toHaveLength(0)
})
```

## Accessibility & security gates

```bash
npm install -D @axe-core/playwright    # a11y assertions inside e2e
npm audit                              # dependency vulnerabilities
```

## Wiring into local verification

Run the test stages locally before deploy:

```bash
npm run ci:test             # runs the checked-in LAN characterization suite
npm run browser:install
npx playwright test         # after adding a project Playwright suite
npm run ci:security
npm run build
```

## Verification gate

```bash
npm test                 # SYSTEMX LAN characterization green
npx vitest run           # optional component suite
npx playwright test      # optional project e2e suite
```

## Testing rules of thumb

- Use **test-mode** credentials and the **emulator suite** for e2e — never prod
  data.
- Keep a **rules unit test** (`@firebase/rules-unit-testing`) in the suite to
  catch data-exposure regressions.
- Run `npm audit` + secret scanning on every PR.
- Treat e2e fixtures/tokens as secrets — inject through local secret files or
  your chosen deployment platform, not the repo.
- Identify your **critical-path** journeys (auth, core CRUD, checkout) and ensure
  each has e2e coverage.
- If a popup, account prompt, or tool apply dialog blocks automation, record the
  blocker in the SYSTEMX recovery format instead of silently clicking through.
