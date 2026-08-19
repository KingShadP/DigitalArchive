# Content Model

This model documents current in-repo schemas plus Phase 0 target entities without fabricating factual records.

## Implemented schemas

### Artifact (`lib/data.ts`)
- `id`, `entry`, `title`, `subtitle`, `description`, `status`, `hash`, `coords`, `lore`, `specs[]`, `frequency`
- Used by:
  - archive listing (`app/archive/page.tsx`)
  - artifact detail route (`app/archive/[id]/page.tsx`)

### Music schemas (`lib/music-data.ts`)
- `StreamingLinks`
- `Track`
- `Release` + `ReleaseType`
- `RELEASES` currently intentionally empty pending real source data.

## Target entity set for future phases
Define these as typed models before backend/CMS ingestion:
- `ArtistProfile`
- `Release`
- `Track`
- `VisualProject`
- `ArchiveEntry`
- `EditorialStory`
- `Campaign`
- `MediaAsset`
- `Product`
- `ExternalLink`
- `Credit`
- `Collection`
- `DigitalExperiment`

## Modeling rules
- Reuse existing `Artifact`, `Release`, and `Track` fields where possible.
- Keep factual fields separated from presentation-only fields.
- Track relationship keys explicitly (e.g., release ↔ tracks, release ↔ archive entries, campaign ↔ media assets).
- Do not fabricate artist facts or release metadata; keep placeholders empty until verified source data is available.
