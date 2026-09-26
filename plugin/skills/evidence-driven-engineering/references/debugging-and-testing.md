# Debugging, regression, and verification

## Evidence-driven diagnosis

Use `observation → hypothesis → discriminating experiment → result → conclusion`. First capture expected vs actual behavior, exact error/stack/log, inputs, environment, timing, and reproduction steps. Reproduce at the narrowest useful layer. Trace the earliest supported cause; change one discriminating variable at a time. Do not “change it and see” through unrelated edits.

For a newly failing test, preserve the exact failure, inspect the test/fixtures and changes since the last known pass, and distinguish product regression from changed test assumptions, data, dependency, or environment. Use a baseline or bisect when multiple candidate changes make it efficient. Stop expanding once evidence supports one cause and a focused regression check demonstrates the correction. For rare production-only failures, use existing telemetry/safe logs, compare environment/config/data and timing, add narrowly scoped observability only if needed, and avoid exposing secrets or unsafe production experiments. Intermittent/race failures need timing/concurrency-preserving evidence; don't “fix” them with arbitrary sleeps.

For an active production incident, first establish impact/severity and preserve timestamps, version, request/correlation IDs, and relevant evidence. Prefer safe read-only diagnosis; avoid exploratory writes or sensitive logging. Compare production vs local runtime/config/data shape, then time-box experiments. When authorized and risk warrants, prioritize a reversible mitigation/rollback with observable success criteria; continue root-cause work separately and verify recovery without overstating proof.

If cause cannot be reproduced, report the confidence boundary. A safe containment may be appropriate when clearly scoped and reversible; label it a workaround and keep the root cause open.

## Choose tests by behavior and layer

Learn the project's runner, fixtures, test ownership, and mock conventions first. For a reproducible behavior bug or regression, add or extend the narrowest regression check and observe it fail for the expected reason before changing implementation. If an existing test is already red, first establish whether it represents this request; add a separate focused check if it does not. If automation cannot express the behavior, capture a repeatable manual/contract reproduction before the fix and add an automated check if feasible. Do not implement first and backfill the test afterward. This does not require test scaffolding for a literal copy-only or configuration-only edit; use a focused diff or relevant smoke check instead.

Unit tests cover local logic, integration tests cover boundaries/data collaborators, and e2e tests cover critical user journeys—choose based on the failure mode, not a quota. Use mocks at true external seams; avoid mocks that duplicate implementation details. Avoid timing-sensitive selectors, arbitrary sleeps, shared mutable fixtures, and snapshots that obscure behavior.

Include negative/boundary cases proportional to impact: permissions, invalid input, duplicate/retried events, empty/large datasets, partial failures, old consumers, keyboard/viewport where applicable. Isolate destructive fixtures. A passing test only proves its asserted conditions.

## Verify against the actual request

Run focused checks first, then relevant integration/build/e2e/lint/type/security checks according to changed layers and risk. Inspect exit code and output; a launched command is not a pass. Match evidence to claim:

- build success ≠ rendered UI or user flow works;
- test success ≠ unasserted requirement is satisfied;
- HTTP 200 ≠ correct data, authorization, or side effects;
- CSS compile ≠ mobile layout works;
- local pass ≠ production-only failure is resolved;
- refactor tests pass ≠ public/implicit behavior is preserved unless contracts were characterized.

For UI, inspect real rendering/interaction when available. For APIs, assert response, persisted state, authorization, and side effects relevant to the request. For migration, verify data and compatibility as described in backend guidance. Review final diff/status for scope, secrets, generated churn, user changes, and accidental contract changes. Say exactly which layers were not verified.
