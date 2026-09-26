# Frontend, product, and interaction quality

## Direction before decoration

For an existing interface, inspect current routes, visual language, component/state ownership, and responsive behavior before changing them. For new work, establish audience, primary task, product positioning, evidence/brand constraints, content hierarchy, and target devices. Form a one-sentence visual thesis that connects audience + product + intended feeling; use it to choose composition, type, color, imagery, density, and motion. If evidence is missing, make a coherent reversible direction and identify assumptions.

Avoid generic template output by making purposeful choices, not by banning a style: every gradient, glass surface, card, badge, radius, shadow, icon, animation, and decorative element must improve identity, hierarchy, comprehension, feedback, or navigation. Prefer a distinctive composition and a small consistent set of tokens/components over stacks of interchangeable cards. Match visual complexity to the content. Do not invent testimonials, metrics, rates, fees, guarantees, disclosures, or product capabilities—especially for finance, health, or other trust-sensitive domains. When such claims or disclosures are in scope, use verified product facts and current requirements.

Use a formal design system only when reuse/scope justifies it. Even a one-page design benefits from a lightweight consistent type scale, spacing rhythm, grid/alignment, color roles, and interaction states. Reuse local tokens/components when they support the intent; don't preserve a broken convention blindly.

## Model the user flow

For the primary path, identify entry, decision, action, feedback, and recovery. Consider loading/delayed, empty, success, validation/error, disabled, permission-denied, and partial-failure states that actually occur. Keep labels specific and explain what happened and how to recover. Validate fields at a useful time and preserve user input after recoverable errors. Confirm destructive or costly actions; provide undo when feasible and safer than confirmation. Keep navigation/orientation clear, prevent duplicate submissions, and avoid silently discarding work.

## Responsive and accessible by construction

Design content priority and reflow, not merely smaller desktop. At relevant widths check navigation, reading order, long labels/content, tables/charts/forms, media, overflow, touch targets, orientation, and zoom/text enlargement. On data-dense views, retain meaning and primary actions when simplifying or reflowing information.

Use semantic elements and native controls; provide associated labels, logical heading order, keyboard operation, visible focus, sufficient contrast, accessible status/error announcements, and sensible focus management for dialogs. Add ARIA only where semantics alone are insufficient. Respect reduced-motion preference and never make motion the only signal.

For the visual render/compare loop and screenshot matching, use [visual-validation.md](visual-validation.md). For forms, data operations, and destructive flows, include the state and recovery checks above in the actual acceptance path rather than treating a screenshot as sufficient.
