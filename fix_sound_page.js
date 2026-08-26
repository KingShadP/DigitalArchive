const fs = require('fs');

let page = fs.readFileSync('app/sound/page.tsx', 'utf8');

// Line 111 replacement
page = page.replace(
  /<div key=\{track\.id\} onClick=\{\(\) => \{ if\(isThisTrackActive\) \{ togglePlayPause\(\); \} else \{ playTrack\(track, track\.release, allTracks\); \} \}\} className="grid grid-cols-12 gap-4 py-4 border-b border-border\/20 hover:bg-surface transition-colors items-center group cursor-pointer">/g,
  `<div key={track.id} \n                      role="button"\n                      tabIndex={0}\n                      onClick={() => { if(isThisTrackActive) { togglePlayPause(); } else { playTrack(track, track.release, allTracks); } }}\n                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (isThisTrackActive) togglePlayPause(); else playTrack(track, track.release, allTracks); } }}\n                      className="grid grid-cols-12 gap-4 py-4 border-b border-border/20 hover:bg-surface transition-colors items-center group cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-foreground">`
);

// Line 150 replacement
page = page.replace(
  /className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer hover:bg-surface transition-colors"\s*onClick=\{onToggle\}/g,
  `className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer hover:bg-surface transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        role="button"
        tabIndex={0}
        aria-expanded={isActive}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}`
);

// Line 225 replacement
page = page.replace(
  /<div key=\{track\.id\} onClick=\{\(\) => isThisTrackActive \? togglePlayPause\(\) : playTrack\(track, release, release\.tracks\)\} className="flex items-center justify-between py-3 border-b border-border\/20 group hover:px-2 transition-all cursor-pointer">/g,
  `<div key={track.id} \n                      role="button"\n                      tabIndex={0}\n                      onClick={() => isThisTrackActive ? togglePlayPause() : playTrack(track, release, release.tracks)} \n                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (isThisTrackActive) togglePlayPause(); else playTrack(track, release, release.tracks); } }}\n                      className="flex items-center justify-between py-3 border-b border-border/20 group hover:px-2 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-foreground">`
);

// Disable inner buttons tab index
page = page.replace(/<button className="w-8 h-8 rounded-full border border-foreground\/20 flex items-center justify-center group-hover:border-foreground\/50 transition-colors">/g,
  `<button tabIndex={-1} aria-hidden="true" className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-foreground/50 transition-colors">`
);

page = page.replace(/<button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-white">/g,
  `<button tabIndex={-1} aria-hidden="true" className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-white">`
);

page = page.replace(/<button className=\{\`w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-500 \$\{isActive \? 'border-foreground bg-foreground text-background' : 'border-border group-hover:border-foreground\/50'\}\`\}>/g,
  `<button tabIndex={-1} aria-hidden="true" className={\`w-10 h-10 border rounded-full flex items-center justify-center transition-all duration-500 \${isActive ? 'border-foreground bg-foreground text-background' : 'border-border group-hover:border-foreground/50'}\`}>`
);

fs.writeFileSync('app/sound/page.tsx', page);
