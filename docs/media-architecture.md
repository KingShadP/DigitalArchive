# Media Architecture

## Current repository reality
- Media in UI is primarily image-based and currently uses remote placeholders (`picsum.photos`) plus limited local image assets (`src/assets/images`).
- `SystemImage` wraps `next/image` to standardize rendering and referrer behavior.

## Storage model for production evolution

### Originals (masters)
- Store original high-resolution masters in a source-of-truth storage location (non-destructive).
- Never overwrite or replace original masters with optimized derivatives.

### Derivatives (delivery assets)
- Generate web-optimized derivatives (size/format variants).
- Keep master-to-derivative linkage in metadata.

## Media entity expectations
Each media item should eventually track:
- stable `id`
- asset `type` (image/video/3d/document)
- source/master location
- derivative URLs
- dimensions and format
- alt/caption/credit fields
- usage/license constraints

## Consumption patterns
- Images: use `next/image`/`SystemImage` with responsive sizing.
- Video: load only where needed; prefer streaming/CDN strategy for large files.
- 3D/experimental assets: isolate in lazy-loaded modules to avoid inflating base route payloads.
- Downloadable media: serve through controlled URLs with optional auth/signing when private content is introduced.

## Responsive sources
- Maintain breakpoint-aware asset selection for hero/editorial/media-heavy sections.
- Avoid serving oversized desktop assets to small mobile viewports.

## Metadata and governance
- Media records should include attribution, narrative context, and technical metadata.
- Separate permanent identity assets from campaign/editorial/experimental media at the metadata level.
