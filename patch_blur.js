const fs = require('fs');

let code = fs.readFileSync('components/artifact-image.tsx', 'utf8');
code = code.replace(
  "isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale group-hover:grayscale-0'",
  "isLoading ? 'scale-110 opacity-0 grayscale' : 'scale-100 opacity-100 grayscale group-hover:grayscale-0'"
);
fs.writeFileSync('components/artifact-image.tsx', code);
