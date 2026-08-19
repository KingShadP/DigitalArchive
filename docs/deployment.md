# Deployment and Quality Gates

## Runtime and framework
- Next.js 15 application (`next`) on Node.js runtime.
- `next.config.ts` enables strict TypeScript build checking (`ignoreBuildErrors: false`).

## Build/deploy workflow
1. `npm install`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run build`
5. `npm run start`

## Available project commands
- `npm run dev` — local development server on port 3000.
- `npm run build` — production build.
- `npm run lint` — ESLint checks.
- `npm run typecheck` — TypeScript checks (`tsc --noEmit`).
- `npm run test` — placeholder command that documents current absence of automated tests.

## Testing reality (Phase 0)
- There is no active automated test framework in this repository yet.
- The current `test` command intentionally exits successfully with a clear message to avoid implying test coverage that does not exist.

## Lightweight smoke-test strategy
Until a formal test framework is added, manually verify critical flows on each release candidate:
- Entry route (`/`)
- Primary navigation (desktop/mobile)
- Audio playback controls and persistence across route changes
- Archive index and detail route access
- Music route rendering and empty-state behavior
- External streaming link handling when releases are populated
- 404 route behavior

## Environment and config constraints
- Environment variables are documented in `.env.example`.
- Remote image loading is currently restricted to `picsum.photos` in `next.config.ts`.
