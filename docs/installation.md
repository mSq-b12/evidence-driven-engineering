# Installation and lifecycle

This guide describes Codex's supported Git marketplace and plugin flow. Exact UI labels can change between releases.

## Add and install

1. Ensure Codex CLI is available. Add the repository using its actual GitHub owner/repository slug:

   ```sh
   codex plugin marketplace add OWNER/evidence-driven-engineering@v1.0.0
   ```

2. For development builds instead of a stable release, optionally follow the moving default branch:

   ```sh
   codex plugin marketplace add OWNER/evidence-driven-engineering@main
   ```

3. Open Codex's Plugins interface, choose the `Evidence-driven Engineering` marketplace, and install the plugin. Start a new task/session for discovery if needed.

The CLI command adds a source; it is not an install command. Codex's UI performs plugin installation and controls enablement.

## Verify

Local maintainers run:

```sh
node scripts/verify.mjs
node --test
```

To exercise real Codex CLI discovery without touching the user's regular settings, run `scripts/smoke-test.ps1` on Windows with Codex CLI installed. This checks that the marketplace is accepted and listed; it does not prove UI installation or skill invocation by a model.

## Update

If following a moving branch, refresh it with:

```sh
codex plugin marketplace upgrade evidence-driven-engineering
```

Then refresh/restart the Codex Plugins view if needed. A moving branch such as `main` is convenient for development but is not a stable release. For exact reproducibility, install a release tag. To update from a pinned tag, remove the old marketplace source and add the newer tag, then update/reinstall the plugin in the UI:

```sh
codex plugin marketplace remove evidence-driven-engineering
codex plugin marketplace add OWNER/evidence-driven-engineering@v1.1.0
```

## Remove

Use Codex's installed-plugin controls to disable or uninstall the plugin. Remove the Git catalog separately if desired:

```sh
codex plugin marketplace remove evidence-driven-engineering
```

This removes the source registration; it is not documented as a cache purge. Do not manually delete Codex's plugin cache unless following current host guidance.

## Roll back

Use Codex's installed-plugin controls to disable/uninstall the active version, remove the current source, then add the known-good tag and install that version:

```sh
codex plugin marketplace remove evidence-driven-engineering
codex plugin marketplace add OWNER/evidence-driven-engineering@v1.0.0
```

Replace the tag with the desired prior release. Marketplace source changes and the installed plugin's state remain separate.

## Direct/manual alternative

For a host that supports standalone skills but not Codex plugins, the skill files can be placed in that host's documented skill directory. This repository does not provide a custom cross-platform installer or claim that such a copy is automatically updated by Codex. The plugin/marketplace path above is the supported Codex distribution route.
