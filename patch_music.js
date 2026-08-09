const fs = require('fs');

let code = fs.readFileSync('lib/music-data.ts', 'utf8');
code = code.replace(
  'artworkUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"',
  'artworkUrl: "/music/twisted-beast-cover.png"'
);
fs.writeFileSync('lib/music-data.ts', code);
