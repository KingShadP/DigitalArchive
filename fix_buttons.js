const fs = require('fs');

// Fix footer
let footer = fs.readFileSync('components/footer.tsx', 'utf8');
footer = footer.replace(/<div\s+className="w-16 h-16 border border-border rounded-full flex items-center justify-center mb-8 relative overflow-hidden group hover:border-foreground transition-all duration-700 cursor-pointer"\s+onClick=\{\(\) => window.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)\}\s+aria-label="Scroll to top"\s*>/g, 
  '<button \n          className="w-16 h-16 border border-border rounded-full flex items-center justify-center mb-8 relative overflow-hidden group hover:border-foreground transition-all duration-700 cursor-pointer"\n          onClick={() => window.scrollTo({ top: 0, behavior: \'smooth\' })}\n          aria-label="Scroll to top"\n        >');
footer = footer.replace(/<\/div>\s*<\/Magnetic>/g, '</button>\n      </Magnetic>');
fs.writeFileSync('components/footer.tsx', footer);

// Fix global-player scrubber
let player = fs.readFileSync('components/global-player.tsx', 'utf8');
player = player.replace(/<div \n\s*className="flex-1 h-1 bg-border\/50 relative cursor-pointer group"\n\s*onClick=\{\(e\) => \{\n\s*const rect = e.currentTarget.getBoundingClientRect\(\);\n\s*const pos = \(e.clientX - rect.left\) \/ rect.width;\n\s*seek\(pos \* duration\);\n\s*\}\}\n\s*>/g,
  `<button \n              className="flex-1 h-1 bg-border/50 relative cursor-pointer group outline-none focus-visible:ring-2 focus-visible:ring-foreground"\n              role="slider"\n              aria-valuemin={0}\n              aria-valuemax={duration || 100}\n              aria-valuenow={currentTime}\n              onClick={(e) => {\n                const rect = e.currentTarget.getBoundingClientRect();\n                const pos = (e.clientX - rect.left) / rect.width;\n                seek(pos * duration);\n              }}\n              onKeyDown={(e) => {\n                if (e.key === 'ArrowRight') seek(Math.min((currentTime || 0) + 5, duration));\n                if (e.key === 'ArrowLeft') seek(Math.max((currentTime || 0) - 5, 0));\n              }}\n            >`);
player = player.replace(/<\/div>\n\s*<span className="w-8">\{formatTime\(duration\)\}<\/span>/g, '</button>\n            <span className="w-8">{formatTime(duration)}</span>');
fs.writeFileSync('components/global-player.tsx', player);

