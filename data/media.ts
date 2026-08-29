export interface MediaAssetConfig {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  title: string;
  chapter?: string;
  desktopPosition?: string;
  mobilePosition?: string;
  playbackRate?: number;
  brightness?: number; // 0 to 1
  blurTreatment?: number; // px
  overlayStrength?: number; // 0 to 1
  transitionStyle?: 'blur' | 'fade' | 'focus' | 'mask' | 'cut';
  caption?: string;
}

export const MEDIA = {
  scenePrimary:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260723_145606_ab143199-b593-4941-bb1b-9afca215416b.mp4',

  portal:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4',

  cinematicA:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4',

  cinematicB:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4',

  cinematicC:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4',
} as const;

export const MEDIA_REGISTRY: Record<string, MediaAssetConfig> = {
  scenePrimary: {
    id: 'scenePrimary',
    type: 'video',
    src: MEDIA.scenePrimary,
    poster: '/THE GIRAGON.png',
    title: 'Sanctum Atmospheric Master Film',
    chapter: 'entry',
    desktopPosition: 'center 35%',
    mobilePosition: 'center center',
    playbackRate: 1.0,
    brightness: 0.85,
    blurTreatment: 0,
    overlayStrength: 0.45,
    transitionStyle: 'fade',
    caption: 'Primary obsidian architectural monolith and light dispersion.',
  },
  portal: {
    id: 'portal',
    type: 'video',
    src: MEDIA.portal,
    poster: '/ROSE GOLD GIRAGON.png',
    title: 'Vertical Threshold & Portal Ingress',
    chapter: 'portal',
    desktopPosition: 'center center',
    mobilePosition: 'center center',
    playbackRate: 1.0,
    brightness: 0.9,
    blurTreatment: 0,
    overlayStrength: 0.5,
    transitionStyle: 'mask',
    caption: 'Vertical monolith light doorway framing infinite space.',
  },
  cinematicA: {
    id: 'cinematicA',
    type: 'video',
    src: MEDIA.cinematicA,
    poster: '/girgonglory.png',
    title: 'Sculptural Volume & Giragon Shadow',
    chapter: 'visual',
    desktopPosition: 'center 40%',
    mobilePosition: 'center center',
    playbackRate: 0.95,
    brightness: 0.8,
    blurTreatment: 0,
    overlayStrength: 0.4,
    transitionStyle: 'focus',
    caption: 'Spatial study of mythological form and reflection.',
  },
  cinematicB: {
    id: 'cinematicB',
    type: 'video',
    src: MEDIA.cinematicB,
    poster: '/twisted-beast-cover.png',
    title: 'Acoustic Resonance & Wave Chamber',
    chapter: 'music',
    desktopPosition: 'center 45%',
    mobilePosition: 'center center',
    playbackRate: 1.0,
    brightness: 0.85,
    blurTreatment: 0,
    overlayStrength: 0.45,
    transitionStyle: 'fade',
    caption: 'Sub-harmonic pulse translated to cinematic light friction.',
  },
  cinematicC: {
    id: 'cinematicC',
    type: 'video',
    src: MEDIA.cinematicC,
    poster: '/background ksp.png',
    title: 'Memory Codex & Historic Fragments',
    chapter: 'archive',
    desktopPosition: 'center center',
    mobilePosition: 'center center',
    playbackRate: 0.9,
    brightness: 0.8,
    blurTreatment: 0,
    overlayStrength: 0.5,
    transitionStyle: 'blur',
    caption: 'Archival timeline records dissolving through fluid memory.',
  },
};
