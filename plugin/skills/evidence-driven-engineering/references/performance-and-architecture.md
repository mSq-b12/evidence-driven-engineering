# Performance, scale, and architecture

## Measure before optimizing

For a reported slowdown, establish a representative baseline (workload, data volume, environment, latency/throughput/memory or user-visible metric). Locate the dominant layer before changing it: browser network waterfall and payload, rendering/profile, API timing, database query plan/rows/index use, or memory/CPU. Optimize that evidenced bottleneck, then repeat the same workload and compare. Avoid speculative caching, indexes, memoization, virtualization, or concurrency changes without a measured reason; consider correctness, invalidation, complexity, and resource tradeoffs.

At scale, use representative data (not a tiny fixture), inspect pagination/limits and query shape, and distinguish database, network, serialization, and client rendering. A query-plan or profile is evidence about a path, not a guarantee for every production distribution.

## Architecture by lifecycle

In existing/legacy systems, preserve compatibility and implicit behavior unless change is requested; understand consumers, operational constraints, and deployment sequence before modernization. Refactor only to a named objective and boundary, with behavior characterized. In greenfield work, choose clear boundaries, data ownership, error contracts, testing seams, and deployable structure appropriate to the expected scope; do not let “minimum change” justify a brittle throwaway design or let speculative scale produce a platform framework.

For multi-layer work, plan by end-to-end user/contract outcomes, with dependency order and evidence per boundary (e.g. persistence/API/UI/flow), not by disconnected file list alone. Keep architecture understandable and add abstractions when they express a real stable concept or remove demonstrated duplication.
