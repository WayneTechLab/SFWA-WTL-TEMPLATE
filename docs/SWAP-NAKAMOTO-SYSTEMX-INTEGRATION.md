# Swap Nakamoto SYSTEMX Integration

Swap Nakamoto is a derived Wayne Tech Lab application that adopts the
bounded-agent and operational conventions from this template. This note keeps
the integration contract explicit without copying application secrets or
venue credentials into the template.

## Shared conventions

- `main` is the single live branch; short-lived task branches must be merged or
  closed after review.
- Agent work is split into bounded lanes with explicit file scope, least
  privilege, finite timeouts, and a required parent-agent report-back.
- Optional MCP or remote tooling is opt-in, read-only by default, and never
  receives production credentials through prompts, logs, packets, or source
  control.
- Local runtime state is non-secret and ignored; operational logs are sanitized
  JSONL with rotation and no credential material.
- Firebase stores authenticated profile metadata only. Venue API keys, private
  keys, and signing material remain in the platform Data Protection Keychain.

## Trading-specific boundary

The application adds a governed execution boundary around these conventions:

- market-data agents can read venue data;
- strategy agents can propose and simulate;
- Guardian and Policy can veto;
- only the governed execution path can submit an order;
- Ledger and Harmony reconcile after execution.

The Codex CLI broker is a bounded local tool, not a venue adapter. It uses an
allowlist, sanitized output, and single-flight execution. Live orders require a
valid owner authorization lease, an explicit bankroll pool, current venue
health, sufficient balance, and all non-bypassable safety checks.

See the [MIT license](../LICENSE) and retain Wayne Tech Lab attribution in
derived applications.
