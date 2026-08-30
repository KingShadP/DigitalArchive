import { MEDIA, MEDIA_REGISTRY, MediaAssetConfig } from '../data/media';

export type ExperienceMode = 'EXPERIENCE' | 'LISTEN' | 'VISUAL' | 'ARCHIVE';

export interface ExperienceScene {
  id: string;
  chapter:
    | 'entry'
    | 'music'
    | 'visual'
    | 'archive'
    | 'story'
    | 'object'
    | 'portal';
  media: {
    type: 'video' | 'image';
    src: string;
    poster?: string;
    desktopPosition?: string;
    mobilePosition?: string;
    playbackRate?: number;
    brightness?: number;
    blurTreatment?: number;
    overlayStrength?: number;
  };
  theme: {
    background: string;
    foreground: string;
    accent?: string;
    chrome?: 'light' | 'dark';
  };
  content: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    description?: string;
  };
  actions?: {
    label: string;
    href?: string;
    action?: string;
    target?: string;
  }[];
  soundtrack?: string;
  transition?: {
    enter: 'blur' | 'fade' | 'focus' | 'mask' | 'cut';
    exit: 'blur' | 'fade' | 'focus' | 'mask' | 'cut';
  };
}

export interface Era {
  id: string;
  name: string;
  years: string;
  accent: string;
  heroMedia: string;
  releases: string[];
  visuals: string[];
  archive: string[];
  statement?: string;
}

export interface TrackWorld {
  trackId: string;
  dominantColor: string;
  media: string[];
  videoSrc?: string;
  quote?: string;
  story?: string;
  credits?: string[];
  relatedArchiveIds?: string[];
  visualIntensity?: number;
}

export const ERAS: Era[] = [
  {
    id: 'sanctum',
    name: 'SANCTUM ERA',
    years: '2026 — PRESENT',
    accent: '#B76E79',
    heroMedia: MEDIA.scenePrimary,
    releases: ['behold-the-twisted-beast'],
    visuals: ['sanctum-env-1', 'giragon-sculpture', 'sanctum-env-2'],
    archive: ['arch-001', 'arch-002', 'arch-003', 'arch-004', 'arch-005', 'arch-006'],
    statement: 'The convergence of natural 432 Hz Pythagorean acoustics, obsidian monoliths, and sovereign visual mythology.',
  },
  {
    id: 'genesis',
    name: 'GENESIS ERA',
    years: '2024 — 2025',
    accent: '#8A9A86',
    heroMedia: MEDIA.cinematicA,
    releases: [],
    visuals: ['obsidian-maquette'],
    archive: ['arch-005b', 'arch-007'],
    statement: 'Foundational investigations into subtractive architecture, typographical discipline, and frequency restraint.',
  },
];

export interface TimelineNode {
  year: string;
  milestone: string;
  category: 'ORIGIN' | 'MUSIC' | 'VISUAL ERA' | 'RELEASE' | 'CURRENT';
  description: string;
  location?: string;
  relatedMedia?: string;
}

export const KINGSHADP_TIMELINE: TimelineNode[] = [
  {
    year: '1994',
    milestone: 'Miami Origins',
    category: 'ORIGIN',
    location: 'Miami, FL',
    description: 'Earliest acoustic consciousness, sub-bass immersion, and foundational aesthetic discipline formed in South Florida.',
    relatedMedia: '/KINGSHADP PHOTO.png',
  },
  {
    year: '2023',
    milestone: 'Unfinished. Unedited. Untitled. — EP',
    category: 'MUSIC',
    description: 'Raw, unpolished singer/songwriter release featuring "Ice King Shit" (102 BPM), exploring sparse acoustic intimacy and emotional isolation.',
    relatedMedia: '/background ksp.png',
  },
  {
    year: '2024 — 2025',
    milestone: 'Genesis Era & Subtractive Architecture',
    category: 'VISUAL ERA',
    description: 'Foundational investigations into 3D maquettes, obsidian forms, and the birth of the Giragon mythological creature identity.',
    relatedMedia: '/ROSE GOLD GIRAGON.png',
  },
  {
    year: '2026',
    milestone: 'Behold, the Twisted Beast (Sanctum Opus 01)',
    category: 'RELEASE',
    description: 'Landmark high-intensity orchestral pop opus released June 19, 2026. 112 BPM, Latinate choir chants, and full 432 Hz Pythagorean master.',
    relatedMedia: '/twisted-beast-cover.png',
  },
  {
    year: '2026 — PRESENT',
    milestone: 'Living Experience Engine & Codex',
    category: 'CURRENT',
    description: 'The continuous digital universe connecting music, imagery, memory, and physical artifacts in real-time.',
    relatedMedia: '/THE GIRAGON.png',
  },
];

