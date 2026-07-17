# Platform Matrix

| Capability | macOS ARM64 | Windows x64 | Windows ARM64 | Ubuntu/WSL |
| --- | --- | --- | --- | --- |
| Support | Required | Required | Required | Experimental |
| Shell | Zsh/Bash | PowerShell 7 | PowerShell 7 | Bash |
| Node.js 24 | Native | Native | Native | Native/vendor package |
| Git / GitHub CLI | Native | Native | Native | Native |
| Firebase CLI | Native Node package | Native Node package | Native Node package | Native Node package |
| Google Cloud CLI | Native | Native x64 | x64 emulation gate | Vendor package |
| Stripe CLI | Native | Native x64 | x64 emulation gate | Vendor package |
| CI release gate | `macos-15` | `windows-2025` | `windows-11-arm` | Non-blocking |

The machine-readable contract is
[`../platforms/support-matrix.json`](../platforms/support-matrix.json). A support
claim means setup checks, tests, build, packet round trip, native launcher,
doctor, and deployment preflight all pass on the platform's hosted runner.

Windows 10 is excluded because its normal support lifecycle has ended. Other
macOS architectures, 32-bit Windows, and non-Ubuntu Linux distributions are
unsupported until explicitly added and tested.
