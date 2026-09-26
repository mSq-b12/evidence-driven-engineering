# Development

## Requirements

- Node.js 22+ for the dependency-free validator/tests.
- Git for release/version history.
- Codex CLI only for the optional actual-discovery smoke test.

No packages need to be installed.

## Change the skill

Edit `plugin/skills/evidence-driven-engineering/SKILL.md` and the relevant file under its `references/` directory. Keep links relative to that skill directory and preserve its frontmatter `name`/`description`. The skill name, folder, plugin name, and marketplace entry are intentionally aligned.

## Validate

```sh
node scripts/verify.mjs
node --test
```

On Windows with Codex CLI:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/smoke-test.ps1
```

The tests use Node's built-in runner and create isolated temporary fixtures; they do not need network access.

To try a local development build, from the repository root run `codex plugin marketplace add .` and install it from the local marketplace in the Codex Plugins interface. Remove the local source with `codex plugin marketplace remove evidence-driven-engineering`; disable/uninstall the plugin separately in the UI. The `scripts/smoke-test.ps1` performs isolated source discovery and cleanup without installing into your normal Codex profile.

## Release

Follow `docs/release-checklist.md`. Update `plugin/plugin.json` once for the current version, add a changelog entry, run all checks, review the diff, create a `vX.Y.Z` tag, and publish release notes on the hosting forge. Do not claim an official Codex directory listing unless the submission is approved and published.