export const STUDENT_PRIMER_DATA = {
  title: 'Decoding the Vibe: A Student’s Primer on Musical Analytics',
  introduction:
    'Modern listening is no longer a passive act—it is a process of data-driven discovery. The Experience Engine elevates music from an MP3 file into a multidimensional narrative entry point where audio data dictates visual and atmospheric reality.',
  pillars: [
    {
      name: 'Melodicness',
      definition:
        'The degree to which a song possesses clear, memorable tunes following well-defined musical patterns.',
      emotionalImpact:
        'High scores indicate clear instrumental or vocal lines easily recalled by the listener (e.g. liturgical Latinate chants).',
    },
    {
      name: 'Acousticness',
      definition:
        'A measure of reliance on physical instruments (piano, strings, brass, drums) versus digital synthesis.',
      emotionalImpact:
        'Distinguishes organic warmth of physical performance from synthetic precision of electronic production.',
    },
    {
      name: 'Valence',
      definition:
        'The musical positivity or emotional tone conveyed through harmonic and rhythmic components.',
      emotionalImpact:
        'High valence tracks evoke euphoria and triumph; low valence indicates melancholy, sadness, or atmospheric tension.',
    },
    {
      name: 'Danceability',
      definition:
        'A combination of tempo stability, rhythmic patterns, and beat emphasis.',
      emotionalImpact:
        'Determines suitability for rhythmic movement based on consistent tempo and strong downbeats.',
    },
    {
      name: 'Energy',
      definition:
        'Perceived intensity influenced by tempo, dynamics, and musical instrumentation density.',
      emotionalImpact:
        'High energy signals a driving, intense experience; low energy feels musically sparse, calm, and contemplative.',
    },
    {
      name: 'BPM',
      definition:
        'Beats Per Minute; the core tempo or heartbeat of the track.',
      emotionalImpact:
        'Sets fundamental pace, urgency, and physiological response of the listener.',
    },
  ],
  caseStudies: [
    {
      id: 'twisted-beast',
      title: 'Behold, the Twisted Beast',
      releaseDate: 'June 19, 2026',
      genre: 'Pop / Orchestral Pop Density',
      bpm: 112,
      melodicness: 88,
      acousticness: 64,
      valence: 78,
      danceability: 58,
      energy: 92,
      highlights: [
        'High Melodicness (88%): Result of repetitive liturgical Latinate chants (Kyrie, Aeterna) performed by KSP’s Cathedral Regal Choir.',
        'High Energy (92%): Dense full Symphony Orchestra, Background Vocals, and Choir creating "heavy grace".',
        'Narrative Synthesis: Aggressive lyrics ("A spirit carved in muscle", "I am the fire and the storm") justify dramatic high-valence intensity.',
      ],
    },
    {
      id: 'ice-king-shit',
      title: 'Ice King Shit',
      releaseDate: 'September 19, 2023',
      genre: 'Singer/Songwriter (Unfinished. Unedited. Untitled. - EP)',
      bpm: 102,
      melodicness: 72,
      acousticness: 82,
      valence: 34,
      danceability: 68,
      energy: 46,
      highlights: [
        'Steady 102 BPM Pulse: Deliberate tempo stability providing a stable rhythmic environment for movement.',
        'High Acousticness (82%): Focused acoustic structure with raw piano and intimate vocals.',
        'Low-to-Neutral Valence (34%): Atmospheric melancholy reflecting raw, unedited emotional honesty.',
      ],
    },
  ],
  audioAnalysisArchitecture: {
    title: 'The 3-Step Audio Analysis Architecture',
    steps: [
      {
        step: 1,
        title: 'The Interface',
        desc: 'The Web Audio API and AnalyserNode (fftSize=256, smoothing=0.85) monitor audio streams in real-time.',
      },
      {
        step: 2,
        title: 'Value Extraction',
        desc: 'Extracts restrained real-time values: Frequency, Peak, and RMS (Root Mean Square average loudness).',
      },
      {
        step: 3,
        title: 'Visual Mapping',
        desc: 'Maps technical values to CSS custom properties (--audio-energy, --audio-low) to subtly modulate blur, scale, and brightness.',
      },
    ],
  },
  takeaways: [
    'Recognize BPM as the heartbeat of the track, setting foundational pace.',
    'Identify Valence to decode emotional "color" (triumph vs. melancholy).',
    'Use Melodicness to isolate patterns that make a composition memorable.',
    'Assess Energy to gauge instrumentation density and perceived intensity.',
  ],
};

