export interface MusicalAnalytics {
  melodicness: number; // 0-100% (Pattern clarity, liturgical chants, memorability)
  acousticness: number; // 0-100% (Physical instruments vs digital synthesis)
  valence: number; // 0-100% (Emotional tone: high=euphoric/triumphant, low=melancholic/moody)
  danceability: number; // 0-100% (Tempo stability, rhythmic movement, downbeat emphasis)
  energy: number; // 0-100% (Instrumentation density, dynamics, intensity)
  bpm: number; // Beats Per Minute
  analysisSummary?: string;
  instruments?: string[];
  vocalArrangement?: string;
}

export interface Track {
  id: string;
  number: string;
  title: string;
  artist: string;
  duration: string;
  bpm: number;
  key: string;
  tuning: string;
  audioSrc: string;
  lyrics?: string[];
  notes?: string;
  analytics?: MusicalAnalytics;
}

export interface Release {
  id: string;
  artist: string;
  title: string;
  subtitle?: string;
  year: number;
  releaseDate?: string;
  era: string;
  artwork: string;
  secondaryArtwork?: string;
  audio: string;
  genre: string;
  catalogNumber: string;
  credits: {
    composition: string;
    production: string;
    engineering: string;
    artDirection: string;
    choir?: string;
    orchestra?: string;
  };
  technicalSpecs: {
    tuning: string;
    mastering: string;
    dynamicRange: string;
    frequencyRange: string;
  };
  links: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
    soundcloud?: string;
  };
  tracks: Track[];
}

