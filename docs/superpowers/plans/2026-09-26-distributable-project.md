# Distributable Engineering Skill Project Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Package the V3 engineering workflow as a versioned, verifiable Codex plugin distributed through a Git marketplace.

**Architecture:** The repository contains one marketplace catalog and one plugin package. The canonical skill and its references live inside that plugin; Codex's own marketplace/plugin lifecycle is used instead of a custom installer. A dependency-free validator/test suite and isolated CLI smoke test check the package.

**Tech Stack:** Codex plugin and marketplace JSON, Markdown, Node.js built-in test runner, PowerShell smoke test, GitHub Actions.

## Global Constraints

- No claim that the package is official Anthropic, Claude Code, or OpenAI.
- No custom installer, telemetry, external runtime package, credentials, or elevation.
- Keep exactly one canonical `SKILL.md` inside the plugin package.
- Do not publish or submit remotely without an explicit destination/account.
- Report tested vs. untested operating systems separately.

---

### Task 1: Package and distribution metadata

**Files:** `plugin/plugin.json`, `plugin/skills/evidence-driven-engineering/**`, `.agents/plugins/marketplace.json`

- [x] Copy the validated V3 skill and references into the single canonical plugin skill folder.
- [x] Align plugin, skill, marketplace, and folder IDs; set the initial package release to `1.0.0`.
- [x] Validate the manifest and actual local marketplace discovery.

### Task 2: Verifier and tests

**Files:** `scripts/verify.mjs`, `tests/verify.test.js`

- [x] Write tests requiring a clean package, safe in-skill links, and a single canonical skill.
- [x] Confirm the tests fail before the verifier exists.
- [x] Implement the verifier and confirm tests pass.

### Task 3: Documentation and governance

**Files:** `README.md`, `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/**`

- [x] Document real install/update/remove distinctions, support boundaries, independence, license, and contribution flow.
- [x] Audit instructions against current official Codex documentation; the clean GitHub/desktop flow still requires an actual public owner/repo and UI installation.

### Task 4: Smoke test and CI

**Files:** `scripts/smoke-test.ps1`, `.github/workflows/ci.yml`, `.github/ISSUE_TEMPLATE/**`, `.github/PULL_REQUEST_TEMPLATE.md`

- [x] Implement a Codex CLI smoke test in a temporary `CODEX_HOME`.
- [x] Add dependency-free CI checks and concise issue/PR templates.
- [x] Run smoke test, tests, and validator; inspect cleanup and Git diff.

### Task 5: Release readiness

**Files:** `docs/release-checklist.md`, repository history

- [x] Audit for private paths/secrets/caches and broken links.
- [x] Test isolated marketplace flow and local package; public clean-clone installation/UI install remains untested because no remote repo exists.
- [x] Commit package state locally (`c47bf46`) and document external publication steps. A public GitHub remote could not be created because GitHub CLI is not authenticated; the Codex desktop plugin install/use/update path also remains untested.

The public GitHub owner/repository, verified publisher identity, and official Plugins Directory review remain external inputs; they are not fabricated or assumed.
