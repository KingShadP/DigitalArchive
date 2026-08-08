const fs = require('fs');

// Patch audio-provider.tsx
let audioProvider = fs.readFileSync('components/audio-provider.tsx', 'utf8');

// The easiest way to fix the useEffect declaration order is to remove useCallback and reorder or just remove useCallback entirely if using React 19.
// But just to be safe, I'll move the useEffect block that references them down to just before legacy drone functionality.

const effectRegex = /\/\/ Update Media Session API.*?\}\n  \}, \[isPlaying, queue, queueIndex\]\);\n/s;
const effectMatch = audioProvider.match(effectRegex);
if (effectMatch) {
  audioProvider = audioProvider.replace(effectMatch[0], '');
  audioProvider = audioProvider.replace('// Legacy Drone functionality', effectMatch[0] + '\n  // Legacy Drone functionality');
}
fs.writeFileSync('components/audio-provider.tsx', audioProvider);

// Patch global-player.tsx
let globalPlayer = fs.readFileSync('components/global-player.tsx', 'utf8');
globalPlayer = globalPlayer.replace('{/* eslint-disable-next-line @next/next/no-img-element */}', '');
fs.writeFileSync('components/global-player.tsx', globalPlayer);
