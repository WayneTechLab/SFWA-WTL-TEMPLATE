#!/usr/bin/env bash
# Lightweight editor/CI diagnostic helper.
set -euo pipefail
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"
if [[ "${1:-}" == "--clear" ]]; then
  rm -rf node_modules/.cache .vite 2>/dev/null || true
  echo "Local Vite/cache artifacts cleared; reload your editor if needed."
fi
echo "== TypeScript =="
npm run -s typecheck --if-present
echo "== ESLint =="
npm run -s lint --if-present
echo "Diagnostics passed."
