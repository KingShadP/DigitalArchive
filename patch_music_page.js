const fs = require('fs');
let code = fs.readFileSync('app/music/page.tsx', 'utf8');

// Add playTrack and currentTrack to useAudio destructuring
code = code.replace(
  'const { audioActive, toggleAudio } = useAudio();',
  'const { audioActive, toggleAudio, playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();'
);

// Map allTracks to include the release object
code = code.replace(
  'const allTracks = RELEASES.flatMap(r => r.tracks.map(t => ({ ...t, releaseTitle: r.title })));',
  'const allTracks = RELEASES.flatMap(r => r.tracks.map(t => ({ ...t, release: r })));'
);

// Update TRACKS view rendering
code = code.replace(
  '{allTracks.map((track, idx) => (',
  `{allTracks.map((track, idx) => {
    const isThisTrackActive = currentTrack?.id === track.id;
    return (`
);

code = code.replace(
  '<div key={track.id} className="grid grid-cols-12 gap-4 py-4 border-b border-border/20 hover:bg-surface transition-colors items-center group cursor-pointer">',
  `<div key={track.id} onClick={() => { if(isThisTrackActive) { togglePlayPause(); } else { playTrack(track, track.release, allTracks); } }} className="grid grid-cols-12 gap-4 py-4 border-b border-border/20 hover:bg-surface transition-colors items-center group cursor-pointer">`
);

code = code.replace(
  '<button className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-foreground/50 transition-colors">',
  `<button className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-foreground/50 transition-colors">`
);

code = code.replace(
  '<Play size={10} className="translate-x-[1px]" />',
  `{isThisTrackActive && isPlaying ? <Square size={10} /> : <Play size={10} className="translate-x-[1px]" />}`
);

code = code.replace(
  '<div className="col-span-3 font-mono text-[10px] uppercase tracking-widest text-foreground/60">{track.releaseTitle}</div>',
  '<div className="col-span-3 font-mono text-[10px] uppercase tracking-widest text-foreground/60">{track.release.title}</div>\n                  );})}'
);
// Remove the old closing tag
code = code.replace(
  '</div>\n                  ))}',
  '</div>'
);

// Update ReleaseBlock component props
code = code.replace(
  'function ReleaseBlock({ release, index, isActive, onToggle }: { release: Release; index: number, isActive: boolean, onToggle: () => void }) {',
  'function ReleaseBlock({ release, index, isActive, onToggle }: { release: Release; index: number, isActive: boolean, onToggle: () => void }) {\n  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();'
);

// Update release track clicking
code = code.replace(
  '<div key={track.id} className="flex items-center justify-between py-3 border-b border-border/20 group hover:px-2 transition-all cursor-pointer">',
  `{
    const isThisTrackActive = currentTrack?.id === track.id;
    return (
    <div key={track.id} onClick={() => isThisTrackActive ? togglePlayPause() : playTrack(track, release, release.tracks)} className="flex items-center justify-between py-3 border-b border-border/20 group hover:px-2 transition-all cursor-pointer">`
);

code = code.replace(
  '<button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-white">\n                          <Play size={12} />\n                        </button>\n                      </div>\n                    </div>\n                  ))}',
  `<button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-white">
                          {isThisTrackActive && isPlaying ? <Square size={12} /> : <Play size={12} />}
                        </button>
                      </div>
                    </div>
                  )})}`
);

fs.writeFileSync('app/music/page.tsx', code);
