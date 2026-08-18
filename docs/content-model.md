# Content Model

This document defines the schemas and interfaces for factual content within the KingShadP universe. These schemas dictate how data is structured for UI consumption and future backend/CMS integration.

## 1. Artifact (Active Implementation)
Used to represent physical objects, digital experiments, and apparel within the KingShadP lore.

```typescript
export interface Artifact {
  id: string;
  entry: string;           // e.g., "ENTRY_01 // SECURE"
  title: string;           // e.g., "Sonic Weaving"
  subtitle: string;        // e.g., "NFC ACCELERATOR COLLAR"
  description: string;     // Short description
  status: string;          // e.g., "PROTOTYPING", "RESEARCH"
  hash: string;            // e.g., "H-927A0B7C"
  coords: string;          // e.g., "80.12° N / 144.11° E"
  lore: string;            // Deep narrative description
  specs: {                 // Technical details array
    label: string;
    val: string;
  }[];
  frequency: string;       // Associated telemetry/audio frequency
}
```

## 2. Sonic Vault Schemas (Implemented Foundation)

### Release / Track
```typescript
interface Release {
  id: string;
  slug: string;
  title: string;
  projectType: 'album' | 'ep' | 'single' | 'mixtape' | 'soundscape' | 'score' | 'session' | 'installation';
  releaseDate?: string;
  artwork?: ArtworkAsset;
  editorial?: string;
  notes?: string;
  credits?: Credit[];
  tracks: Track[];
  streamingLinks?: StreamingLink[];
  relatedVisuals?: ArtworkAsset[];
  relatedArchiveEntries?: string[];
  relatedReleases?: RelatedReference[];
}

interface Track {
  id: string;
  slug: string;
  title: string;
  durationSeconds?: number;
  durationLabel?: string;
  audioSource?: string;
  lyrics?: string;
  notes?: string;
  credits?: Credit[];
  streamingLinks?: StreamingLink[];
  relatedVisuals?: ArtworkAsset[];
  relatedArchiveEntries?: string[];
}
```

### VisualProject / EditorialStory
```typescript
interface EditorialStory {
  id: string;
  slug: string;
  title: string;
  coverImage: MediaAsset;
  layoutType: 'asymmetric' | 'monolith' | 'fluid';
  blocks: (TextBlock | MediaBlock | WebGLBlock)[];
}
```

### MediaAsset
```typescript
interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'model3d';
  altText: string;
  url: string;
  blurDataUrl?: string; // For Next.js Image placeholders
  dimensions?: { width: number; height: number };
}
```
