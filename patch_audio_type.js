const fs = require('fs');
let code = fs.readFileSync('components/audio-provider.tsx', 'utf8');
code = code.replace(/console\.error\("Audio generation failed", err\.message \|\| err\);/g, 'console.error("Audio generation failed", err instanceof Error ? err.message : String(err));');
fs.writeFileSync('components/audio-provider.tsx', code);
