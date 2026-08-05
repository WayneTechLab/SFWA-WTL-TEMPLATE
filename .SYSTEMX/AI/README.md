# SYSTEMX AI Standard

This folder is the generic AI operating layer for SFWA-WTL TEMPLATE. It captures the
reusable lessons from high-automation project work without carrying private
product logic, private vendor names, or customer-specific workflows into the
public template.

## Files

| File | Purpose |
| --- | --- |
| `AGENT-MESH-STANDARD.md` | Agent 0, subagent lanes, message bus, checkpoints, memory, and archive rules. |
| `TOOLCALLING-AND-BROWSER-AUTOMATION.md` | Playwright, Chrome DevTools MCP, local browser control, and screen fallback rules. |
| `EXTERNAL-SERVICE-CONNECTOR-STANDARD.md` | Generic adapter pattern for third-party services and vendor tools. |
| `RECOVERY-PLAYBOOK.md` | Popup, permission, auth, port, process, and apply/blocker recovery paths. |
| `agent-mesh.schema.json` | Minimal machine-readable schema for agent messages and checkpoints. |

## Core Rule

Agent systems in this template must be reviewable, bounded, and local-first.
Subagents may help research, inspect, test, and propose changes, but they do not
become hidden memory, silent deploy authority, or unbounded tool callers.

Use Agent 0 as the coordinator. Use subagents as scoped lanes. Use scripts and
MCP/browser tools as allowlisted capabilities with logs, evidence, and a clear
deny path.
