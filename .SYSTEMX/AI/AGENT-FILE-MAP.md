# Agent File Map

SFWA-WTL-G1 uses `.SYSTEMX` as the default operational root, but some coding
agents and platforms only read instructions from specific repository paths.
Those required adapter files remain in place and are drift-checked by SYSTEMX.

| Path | Type | Keep at root/vendor path? | Reason |
| --- | --- | --- | --- |
| `AGENTS.md` | Canonical instructions | Yes | Codex and many coding agents discover this at repository root. |
| `CLAUDE.md` | Adapter | Yes | Claude Code reads this conventional root file. |
| `GEMINI.md` | Adapter | Yes | Gemini CLI reads this conventional root file. |
| `.github/copilot-instructions.md` | Adapter | Yes | GitHub Copilot expects custom instructions under `.github`. |
| `.cursor/rules/systemx.mdc` | Adapter | Yes | Cursor rules are discovered under `.cursor/rules`. |
| `.windsurf/rules/systemx.md` | Adapter | Yes | Windsurf rules are discovered under `.windsurf/rules`. |
| `.clinerules/systemx.md` | Adapter | Yes | Cline discovers project rules from `.clinerules`. |
| `.continue/rules/systemx.md` | Adapter | Yes | Continue discovers rules from `.continue/rules`. |
| `.junie/AGENTS.md` | Adapter | Yes | Junie discovers repository instructions under `.junie`. |
| `.amazonq/rules/systemx.md` | Adapter | Yes | Amazon Q rules are discovered under `.amazonq/rules`. |
| `.SYSTEMX/AI/*` | Canonical SYSTEMX AI documentation | Yes, under `.SYSTEMX` | Holds AI maps, prompt catalogs, routing notes, and non-vendor docs. |

## Generation rule

`npm run wtl:sync` owns the vendor adapter files. Edit root `AGENTS.md` and
SYSTEMX AI documentation first, then run:

```console
npm run wtl:sync
npm run sync:system:check
```

If a new agent requires a fixed root path, add it to
`.SYSTEMX/lib/agent-adapters.mjs`, document it here, and include it in the
structure and drift checks.

## Default placement rule

- AI operating docs: `.SYSTEMX/AI/`
- Agent runbooks: `.SYSTEMX/docs/`
- Active work lanes: `.SYSTEMX/status/`
- Message bus state: `.SYSTEMX/state/bus/`
- Tool-required adapters: exact vendor paths only
