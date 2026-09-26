# Troubleshooting

## Codex does not show the skill

**Symptom:** The plugin is installed, but requests do not appear to use its guidance.

**Diagnose:** Confirm the plugin is enabled in the Codex Plugins interface. Run `codex plugin marketplace list` to see whether the expected source is registered. Skill discovery depends on the host and task description; an HTTP/CLI source listing alone does not prove a model loaded the skill.

**Fix:** Enable/reinstall the plugin from the marketplace, refresh/restart Codex, and start a new task. Mention “use Evidence-driven Engineering” explicitly for a direct invocation when available.

## Marketplace path or repo not found

**Symptom:** `codex plugin marketplace add` says the repository/source cannot be resolved.

**Diagnose:** Confirm Git access, `OWNER/repository` spelling, and whether the chosen tag/branch exists. For a local development source, run the command from the repository root with `codex plugin marketplace add .`.

**Fix:** Correct the source/ref and retry. The public GitHub URL is not embedded here because the repository owner/destination has not been supplied.

## Old skill version remains

**Symptom:** Codex still shows old behavior after a release.

**Diagnose:** Check which tag or branch the marketplace tracks and run `codex plugin marketplace list`. Exact release tags do not move. Marketplace refresh and plugin installation/enablement are separate.

**Fix:** For a moving Git source, run `codex plugin marketplace upgrade evidence-driven-engineering`, refresh/restart Codex, and update/reinstall the plugin through its UI. For a pinned tag, remove the old source and add the newer release tag, then install it.

## Duplicate or conflicting skill

**Symptom:** Similar guidance appears more than once or Codex has multiple matching skills.

**Diagnose:** Check installed plugins and skill directories for an older manual copy. This package has one skill named `evidence-driven-engineering`; it does not remove old `engineering-method` installs or user configuration.

**Fix:** Disable/uninstall the duplicate through its owning host. Do not delete unrelated files or edit `AGENTS.md` automatically.

## Invalid metadata or missing reference

**Symptom:** The marketplace rejects the package or skill guidance has a broken supporting link.

**Diagnose:** Run `node scripts/verify.mjs` and `node --test` from a clean clone.

**Fix:** Correct `plugin/plugin.json`, `.agents/plugins/marketplace.json`, skill frontmatter, or the relative reference path; rerun both checks and the Codex smoke test for package/catalog changes.

## Permission or unsupported-surface issue

**Symptom:** Codex cannot write marketplace state or the Plugins interface is unavailable.

**Diagnose:** Plugin marketplace add/list operations need access to the user's Codex configuration; a managed environment may restrict that path or disable plugins. This package requires no administrator privileges.

**Fix:** Use an approved local Codex installation and follow the organization's plugin policy. If the surface does not support plugins, use that host's documented standalone skill mechanism; this repository does not ship a custom installer.
