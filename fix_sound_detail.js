const fs = require('fs');
let page = fs.readFileSync('app/sound/[id]/client-page.tsx', 'utf8');

page = page.replace(
  /<div \n                    key=\{track\.id\} \n                    onClick=\{\(\) => isThisTrackActive \? togglePlayPause\(\) : playTrack\(track, release, release\.tracks\)\} \n                    className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-border\/20 group hover:bg-surface\/30 transition-all cursor-pointer -mx-4 px-4"\n                  >/g,
  `<div \n                    key={track.id} \n                    role="button"\n                    tabIndex={0}\n                    onClick={() => isThisTrackActive ? togglePlayPause() : playTrack(track, release, release.tracks)} \n                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (isThisTrackActive) togglePlayPause(); else playTrack(track, release, release.tracks); } }}\n                    className="flex flex-col md:flex-row md:items-center justify-between py-5 border-b border-border/20 group hover:bg-surface/30 transition-all cursor-pointer -mx-4 px-4 outline-none focus-visible:ring-2 focus-visible:ring-foreground"\n                  >`
);

page = page.replace(
  /<button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-foreground\/40 group-hover:text-foreground group-hover:bg-foreground\/10">/g,
  `<button tabIndex={-1} aria-hidden="true" className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-foreground/40 group-hover:text-foreground group-hover:bg-foreground/10">`
);

fs.writeFileSync('app/sound/[id]/client-page.tsx', page);
