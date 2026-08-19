# Component Governance

## Governance policy
- Reuse mature components before building new ones.
- Extend existing primitives in `components/system` when changes are foundational.
- Keep feature-specific experiments isolated from shared primitives.

## Foundation components
- Navigation shell: `components/navigation.tsx`, `components/footer.tsx`
- Typography: `components/system/typography.tsx`
- Buttons/links: `components/system/button.tsx`, `components/system/link.tsx`
- Media: `components/system/media.tsx`
- Layout/containers: `components/system/container.tsx`, `components/system/surface.tsx`
- Page shell: `app/layout.tsx`, `app/template.tsx`

## Experience components
- Bootloader: `components/bootloader.tsx`
- Music player UI: `components/global-player.tsx`
- Audio engine/provider: `components/audio-provider.tsx`
- Archive viewer routes: `app/archive/page.tsx`, `app/archive/[id]/page.tsx`
- Visual effects/cursor/magnetic systems: `components/cursor.tsx`, `components/magnetic.tsx`, `components/art-direction-showcase.tsx`

## Commerce components
- Not implemented yet.
- Planned categories: product cards/pages, cart controls, checkout handoff UI, collection browsing.

## Utility components
- Error/loading states: `components/system/states.tsx`, `app/error.tsx`, `app/global-error.tsx`, `app/loading.tsx`, `app/not-found.tsx`
- Telemetry primitives: `components/system/telemetry.tsx`

## Change management rules
- If a component is shared in multiple routes, treat changes as high-impact and validate all consumers.
- Avoid silent behavior removals in interactive components (navigation, audio, archive, player).
- Document architectural changes when shared component responsibilities change.
