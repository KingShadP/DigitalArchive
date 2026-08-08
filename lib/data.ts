export interface Artifact {
  id: string;
  entry: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  hash: string;
  coords: string;
  lore: string;
  specs: { label: string; val: string }[];
  frequency: string;
}

export const ARTIFACTS: Artifact[] = [
  {
    id: 'art-01',
    entry: 'ENTRY_01 // SECURE',
    title: 'Sonic Weaving',
    subtitle: 'NFC ACCELERATOR COLLAR',
    description: 'Integrated NFC signals within clothing tags that open continuous high-contrast ambient audio waves synced directly with the current user location.',
    status: 'PROTOTYPING',
    hash: 'H-927A0B7C',
    coords: '80.12° N / 144.11° E',
    lore: 'Embedded deeply within the high-density double-weave collar structure, the NFC capsule interfaces with the KingShadP sonic satellite network. Upon physical validation, it initiates a 48Hz deep orbital drone customized to your environment’s acoustic geometry. A perfect translation of space and garment.',
    specs: [
      { label: 'CHIP TYPE', val: 'NFC-v4.9 Ultra Shielded' },
      { label: 'ENCRYPTION', val: 'AES-256 GCM' },
      { label: 'FREQUENCY', val: '13.56 MHz Standard' },
      { label: 'COATING', val: 'Liquid carbon polymer' }
    ],
    frequency: '48.00 Hz'
  },
  {
    id: 'art-02',
    entry: 'ENTRY_02 // SYSTEM',
    title: 'Architectural Vaults',
    subtitle: 'VIRTUAL BLUEPRINT CORRIDOR',
    description: 'CGI collections rendered entirely within simulated geometric, monochromatic concrete halls. No physical settings or standard retail layouts.',
    status: 'RESEARCH',
    hash: 'H-1108D82F',
    coords: '90.00° N / 0.00° W',
    lore: 'Impossible, scale-less structures built inside concrete digital simulations. These volumes act as lookbooks where items are suspended in mid-air, resisting virtual gravity. Designed with infinite vaults, they present the garments not as merchandise, but as relics rescued from a decommissioned space station.',
    specs: [
      { label: 'RENDER ENG', val: 'Realtime Unreal Engine 6' },
      { label: 'POLYGONS', val: '14,200,000 instanced' },
      { label: 'RESOLUTION', val: 'Raw 8K stereoscopic' },
      { label: 'RAYTRACING', val: 'Path traced offline bias' }
    ],
    frequency: '104.20 MHz'
  },
  {
    id: 'art-03',
    entry: 'ENTRY_03 // TRANS',
    title: 'Numerical Drops',
    subtitle: 'TYPOGRAPHIC DECRYPTION PORTAL',
    description: 'Unannounced access pages protected by visual and numerical code sequences hidden within typographic patterns of previous architectural files.',
    status: 'SYSTEM_ON',
    hash: 'H-55C71E9D',
    coords: '35.67° N / 139.65° E',
    lore: 'An active digital riddle. These hidden spaces are only accessible by decrypting string patterns embedded inside the microscopic typography of our physical lookbooks. Once cracked, a secure terminal link spawns to lease rare individual garment models.',
    specs: [
      { label: 'HASH SEED', val: 'SHA3-512 Random Orbit' },
      { label: 'RESOLVER', val: 'Diffie-Hellman Key v2' },
      { label: 'CIPHER', val: 'Vigenère typographic shift' },
      { label: 'TTL', val: '180 seconds per session' }
    ],
    frequency: '921.05 KHz'
  },
  {
    id: 'art-04',
    entry: 'ENTRY_04 // UTILITY',
    title: 'Monolith Garments',
    subtitle: 'CARBON-MATTE SHELL SHEATH',
    description: 'Heavy structural outer coats tailored with raw carbon-cotton blends blocking infrared signatures and preserving clean monumental silhouettes.',
    status: 'PRODUCTION',
    hash: 'H-449FF10A',
    coords: '52.52° N / 13.40° E',
    lore: 'Structured outwear modeled on monolithic geometry. Featuring heavy-insulated high-neck hoods and asymmetric double-breasted zippers, this piece acts as a protective shield in noisy environments. The heavy weight creates physical tension, altering your posture to command authority.',
    specs: [
      { label: 'THREAD WT', val: '720 GSM Raw Cotton & Carbon' },
      { label: 'THERMAL CAP', val: '99.4% IR Blockage' },
      { label: 'ARMOR TIER', val: 'Level II tactical weave' },
      { label: 'COLORWAY', val: 'Pitch Void Matte Black' }
    ],
    frequency: '12.40 GHz'
  },
  {
    id: 'art-05',
    entry: 'ENTRY_05 // INTERFACE',
    title: 'Orbital Transmitters',
    subtitle: 'KINETIC ANALOG HARNESS',
    description: 'Analog interface transmitters tracking live satellite magnetic sweeps, translating telemetry maps directly into synthesizer control signals.',
    status: 'ENCODING',
    hash: 'H-9034EBA8',
    coords: '0.00° S / 102.45° W',
    lore: 'A micro-transmitter module designed to click onto tactical harness rigs. Capturing magnetic disturbances from low-Earth orbit satellites, it translates mathematical orbits into raw analog control voltages, filtering live ambient synth sounds on your physical sound system.',
    specs: [
      { label: 'ANTENNA', val: 'Dipole microline array' },
      { label: 'TELEMETRY', val: 'VHF Uplink 144.1 MHz' },
      { label: 'POWER SRC', val: 'Kinetic heat harvester' },
      { label: 'COMPAT', val: 'Analog synth level v1' }
    ],
    frequency: '144.10 MHz'
  },
  {
    id: 'art-06',
    entry: 'ENTRY_06 // SENSOR',
    title: 'Spectral Panel Caps',
    subtitle: 'FOCAL ALIGNMENT PANEL',
    description: 'Low-profile tactical panels with spatial filters calibrated to respond to localized electromagnetic noise and ambient user attention.',
    status: 'COMPLETED',
    hash: 'H-097FEE14',
    coords: '40.71° N / 74.00° W',
    lore: 'Low-profile cap panels that track ambient light variations to align visual elements on wearer\'s wrist devices. Designed with graphene composite structure, they absorb 99.8% of light to remain black and low-key at any angle.',
    specs: [
      { label: 'WEIGHT', val: '42 grams ultralight' },
      { label: 'FLEXION', val: 'Dynamic structural memory' },
      { label: 'FILTER', val: 'Dual polarization' },
      { label: 'BONDING', val: 'Ultrasonic welded seams' }
    ],
    frequency: '3.42 GHz'
  },
  {
    id: 'behold-what-wouldnt-fit',
    entry: 'ENTRY_00 // ORIGIN',
    title: 'Behold What Wouldn\'t Fit',
    subtitle: 'THE LIVING ARCHIVE',
    description: 'The living archive of an artist who refused the box. Music, mythology, visual identity, apparel, and the divine archive.',
    status: 'ACTIVE_RECORD',
    hash: 'H-00000000',
    coords: '0.00° N / 0.00° W',
    lore: 'Not a biography. An evidence locker with an orchestra inside. The music became imagery. The imagery required bodies. The bodies required clothing. The clothing entered public space. Public space forgot what it had seen almost immediately, so an archive had to be built—not as a mausoleum, but as a living record capable of remembering while the artist continued creating.',
    specs: [
      { label: 'AUTHOR', val: 'KingShadP' },
      { label: 'CHAPTERS', val: '15 Active Records' },
      { label: 'GUARDIAN', val: 'The Giragon' },
      { label: 'STATUS', val: 'Current & Alive' }
    ],
    frequency: '0.00 Hz'
  }
];
