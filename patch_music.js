const fs = require('fs');

let code = fs.readFileSync('app/music/page.tsx', 'utf8');

code = code.replace(
  '{release.tracks.map((track, i) => (\n                    {',
  '{release.tracks.map((track, i) => {\n'
);

fs.writeFileSync('app/music/page.tsx', code);
