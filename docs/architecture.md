# Architecture

## Application architecture
- Stack: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4 (`@theme` in `app/globals.css`), Motion (`motion/react`).
- Site shape today is a primarily static content application with interactive client components for motion/audio.

## Framework and rendering model
- Framework: Next.js App Router (`/app`).
- Rendering mix:
  - Server-rendered routes by default (`app/archive/page.tsx`, `app/archive/[id]/page.tsx`).
  - Client-rendered interactive routes/components marked with `'use client'` (`app/page.tsx`, `app/music/page.tsx`, `components/*`).
- `app/archive/[id]/page.tsx` uses `generateStaticParams` from local `ARTIFACTS` data for static path generation.

## Routing
- `/` entry experience.
- `/archive` archive index.
- `/archive/[id]` artifact detail.
- `/music` sonic vault.
- Shared route UI states: `app/template.tsx`, `app/loading.tsx`, `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx`.

## Important directories
- `/app`: route tree, layout, route-state files.
- `/components`: feature components and global shell components.
- `/components/system`: reusable UI primitives (typography, surfaces, layout, buttons, links, media, states, telemetry).
- `/lib`: typed data models and in-repo content sources (`data.ts`, `music-data.ts`).
- `/docs`: architecture and governance documentation.

## Shared providers and global shell
`app/layout.tsx` composes the permanent shell:
- `<AudioProvider>` (global audio state + playback engine)
- `<Cursor>` (fine-pointer-only custom cursor)
- `<Navigation>` (desktop + mobile navigation)
- `<GlobalPlayer>` (persistent audio controls)
- `<Footer>`

## State architecture
- Local UI state: React `useState` per component (bootloader, nav menu, view toggles, overlays).
- Global audio/application playback state: React Context in `components/audio-provider.tsx`.
- No external state manager (Zustand/Redux) is currently used.

## Server/client boundaries
- Server-safe data modules in `/lib` provide typed content.
- Client-only browser APIs are isolated in client components:
  - Web Audio (`AudioContext`, oscillator graph)
  - HTMLAudioElement playback
  - `navigator.mediaSession`
  - pointer/mouse motion and `sessionStorage`

## API architecture
- No custom `/app/api` routes currently exist.
- No backend service integration is wired yet.

## External services
- No runtime third-party analytics or commerce services are currently integrated.
- Remote media placeholders are loaded from `https://picsum.photos` (allowed in `next.config.ts`).

## Commerce architecture
- Not implemented yet.
- There are no product, cart, or checkout routes/components in the current app tree.

## Authentication
- Not implemented.
- No auth provider, session layer, or protected route logic exists.

## Media architecture (current implementation)
- UI images use `next/image` via `SystemImage` wrapper (`components/system/media.tsx`) with `referrerPolicy="no-referrer"`.
- Placeholder/prototype assets are external URLs and in-repo static image assets under `src/assets/images`.

## Build and deployment flow
- Dev server: `npm run dev` (port 3000).
- Lint: `npm run lint`.
- Typecheck: `npm run typecheck`.
- Build: `npm run build` (Next production build).
- Start: `npm run start`.

## Important constraints
- Preserve global `AudioProvider` wrapping in layout to keep playback state across route changes.
- Preserve responsive behavior in navigation, player, and layout grid primitives.
- Avoid replacing system primitives with ad-hoc styling; reuse `/components/system`.
- Keep heavy interactive/experimental modules isolated so they can be lazy-loaded in later phases.
