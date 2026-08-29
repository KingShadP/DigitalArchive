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

export const TRACK_WORLDS: Record<string, TrackWorld> = {
  'track-01': {
    trackId: 'track-01',
    dominantColor: '#B76E79',
    media: ['/TWISTED BEART COVER ART.png', '/girgonglory.png'],
    videoSrc: MEDIA.scenePrimary,
    quote: 'In the silence before the surge, everything subtracted reveals the crown.',
    story: 'Constructed around a deep 28Hz fundamental drone overlaid with staccato brass harmonics and vacuum decay intervals.',
    credits: [
      'Composition: KingShadP',
      'Orchestration: KingShadP Executive Sound Unit',
      'Mastering: -14 LUFS 432Hz Chamber',
    ],
    relatedArchiveIds: ['arch-001', 'arch-002', 'arch-006'],
    visualIntensity: 0.85,
  },
  'track-02': {
    trackId: 'track-02',
    dominantColor: '#7A8B99',
    media: ['/THE GIRAGON.png'],
    videoSrc: MEDIA.cinematicB,
    quote: 'Geometry is the silence in which frequency reverberates.',
    story: 'Atmospheric cello frictions and platinum-tipped mallet strikes recorded in vaulted acoustical stone.',
    credits: [
      'Composition: KingShadP',
      'Acoustic Engineering: Sanctum Studio A',
    ],
    relatedArchiveIds: ['arch-004', 'arch-006'],
    visualIntensity: 0.7,
  },
  'track-03': {
    trackId: 'track-03',
    dominantColor: '#C49A70',
    media: ['/ROSE GOLD GIRAGON.png'],
    videoSrc: MEDIA.cinematicC,
    quote: 'Rose gold captures the light that obsidian absorbs.',
    story: 'Sub-harmonic pulse interacting with tape-decay analog synthesizers.',
    credits: [
      'Composition: KingShadP',
      'Modular Synthesizer: KingShadP',
    ],
    relatedArchiveIds: ['arch-005', 'arch-007'],
    visualIntensity: 0.9,
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
