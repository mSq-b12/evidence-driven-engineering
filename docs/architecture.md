# Architecture and distribution decision

## Decision

Package the workflow as a skills-only Codex plugin, with a repository-scoped Git marketplace catalog. Keep the only canonical skill directory at `plugin/skills/evidence-driven-engineering/`; the marketplace points to the adjacent plugin package rather than copying the skill into another source tree.

This uses Codex's documented plugin package format and its Git-backed marketplace source support. The local marketplace is the community distribution channel; the universal Plugins Directory is an optional later publication that requires a submission, verified developer identity, and review. This repository does not claim to be listed there.

## Why not a custom installer?

Codex already has a supported marketplace workflow for discovering and installing plugin packages. A custom script that downloads code and edits `~/.codex` would duplicate host behavior, create cross-platform path/security obligations, and risk overwriting user files. The project therefore adds no custom install/update/uninstall scripts. Its own verifier checks the package, while Codex owns plugin lifecycle operations.

The marketplace-add command registers a marketplace source; plugin installation is a separate action in Codex's Plugins interface. Updating a Git marketplace and uninstalling a plugin are also separate lifecycle actions, documented separately in the README.

## Versioning

`plugin/plugin.json` is the sole current version field. Git release tags use `vMAJOR.MINOR.PATCH`:

- **PATCH:** compatible documentation, metadata, or packaging corrections.
- **MINOR:** compatible additions to workflow guidance or references.
- **MAJOR:** incompatible skill identity, package layout, or behavior changes.

Avoid duplicating a current version in `SKILL.md` metadata because Codex skill frontmatter's portable contract is `name` and `description`; version belongs to the containing plugin release. Changelog entries retain historical release numbers as usual.

The initial manifest is prepared at `1.0.0`. No release tag or GitHub release is claimed until the release checklist—including actual Codex Plugins UI installation/discovery—is completed.

## Compatibility and trust

The skill uses a standard `SKILL.md` plus relative Markdown references. The plugin has no MCP server, network client, hooks, external dependencies, or lifecycle commands. Marketplace/Plugin installation is still a trust decision: inspect a release and its source before enabling it. Codex marketplace support and UI behavior can evolve; consult the current official documentation before changing this packaging format.

## Independence and attribution

The workflow is independently expressed and adapted for Codex. Public OpenAI and Anthropic documentation informed platform and workflow decisions; this repository does not contain either company's models, claim endorsement, or reproduce private source material. It is not an official product of or endorsed by OpenAI or Anthropic. Official references:

- [Codex plugin packaging and marketplaces](https://developers.openai.com/plugins/build/plugins)
- [Codex skill format](https://developers.openai.com/plugins/build/skills)
- [Public plugin submission](https://developers.openai.com/plugins/deploy/submission)
- [Claude Code documentation](https://code.claude.com/docs/en/overview)
