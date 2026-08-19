# Design System

## Principles
- Preserve the established KingShadP interface language.
- Prioritize editorial sequencing over generic template sections.
- Favor meaningful interaction states over simple opacity-only changes.

## Design token source
Primary token source is `app/globals.css` (`@theme`).

### Color tokens
- `--color-matte-black: #050505`
- `--color-matte-off-white: #e5e5e5`
- `--color-oxblood: #3d0c11`
- `--color-crimson: #73131a`
- `--color-rose-gold: #c29f98`
- `--color-platinum: #e5e4e2`
- `--color-vintage-metal: #8c8273`

### Semantic tokens
- `--color-background`, `--color-foreground`
- `--color-surface`, `--color-surface-dim`
- `--color-border`, `--color-border-strong`
- `--color-accent`

### Typography tokens
- `--font-sans` (Inter)
- `--font-display` (Space Grotesk)
- `--font-mono` (JetBrains Mono)
- `--font-serif` (Cormorant Garamond)

## Typography conventions
- Structural labels: monospace uppercase via `MonoLabel`.
- Display/editorial headings: `Heading` variants (`display`, `serif-italic`, `sans-bold`).
- Body copy: `Text` variants (`body`, `muted`, `lead`).

## Spacing and layout
- Container: `PageContainer` (`max-w-[1800px]`, responsive horizontal padding).
- Sections: `Section` spacing presets (`sm`, `md`, `lg`, `xl`).
- Grid: `Grid` supports `2`, `3`, `4`, `12` responsive column systems with gap presets.

## Breakpoints and responsive behavior
- Tailwind responsive breakpoints drive layout changes (`sm`, `md`, `lg`).
- Mobile nav is an overlay drawer (`components/navigation.tsx`); desktop nav switches at `lg`.
- Custom cursor is disabled on coarse pointers; native cursor remains on mobile.

## Motion principles
- Motion is built with `motion/react` and used for:
  - route transitions (`app/template.tsx`)
  - UI reveal and parallax interactions
  - telemetry/status animation
- Preserve readability and interaction clarity when adding motion.

## Surface and component conventions
Core primitives in `components/system`:
- Foundation: `Surface`, `Divider`, `PageContainer`, `Grid`, `Section`
- Typography: `Heading`, `MonoLabel`, `Text`
- Interaction: `Button`, `MotionButton`, `Link`
- Media: `SystemImage`, `ImagePlaceholder`
- Utility/states: `LoadingState`, `ErrorState`, `Beacon`, `TelemetryBadge`, `FrameBorder`

Prefer these primitives over one-off implementations.

## Accessibility requirements (current baseline)
- Keep semantic structure (`main`, `nav`, button/anchor semantics).
- Preserve visible focus styles on links/buttons.
- Keep ARIA labels on icon-only controls (player, nav toggles).
- Avoid removing reduced-motion handling where present (`Bootloader` uses `useReducedMotion`).
- Maintain color contrast for small mono labels on dark surfaces.

## Appropriate visual patterns
- Asymmetric editorial compositions.
- Spatial compression/expansion through section rhythm.
- Dark matte surfaces with restrained accent usage.

## Inappropriate visual patterns
- Generic “hero + 3-card + CTA + footer” templates.
- Random token additions without semantic purpose.
- Uncontrolled neon/cyberpunk gradients or fake-luxury clichés.

## Token expansion strategy
When adding tokens, use small semantic sets across:
- color, surface, text, border
- spacing, radius
- typography
- z-index
- motion/transition
- breakpoints

Add tokens only when reused; do not add large unused token catalogs.
