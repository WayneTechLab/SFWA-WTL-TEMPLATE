# Security

SFWA-WTL-G1 is a template, not a completed security program. Every downstream
project must own its threat model, Firebase rules, IAM, billing controls,
dependency updates, monitoring, backups, legal review, and incident response.

## Required controls

- Never commit `.env.local`, service-account JSON, private keys, refresh tokens,
  legacy Firebase tokens, Stripe secret keys, or production exports.
- Use local interactive login for developers and OIDC or Application Default
  Credentials for CI.
- Use least privilege and target local emulators or staging before production.
- Keep optional MCP servers disabled until a bounded task requires them.
- Run `npm run ci:security`, `npm audit --audit-level=high`, and CodeQL.
- Review Firestore and Storage rules before every release.

SYSTEMX state is non-secret and ignored. Logs are sanitized JSONL, rotate at
5 MB, redact credential-shaped values, and never dump the environment. Windows
uses NTFS ACLs for protected local files; POSIX systems use owner-only mode.

Report vulnerabilities through GitHub private vulnerability reporting rather
than a public issue.
