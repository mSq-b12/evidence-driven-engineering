# Security policy

## Scope

The project contains agent instructions, Markdown references, JSON manifests, and small local validation/smoke-test scripts. It has no service, credential flow, install hooks, or telemetry.

## Reporting a vulnerability

Please do not report exploitable details in a public issue. Use GitHub's private vulnerability reporting for this repository when enabled. If private reporting is unavailable, contact the repository maintainers privately through the contact published on the repository profile. Include the affected version, reproduction steps, and impact; omit secrets and unrelated personal data.

There is no guaranteed response SLA until maintainers publish one. Supported versions are the latest release and, when practical, the immediately preceding minor release. Security fixes are published as a patch release and documented under `Security` in the changelog.

## Script safety

Review scripts before running them. The verifier only reads repository files. The smoke test creates a uniquely named temporary `CODEX_HOME`, invokes the Codex CLI to add/list/remove this local marketplace, and cleans up only its own temporary directory. It does not read or change the user's normal Codex configuration, install dependencies, request elevation, or access the network by design.
