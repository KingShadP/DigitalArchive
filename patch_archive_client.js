const fs = require('fs');
let code = fs.readFileSync('app/archive/client-page.tsx', 'utf8');

// replace raw img with ArtifactImage
code = code.replace(
  "import Image from 'next/image';",
  "import Image from 'next/image';\nimport { ArtifactImage } from '@/components/artifact-image';"
);

code = code.replace(
  /<Image \n              src=\{media\.thumbnailUrl\}\n              alt=\{artifact\.title\}\n              fill\n              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100 group-hover:scale-105"\n              unoptimized\n            \/>/g,
  '<ArtifactImage src={media.thumbnailUrl} alt={artifact.title} className="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />'
);

fs.writeFileSync('app/archive/client-page.tsx', code);