export const TRACK_WORLDS: Record<string, TrackWorld> = {
  'track-01': {
    trackId: 'track-01',
    dominantColor: '#B76E79',
    media: ['/twisted-beast-cover.png', '/girgonglory.png'],
    videoSrc: MEDIA.scenePrimary,
    quote: 'A spirit carved in muscle. I am the fire and the storm.',
    story:
      'A landmark study in high-intensity analytical profiles (112 BPM). High Melodicness (88%) is driven by liturgical Latinate chants (Kyrie, Aeterna) by KSP’s Cathedral Regal Choir. Dense orchestration yields 92% Energy and heavy grace.',
    credits: [
      'Composition: KingShadP',
      "Choir: KSP's Cathedral Regal Choir",
      'Orchestra: Full Sanctum Symphony',
      'Mastering: -14 LUFS 432Hz Subterranean Chamber',
    ],
    relatedArchiveIds: ['arch-001', 'arch-002', 'arch-006'],
    visualIntensity: 0.92,
  },
  'track-02': {
    trackId: 'track-02',
    dominantColor: '#7A8B99',
    media: ['/background ksp.png'],
    videoSrc: MEDIA.cinematicB,
    quote: 'Cold breath on the glass, unedited and raw.',
    story:
      'From Unfinished. Unedited. Untitled. - EP (Sept 19, 2023). A masterclass in controlled atmosphere, steady 102 BPM deliberate pulse, and intimate singer-songwriter acoustic warmth (82% Acousticness).',
    credits: [
      'Composition & Vocals: KingShadP',
      'Acoustic Grand Piano: KingShadP',
      'Engineering: Raw Tape Capture',
    ],
    relatedArchiveIds: ['arch-003', 'arch-005b'],
    visualIntensity: 0.46,
  },
  'track-03': {
    trackId: 'track-03',
    dominantColor: '#8A9A86',
    media: ['/THE GIRAGON.png'],
    videoSrc: MEDIA.cinematicB,
    quote: 'Beyond the armor and the stone, the human heart beats all alone.',
    story:
      'Intimate vocal cadences paired with heavy sonic undertones, 28Hz sub-drone frequencies, and raw testimony.',
    credits: [
      'Lead Vocals: KingShadP & KING SHAHD PEE',
      'Sub-Harmonic Cello: Sanctum Chamber',
    ],
    relatedArchiveIds: ['arch-004', 'arch-006'],
    visualIntensity: 0.65,
  },
  'track-04': {
    trackId: 'track-04',
    dominantColor: '#C49A70',
    media: ['/ROSE GOLD GIRAGON.png'],
    videoSrc: MEDIA.cinematicC,
    quote: 'Relentless discipline carved in midnight rhythm.',
    story:
      'High-intensity 92 BPM nocturnal rhythm exploring discipline and relentless creative momentum.',
    credits: [
      'Production: KingShadP',
      'Synthesizers: Analog Subterranean Rack',
    ],
    relatedArchiveIds: ['arch-005', 'arch-007'],
    visualIntensity: 0.84,
  },
  'track-05': {
    trackId: 'track-05',
    dominantColor: '#5A6B7C',
    media: ['/girgonglory.png'],
    videoSrc: MEDIA.portal,
    quote: 'Sub-bass pulses through the midnight fog.',
    story:
      'Driving 128 BPM pulse engineered for hypnotic club resonance and spatial stereo field expansion.',
    credits: [
      'Synthesizers & Drum Programming: KingShadP',
      'Spatial Mastering: 432Hz Lossless',
    ],
    relatedArchiveIds: ['arch-002', 'arch-004'],
    visualIntensity: 0.88,
  },
};

