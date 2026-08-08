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
export const RELEASES: Release[] = [
  {
    id: "behold-the-twisted-beast",
    title: "Behold, the Twisted Beast",
    type: "single",
    releaseDate: "2024",
    artworkUrl: "/music/twisted-beast-cover.png",
    description: "An experimental exploration of generative synthesis and brutalist sonic architecture. A manifestation of the internal labyrinth.",
    notes: "Track was originally rendered live using custom hardware and a chain of analogue distortions. The file provided is the definitive digital artifact.",
    tracks: [
      {
        id: "bttb-01",
        title: "Behold, the Twisted Beast",
        duration: "03:45",
        audioSource: "/music/behold-the-twisted-beast.mp3",
        credits: ["KingShadP"]
      }
    ],
    credits: ["Production, Mix, and Mastering: KingShadP"],
    streamingLinks: {
      soundcloud: "#",
      bandcamp: "#"
    },
    relatedArchiveEntries: ["art-01"]
  }
];
