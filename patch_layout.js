const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

// Insert import
code = code.replace(
  "import Footer from '@/components/footer';",
  "import Footer from '@/components/footer';\nimport { CinematicBackground } from '@/components/cinematic-background';"
);

// Insert component
code = code.replace(
  "<Cursor />",
  "<Cursor />\n          <CinematicBackground />"
);

fs.writeFileSync('app/layout.tsx', code);
