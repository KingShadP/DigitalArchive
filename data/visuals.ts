export interface VisualAsset {
  id: string;
  title: string;
  year: number;
  era: string;
  medium: string;
  aspectRatio: '3:4' | '4:3' | '16:9' | '1:1' | 'tall';
  src: string;
  category: 'monolith' | 'worldbuilding' | 'sculpture' | 'identity' | 'study';
  notes: string;
  dimensions?: string;
  materials?: string;
}

export const visualAssets: VisualAsset[] = [
  {
    id: 'giragon-glory',
    title: 'The Giragon: Sanctum Glory Edition',
    year: 2026,
    era: 'SANCTUM ERA',
    medium: 'Sculptural Hybrid Study & Render',
    aspectRatio: '1:1',
    src: '/girgonglory.png',
    category: 'sculpture',
    notes: 'The emblematic fusion of celestial giraffe height and dragon sovereignty. Cast in matte obsidian finish with rose gold atmospheric edge illumination.',
    dimensions: 'Monumental 1:1 Scale Simulation',
    materials: 'Brushed Obsidian Composite, Rose Gold PVD, Anodized Titanium',
  },
  {
    id: 'the-giragon-master',
    title: 'The Giragon // Sovereign Monolith',
    year: 2026,
    era: 'SANCTUM ERA',
    medium: 'Cinematic Spatial Keyframe',
    aspectRatio: '1:1',
    src: '/THE GIRAGON.png',
    category: 'monolith',
    notes: 'Architectural volumetric light study examining atmospheric presence and the sovereign creature manifestation.',
    dimensions: '4K Master Keyframe Resolution',
    materials: 'Raytraced Atmospheric Volumetrics, Monochromatic Stage',
  },
  {
    id: 'rose-gold-giragon',
    title: 'Rose Gold Giragon Sculpture Study',
    year: 2026,
    era: 'SANCTUM ERA',
    medium: 'Digital Environmental Render',
    aspectRatio: '1:1',
    src: '/ROSE GOLD GIRAGON.png',
    category: 'sculpture',
    notes: 'Exploration of monolithic anatomy, brushed metallic reflectivity, and acoustic resonance balance.',
    dimensions: 'Ultra-Wide Cinematic Canvas',
    materials: 'Rose Gold Composite, Ambient Zenith Illumination',
  },
  {
    id: 'twisted-beast-art',
    title: 'Behold the Twisted Beast // Master Cover Art',
    year: 2026,
    era: 'SANCTUM ERA',
    medium: 'Physical-Digital Artwork Archive',
    aspectRatio: '1:1',
    src: '/TWISTED BEART COVER ART.png',
    category: 'identity',
    notes: 'Official campaign key artwork for the 2026 flagship orchestral release. Framing the silhouette in disciplined negative space.',
    dimensions: '3000 x 3000px Vinyl Master',
    materials: 'Archival Matte Giclée Print on Heavyweight Rag',
  },
  {
    id: 'kingshadp-portrait',
    title: 'KingShadP // Master Portrait Study',
    year: 2026,
    era: 'GENESIS ERA',
    medium: 'Executive Photographic Monograph',
    aspectRatio: '3:4',
    src: '/KINGSHADP PHOTO.png',
    category: 'identity',
    notes: 'Architectural portrait study capturing tonal depth, discipline, and presence.',
    dimensions: 'Medium Format Film Resolution',
    materials: 'Analog Silver Gelatin Emulsion',
  },
  {
    id: 'background-ksp-env',
    title: 'KingShadP Digital Identity Core',
    year: 2026,
    era: 'GENESIS ERA',
    medium: 'High-Contrast Identity Key',
    aspectRatio: '16:9',
    src: '/background ksp.png',
    category: 'identity',
    notes: 'Foundational visual architecture mapping the intersection between pure black canvas and directional platinum highlight.',
    dimensions: 'Digital Monolith',
    materials: 'Monochromatic Palette // Deep Black #050505',
  },
  {
    id: 'kingshadp-logo-transparent',
    title: 'Emblematic Sovereign Sigil // Transparent Vector Plate',
    year: 2026,
    era: 'SANCTUM ERA',
    medium: 'Final Emblematic Artifact',
    aspectRatio: '1:1',
    src: '/KINGSHADP-logos_transparent.png',
    category: 'monolith',
    notes: 'The resolved heraldry of KingShadP. Pure geometric restraint.',
    dimensions: 'Archival Plate',
    materials: 'Vector Geometry & Rose Gold Accentuation',
  },
];
