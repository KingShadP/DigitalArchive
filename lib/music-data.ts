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
    id: "summons-and-supper",
    title: "Summons and Supper",
    type: "single",
    releaseDate: "July 14, 2026",
    artworkUrl: "/girgonglory.png",
    description: "The latest verified major-platform release by KingShadP. A ceremonial invitation and soundscape bridging orchestral tension, choir arrangements, and hip-hop authorship.",
    notes: "Official release date July 14, 2026. Conducted, produced, and mastered by KingShadP. Composed and written by Rashad Anthony Perry. Part ceremonial invitation, part command.",
    tracks: [
      {
        id: "sas-01",
        title: "Summons and Supper",
        duration: "03:52",
        audioSource: "/music/behold-the-twisted-beast.mp3",
        credits: ["KingShadP", "Rashad Anthony Perry"]
      }
    ],
    credits: [
      "Conductor, Producer & Mastering Engineer: KingShadP",
      "Songwriter, Composer & Lyricist: Rashad Anthony Perry",
      "Studio: KingShadP Studio"
    ],
    streamingLinks: {
      spotify: "#",
      appleMusic: "#",
      youtube: "#",
      soundcloud: "#"
    },
    relatedArchiveEntries: ["art-01", "art-03"]
  },
  {
    id: "behold-the-twisted-beast",
    title: "Behold, the Twisted Beast",
    type: "single",
    releaseDate: "June 19, 2026",
    artworkUrl: "/twisted-beast-cover.png",
    description: "Features KSP's Cathedral Regal Choir. An experimental exploration of generative synthesis, choir-scale arrangements, and brutalist sonic architecture.",
    notes: "Released June 19, 2026. Track was originally rendered live using custom hardware and a chain of analogue distortions, featuring the Cathedral Regal Choir. The file provided is the definitive digital artifact.",
    tracks: [
      {
        id: "bttb-01",
        title: "Behold, the Twisted Beast",
        duration: "03:45",
        audioSource: "/music/behold-the-twisted-beast.mp3",
        credits: ["KingShadP", "KSP's Cathedral Regal Choir"]
      }
    ],
    credits: [
      "Production, Mix, and Mastering: KingShadP",
      "Featured Choir: KSP's Cathedral Regal Choir",
      "Songwriting & Composition: Rashad Anthony Perry"
    ],
    streamingLinks: {
      spotify: "#",
      appleMusic: "#",
      youtube: "#",
      soundcloud: "#"
    },
    relatedArchiveEntries: ["art-[id]", "art-03"]
  },
  {
    id: "regal-echoes-of-god",
    title: "Regal Echoes of God",
    type: "album",
    releaseDate: "February 15, 2024",
    artworkUrl: "/background ksp.png",
    description: "A 13-track album-length statement running 36 minutes and 7 seconds. An environment where regal authority, sacred spectacle, luxury imagery, and abrupt emotional turns collide.",
    notes: "Released February 15, 2024. Contains a 5-minute piece ('High Like This (Life on Mars)') alongside a 23-second interlude ('She's a Killer, Psychopath Bitchhhhh'), establishing a non-conforming cinematic structure.",
    tracks: [
      { id: "reg-01", title: "Oh, You Looking for a Seat?", duration: "02:48", credits: ["KingShadP"] },
      { id: "reg-02", title: "High Like This (Life on Mars)", duration: "05:12", credits: ["KingShadP", "Rashad Anthony Perry"] },
      { id: "reg-03", title: "Sacred", duration: "03:15", credits: ["KingShadP"] },
      { id: "reg-04", title: "Famous Famous (Famous Amos)", duration: "02:50", credits: ["KingShadP"] },
      { id: "reg-05", title: "Luxury Shit", duration: "03:04", credits: ["KingShadP"] },
      { id: "reg-06", title: "Jurassic Park", duration: "02:40", credits: ["KingShadP"] },
      { id: "reg-07", title: "Fu.Th.Bi", duration: "02:15", credits: ["KingShadP"] },
      { id: "reg-08", title: "Unfortunately Bitches Can't Relax", duration: "03:10", credits: ["KingShadP"] },
      { id: "reg-09", title: "She's a Killer, Psychopath Bitchhhhh", duration: "00:23", credits: ["KingShadP"] },
      { id: "reg-10", title: "A Lil Freestyle", duration: "01:45", credits: ["KingShadP"] },
      { id: "reg-11", title: "This Is Why I Can't Have Nice Things", duration: "02:55", credits: ["KingShadP"] },
      { id: "reg-12", title: "Don't", duration: "02:30", credits: ["KingShadP"] },
      { id: "reg-13", title: "The King Kong and I", duration: "03:20", credits: ["KingShadP", "Rashad Anthony Perry"] }
    ],
    credits: [
      "Executive Producer & Performer: KingShadP",
      "Songwriting & Composition: Rashad Anthony Perry",
      "Studio: KingShadP Studio"
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/artist/7ElnjDMg4TCtoXJPv8nRQS",
      appleMusic: "https://music.apple.com/artist/1554804908",
      soundcloud: "#"
    },
    relatedArchiveEntries: ["art-02"]
  },
  {
    id: "unfinished-unedited-untitled",
    title: "Unfinished. Unedited. Untitled.",
    type: "ep",
    releaseDate: "September 19, 2023",
    artworkUrl: "/hf_20260808_023117_962b19e0-88eb-4e4e-88b4-5b773a65f702.png",
    description: "A 5-track breakthrough EP running approximately 16 minutes. Turns incompleteness into an artistic position, capturing raw artistic process in motion.",
    notes: "Released September 19, 2023. Five tracks capturing directness and resistance to being softened. Features 'Two Things!', 'Ksp God Flow', 'Ice King Shit', 'KingShit', and 'Reality'.",
    tracks: [
      { id: "uuu-01", title: "Two Things!", duration: "03:05", credits: ["KingShadP", "Rashad Anthony Perry"] },
      { id: "uuu-02", title: "Ksp God Flow", duration: "03:20", credits: ["KingShadP"] },
      { id: "uuu-03", title: "Ice King Shit", duration: "02:50", credits: ["KingShadP", "Rashad Anthony Perry"] },
      { id: "uuu-04", title: "KingShit", duration: "03:15", credits: ["KingShadP"] },
      { id: "uuu-05", title: "Reality", duration: "03:30", credits: ["KingShadP"] }
    ],
    credits: [
      "Performer: KingShadP",
      "Songwriter & Composer: Rashad Anthony Perry"
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/artist/7ElnjDMg4TCtoXJPv8nRQS",
      appleMusic: "https://music.apple.com/artist/1554804908"
    },
    relatedArchiveEntries: ["art-04"]
  },
  {
    id: "lets-get-high-and-make-music",
    title: "LET'S GET HIGH & MAKE MUSIC",
    type: "mix",
    releaseDate: "August 13, 2022",
    artworkUrl: "/hf_20260807_160838_54049bc3-26a4-4b97-9c76-4259cb8d00aa.png",
    description: "An archival 24-track collection representing the early Miami digital catalog. Remastered and preserved as foundational creative history.",
    notes: "Contains Miami-anchored records ('MIAMI', '4AM in Miami Freestyle'), motivational declarations, and experimental beats. Shows the early progression from independent uploads to a unified identity.",
    tracks: [
      { id: "lgh-01", title: "TRAVEL THE WORLD", duration: "03:10", credits: ["KingShadP"] },
      { id: "lgh-02", title: "THEY WRONG IM DIFFERENT", duration: "02:45", credits: ["KingShadP"] },
      { id: "lgh-03", title: "ICON", duration: "03:00", credits: ["KingShadP"] },
      { id: "lgh-04", title: "A LIVING NIGHTMARE", duration: "02:55", credits: ["KingShadP"] },
      { id: "lgh-05", title: "MISSION IMPOSSIBLE", duration: "03:15", credits: ["KingShadP"] },
      { id: "lgh-06", title: "I HAVE A PURPOSE", duration: "03:05", credits: ["KingShadP"] },
      { id: "lgh-07", title: "NO SYMPATHY!", duration: "02:40", credits: ["KingShadP"] },
      { id: "lgh-08", title: "Apple of my Eye", duration: "03:20", credits: ["KingShadP (Producer)"] },
      { id: "lgh-09", title: "That Ass!", duration: "02:50", credits: ["KingShadP", "beatdemons (Producer)"] },
      { id: "lgh-10", title: "MIAMI", duration: "03:00", credits: ["KingShadP"] },
      { id: "lgh-11", title: "4AM in Miami Freestyle", duration: "02:35", credits: ["KingShadP"] },
      { id: "lgh-12", title: "GREATNESS", duration: "03:10", credits: ["KingShadP"] },
      { id: "lgh-13", title: "RICHMAN", duration: "02:50", credits: ["KingShadP"] },
      { id: "lgh-14", title: "SAUDI (WHAT YOU KNOW ABOUT THAT?)", duration: "03:05", credits: ["KingShadP"] }
    ],
    credits: [
      "Recording Artist: KingShadP",
      "Songwriting: Rashad Anthony Perry",
      "Guest Production: beatdemons ('That Ass!')"
    ],
    streamingLinks: {
      soundcloud: "https://soundcloud.com",
      bandcamp: "#"
    },
    relatedArchiveEntries: ["art-05"]
  }
];
