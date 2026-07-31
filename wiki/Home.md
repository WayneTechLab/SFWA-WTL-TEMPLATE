# S.F.W.A. Template Wiki

<p align="center">
  <a href="https://WayneTechLab.com">
    <img src="https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/docs/assets/wayne-tech-lab-logo.png" alt="Wayne Tech Lab LLC" width="720">
  </a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/WayneTechLab/SFWA-WTL-TEMPLATE/main/docs/assets/systemx-logo.svg" alt="S.F.W.A. Template - .SYSTEMX Forever WebApp - A Product Provided by Wayne Tech Lab LLC. - Version. Generation 1" width="720">
</p>

Welcome to the public **S.F.W.A. Template — ".SYSTEMX Forever WebApp"** wiki from
[Wayne Tech Lab LLC](https://WayneTechLab.com). This is the deep-dive home for a
repeatable Firebase web app standard built around React, TypeScript, Vite,
Firebase, local verification, Playwright, MCP/browser tooling, and SYSTEMX.

## Product Label

**S.F.W.A. Template**<br>
**".SYSTEMX Forever WebApp"**<br>
**A Product Provided by Wayne Tech Lab LLC.**<br>
**Version. Generation 1**

[Use The Template](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/generate) |
[Repository](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE) |
[WayneTechLab.com](https://WayneTechLab.com) |
[Update Log](Update-Log)

Current public release: **v4.0.0** — SYSTEMX KIT unification, Standard MD Kit,
and SLC menu bridge.

## Start Here

| If you want to... | Go to |
| --- | --- |
| Get a running app in minutes | **[Quick Start](Quick-Start)** |
| Run a staff/builder work session from screen to screen | **[Staff Runbook & Builder Use Cases](SYSTEMX-Staff-Runbook-and-Builder-Use-Cases)** |
| Follow the full operator order from 0 to handoff | **[SYSTEMX 0 → Production Guide](SYSTEMX-0-to-Production-Guide)** |
| Learn every supported operator command | **[SYSTEMX CLI & Tooling Reference](SYSTEMX-CLI-and-Tooling-Reference)** |
| Use an LLM, CLI, SDK, MCP, and browser tools together | **[LLM Interface & Tool Routing](SYSTEMX-LLM-Interface-and-Tool-Routing)** |
| Use `.SYSTEMX` from idea to production | **[User Ingest & Production Setup](User-Ingest-and-Production-Setup)** |
| Point an LLM at approved production assets | **[Production Kit](Production-Kit)** |
| Produce PDF brand guidelines from approved logos | **[Brand Guide Kit](Brand-Guide-Kit)** |
| Use the unified Standard/Stock Markdown packet catalog | **[Standard MD Kit](Standard-MD-Kit)** |
| Understand the stack | **[Architecture & Stack](Architecture-and-Stack)** |
| Learn the AI and browser tooling standard | **[Agent Mesh & Tooling Standard](Agent-Mesh-and-Tooling-Standard)** |
| Know where everything lives | **[Project Structure](Project-Structure)** |
| Configure Firebase and env files | **[Environment Variables](Environment-Variables)** |
| Ship safely | **[Security](Security)** |
| Deploy to Firebase | **[Deployment](Deployment)** |
| Test locally | **[Testing & QA](Testing-and-QA)** |
| Track template changes | **[Update Log](Update-Log)** |

## Idea To Production

```mermaid
flowchart LR
    Idea["0 · Idea / constraints"] --> Ready["1 · Workstation readiness"]
    Ready --> Intake["2 · Intake + project plan"]
    Intake --> Configure["3 · Firebase + local environment"]
    Configure --> Build["4 · Bounded implementation lanes"]
    Build --> Verify["5 · Local QA, emulators, browser evidence"]
    Verify --> Deploy["6 · Preflight + explicit Firebase deploy"]
    Deploy --> Handoff["7 · Handoff, archive, operations"]
```

For the screen-by-screen staff sequence, evidence ledger, stop rules, and
builder use cases, use the
[Staff Runbook & Builder Use Cases](SYSTEMX-Staff-Runbook-and-Builder-Use-Cases).

## SYSTEMX Operating Model

```mermaid
flowchart TD
    Human["Operator"] --> Agent0["Agent 0"]
    Agent0 --> Menu["SYSTEMX Menu"]
    Agent0 --> Lanes["Subagent Lanes"]
    Menu --> Scripts["Scripts"]
    Scripts --> Browser["Playwright / Chrome DevTools MCP"]
    Scripts --> Firebase["Firebase / GCloud"]
    Lanes --> Evidence["Evidence + Checkpoints"]
    Evidence --> Archive["Archive + Update Log"]
```

## Who Benefits

| Beneficiary | Benefit |
| --- | --- |
| Solo builders | A working Firebase-ready base instead of a blank repo. |
| Small teams | One setup, one menu, one doc standard, one local verification path. |
| Agencies | A repeatable client-project base with clearer handoff. |
| AI-assisted developers | Agent 0 and subagents get bounded lanes and evidence rules. |
| Operators | Local scripts and menu flows before production deploys. |
| Security reviewers | Predictable places for env guidance, rules, warnings, and checks. |

## Ground Rules

This template is provided as-is. Fork, clone, and copy it at your own risk. You
are responsible for your own security review, credentials, service terms,
privacy obligations, accessibility, compliance, testing, and production support.

The public template stays generic. Project-specific vendors, customer workflows,
private dashboard steps, and proprietary connector logic belong in the project
created from the template.
