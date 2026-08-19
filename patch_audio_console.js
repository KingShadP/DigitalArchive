const fs = require('fs');
let code = fs.readFileSync('components/audio-provider.tsx', 'utf8');
code = code.replace(/console\.error\("Playback failed", e\);/g, 'console.error("Playback failed", e.message || e);');
code = code.replace(/console\.error\(e\)/g, 'console.error(e.message || e)');
code = code.replace(/console\.error\('Audio generation failed', err\);/g, 'console.error("Audio generation failed", err.message || err);');
fs.writeFileSync('components/audio-provider.tsx', code);
