# SFWA-WTL-G1 Agent Map

This file is the canonical repository instruction map for coding agents.

- Preserve the cross-platform contract: macOS Apple Silicon, Windows 11 x64,
  and Windows 11 ARM64. Ubuntu/WSL is experimental.
- Put shared behavior in the Node.js CLI under `.SYSTEMX`; shell files are
  compatibility launchers only.
- Use argument-array child processes. Never interpolate secrets into commands,
  logs, setup packets, commits, or agent prompts.
- Run `npm run ci:all` and `npm run deploy -- --target hosting --preflight`
  before publishing production-impacting changes.
- Keep `package.json`, `.SYSTEMX/version/`, starter files, setup-packet schema,
  documentation, and agent adapters synchronized with `npm run sync:system`.
- Read `.SYSTEMX/docs/AGENT-OPERATIONS.md` before delegating work. Subagents
  multiply token, tool, and review usage; assign bounded lanes and verify every
  result in the parent session.
- Do not make production deployments, rotate credentials, or change billing
  without explicit operator authorization.

Product: **SFWA-WTL-G1 — Standard Firebase Web App, Wayne Tech Lab Generation
1**, provided by Wayne Tech Lab LLC under the MIT License and without warranty.
