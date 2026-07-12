# Active Agent Roster

Use this page as the shared source of truth when multiple humans or coding
agents work in the repository. Replace example rows with real handles and
remove stale entries when a lane is complete.

| Lane | Owner | Scope | Status | Last checkpoint |
| --- | --- | --- | --- | --- |
| Coordinator | project owner | integration, generated files, release gate | available | — |
| Setup/docs | unassigned | `.SYSTEMX`, README, wiki, runbooks | available | — |
| App/runtime | unassigned | `src/`, Firebase client behavior | available | — |
| Security/data | unassigned | rules, auth, secrets, deployment config | available | — |
| Verification | unassigned | tests, lint, typecheck, smoke checks | available | — |

## Checkpoint protocol

Workers update their row at start, after a meaningful checkpoint, and at
handoff. Use `IN_PROGRESS.md` for details and `DONE.md` for completed outcomes.
Do not claim a lane that overlaps another active owner without coordinator
approval.
