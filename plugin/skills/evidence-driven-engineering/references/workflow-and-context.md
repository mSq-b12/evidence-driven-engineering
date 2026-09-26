# Workflow, scope, and context

## Discover progressively

For an existing system, inspect in this order and stop expanding when evidence is sufficient: applicable instructions and worktree status → requested feature's entry point → direct callers/data flow and nearby conventions → focused tests/config/history → adjacent modules only when a concrete dependency or failure points there. Never infer edit ownership from a filename alone. In a monorepo, locate the package/app boundary first; don't read every package.

Preserve the user's uncommitted work. Before risky or overlapping edits, know the baseline with status/diff; after edits, inspect the new diff. Avoid reset/checkout/clean or broad rewrites that discard state. Keep unrelated cleanup separate.

## Pick scope by uncertainty and cost

| Task shape | Sufficient approach | Stop when |
|---|---|---|
| Literal, isolated copy/config edit | Inspect the owning occurrence and nearby state; edit and inspect diff | Correct location and no unintended change are evident |
| Local bug or behavior change | Reproduce or add a focused failing check; trace owner; fix and retest | A supported cause explains the symptom and requested behavior is checked |
| Cross-layer feature or risky change | Map actors, states, contracts, data/permission boundaries, dependencies; define milestones and acceptance evidence | Each affected boundary has proportionate evidence and known risks are stated |
| New product/system | Establish users, primary jobs, core flows, domain constraints, data/contracts, operational needs, then choose the lightest architecture that supports them | The requested slice works coherently without speculative platform-building |

Planning reduces coordination/rework for multi-step tasks; it is not a deliverable for a typo. Investigation ends when the evidence supports an implementation and further search is unlikely to change the decision. If root cause remains unproved, stop at a safe containment only when justified, label it as a workaround, and preserve the unknown.

For a full-stack feature, define one end-to-end acceptance path and map its UI → API/domain → persistence/side-effect boundaries, including loading/error/permission behavior. Implement a thin vertical slice that proves the shared contract, then extend meaningful states; use separate milestones when dependencies or risk justify them. Avoid a disconnected “frontend first/backend later” plan that leaves contract mismatches until integration.

For refactors, first state the defect/objective, behavior to preserve, consumers/contracts, and boundary of the refactor. Capture current behavior where implicit (characterization/contract tests or examples) before restructuring. For legacy systems, check compatibility, historical behavior, consumers, and rollout constraints before modernization. Do not “clean up” unknown behavior speculatively.

Infer conventions from nearby code and evidence. Ask only when a missing choice materially changes product behavior, compatibility, irreversible data effects, or external risk and cannot be resolved locally. Use safe reversible defaults for the rest; do not assume credentials, access, deletion, publishing, or production changes.

Before a new dependency, look for an existing project capability; then weigh need, maintenance, security, compatibility, bundle/runtime impact, and operational cost. Don't reinvent a substantial capability merely to avoid a well-supported dependency.

Maintain a compact task state for long work: objective/constraints; relevant files and contracts; verified facts and rejected hypotheses; decisions; changes made; checks/results; next action; unresolved risks. Refresh it at phase boundaries or handoff, not after every command. See [agents-tools-and-governance.md](agents-tools-and-governance.md) for continuation and delegation.
