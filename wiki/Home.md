# SFWA-WTL TEMPLATE — Wiki

Welcome to the **SFWA-WTL TEMPLATE** wiki — the deep-dive home for the
reusable, enterprise-grade blueprint for spinning up **TypeScript + React + Vite +
Firebase + Stripe** web apps the same way, every time.

Provided by **Wayne Tech Lab LLC**. Use at your own risk; review, configure,
secure, and test the template before any production use.

The template is subject to change and modification daily. Fork, clone, or copy
it at your own risk. If you use `.SYSTEMX` or substantial template material as
the base for a project, retain the license and ask for attribution/credit where
appropriate. Subagents are powerful but multiply token, tool, and review usage;
use bounded lanes and the coordinator report-back contract.

This public template was prepared from the original
[WayneTechLab/webapp-stack-g1](https://github.com/WayneTechLab/webapp-stack-g1)
source template and published as
[WayneTechLab/SFWA-WTL-TEMPLATE](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE).

> The repository is **two things at once**: a runnable starter app (the repo root)
> and a full, ordered setup playbook (`.SYSTEMX/Template/`). This wiki documents
> both.

## Start here

| If you want to… | Go to |
| --- | --- |
| Get a running app in minutes | **[Quick Start](Quick-Start)** |
| Use the template and `.SYSTEMX` together from scratch to production | **[User Ingest & Production Setup](User-Ingest-and-Production-Setup)** |
| Understand the tech choices | **[Architecture & Stack](Architecture-and-Stack)** |
| Know where everything lives | **[Project Structure](Project-Structure)** |
| Wire up Firebase / config | **[Environment Variables](Environment-Variables)** |
| Ship safely | **[Security](Security)** |
| Do the full guided build | **[Setup Playbook](Setup-Playbook)** |
| Go live | **[Deployment](Deployment)** |
| Add tests | **[Testing & QA](Testing-and-QA)** |
| Common questions | **[FAQ](FAQ)** |

## What is this?

The template includes the reusable Wayne Tech Lab `.SYSTEMX` operating layer:
setup/bootstrap, governance sync, packet-based instructions, quality and
security gates, deployment tooling, and a shared agent roster for coordinated
human/AI work.

Read [Agent 0 and Subagent Operating Loop](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/blob/main/.SYSTEMX/docs/project/agent-0-subagent-loop.md)
before parallel AI work. This standalone template does not publish or endorse
Networks.Chat or WayneTechLab.com portfolio/business content.

A **portable golden path**. Drop it into any new repository (or click *Use this
template*) and an engineer — or an AI agent — follows the steps in order to stand
up a production-ready web application from a bare machine to a deployed,
monitored, billing-enabled product.

It is intentionally **generic**: no business names, no hard-coded project IDs, no
customer data. Everything project-specific is collected during the **Interview**
step and the first-time intake packet, then injected into generated files.

## Two ways to use it

1. **⚡ Fast start** — the repo root is a runnable app. `npm install && npm run dev`
   and you have a working React + Firebase site (it boots even before Firebase is
   configured).
2. **🧭 Full playbook** — `.SYSTEMX/Unified-Setup-Process/` defines editions,
   intake files, Level 0-5 accounts, and Unified Login; `.SYSTEMX/Template/`
   remains the legacy golden-path detail flow (`steps/00` → `steps/12`).

## The golden rule

> **One step at a time, in order.** Each step states its goal and preconditions,
> prompts for inputs, performs the work, and ends with a **verification gate** you
> must pass before advancing. Later steps depend on artifacts (env vars, project
> IDs, price IDs) produced earlier.

## First-time intake

New projects pause early so the human can fill
`.SYSTEMX/Unified-Setup-Process/intake/*.md`, then re-inject
`06-AI-REINJECTION-PROMPT.md` into the AI/code tooling session.

For the complete operator flow, use **[User Ingest & Production Setup](User-Ingest-and-Production-Setup)**.

## Versioning

`SFWA-WTL TEMPLATE` is the public Standard Firebase Web App Wayne Tech Lab
Template. The underlying stack remains Generation 1.0; bump the generation for a
breaking change to the step order or baseline stack, and patch individual step
files freely.
