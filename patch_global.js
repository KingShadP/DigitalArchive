const fs = require('fs');
let code = fs.readFileSync('components/global-player.tsx', 'utf8');
code = code.replace(
  "{currentRelease?.title} // {currentTrack.credits?.join(', ') || 'KingShadP'}",
  "{currentRelease?.title} {'//'} {currentTrack.credits?.join(', ') || 'KingShadP'}"
);
fs.writeFileSync('components/global-player.tsx', code);
