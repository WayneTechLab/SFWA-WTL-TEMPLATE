# Platform Matrix

| Capability | macOS ARM64 | Windows x64 | Windows ARM64 | Ubuntu/WSL |
| --- | --- | --- | --- | --- |
| Status | Supported | Supported | Supported with gates | Experimental |
| Shell | Zsh/Bash | PowerShell 7 | PowerShell 7 | Bash |
| Node 24 | Native | Native | Native | Native/vendor |
| Git / GitHub CLI | Native | Native | Native | Native |
| Firebase CLI | Native Node | Native Node | Native Node | Native Node |
| Google Cloud CLI | Native | x64 native | x64 emulation gate | Vendor package |
| Stripe CLI | Native | x64 native | x64 emulation gate | Vendor package |
| CI runner | `macos-15` | `windows-2025` | `windows-11-arm` | Non-blocking |

Windows 10, Intel macOS, 32-bit Windows, and unlisted Linux distributions are
not supported release targets. A support claim requires setup checks, unit
tests, security checks, build, packet round trip, native launcher smoke, and
deployment preflight to pass on the corresponding GitHub-hosted runner.
