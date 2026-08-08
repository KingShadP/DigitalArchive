const fs = require('fs');
let code = fs.readFileSync('app/archive/[id]/client-page.tsx', 'utf8');

code = code.replace(
  "import Image from 'next/image';",
  "import Image from 'next/image';\nimport { ArtifactImage } from '@/components/artifact-image';"
);

code = code.replace(
  /<Image \n                              src=\{related\.media\[0\]\.thumbnailUrl\}\n                              alt=""\n                              fill\n                              className="object-cover grayscale group-hover:grayscale-0"\n                              unoptimized\n                            \/>/g,
  '<ArtifactImage src={related.media[0].thumbnailUrl} alt="" className="w-full h-full" />'
);

// We won't use ArtifactImage for the masterUrl because it uses next/image fill and we have object-contain logic there, 
// but we should change it to use next/image to be compliant with eslint
code = code.replace(
  /<img \n                          src=\{m\.masterUrl\} \n                          alt=\{artifact\.title\}\n                          className="max-w-full h-auto object-contain max-h-\[80vh\]"\n                        \/>/g,
  '<Image src={m.masterUrl} alt={artifact.title} width={1920} height={1080} className="w-full h-auto object-contain max-h-[80vh]" unoptimized />'
);

fs.writeFileSync('app/archive/[id]/client-page.tsx', code);
