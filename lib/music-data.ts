export type ProjectType = 'album' | 'ep' | 'single' | 'mixtape' | 'soundscape' | 'score' | 'session' | 'installation';

export type StreamingPlatform =
  | 'spotify'
  | 'apple-music'
  | 'soundcloud'
  | 'youtube'
  | 'bandcamp'
  | 'tidal'
  | 'audiomack'
  | 'other';

export interface ArtworkAsset {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  credit?: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface StreamingLink {
  platform: StreamingPlatform;
  label: string;
  url: string;
}

export interface RelatedReference {
  id: string;
  type: 'release' | 'track' | 'visual' | 'archive';
  label?: string;
}

export interface Track {
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

export interface Release {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  projectType: ProjectType;
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
  featured?: boolean;
}

export interface MusicLibrary {
  releases: Release[];
  updatedAt?: string;
}

// Factual dataset placeholder. Populate only with verified artist-provided records.
export const MUSIC_LIBRARY: MusicLibrary = {
  releases: [],
};

export const RELEASES = MUSIC_LIBRARY.releases;

export const getReleaseBySlug = (slug: string) => RELEASES.find((release) => release.slug === slug);

export const getAllTracks = () =>
  RELEASES.flatMap((release) =>
    release.tracks.map((track) => ({
      ...track,
      release,
    })),
  );

export const getFeaturedRelease = () => RELEASES.find((release) => release.featured);

export const formatDurationLabel = (durationSeconds?: number, fallback?: string) => {
  if (fallback) return fallback;
  if (!durationSeconds || Number.isNaN(durationSeconds)) return undefined;

  const minutes = Math.floor(durationSeconds / 60);
  const seconds = Math.floor(durationSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
