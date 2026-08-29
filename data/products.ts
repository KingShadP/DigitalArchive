export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: string;
  primaryImage: string;
  detailImage: string;
  description: string;
  specs: {
    material: string;
    edition: string;
    dimensions: string;
    origin: string;
  };
  availability: 'AVAILABLE' | 'PRE-ORDER' | 'ARCHIVED' | 'ACQUIRED';
}

export const products: Product[] = [
  {
    id: 'giragon-sculpture-maquette',
    name: 'Giragon Obsidian Maquette',
    subtitle: 'Monumental Artifact // Sanctum Series',
    category: 'Sculptural Object',
    price: '$850',
    primaryImage: '/girgonglory.png',
    detailImage: '/ROSE GOLD GIRAGON.png',
    description: 'A physical translation of the sovereign Giragon hybrid. Precision-milled from high-density obsidian composite with a hand-applied matte finish and recessed rose gold edge inlays.',
    specs: {
      material: 'Density Obsidian Polymer & Rose Gold Inlay',
      edition: 'Numbered Edition of 24 Units',
      dimensions: '320mm × 140mm × 110mm (3.8 kg)',
      origin: 'Crafted in Tokyo & Los Angeles',
    },
    availability: 'AVAILABLE',
  },
  {
    id: 'sanctum-monograph-vol1',
    name: 'Sanctum Monograph // Volume I',
    subtitle: 'Documented Archive & Creative Codex',
    category: 'Archival Publication',
    price: '$140',
    primaryImage: '/background ksp.png',
    detailImage: '/KINGSHADP PHOTO.png',
    description: '312-page oversized hardcover folio printed on archival 200gsm Japanese cotton paper. Contains exhaustive scores, photographic proofs, philosophy essays, and unreleased structural schematics.',
    specs: {
      material: 'Embossed Black Linen Cover with Rose Gold Foil',
      edition: 'First Edition Archive Run',
      dimensions: '290mm × 370mm Hardcover Folio',
      origin: 'Printed in Florence, Italy',
    },
    availability: 'AVAILABLE',
  },
  {
    id: 'twisted-beast-vinyl-edition',
    name: 'Behold the Twisted Beast // 180g Vinyl',
    subtitle: 'Limited Master Pressing (432 Hz Direct Cut)',
    category: 'Sonic Artifact',
    price: '$65',
    primaryImage: '/twisted-beast-cover.png',
    detailImage: '/twisted beast cover art.png',
    description: 'Direct-to-metal acetate master pressed onto 180-gram heavyweight obsidian black vinyl at 45 RPM for maximal dynamic range and subterranean low-frequency fidelity.',
    specs: {
      material: '180g Pure Virgin Vinyl & Gatefold Monolith Jacket',
      edition: 'Limited Run of 500 Copies',
      dimensions: '12" LP with Foil-Stamped Lyric Insert',
      origin: 'Pressed in Haarlem, Netherlands',
    },
    availability: 'PRE-ORDER',
  },
];
