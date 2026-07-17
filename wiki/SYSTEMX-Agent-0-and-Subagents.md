# How Agent 0 Works With Subagents

Agent 0 is a coordination pattern, not a privileged process in the current
template. One accountable lead—human or a supervised primary agent—breaks work
into bounded lanes, assigns clear ownership, collects evidence, and decides what
may be merged or deployed. Subagents are assistants with restricted scopes; they
do not inherit release authority.

## Operating rules

- Give every subagent a goal, permitted files/tools, time or token budget, and
  explicit completion evidence.
- Keep lanes disjoint. Do not let multiple agents edit the same surface without
  a coordinator and merge plan.
- Do not provide production secrets, broad credentials, or unnecessary customer
  data to agents or their tools.
- Treat all output as a proposed change. Independently review code, commands,
  documentation, and security implications.
- Require each lane to report scope, files changed, checks run, results,
  unresolved risks, and next action.
- Keep the human operator responsible for access, cost, compliance, Git history,
  and release approval.

Subagents multiply token use and tool calls. They can also multiply mistakes if
the coordinator lacks a clear plan. Use them where parallel research or isolated
implementation provides real value; do not use them as a substitute for an
engineering owner. The project’s intake, status, and runbook files should be the
durable record—not ephemeral agent conversation.
