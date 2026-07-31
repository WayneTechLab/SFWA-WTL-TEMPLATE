# Changelog

All notable changes to SFWA-WTL-G1 are documented here. This project follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and Semantic Versioning.

## [1.2.0] - 2026-07-16

### Added

- Single-line workstation installers for macOS, Windows 11, Ubuntu, Debian,
  WSL2, and apt/dnf Linux compatibility lanes.
- Native Ubuntu 24.04 x64 and ARM64 platform detection, setup packets, tests,
  documentation, and required GitHub-hosted CI jobs.
- Menu-driven post-install setup phase that starts only after user consent.

### Changed

- VS Code, Git, GitHub CLI, Google Cloud CLI, Chrome/Chromium, Node.js 24, and
  pinned Firebase dependencies are installed or verified through OS-native
  package and checksum paths.
- WSL2 installs Linux-native CLIs inside the distribution and integrates with
  VS Code and Chrome on the Windows host.

## [1.1.0] - 2026-07-16

### Added

- Shared cross-platform SYSTEMX Node.js CLI and native PowerShell/CMD launchers.
- Windows 11 x64 and ARM64 setup, diagnostics, packets, quality, and deployment.
- Platform-aware sanitized JSONL logs, local state migration, tests, and docs.
- Canonical `AGENTS.md` with generated adapters for common coding agents.
- GitHub-hosted macOS/Windows CI, experimental Ubuntu smoke checks, and CodeQL.

### Changed

- Product identity to SFWA-WTL-G1, version 1.1.0, and Node.js 24 LTS.
- Firebase CLI is pinned locally for reproducible emulation and deployment.

## [1.0.0] - 2026-07-11

### Added

- Initial public SFWA-WTL template derived from the private WebApp Stack G1.

[1.2.0]: https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/WayneTechLab/SFWA-WTL-TEMPLATE/releases/tag/v1.0.0
