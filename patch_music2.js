const fs = require('fs');

let code = fs.readFileSync('lib/music-data.ts', 'utf8');
code = code.replace(
  'artworkUrl: "/music/twisted-beast-cover.png"',
  'artworkUrl: "https://images.unsplash.com/photo-1601004123544-77dbba27f8a3?q=80&w=2564&auto=format&fit=crop"' // Marble sculpture
);
fs.writeFileSync('lib/music-data.ts', code);
