# Wiki source

These Markdown files are the source for the
[**GitHub Wiki**](https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/wiki).

This public wiki belongs to **SFWA-WTL-G1**: Standard Firebase Web App,
Wayne Tech Lab Generation 1,
Wayne Tech Lab Template. It is provided by **Wayne Tech Lab LLC** and was
prepared from the original
[WayneTechLab/webapp-stack-g1](https://github.com/WayneTechLab/webapp-stack-g1)
template source.

The template and `.SYSTEMX` are subject to daily change. Fork, clone, or copy at
your own risk. Ask for attribution/credit if this material is used as the base
for another project. Subagents multiply token and tool usage; see the agent
coordination contract before parallel work.

GitHub wikis are backed by a **separate git repository**
(`WayneTechLab/SFWA-WTL-TEMPLATE.wiki.git`). Keeping the pages here, in the main
repo, lets us version and review them alongside the code; they are then published
to the wiki repo.

## Pages

| File | Wiki page |
| --- | --- |
| `Home.md` | Landing page |
| `Quick-Start.md` | Quick Start |
| `WTL-Standard-Setup-Guide.md` | Idea-to-production operator guide |
| `SYSTEMX-Standard.md` | SYSTEMX Standard white paper |
| `SYSTEMX-*.md` | SYSTEMX Standard supporting pages |
| `SYSTEMX-Agent-0-Operating-Model.md` | Dedicated Agent 0 operating page |
| `SYSTEMX-How-Subagents-Work.md` | Dedicated subagent operating page |
| `SYSTEMX-Starter-Prompts-and-Smart-Routing.md` | Starter prompts and token-saving routing guide |
| `One-Line-Install.md` | Single-command macOS, Windows, Linux, and WSL2 setup |
| `Platform-Matrix.md` | Multi-OS and architecture support contract |
| `Linux-Setup.md` | Ubuntu, Debian, generic Linux, and WSL2 setup |
| `Windows-Setup.md` | Windows 11 x64/ARM64 setup |
| `Architecture-and-Stack.md` | Architecture & Stack |
| `Project-Structure.md` | Project Structure |
| `SYSTEMX-Root-and-Folder-Standard.md` | Root boundary and `.SYSTEMX` folder standard |
| `Environment-Variables.md` | Environment Variables |
| `Security.md` | Security |
| `Setup-Playbook.md` | Setup Playbook + Unified Setup intake |
| `Deployment.md` | Deployment |
| `Testing-and-QA.md` | Testing & QA |
| `GitHub-Authors-and-Contribution-Notes.md` | Contributor, follow, and repo-collaboration notes |
| `SYSTEMX-WEBPORTAL.md` | Local-only SYSTEMX LAN dashboard contract |
| `FAQ.md` | FAQ |
| `_Sidebar.md` | Right-hand navigation |
| `_Footer.md` | Page footer |

## Non-wiki `.SYSTEMX` references

For AI-assisted or parallel work, read `.SYSTEMX/docs/AGENT-OPERATIONS.md` and
claim a lane in `.SYSTEMX/status/AGENTS.md` before editing.

These are intentionally kept in `.SYSTEMX` instead of duplicated into wiki pages:

- `.SYSTEMX/Unified-Setup-Process/README.md`
- `.SYSTEMX/Unified-Setup-Process/intake/`
- `.SYSTEMX/Unified-Setup-Process/standards/WSG-Account-Levels.md`
- `.SYSTEMX/Unified-Setup-Process/standards/Unified-Login.md`
- `.SYSTEMX/scripts/deploy.sh`

## Publishing to the GitHub Wiki

> The wiki must be enabled once: repo **Settings → Features → Wikis**, then create
> the first page in the UI so the `.wiki.git` repo exists.

```bash
# From the repo root:
git clone https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE.wiki.git /tmp/wsg1-wiki
cp wiki/*.md /tmp/wsg1-wiki/
cd /tmp/wsg1-wiki
git add -A
git commit -m "docs: sync wiki from main repo"
git push
```

After the first publish, re-run the `cp` + commit + push whenever these files
change.
