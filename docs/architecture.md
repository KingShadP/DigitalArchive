# Architecture & Application Shell

## 1. Global Shell (`app/layout.tsx`)
- The Next.js `RootLayout` establishes the global application shell.
- Encompasses `<AudioProvider>`, `<Navigation>`, `<GlobalPlayer>`, `<Cursor>`, and `<Footer>`.
- Body class enforces `bg-background` and `text-foreground` via the design system.

## 2. Navigation Architecture (`components/navigation.tsx`)
- Implements a fixed, responsive top-bar (`<nav>`).
- Utilizes an absolute `z-50` backdrop blur that scales down on scroll to allow content to breathe.
- **Mobile Navigation**: Implements a full-screen, high-contrast `<AnimatePresence>` drawer with animated stagger entries for links. 
- Content Exposure: Strict adherence to hiding empty pages. Links (`HOME`, `ARCHIVE`, `VISUAL`, `MUSIC`, `BRAND`) strictly point to populated index pages or anchored content blocks.

## 3. Global Audio Engine (`components/global-player.tsx`)
- Mounted bottom-right via `<GlobalPlayer>`.
- Expandable micro-interaction using `framer-motion` to reveal telemetry status (playing/standby).
- Hooks into the global `<AudioProvider>` ensuring playback state isn't destroyed on client-side routing.

## 4. Route States
- **Transitions (`app/template.tsx`)**: Utilizes a subtle `motion.div` fade-in for all route mounts, maintaining cinematic continuity.
- **Loading (`app/loading.tsx`)**: Mounts a minimal `<LoadingState>` with a pulsing `accent` beacon.
- **Error Boundaries (`app/error.tsx`, `app/global-error.tsx`)**: Themed oxblood error states designed not to break immersion during anomalous behavior.

## 5. Contextual End Navigation (`components/footer.tsx`)
- Persistent structural footer across all views.
- Includes a `<Magnetic>` interactive return-to-top component and global copyright/telemetry labels.
