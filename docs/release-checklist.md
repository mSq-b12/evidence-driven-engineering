# Release checklist

- [ ] Confirm the change fits the versioning rules in `docs/architecture.md`.
- [ ] Update `plugin/plugin.json` version and `CHANGELOG.md`.
- [ ] Run `node scripts/verify.mjs` and `node --test` on a clean checkout.
- [ ] If plugin/marketplace metadata changed, run `scripts/smoke-test.ps1` with Codex CLI.
- [ ] Inspect the full diff for broken references, personal paths, credentials, logs, caches, and unintended files.
- [ ] Confirm only the canonical skill directory contains `SKILL.md`.
- [ ] Review README install/update/remove commands against current official Codex documentation.
- [ ] Create annotated tag `vMAJOR.MINOR.PATCH` and prepare release notes from the changelog.
- [ ] Keep the plugin's source release in Git; no downloadable installer/archive is needed. For stronger pinning, publish the exact commit SHA and let users select it where Codex supports SHA refs.
- [ ] Verify a clean clone can run the documented checks.
- [ ] If submitting to the universal Plugins Directory, complete verified identity, listing assets/text, test cases, policy attestations, review, and explicit publish in the portal.
