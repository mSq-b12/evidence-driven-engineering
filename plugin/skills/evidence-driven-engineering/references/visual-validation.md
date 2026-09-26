# Visual validation and reference matching

Use this when visual output is part of acceptance, a screenshot/reference is supplied, or a browser/rendering tool is available and can reduce uncertainty.

## Screenshot/reference workflow

1. **Observe:** inspect the reference at its actual viewport; record viewport size and distinguish visible facts from inferred behavior.
2. **Decompose:** map major regions, page proportions, content hierarchy, alignments, grid/columns, whitespace/density, type scale/weights, color roles, imagery, borders, and key states. Choose a few stable anchors (edges, baselines, widths, spacing) that explain most of the composition.
3. **Implement:** reproduce the system and content structure, not isolated decorative pixels. Use available assets/fonts where licensed and present; do not fabricate missing brand assets as if authentic.
4. **Render at the same viewport and state.** Inspect the actual page or screenshot; compare the largest mismatches first (geometry/hierarchy, then typography/color, then detail). Fix and render again.
5. **Stop** when no high-impact discrepancy remains for the stated scope, or when tooling/reference quality prevents a reliable match. State what could not be compared; do not claim pixel parity from code review alone.

## Browser feedback loop

`CODE → RENDER → INSPECT → FIX → RENDER AGAIN` is a loop, not a one-time screenshot. At relevant desktop and narrow widths, inspect the main path, clipping/overflow, wrapping, focus/keyboard behavior, console/network errors that affect the task, and realistic long content. For visual bugs, keep the viewport, route, data, and state consistent between iterations.

Use a browser when it can verify actual rendering/interaction. If unavailable, substitute component/e2e/unit/build checks appropriate to the change and explicitly say visual behavior remains unverified. Don't automate login, purchase, or external side effects without the task's authority.
