# SYSTEMX AI Directory

`.SYSTEMX/AI` is the default home for AI, coding-agent, subagent, prompt,
routing, and adapter-governance documentation in SFWA-WTL-G1.

The repository still keeps a small number of adapter files at their vendor
required paths. Those files are launch surfaces, not the source of truth. The
source of truth is:

- Root `AGENTS.md` for canonical repository instructions.
- `.SYSTEMX/docs/AGENT-OPERATIONS.md` for Agent 0 and subagent operating rules.
- `.SYSTEMX/docs/MCP-AND-AGENTS.md` for MCP and agent tooling.
- `.SYSTEMX/status/AGENTS.md` for active lane ownership and handoffs.
- `.SYSTEMX/AI/AGENT-FILE-MAP.md` for adapter placement and drift rules.

## Root boundary

New AI documentation should be created under `.SYSTEMX/AI`, `.SYSTEMX/docs`, or
`.SYSTEMX/status` unless an external tool requires a root-level file name.

Do not create misleading aliases such as `CODEX.md`, `CoPilot.md`, or `GPT.md`.
They are not recognized repository standards for this template. Codex uses
`AGENTS.md`, GitHub Copilot uses `.github/copilot-instructions.md`, and Gemini
CLI uses `GEMINI.md`.

## Subagent warning

Subagents multiply token, tool, API, and review usage. Use bounded lanes,
message-bus checkpoints, quiet-lane detection, and Agent 0 verification before
merging work back to `main`.
