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
}

export interface Release {
  id: string;
  artist: string;
  title: string;
  subtitle?: string;
  year: number;
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
    era: 'SANCTUM ERA',
    artwork: '/twisted-beast-cover.png',
    secondaryArtwork: '/twisted beast cover art.png',
    audio: '/music/behold-the-twisted-beast.mp3',
    genre: 'Cinematic Orchestral / Sub-bass Minimalist',
    catalogNumber: 'KSP-2026-001',
    credits: {
      composition: 'KingShadP',
      production: 'KingShadP Executive Sound Unit',
      engineering: 'Sanctum Frequency Master',
      artDirection: 'KingShadP Visual Directive',
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
        title: 'Behold the Twisted Beast',
        artist: 'KingShadP',
        duration: '3:42',
        bpm: 78,
        key: 'D Minor',
        tuning: '432 Hz',
        audioSrc: '/music/behold-the-twisted-beast.mp3',
        lyrics: [
          'In the silence before the surge,',
          'Where the obsidian pillars meet the low frequency.',
          'The Giragon walks in unhurried sovereign cadence.',
          'Everything subtracted reveals the crown.',
        ],
        notes: 'Constructed around a deep 28Hz fundamental drone overlaid with staccato brass harmonics and vacuum decay intervals.',
      },
      {
        id: 'track-02',
        number: '02',
        title: 'PRIVATE GOD (Side B: The Human)',
        artist: 'KingShadP ft. KING SHAHD PEE',
        duration: '3:50',
        bpm: 85,
        key: 'G Minor',
        tuning: '440 Hz',
        audioSrc: '/music/PRIVATE GOD (SIDE B_ THE HUMAN) ft. KING SHAHD PEE.mp3',
        notes: 'Intimate vocal cadences paired with heavy sonic undertones and raw lyrical testimony.',
      },
      {
        id: 'track-03',
        number: '03',
        title: 'DoubleShift',
        artist: 'KingShadP',
        duration: '2:48',
        bpm: 92,
        key: 'E Minor',
        tuning: '432 Hz',
        audioSrc: '/music/doubleShift shit.m4a',
        notes: 'High-intensity nocturnal rhythm exploring discipline and the grind of relentless creation.',
      },
      {
        id: 'track-04',
        number: '04',
        title: 'Neon Fog (Midnight Techno)',
        artist: 'KingShadP',
        duration: '4:12',
        bpm: 128,
        key: 'F# Minor',
        tuning: '432 Hz',
        audioSrc: '/music/Neon Fog_ Midnight Techno V1.wav',
        notes: 'Hypnotic sub-bass pulses and driving nocturnal synthesizers shrouded in dense reverberation.',
      },
    ],
  },
];
