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
  author?: string;
  manuscriptText?: string;
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
    author: 'KingShadP',
    manuscriptText:
      'Behold the Twisted Beast represents Sanctum Opus 01, released June 19, 2026. The composition is built on a 112 BPM pulse and 432 Hz Pythagorean natural resonance. Featuring repetitive Latinate chants (Kyrie, Aeterna) performed by KSP’s Cathedral Regal Choir alongside dense full symphony orchestration, the piece establishes a 92% energy profile and 88% melodic memorability, embodying sovereign discipline and heavy grace.',
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
    author: 'KingShadP Visual Directive',
    manuscriptText:
      'The Giragon Sculpture stands as the primary totemic monolith of the Sanctum Era. Combining the biological majesty and quiet height of the giraffe with the raw muscular sovereignty of the dragon, the maquette utilizes subtractive obsidian contours framed with 18-karat rose gold leaf.',
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
    author: 'KingShadP Executive Sound & Spatial Unit',
    manuscriptText: `Executive Dossier and Professional Profile of KingShadP.

Section One: Creative Philosophy and Subtractive Architecture.
True creative mastery does not stem from infinite accumulation, but from relentless subtraction. In an era dominated by superficial noise, KingShadP enforces an austere creative discipline where every acoustic frequency, graphic stroke, and spatial render justifies its existence through mathematical necessity.

Section Two: Acoustic Engineering in 432 Hertz.
By aligning sound systems to 432 Hz Pythagorean resonance rather than standard 440 Hz commercial pitch, audio interacts directly with organic human physiology. Deep 28 Hz infrasonic foundations are layered beneath liturgical Latinate choral chants and staccato brass harmonics to produce an atmosphere of heavy grace and quiet sovereignty.

Section Three: The Giragon Totem and Multi-Disciplinary Worldbuilding.
Music is not treated as a detached audio file, but as an architectural key unlocking a unified mythos. The Giragon represents the coexistence of physical grace and sovereign power, bridging physical sculptures, digital interfaces, and spatial audio environments.`,
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
    author: 'KingShadP Visual Directive',
    manuscriptText:
      'Cinematic render capturing the Giragon emerging from volumetric obsidian fog. Raytraced global illumination calculates photon reflections off rose-gold accents, establishing the atmospheric tone for the entire Sanctum Era visual suite.',
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
    author: 'KingShadP Atelier',
    manuscriptText:
      'Physical study limited to an edition of 12 hand-numbered pieces. Each sculpture is hand-cast in mineral-loaded resin, finished in matte black obsidian composite, and lined with genuine rose gold leaf accents along the dorsal spines.',
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
    author: 'Sanctum Frequency Master',
    manuscriptText: `Acoustic Manuscript: Sub-Harmonic 28Hz Frequency Vector Notes.

Observation One: Infrasonic Resonance.
Frequencies between 20Hz and 30Hz are felt before they are heard. The 28Hz fundamental drone in Behold the Twisted Beast creates a physical bodily anchor that grounds the high-register choir arrangements.

Observation Two: Vacuum Decay Intervals.
Rather than allowing reverb to wash out percussive strikes, sudden vacuum gating cuts the stereo field instantaneously, creating breathtaking tension between sovereign presence and absolute silence.`,
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
    author: 'KingShadP Identity Directive',
    manuscriptText:
      'Typographic codex outlining the strict geometric ratios of the KSP monogram. Monospace telemetry markers pair with high-contrast serif headlines to ensure uncompromising clarity across both digital interfaces and printed physical artifacts.',
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
    author: 'KingShadP',
    manuscriptText: `Subtractive Architecture Studies Volume One: Negative Space as Compositional Form.

Essay Introduction:
Silence is not the absence of sound; it is the frame that gives sound its weight. In architecture, the void defines the room. In music, the space between notes creates the cadence.

The Principle of Essential Reduction:
When crafting an experience, begin by stripping away every decorative layer until only the core spine remains. If an element cannot stand without ornamentation, it does not belong in the universe. Subtractive discipline ensures that what remains holds eternal power.`,
  },
];
