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
The template has now grown beyond a starter scaffold: `.SYSTEMX/LAN` is the
local-only SYSTEMX Local Control builder for editing and managing the current
checkout while keeping production Firebase Hosting clean.

## Product Label

**S.F.W.A. Template**<br>
**".SYSTEMX Forever WebApp"**<br>
**A Product Provided by Wayne Tech Lab LLC.**<br>
**Version. Generation 1**

[Use The Template](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/generate) |
[Repository](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE) |
[WayneTechLab.com](https://WayneTechLab.com) |
[Update Log](Update-Log)

## Start Here

| If you want to... | Go to |
| --- | --- |
| Get a running app in minutes | **[Quick Start](Quick-Start)** |
| Use `.SYSTEMX` from idea to production | **[User Ingest & Production Setup](User-Ingest-and-Production-Setup)** |
| Open the local builder/control surface | **[SYSTEMX LAN Builder](SYSTEMX-LAN-Builder)** |
| Read the Webflow-class Designer master plan | **[SYSTEMX LAN Webflow Master Plan](SYSTEMX-LAN-Webflow-Master-Plan)** |
| Read local evidence and operation logs | **[SYSTEMX Logs and Evidence](SYSTEMX-Logs-and-Evidence)** |
| Point an LLM at approved production assets | **[Production Kit](Production-Kit)** |
| Produce PDF brand guidelines from approved logos | **[Brand Guide Kit](Brand-Guide-Kit)** |
| Apply the reusable four-corner site navigation standard | **[WTL Site Shell G1](WTL-Site-Shell-G1)** |
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
    Idea["Idea / Brief"] --> Intake["SYSTEMX Intake"]
    Intake --> Setup["Tooling + Firebase Setup"]
    Setup --> Build["React + Vite Build"]
    Build --> Verify["Local QA + Security Checks"]
    Verify --> Deploy["Firebase Deploy"]
    Deploy --> Handoff["Docs + Update Log + Handoff"]
```

## SYSTEMX Operating Model

```mermaid
flowchart TD
    Human["Operator"] --> Agent0["Agent 0"]
    Agent0 --> Menu["SYSTEMX Menu"]
    Agent0 --> Lanes["Subagent Lanes"]
    Menu --> Scripts["Scripts"]
    Menu --> LAN["SYSTEMX LAN Builder"]
    Scripts --> Browser["Playwright / Chrome DevTools MCP"]
    Scripts --> Firebase["Firebase / GCloud"]
    LAN --> Current["Current Checkout"]
    LAN --> Logs["Local Evidence Logs"]
    Lanes --> Evidence["Evidence + Checkpoints"]
    Evidence --> Archive["Archive + Update Log"]
```

## Designer roadmap status

The LAN builder is a working guarded current-template editing surface, not a
finished visual-editor platform. The research-backed Webflow-class roadmap is
maintained as a separate, evidence-gated program. Wave 0 truth, safety,
documentation, and characterization are complete for the research integration;
later capabilities—typed
document graph, command journal, responsive style engine, reusable component
versions, CMS bindings, source round-trip, snapshots, publishing, plugins, and
collaboration—remain planned until their acceptance criteria pass.

Read the [SYSTEMX LAN Webflow Master Plan](SYSTEMX-LAN-Webflow-Master-Plan)
and the repository's [research corpus](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/tree/main/.SYSTEMX/LAN/Research/Webflow).

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
