# How the SYSTEMX Menu Works

SYSTEMX is a shared Node.js control panel for common operator workflows. Run it
from the repository root:

```bash
npm run wtl:menu
```

It groups the system into these operator areas:

| Area | Operator purpose |
| --- | --- |
| Start into Production | Guided setup and optional release |
| Setup & Tooling | Bootstrap, auth, packets, Firebase, hooks |
| Deploy | Preflight and targeted Firebase deployment actions |
| Quality Checks | Type, lint, tests, audit, and security-related checks |
| Version | Version and changelog maintenance |
| Firebase | Login, projects, emulator, indexes, and setup helpers |
| Git | Status, pull, commit, and push helpers |
| Dev & App | Install, development server, build, and preview |
| System | Sync, diagnostics, validation, and security checks |
| Update | Repository update and release-oriented actions |

The menu is a launcher, not an authorization system. Read the command it is
about to execute, verify the active project and account, and do not provide
secrets to a prompt unless you understand where they will be stored. A menu
choice may invoke vendor CLIs that create cost, change cloud resources, or
publish a release.

The CLI detects the active operating system and architecture and exposes native
PowerShell and Windows Command Prompt launchers in addition to shell launchers.
See [Platform Matrix](Platform-Matrix) for supported and experimental lanes.
