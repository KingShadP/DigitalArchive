export interface ArchiveRecord {
  id: string;
  year: number;
  type: 'MUSIC' | 'VISUAL' | 'WRITING' | 'PROCESS' | 'OBJECT' | 'IDENTITY';
  title: string;
  era: string;
  status: 'CURRENT' | 'PUBLIC' | 'ARCHIVED' | 'CLASSIFIED';
  thumbnail: string;
  description: string;
  meta: string;
  downloadUrl?: string;
  tags?: string[];
}

export const archiveRecords: ArchiveRecord[] = [
  {
    id: 'arch-001',
    year: 2026,
    type: 'MUSIC',
    title: 'Behold the Twisted Beast (Master Recording)',
    era: 'SANCTUM ERA',
    status: 'CURRENT',
    thumbnail: '/twisted-beast-cover.png',
    description: 'The foundational orchestral release defining the KingShadP sonic architecture in 432 Hz.',
    meta: 'AUDIO // 3:42 // 24-BIT LOSSLESS',
    tags: ['432Hz', 'Orchestral', 'Sub-Bass', 'Master Cut', 'Sanctum'],
  },
  {
    id: 'arch-002',
    year: 2026,
    type: 'VISUAL',
    title: 'Giragon Sculpture (Sanctum Edition Render)',
    era: 'SANCTUM ERA',
    status: 'PUBLIC',
    thumbnail: '/girgonglory.png',
    description: '3D spatial artifact representing the fusion of giraffe elegance and dragon power.',
    meta: 'RENDER // 4K OBSIDIAN MATRIX',
    tags: ['Maquette', 'Obsidian', 'Hybrid', 'RoseGold', 'Monolith'],
  },
  {
    id: 'arch-003',
    year: 2026,
    type: 'WRITING',
    title: 'KingShadP Executive Dossier & Professional Profile',
    era: 'SANCTUM ERA',
    status: 'PUBLIC',
    thumbnail: '/background ksp.png',
    description: 'Official portfolio dossier outlining creative vision, creative direction methodologies, and sound design philosophy.',
    meta: 'DOCUMENT // MLA FORMAT // PDF',
    downloadUrl: '/KingShadP_MLA_Professional_Profile.pdf',
    tags: ['Dossier', 'Codex', 'MLA', 'Philosophy', 'Architecture'],
  },
  {
    id: 'arch-004',
    year: 2026,
    type: 'VISUAL',
    title: 'The Giragon Sovereign Monolith Render',
    era: 'SANCTUM ERA',
    status: 'PUBLIC',
    thumbnail: '/THE GIRAGON.png',
    description: 'Cinematic keyframe capturing the threshold between physical structure and infinite vacuum.',
    meta: 'CINEMATIC STILL // RAYTRACED',
    tags: ['Volumetric', 'Raytraced', 'Environment', 'Sanctum'],
  },
  {
    id: 'arch-005',
    year: 2026,
    type: 'OBJECT',
    title: 'The Rose Gold Giragon (Maquette Study)',
    era: 'SANCTUM ERA',
    status: 'CURRENT',
    thumbnail: '/ROSE GOLD GIRAGON.png',
    description: 'Physical maquette exploration engineered with matte obsidian and rose gold trim.',
    meta: 'PHYSICAL OBJECT // EDITION OF 12',
    tags: ['Physical', 'LimitedEdition', 'Sculpture', 'Obsidian'],
  },
  {
    id: 'arch-006',
    year: 2026,
    type: 'PROCESS',
    title: 'Sub-Harmonic 28Hz Frequency Vector Notes',
    era: 'SANCTUM ERA',
    status: 'ARCHIVED',
    thumbnail: '/TWISTED BEART COVER ART.png',
    description: 'Acoustic notes detailing the layering of vacuum decay and brass dissonances in score production.',
    meta: 'ACOUSTIC MANUSCRIPT',
    tags: ['28Hz', 'Infrasound', 'AcousticNotes', 'ScoreManuscript'],
  },
  {
    id: 'arch-005b',
    year: 2025,
    type: 'IDENTITY',
    title: 'Foundational Monogram & Typographic System',
    era: 'GENESIS ERA',
    status: 'ARCHIVED',
    thumbnail: '/KINGSHADP PHOTO.png',
    description: 'Early typographic rules establishing KSP monogram purity and 1487x1058 grid proportions.',
    meta: 'STYLE CODEX // SPECIFICATION',
    tags: ['Identity', 'Grid', 'Typography', 'Monogram'],
  },
  {
    id: 'arch-007',
    year: 2025,
    type: 'PROCESS',
    title: 'Subtractive Architecture Studies Vol. 1',
    era: 'GENESIS ERA',
    status: 'ARCHIVED',
    thumbnail: '/KINGSHADP-logos_transparent.png',
    description: 'Theoretical essays on negative space as an active compositional tool in audio and spatial design.',
    meta: 'ESSAY // RESTRAINED ESSENTIALS',
    tags: ['NegativeSpace', 'Architecture', 'Theory', 'Essays'],
  },
];