export const EXPERIENCE_SCENES: ExperienceScene[] = [
  {
    id: 'scene-hero',
    chapter: 'entry',
    media: {
      type: 'video',
      src: MEDIA.scenePrimary,
      poster: '/THE GIRAGON.png',
      desktopPosition: 'center 35%',
      mobilePosition: 'center center',
      playbackRate: 1.0,
      brightness: 0.85,
      overlayStrength: 0.45,
    },
    theme: {
      background: '#050505',
      foreground: '#F4F1EC',
      accent: '#B76E79',
      chrome: 'dark',
    },
    content: {
      eyebrow: 'KINGSHADP // SANCTUM CODEX',
      title: 'EVERYTHING I MAKE',
      subtitle: 'LEAVES EVIDENCE.',
      description: 'Music, imagery, memory and creation assembled into one evolving body of work. Enter the current KingShadP experience.',
    },
    actions: [
      { label: 'LISTEN NOW', action: 'play' },
      { label: 'ENTER THE ARCHIVE →', action: 'scroll', target: 'archive-index' },
    ],
  },
  {
    id: 'scene-music',
    chapter: 'music',
    media: {
      type: 'video',
      src: MEDIA.cinematicB,
      poster: '/TWISTED BEART COVER ART.png',
      desktopPosition: 'center 45%',
      playbackRate: 1.0,
      brightness: 0.8,
      overlayStrength: 0.55,
    },
    theme: {
      background: '#080808',
      foreground: '#F4F1EC',
      accent: '#B76E79',
    },
    content: {
      eyebrow: 'CHAPTER 01 // SOUND ARCHITECTURE',
      title: 'NOW PLAYING',
      subtitle: 'BEHOLD THE TWISTED BEAST',
      description: 'Synthesizing sub-bass frequency vectors, orchestral brass friction, and vacuum pauses in 432 Hz Pythagorean resonance.',
    },
  },
  {
    id: 'scene-visual',
    chapter: 'visual',
    media: {
      type: 'video',
      src: MEDIA.cinematicA,
      poster: '/girgonglory.png',
      desktopPosition: 'center 40%',
      playbackRate: 0.95,
      brightness: 0.75,
      overlayStrength: 0.5,
    },
    theme: {
      background: '#060606',
      foreground: '#F4F1EC',
      accent: '#B76E79',
    },
    content: {
      eyebrow: 'CHAPTER 03 // VISUAL MONOLITHS',
      title: 'SPATIAL PROJECTIONS',
      description: 'Raytraced environments, volumetric lighting, and physical form captures from the Sanctum era.',
    },
  },
  {
    id: 'scene-archive',
    chapter: 'archive',
    media: {
      type: 'video',
      src: MEDIA.cinematicC,
      poster: '/background ksp.png',
      desktopPosition: 'center center',
      playbackRate: 0.9,
      brightness: 0.75,
      overlayStrength: 0.6,
    },
    theme: {
      background: '#050505',
      foreground: '#F4F1EC',
      accent: '#B76E79',
    },
    content: {
      eyebrow: 'CHAPTER 05 // ARCHIVE DATABASE',
      title: 'ARCHIVE MATRIX',
      description: 'Permanent chronological codex documenting music master cuts, 3D sculptures, executive dossiers, and acoustic manuscripts.',
    },
  },
  {
    id: 'scene-portal',
    chapter: 'portal',
    media: {
      type: 'video',
      src: MEDIA.portal,
      poster: '/ROSE GOLD GIRAGON.png',
      desktopPosition: 'center center',
      playbackRate: 1.0,
      brightness: 0.9,
      overlayStrength: 0.5,
    },
    theme: {
      background: '#040404',
      foreground: '#F4F1EC',
      accent: '#B76E79',
    },
    content: {
      eyebrow: 'CHAPTER 07 // INGRESS THRESHOLD',
      title: 'THE SANCTUM CONTINUES',
      description: 'Direct communication dispatch, archival acquisition, and ongoing releases.',
    },
  },
];

export const FEATURES = {
  archive: true,
  visualArchive: true,
  musicPlayer: true,
  commerce: true,
  memoryMode: true,
  randomDiscovery: true,
  ambientMediaLayer: true,
  audioReactivity: true,
  keyboardShortcuts: true,
  community: false,
  premiereMode: false,
  unlockables: false,
  pwa: false,
  immersiveSound: false,
};