export const releases: Release[] = [
  {
    id: 'behold-the-twisted-beast',
    artist: 'KingShadP',
    title: 'Behold the Twisted Beast',
    subtitle: 'Original Composition // Sanctum Opus 01',
    year: 2026,
    releaseDate: 'June 19, 2026',
    era: 'SANCTUM ERA',
    artwork: '/twisted-beast-cover.png',
    secondaryArtwork: '/twisted beast cover art.png',
    audio: '/music/behold-the-twisted-beast.mp3',
    genre: 'Pop / Orchestral Pop Density / Sub-bass Minimalist',
    catalogNumber: 'KSP-2026-001',
    credits: {
      composition: 'KingShadP',
      production: 'KingShadP Executive Sound Unit',
      engineering: 'Sanctum Frequency Master',
      artDirection: 'KingShadP Visual Directive',
      choir: "KSP's Cathedral Regal Choir",
      orchestra: 'Full Sanctum Symphony Orchestra',
    },
    technicalSpecs: {
      tuning: '432 Hz Sanctum Harmonic',
      mastering: '-14 LUFS Subterranean Matrix',
      dynamicRange: '24-bit / 96kHz Lossless',
      frequencyRange: '18 Hz - 22.4 kHz',
    },
    links: {
      spotify: 'https://open.spotify.com/artist/KingShadP',
      appleMusic: 'https://music.apple.com/artist/kingshadp',
      youtube: 'https://youtube.com/@kingshadp',
      soundcloud: 'https://soundcloud.com/kingshadp',
    },
    tracks: [
      {
        id: 'track-01',
        number: '01',
        title: 'Behold, the Twisted Beast',
        artist: 'KingShadP',
        duration: '3:42',
        bpm: 112,
        key: 'D Minor',
        tuning: '432 Hz',
        audioSrc: '/music/behold-the-twisted-beast.mp3',
        lyrics: [
          'A spirit carved in muscle, rising through the stone.',
          'I am the fire and the storm, sovereign on the throne.',
          'Kyrie, Aeterna — whispers in the gold.',
          'Everything subtracted leaves the evidence untold.',
        ],
        notes:
          'Constructed around a deep 28Hz fundamental drone overlaid with liturgical-style Latinate chants (Kyrie, Aeterna) by KSP Cathedral Regal Choir and dense orchestral brass.',
        analytics: {
          bpm: 112,
          melodicness: 88,
          acousticness: 64,
          valence: 78,
          danceability: 58,
          energy: 92,
          analysisSummary:
            'A landmark study in high-intensity analytical profiles. The high Melodicness (88%) is driven by repetitive liturgical Latinate chants performed by KSP’s Cathedral Regal Choir. Dense orchestration yields 92% Energy and high-valence dramatic intensity.',
          instruments: ['Full Orchestra', 'Sub-Bass Drone (28Hz)', 'Staccato Brass', 'Pipe Organ'],
          vocalArrangement: "Cathedral Regal Choir (Latinate Chants: Kyrie, Aeterna)",
        },
      },
      {
        id: 'track-02',
        number: '02',
        title: 'Ice King Shit',
        artist: 'KingShadP',
        duration: '3:15',
        bpm: 102,
        key: 'A Minor',
        tuning: '432 Hz',
        audioSrc: '/music/PRIVATE GOD (SIDE B_ THE HUMAN) ft. KING SHAHD PEE.mp3',
        lyrics: [
          'Cold breath on the glass, unedited and raw.',
          'No crown required when you write the law.',
          'Standing in the freeze with an open hand,',
          'Pacing the perimeter of untamed land.',
        ],
        notes:
          'From Unfinished. Unedited. Untitled. - EP (Released Sept 19, 2023). A masterclass in controlled atmosphere, steady 102 BPM pulse, and intimate singer-songwriter acoustic warmth.',
        analytics: {
          bpm: 102,
          melodicness: 72,
          acousticness: 82,
          valence: 34,
          danceability: 68,
          energy: 46,
          analysisSummary:
            'Controlled atmospheric study with 102 BPM steady pulse. High acousticness (82%) provides physical warmth, while low-to-neutral valence (34%) creates a reflective, melancholy sonic environment.',
          instruments: ['Acoustic Grand Piano', 'Close-Mic Vocal', 'Subtle Cello Resonance'],
          vocalArrangement: 'Single-Mic Intimate Singer/Songwriter',
        },
      },
      {
        id: 'track-03',
        number: '03',
        title: 'PRIVATE GOD (Side B: The Human)',
        artist: 'KingShadP ft. KING SHAHD PEE',
        duration: '3:50',
        bpm: 85,
        key: 'G Minor',
        tuning: '440 Hz',
        audioSrc: '/music/PRIVATE GOD (SIDE B_ THE HUMAN) ft. KING SHAHD PEE.mp3',
        lyrics: [
          'Beyond the armor and the stone,',
          'The human heart beats all alone.',
          'Heavy grace and whispered prayer,',
          'Breathing subterranean air.',
        ],
        notes:
          'Intimate vocal cadences paired with heavy sonic undertones and raw lyrical testimony.',
        analytics: {
          bpm: 85,
          melodicness: 76,
          acousticness: 55,
          valence: 42,
          danceability: 52,
          energy: 65,
          analysisSummary:
            'Contrasts raw human vulnerability with subterranean bass frequencies and heavy vocal harmonies.',
          instruments: ['Baritone Vocals', 'Sub-Harmonic Cello', 'Analog Tape Reverb'],
          vocalArrangement: 'Dual Harmony Lead Vocals',
        },
      },
      {
        id: 'track-04',
        number: '04',
        title: 'DoubleShift',
        artist: 'KingShadP',
        duration: '2:48',
        bpm: 92,
        key: 'E Minor',
        tuning: '432 Hz',
        audioSrc: '/music/doubleShift shit.m4a',
        notes: 'High-intensity nocturnal rhythm exploring discipline and the grind of relentless creation.',
        analytics: {
          bpm: 92,
          melodicness: 65,
          acousticness: 30,
          valence: 60,
          danceability: 74,
          energy: 84,
          analysisSummary:
            'Focused driving tempo with rhythmic stability and aggressive percussive downbeats.',
          instruments: ['Drum Machines', 'Analog Bassline', 'Compressed Synthesizers'],
        },
      },
      {
        id: 'track-05',
        number: '05',
        title: 'Neon Fog (Midnight Techno)',
        artist: 'KingShadP',
        duration: '4:12',
        bpm: 128,
        key: 'F# Minor',
        tuning: '432 Hz',
        audioSrc: '/music/Neon Fog_ Midnight Techno V1.wav',
        notes: 'Hypnotic sub-bass pulses and driving nocturnal synthesizers shrouded in dense reverberation.',
        analytics: {
          bpm: 128,
          melodicness: 58,
          acousticness: 18,
          valence: 48,
          danceability: 86,
          energy: 88,
          analysisSummary:
            'Driving 128 BPM pulse engineered for hypnotic club resonance and spatial stereo field expansion.',
          instruments: ['Modular Synthesizers', 'Low-pass Sub-kick', 'Modulated Fog Pads'],
        },
      },
    ],
  },
];
