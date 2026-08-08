export type StreamingLinks = {
  spotify?: string;
  appleMusic?: string;
  soundcloud?: string;
  youtube?: string;
  bandcamp?: string;
  tidal?: string;
};

export type Track = {
  id: string;
  title: string;
  duration?: string;
  audioSource?: string; // URL to the actual audio file
  lyrics?: string;
  credits?: string[];
};

export type ReleaseType = 'album' | 'ep' | 'single' | 'mix' | 'soundscape';

export type Release = {
  id: string;
  title: string;
  type: ReleaseType;
  releaseDate: string;
  artworkUrl?: string; // URL to cover art
  description?: string;
  notes?: string; // editorial context
  tracks: Track[];
  credits?: string[];
  streamingLinks?: StreamingLinks;
  relatedVisuals?: string[]; // URLs to images or video
  relatedArchiveEntries?: string[]; // IDs linking to ARTIFACTS
};

// Data architecture ready for factual content.
// Awaiting population by the artist. Do not fabricate entries.
export const RELEASES: Release[] = [];
