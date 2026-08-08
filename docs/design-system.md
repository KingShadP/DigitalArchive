# KingShadP Production Design System

This document outlines the foundation and primitives for the KingShadP web application interface.

## 1. Principles
- **Matte over Gloss:** Prefer matte finishes (`bg-surface`, `bg-background`). Avoid glassmorphism unless strictly necessary for layered depth.
- **Architectural Structure:** Use sharp edges (`rounded-sm` or `rounded-none`). Avoid excessive border-radius.
- **Orchestrated Typography:** Differentiate structural labels (monospace, tiny, wide tracking) from editorial narrative (serif, italic, generous line-height) and display (sans, tight tracking, uppercase).
- **Controlled Palette:** Do not oversaturate. Use semantic colors sparingly. The core is Matte Black and Matte Off-White.
- **Avoid:** Generic luxury, purple AI gradients, cyberpunk neon, excessive glowing drop-shadows.

## 2. Color Tokens (Tailwind)
- `matte-black`: `#050505` (Base background)
- `matte-off-white`: `#e5e5e5` (Base text)
- `oxblood`: `#3d0c11` (Deep structural red)
- `crimson`: `#73131a` (Primary accent)
- `rose-gold`: `#c29f98` (Warm highlight)
- `platinum`: `#e5e4e2` (Cool highlight)
- `vintage-metal`: `#8c8273` (Tertiary accents)
- `surface`: `#0a0a0a` (Elevated card/surface)
- `surface-dim`: `#111111` (Interactive surface)
- `border`: `rgba(229, 229, 229, 0.05)`
- `border-strong`: `rgba(229, 229, 229, 0.15)`

## 3. Core Primitives (`components/system/`)
- **Typography**
  - `<Heading>`: Variants for Display, Serif-Italic, Sans-Bold.
  - `<MonoLabel>`: Structural telemetry and metadata.
  - `<Text>`: Body, muted, and lead paragraphs.
- **Surface & Layout**
  - `<Surface>`: Primary container. Replaces raw `div` cards.
  - `<Divider>`: Structural separators replacing raw border lines.
  - `<PageContainer>`, `<Section>`, `<Grid>`: Layout macro-architecture.
- **Interaction**
  - `<Button>`, `<MotionButton>`: Primary interaction elements.
  - `<Link>`: Anchor element with primary, secondary, and inline states.
- **Media**
  - `<SystemImage>`: Pre-configured Next.js Image ensuring `referrerPolicy="no-referrer"`.
  - `<ImagePlaceholder>`: Matte off-white/surface placeholder for missing media.
- **States & Feedback**
  - `<LoadingState>`: Minimal pinging beacon for loading blocks.
  - `<ErrorState>`: Oxblood-themed error boundary message without excessive alarm.
- **Telemetry**
  - `<Beacon>`: Reusable pulsing status indicator.
  - `<TelemetryBadge>`: Key-value data row.
  - `<FrameBorder>`: Architectural corner brackets for images/media.

## 4. Usage
Import directly from the system module:
```tsx
import { Heading, MonoLabel, Surface, Beacon } from "@/components/system";
```
