# Evidence-driven Engineering distribution design

## Goal

Make the V3 engineering workflow easy to find, install, validate, update, and remove for Codex users without presenting it as an official Anthropic or OpenAI product.

## Decision

Package the workflow as a skills-only Codex plugin, distribute it through a Git-backed marketplace catalog in this repository, and keep one canonical skill directory under `plugin/skills/evidence-driven-engineering/`. Use Codex's plugin interface for installation and removal; use its marketplace commands for registering, listing, refreshing, and removing the source. A custom installer is intentionally excluded.

## Components

- Portable plugin manifest, SemVer version, and marketplace catalog.
- The V3 skill and linked references, renamed to `evidence-driven-engineering`.
- Node built-in validation/tests, plus an optional smoke test against an isolated `CODEX_HOME`.
- README and installation, architecture, development, security, contribution, changelog, and release docs.
- GitHub Actions checks on pull requests and pushes.

## Boundaries

- The public package is the source of truth; no duplicate `SKILL.md` exists in another project folder.
- Preparing files does not publish a GitHub repository or submit a plugin. Both require a user-owned destination/account; the universal directory additionally requires verified identity and review.
- Windows will be exercised here. macOS, Linux, and WSL are documented as untested until CI or maintainers verify them.
- No telemetry, credentials, network installer, hooks, MCP server, or elevated permissions.

## Acceptance evidence

- JSON/frontmatter/version/name and skill-reference checks pass.
- Tests prove the verifier rejects an escaping reference and duplicate skill copy.
- Codex CLI accepts and lists the local marketplace in a temporary home; the temporary source is removed afterward.
- CI runs the dependency-free tests and verifier.
- A clean checkout follows documented installation/lifecycle instructions without pretending the CLI's marketplace-add command also installs a plugin.
