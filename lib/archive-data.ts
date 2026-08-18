export type ArtifactClass = 
  | 'Photography'
  | 'Artwork'
  | 'Campaign'
  | 'Music artifact'
  | 'Video'
  | 'Document'
  | 'Digital experiment'
  | 'Object'
  | 'Editorial'
  | 'Behind-the-scenes'
  | 'Historical item';

export interface ArchiveArtifact {
  id: string;
  title: string;
  subtitle?: string;
  artifactClass: ArtifactClass;
  date: string; // ISO or year
  
  media: {
    type: 'image' | 'video' | 'audio' | 'model3d' | 'document';
    thumbnailUrl: string;
    masterUrl: string;
    aspectRatio?: '1:1' | '16:9' | '4:3' | '3:4' | '9:16' | 'auto';
  }[];
  
  description?: string;
  lore?: string;
  
  project?: string;
  collection?: string;
  
  relatedIds?: string[];
  
  metadata?: Record<string, string>;
}

export const ARCHIVE_ARTIFACTS: ArchiveArtifact[] = [
  {
    id: "art-01",
    title: "Sonic Weaving NFC Prototype",
    subtitle: "Accelerator Collar",
    artifactClass: "Object",
    date: "2024-03-12",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=100&auto=format&fit=crop",
        aspectRatio: "3:4"
      }
    ],
    description: "Integrated NFC signals within clothing tags that open continuous high-contrast ambient audio waves synced directly with the current user location.",
    lore: "Embedded deeply within the high-density double-weave collar structure, the NFC capsule interfaces with the KingShadP sonic satellite network. Upon physical validation, it initiates a 48Hz deep orbital drone customized to your environment’s acoustic geometry. A perfect translation of space and garment.",
    project: "Sonic Architecture",
    collection: "Hardware V1",
    metadata: {
      "CHIP TYPE": "NFC-v4.9 Ultra Shielded",
      "ENCRYPTION": "AES-256 GCM",
      "FREQUENCY": "13.56 MHz Standard",
      "COATING": "Liquid carbon polymer"
    }
  },
  {
    id: "art-02",
    title: "Architectural Vaults Blueprint",
    subtitle: "Virtual Corridor Generation",
    artifactClass: "Digital experiment",
    date: "2024-08-14",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=100&auto=format&fit=crop",
        aspectRatio: "16:9"
      }
    ],
    description: "CGI collections rendered entirely within simulated geometric, monochromatic concrete halls. No physical settings or standard retail layouts.",
    lore: "Impossible, scale-less structures built inside concrete digital simulations. These volumes act as lookbooks where items are suspended in mid-air, resisting virtual gravity. Designed with infinite vaults, they present the garments not as merchandise, but as relics rescued from a decommissioned space station.",
    project: "Virtual Kingdom",
    collection: "Digital Spaces",
    metadata: {
      "RENDER ENG": "Realtime Unreal Engine 6",
      "POLYGONS": "14,200,000 instanced",
      "RESOLUTION": "Raw 8K stereoscopic",
      "RAYTRACING": "Path traced offline bias"
    }
  },
  {
    id: "art-03",
    title: "Behold, the Twisted Beast - Cover Master",
    artifactClass: "Artwork",
    date: "2024-11-20",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=100&auto=format&fit=crop",
        aspectRatio: "1:1"
      }
    ],
    description: "The definitive digital artifact for Behold, the Twisted Beast.",
    project: "Behold, the Twisted Beast",
    relatedIds: ["art-01"]
  },
  {
    id: "art-04",
    title: "Monolith Garment Study",
    subtitle: "Carbon-Matte Shell Sheath",
    artifactClass: "Behind-the-scenes",
    date: "2023-11-05",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=100&auto=format&fit=crop",
        aspectRatio: "3:4"
      }
    ],
    description: "Heavy structural outer coats tailored with raw carbon-cotton blends blocking infrared signatures and preserving clean monumental silhouettes.",
    lore: "Structured outwear modeled on monolithic geometry. Featuring heavy-insulated high-neck hoods and asymmetric double-breasted zippers, this piece acts as a protective shield in noisy environments. The heavy weight creates physical tension, altering your posture to command authority.",
    metadata: {
      "THREAD WT": "720 GSM Raw Cotton & Carbon",
      "THERMAL CAP": "99.4% IR Blockage",
      "ARMOR TIER": "Level II tactical weave",
      "COLORWAY": "Pitch Void Matte Black"
    }
  },
  {
    id: "art-05",
    title: "Live Studio Session - Ambient Generator",
    artifactClass: "Music artifact",
    date: "2024-05-18",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=100&auto=format&fit=crop",
        aspectRatio: "16:9"
      }
    ],
    description: "Analog interface transmitters tracking live satellite magnetic sweeps, translating telemetry maps directly into synthesizer control signals.",
    lore: "A micro-transmitter module designed to click onto tactical harness rigs. Capturing magnetic disturbances from low-Earth orbit satellites, it translates mathematical orbits into raw analog control voltages, filtering live ambient synth sounds on your physical sound system.",
    project: "Sonic Architecture",
    metadata: {
      "ANTENNA": "Dipole microline array",
      "TELEMETRY": "VHF Uplink 144.1 MHz",
      "POWER SRC": "Kinetic heat harvester",
      "COMPAT": "Analog synth level v1"
    }
  },
  {
    id: "art-06",
    title: "Monochrome Editorial 01",
    subtitle: "Spectral Panel Caps",
    artifactClass: "Editorial",
    date: "2025-01-10",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=100&auto=format&fit=crop",
        aspectRatio: "3:4"
      }
    ],
    description: "Low-profile tactical panels with spatial filters calibrated to respond to localized electromagnetic noise and ambient user attention.",
    lore: "Low-profile cap panels that track ambient light variations to align visual elements on wearer's wrist devices. Designed with graphene composite structure, they absorb 99.8% of light to remain black and low-key at any angle.",
    metadata: {
      "WEIGHT": "42 grams ultralight",
      "FLEXION": "Dynamic structural memory",
      "FILTER": "Dual polarization",
      "BONDING": "Ultrasonic welded seams"
    }
  },
  {
    id: "art-07",
    title: "First Sketch of the Twisted Beast",
    artifactClass: "Document",
    date: "2022-08-01",
    media: [
      {
        type: "image",
        thumbnailUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80&auto=format&fit=crop",
        masterUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=100&auto=format&fit=crop",
        aspectRatio: "auto"
      }
    ],
    description: "Initial handwritten notes outlining the concept for Behold, the Twisted Beast.",
    project: "Behold, the Twisted Beast",
    relatedIds: ["art-03"]
  },
  {
    id: "cat-01",
    title: "KingShadP Biography & Origins",
    subtitle: "The Person Behind the Artist Name",
    artifactClass: "Editorial",
    date: "2026-08-05",
    media: [
      {
        type: "image",
        thumbnailUrl: "/girgonglory.png",
        masterUrl: "/girgonglory.png",
        aspectRatio: "1:1"
      }
    ],
    description: "Verified biography detailing Rashad Anthony Perry's Miami origins, independent uploads, and evolution into a unified creative identity.",
    lore: "KingShadP (pronounced 'KING SHAHD PEE') is an independent Miami-born hip-hop and rap artist whose work has expanded into a connected system of music, visual symbolism, editorial writing, digital design, and limited apparel. The credited legal name behind the writing and composition is Rashad Anthony Perry. His Miami roots supply color, confidence, heat, contradiction, and scale, while the later work reaches toward choirs, mythology, sculpture, editorial design, and digital architecture.",
    project: "Identity & Origin",
    collection: "Catalogue Dossier",
    metadata: {
      "ARTIST NAME": "KingShadP",
      "PRONUNCIATION": "KING SHAHD PEE",
      "CREDITED AUTHOR": "Rashad Anthony Perry",
      "ORIGIN": "Miami, Florida, United States",
      "PRIMARY GENRE": "Hip-hop / Rap / Cinematic"
    }
  },
  {
    id: "cat-02",
    title: "The Giragon & Studio Identity",
    subtitle: "Visual Symbolism & Emblem System",
    artifactClass: "Artwork",
    date: "2026-08-05",
    media: [
      {
        type: "image",
        thumbnailUrl: "/background ksp.png",
        masterUrl: "/background ksp.png",
        aspectRatio: "16:9"
      }
    ],
    description: "The official guardian symbol of KingShadP Studio combining the height of a giraffe with the wings and defensive force of a dragon.",
    lore: "The Giragon is the official guardian symbol of KingShadP Studio. It combines the height and long-range vision of a giraffe with the wings, memory, and defensive force of a dragon. Official descriptions associate the figure with vision, survival, restraint, elegance, transformation, and identity under pressure. The complete official suite includes the Giragon, halo crown, SP Crest, KSP monogram, and KingShadP signature wordmark under the motto: 'Originality is the new royalty.'",
    project: "Symbolic Architecture",
    collection: "KingShadP Studio",
    metadata: {
      "GUARDIAN": "The Giragon",
      "MARKS": "Halo Crown / SP Crest / KSP Monogram",
      "PALETTE": "Platinum / Oxblood / Void Black / Muted Gold",
      "MOTTO": "Originality is the new royalty"
    }
  },
  {
    id: "cat-03",
    title: "Verified Discography & Release Timeline",
    subtitle: "2022 – 2026 Canonical Archive",
    artifactClass: "Document",
    date: "2026-08-05",
    media: [
      {
        type: "image",
        thumbnailUrl: "/twisted-beast-cover.png",
        masterUrl: "/twisted-beast-cover.png",
        aspectRatio: "1:1"
      }
    ],
    description: "Comprehensive release timeline mapping the evolution from early digital uploads to album statements and choir-scale singles.",
    lore: "The discography spans three key layers: 1) The archival 24-track collection 'LET'S GET HIGH & MAKE MUSIC' (2022); 2) The breakthrough EP 'Unfinished. Unedited. Untitled.' (Sept 2023) and the 13-track album 'Regal Echoes of God' (Feb 2024); 3) The 2026 expansion featuring choir-scale architecture in 'Behold, the Twisted Beast' (June 2026) and 'Summons and Supper' (July 2026).",
    project: "Canonical Discography",
    collection: "Release Archive",
    metadata: {
      "2022 MIX": "LET'S GET HIGH & MAKE MUSIC",
      "2023 EP": "Unfinished. Unedited. Untitled.",
      "2024 ALBUM": "Regal Echoes of God",
      "2026 SINGLES": "Behold, the Twisted Beast / Summons and Supper"
    }
  }
];
