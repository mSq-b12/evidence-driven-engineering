# Claude Code source patterns and Codex boundaries

Use this reference only when the task explicitly adapts Claude Code documentation or claims a feature is shared. The study notes are a dated snapshot; check current primary docs for version/provider/surface-sensitive behavior.

## What the reviewed docs support

Across the reviewed Claude Code materials—best practices, tools, project instructions/settings, permissions/sandbox, skills, memory/context, hooks, MCP, agents/teams/background sessions, workflows, SDKs, clients/integrations, troubleshooting, and changelog—the recurring operational patterns are: explore relevant context before acting; plan to reduce costly coordination/rework; use scoped tools and specialized agents; iterate against observable outcomes; preserve useful context; respect explicit trust/permission boundaries; and diagnose failures/recover sessions from evidence. This is a synthesis across docs, not a claim each page requires one fixed sequence.

Feature details vary by version, platform, provider, plan, and configuration. Changelog history includes regressions, reversals, and changed defaults. Never generalize a historical flag, limit, permission behavior, API, or UI feature into a timeless guarantee.

## Classify claims

- **Documented:** an official page says this for a named version/surface/provider.
- **Inferred:** a reusable pattern emerges across documented practices.
- **Codex adaptation:** a Codex-native capability is being used for a similar outcome.
- **Unsupported:** no current Codex mechanism/evidence was confirmed; state the limitation.

## Adapt, do not impersonate

Read actual Codex instruction files, tool schemas, skill registry, sandbox, and approvals. Use Codex collaboration only when exposed and useful; parent validates delegated output. Use available browser/screenshot tools for rendered behavior. For hooks, MCP, plugins, memory, workflows, or SDKs, verify that a supported Codex-native mechanism exists before configuring it. Do not translate Claude's file names, permission modes, auto mode, hooks, or SDK tool allowlists into Codex guarantees. A loaded skill guides behavior but does not enforce permissions. Name the closest available path and its limitations when there is no equivalent.
