# Contributing

Thank you for helping improve Evidence-driven Engineering. Keep changes focused, compatible with the documented Codex plugin format, and grounded in observable behavior.

## Before opening a pull request

1. Open an issue first for substantial behavior or scope changes; small fixes can go directly to a PR.
2. Edit the canonical skill only at `plugin/skills/evidence-driven-engineering/`. Do not add a second `SKILL.md` copy.
3. If a change fixes reproducible behavior in a script, add the narrowest failing test first, observe the expected failure, then implement.
4. Run `node scripts/verify.mjs` and `node --test`.
5. For changes to plugin/marketplace metadata, run the isolated Codex smoke test when Codex CLI is available.
6. Update `CHANGELOG.md` and the plugin manifest version for a release; ordinary PRs do not need to pick a release number.

## Pull requests

Explain the user-visible change, compatibility implications, and checks run. Never include credentials, personal paths, private project data, generated caches, or telemetry. Follow the checklist in `.github/PULL_REQUEST_TEMPLATE.md`.

By contributing, you agree that your contributions are offered under this repository's MIT License.
