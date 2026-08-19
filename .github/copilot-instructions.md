# KingShadP Copilot & AI Agent Instructions

These instructions must be strictly followed when generating or modifying code in this repository.

## 1. Context Before Action
- Read existing architecture before editing or refactoring code.
- Inspect surrounding components before rewriting to understand context and integrations.
- Assume this is PHASE 0 (Discovery, Stabilization, Architecture, and Governance) of a larger digital universe.

## 2. Brand Identity & Governance
- Preserve established KingShadP identity. Do not drift towards generic luxury, neon sci-fi, or Shopify-template styles.
- Never invent factual artist information or biography details.
- Never create alternate logos, mascots, or crests.
- Do not redesign the Giragon or use uncontrolled crown/royalty imagery.
- Differentiate between permanent brand assets, campaign art, and temporary experiments.

## 3. Engineering & Components
- Prefer existing components and primitives. Use established design tokens from Tailwind and global styles.
- Respect TypeScript interfaces and types. Fix type issues rather than ignoring them.
- Avoid unnecessary dependencies. Only introduce new packages when technically justified for the architecture.
- Preserve mobile behavior. Always check that responsive paradigms remain intact.
- Preserve accessibility. Maintain focus traps, semantic HTML, readable contrast, and `prefers-reduced-motion` considerations.
- Preserve audio behavior. When editing routes, do not break the continuous audio engine or track state.

## 4. UI & Layout Conventions
- Avoid generic templates. Do not default to "Hero, 3-Card Grid, Footer" layouts. Use editorial sequencing and broken grids.
- Ensure moments of spatial compression and expansion. Maintain heavy use of negative space.
- Hover states and interactions should have meaning, not just change opacity.

## 5. Process & Validation
- Run relevant validation before completion (`npm run build`, `npm run lint`, and any applicable checks).
- Never silently remove functionality. If modifying a complex component, ensure all existing capabilities are retained unless specifically asked to remove them.
- Document significant architectural changes.
- Keep PRs scoped and reviewable.
- Explain assumptions.
- Report validation that could not be performed.
- Never automatically merge without manual review context where applicable.
