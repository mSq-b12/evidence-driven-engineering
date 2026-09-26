---
name: evidence-driven-engineering
description: Use when changing, debugging, testing, reviewing, refactoring, or designing software, websites, APIs, data systems, or infrastructure; also when a build passes but behavior or UX may still be wrong.
---

# Evidence-driven Engineering

Use the project's actual conventions and the host's available capabilities. The goal is the requested observable outcome, with scope and evidence proportional to its risk—not a fixed ceremony and not imitation of another coding product.

## Choose the smallest sufficient loop

1. **Orient:** identify outcome, constraints, and proof of completion. In an existing repo, read applicable instructions and inspect status before edits; trace only relevant entry points, consumers, tests, and history. Ask only for an unknown that cannot be discovered and would materially change a risky or product-level decision. Otherwise make a reversible, evidence-based assumption and state it when useful.
2. **Model:** use code, tests, logs, docs, history, API/browser output, or measurements to understand the relevant flow. Separate observed facts from hypotheses; expand discovery only when evidence points outward.
3. **Choose scope:** isolated copy/obvious local edit → inspect owner and nearby behavior, edit, review diff, quick check, stop. Bug/behavior change → reproduce or create the narrowest failing check, then correct the supported cause. Multi-layer/risky/new work → define contracts, boundaries, milestones, risks, and acceptance evidence before broad implementation. Existing systems favor the smallest complete compatible change; greenfield work favors a coherent foundation, not a throwaway minimum.
4. **Iterate:** make coherent changes, check the layer just changed, and adjust from evidence. A failed command/test is diagnostic data: read its output, change the hypothesis or method, and do not retry identically without a reason.
5. **Verify and deliver:** prove the requested behavior at the appropriate layer(s), inspect the final diff and user-visible result when available, then report what changed, what was actually checked, and what remains uncertain. A successful build or passing test proves only the behavior it covers.

## Load only the relevant reference

- Existing repositories, discovery, planning, legacy boundaries, refactors, dependencies: [workflow-and-context.md](references/workflow-and-context.md)
- Visual direction, UI, product flows, responsive design, accessibility: [frontend-and-ux.md](references/frontend-and-ux.md)
- Screenshot matching and rendered visual comparison: [visual-validation.md](references/visual-validation.md)
- APIs, persistence, migrations, security: [backend-data-security.md](references/backend-data-security.md)
- Failures, regression diagnosis, tests, false-success checks: [debugging-and-testing.md](references/debugging-and-testing.md)
- Performance, profiling, scale, architecture: [performance-and-architecture.md](references/performance-and-architecture.md)
- Tools, delegation, context continuity, git, permissions, recovery: [agents-tools-and-governance.md](references/agents-tools-and-governance.md)
- Claims translating Claude Code documentation into Codex behavior: [claude-code-to-codex.md](references/claude-code-to-codex.md)

Use specialized skills when their triggers fit; follow their current instructions. Check current primary documentation for version-sensitive facts. If a required capability is unavailable, use the closest safe check and name the limitation. A manually loaded skill is guidance, not an enforcement boundary.
