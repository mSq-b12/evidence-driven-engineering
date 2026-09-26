# APIs, data, and security

## Contracts and boundaries

Trace caller → boundary validation → authentication → authorization → domain action → persistence/side effects → response. For the changed path, define accepted input, output, failure behavior, identity/tenant scope, and compatibility expectations. Validate untrusted data at the boundary; distinguish authentication from authorization; return stable actionable errors without leaking internals. Consider pagination, rate limits, timeout, retry, idempotency, and observability when actual usage or side effects require them. A 200 response is not proof: inspect persisted/returned values and side effects against the contract.

Protect integrity across transactions, concurrent requests, duplicate delivery, retries, and partial failures when relevant. Test authorized and unauthorized actors, malformed/boundary input, and failure recovery at the affected boundary. Avoid changing public behavior accidentally.

For payments or other high-impact money movement, treat retries, duplicate requests/events, authorization, amount/currency integrity, state transitions, provider signatures, reconciliation, and sandbox-vs-live credentials as explicit design questions. Minimize payment data and verify applicable compliance/provider requirements from current primary sources; do not assume a generic API checklist establishes compliance or call a live provider without authority.

## Schema changes and rollout

Inspect schema, constraints, indexes, relationships, existing data shape/volume, query patterns, consumers, migration conventions, and deploy order before changing persistence. For production-facing changes, account for lock duration, backfill size, downtime, rollback/forward recovery, and old/new app versions running concurrently. Prefer expand → backfill → switch consumers → contract when an in-place breaking migration would strand old code or data; make backfills resumable/idempotent when size or failure risk warrants. Do not silently delete/merge data. Test migration against representative existing data and verify both schema and application behavior.

## Proportional security review

For the touched surface, consider only relevant threats: auth/authz and least privilege; secrets in config/logs/errors; SQL/command/template injection; XSS/CSRF/SSRF; path traversal and upload validation; unsafe serialization; dependency provenance; sensitive-data exposure. Check trust boundaries and exact targets. A normal local UI copy change does not need a full security audit; auth, payment, file, or production changes deserve broader checks. Report confirmed findings separately from plausible risks. Never claim “100% secure.”

For deployment, CI, container, cloud, or production operations, inspect environment and secret flow, target, external/destructive effects, reproducibility, rollback, and failure handling. Codebase approval alone does not authorize production writes or publishing.
