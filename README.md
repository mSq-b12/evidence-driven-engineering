# Evidence-driven Engineering

An independent, practical engineering workflow for coding agents. It turns software work into a proportionate loop of orientation, evidence, focused changes, and verification.

It is for people using Codex or another coding agent on codebases, bugs, tests, web interfaces, APIs, data, or infrastructure. It is useful when an agent needs to understand the relevant system, make a scoped change, and show evidence for the result. The plugin supplies instructions; it does not change the underlying model or guarantee an outcome.

> **Independent project:** This is not an Anthropic or OpenAI product, Claude Code, or Codex itself. It contains no Claude model and is not endorsed by either company. It adapts ideas from publicly available engineering and agent documentation for use with Codex and other coding agents.

## Install in Codex

Requirements: a current Codex desktop app or Codex CLI with plugin marketplace support, and Git access to this repository.

1. Add the stable release as a marketplace source:

   ```sh
   codex plugin marketplace add mSq-b12/evidence-driven-engineering@v1.0.0
   ```

   For development builds only, you can track the moving default branch instead:

   ```sh
   codex plugin marketplace add mSq-b12/evidence-driven-engineering@main
   ```

2. In Codex, open **Plugins**, select the **Evidence-driven Engineering** marketplace, and install **Evidence-driven Engineering**. On CLI versions that expose `codex plugin add`, this command is also available:

   ```sh
   codex plugin add evidence-driven-engineering@evidence-driven-engineering
   ```

   Start a new task/session if the skill is not immediately discoverable.
3. Ask Codex to use the skill, or give it a software-engineering task that matches the skill description.

The marketplace command adds the source; it does **not** itself install the plugin. Install through the supported Plugins interface or the `codex plugin add` command when present in your CLI version. No shell installer, elevated permissions, telemetry, or external runtime dependencies are used.

## Quick start

**Install:** add the Git marketplace above, then install the plugin in Codex's Plugins interface.

**Verify:** run `node scripts/verify.mjs` and `node --test` from a clone; Codex CLI users can also run the isolated smoke test below.

**Use:** ask for the engineering task normally, or explicitly mention “use Evidence-driven Engineering.” The host decides skill discovery based on its supported behavior and the skill's trigger description.

**Update:** refresh a branch-tracking source with `codex plugin marketplace upgrade evidence-driven-engineering`; pinned tags require moving to a newer tag.

**Uninstall:** remove/disable the plugin in Codex's installed-plugin controls; separately remove the marketplace source with `codex plugin marketplace remove evidence-driven-engineering` if you no longer want the catalog.

## How the method changes the workflow

When the host loads this skill, the agent gets operational guidance for software tasks. The method favors:

- Evidence and reproduction before assumptions or broad edits.
- Understanding affected project conventions and consumers before changing code.
- Planning proportional to scope and risk; smaller compatible changes for existing systems.
- Regression checks before implementation for reproducible behavior bugs.
- Product-aware frontend work, responsive/accessibility checks, and rendered inspection where available.
- Verification at the layer that can prove the requested behavior, followed by an honest account of uncertainty.

Coverage includes codebase exploration, frontend/web and UX, APIs/backend/data, debugging/testing, architecture/performance, accessibility/security, and refactoring—when those concerns apply to the task.

## Short demonstration

Instead of treating “fix this bug” as permission to edit immediately, the workflow first captures expected vs. actual behavior, reproduces the issue, tests the smallest supported cause, then verifies the fix with a focused regression check.

For “build this responsive dashboard,” it first understands the product and existing conventions, then structures the interface and states, checks responsive/accessibility behavior, and inspects the rendered result if a browser is available. If that inspection is unavailable, it says so rather than calling the UI visually verified.

Useful requests include:

- “Trace this failing test to its root cause and add a regression test before fixing it.”
- “Reproduce this reference interface, implement the responsive layout, and inspect it at desktop and mobile widths.”
- “Review this API change for data validation, authorization boundaries, and backward compatibility.”
- “Refactor this module without changing its public behavior; identify the contracts and tests that prove it.”

The skill can be explicitly invoked or discovered from its description when the Codex host supports skill discovery; discovery is not guaranteed for every task or surface.

## Verify, update, remove

From a clone of this repository, check the package structure and skill references with Node.js 22 or newer:

```sh
node scripts/verify.mjs
node --test
```

For a live Codex discovery smoke test in an isolated temporary Codex home:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/smoke-test.ps1
```

The smoke test adds, lists, and removes the local marketplace in a temporary `CODEX_HOME`; it does not modify the user's normal Codex configuration. It requires Codex CLI.

To refresh a branch-tracking marketplace after a release:

```sh
codex plugin marketplace upgrade evidence-driven-engineering
```

Then refresh/restart Codex as needed. A marketplace pinned to a tag is intentionally immutable; to move to a later pinned version, remove that marketplace source and add the newer tag. To roll back, disable/uninstall the plugin in Codex, remove the newer marketplace source, and add the desired older release tag. In the Codex Plugins interface, disable or uninstall the plugin from the installed-plugins controls. To also remove the marketplace source:

```sh
codex plugin marketplace remove evidence-driven-engineering
```

Removing a marketplace source and uninstalling a plugin are separate actions. The marketplace command does not promise to remove every cached plugin file; use Codex's installed-plugin controls for the plugin itself.

## What the skill covers

- Exploring the relevant code and constraints before changing an existing project.
- Reproducing a behavior bug and testing the narrowest supported cause.
- Right-sizing the plan, implementation, and verification to risk.
- Frontend/UX, APIs/data/security, architecture/performance, debugging/testing, and delivery guidance through linked references.
- Reporting what was actually checked, not what a successful command cannot prove.

It does not guarantee correctness, replace human judgment, make Codex behave like Claude Code, or expose another model's private reasoning.

## Repository map

- `plugin/` — installable plugin package; the only canonical copy of the skill is `plugin/skills/evidence-driven-engineering/`.
- `.agents/plugins/marketplace.json` — repository-scoped marketplace catalog.
- `scripts/` — deterministic verifier and isolated Codex CLI smoke test.
- `tests/` — dependency-free Node test suite.
- `docs/` — architecture, compatibility, development, troubleshooting, and release guidance.

## Support status

| Environment | Status |
|---|---|
| Windows + Codex CLI | Tested locally for verification and marketplace discovery |
| macOS + Codex CLI | Expected to work through Codex's Git marketplace, not tested here |
| Linux + Codex CLI | Expected to work through Codex's Git marketplace, not tested here |
| WSL | Expected to work through Codex CLI, not tested here |
| Codex desktop Plugins UI | Official install surface; local end-to-end UI installation not tested in this packaging run |

The primary package is a Codex plugin with a bundled skill. Direct standalone copying to `~/.codex/skills` is not needed for this install route.

## Versioning and releases

The plugin manifest at `plugin/plugin.json` is the single current-version source. Releases use Semantic Versioning and Git tags named `vMAJOR.MINOR.PATCH`. See [CHANGELOG.md](CHANGELOG.md), [release checklist](docs/release-checklist.md), and [publishing guide](docs/installation.md).

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a change. Report vulnerabilities privately as described in [SECURITY.md](SECURITY.md); do not publish exploit details in an issue.

## License and attribution

The repository is licensed under the MIT License. The workflow is independently written and informed by public documentation, including [OpenAI's skill and plugin documentation](https://developers.openai.com/plugins/) and [Anthropic's public Claude Code documentation](https://code.claude.com/docs/en/overview). See [docs/architecture.md](docs/architecture.md) for scope and attribution notes.
