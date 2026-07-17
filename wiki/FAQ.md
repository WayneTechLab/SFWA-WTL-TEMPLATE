# FAQ

## What does SFWA-WTL-G1 mean?

Standard Firebase Web App, Wayne Tech Lab Generation 1.

## Is this production-ready without review?

No. It is a powerful, frequently changing base provided as-is. Review and test
all code, credentials, rules, dependencies, billing, and provider settings.

## Which Node version is required?

SYSTEMX and the web app use Node.js 24 LTS with npm 11 or newer. The Firebase
Functions playbook retains Node.js 22 because that is the runtime currently
documented by Firebase; Google Cloud Run functions can be evaluated separately.

## Does Windows require WSL?

No. Windows 11 x64 and ARM64 use PowerShell 7 and native `.ps1`/`.cmd`
launchers.

## Why is a Windows ARM64 tool marked emulated?

Some vendors do not publish an ARM64 Windows build. SYSTEMX identifies the x64
emulation path and requires explicit verification instead of calling it native.

## Are MCP servers enabled by default?

No. They are opt-in, least-privilege, and intended for local or staging work.

## Can I use this as a base?

Yes under the MIT License. Retain the license; Wayne Tech Lab LLC also asks for
appropriate credit when the template or `.SYSTEMX` is a substantial base.
