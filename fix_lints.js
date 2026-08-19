const fs = require('fs');

// 1. Fix archive client page image
let arcClient = fs.readFileSync('app/archive/[id]/client-page.tsx', 'utf8');
arcClient = arcClient.replace('<img ', '{/* eslint-disable-next-line @next/next/no-img-element */}\n                        <img ');
fs.writeFileSync('app/archive/[id]/client-page.tsx', arcClient);

// 2. Fix music client page comment error
let musClient = fs.readFileSync('app/music/[id]/client-page.tsx', 'utf8');
musClient = musClient.replace(
  "{release.type} {'//'} {release.releaseDate}",
  "{release.type} \u007B'//'\u007D {release.releaseDate}"
);
musClient = musClient.replace(
  "// {release.releaseDate}",
  "{'//'} {release.releaseDate}"
);
fs.writeFileSync('app/music/[id]/client-page.tsx', musClient);

// 3. Fix cinematic background setState in effect
let bg = fs.readFileSync('components/cinematic-background.tsx', 'utf8');
bg = bg.replace(
  /const \[mounted, setMounted\] = useState\(false\);\n/g,
  ""
);
bg = bg.replace(
  /  useEffect\(\(\) => \{\n    setMounted\(true\);\n  \}, \[\]\);\n\n  if \(\!mounted\) return null;\n/g,
  ""
);
// Import needs to remove useState, useEffect
bg = bg.replace("import React, { useEffect, useState } from 'react';", "import React from 'react';");
fs.writeFileSync('components/cinematic-background.tsx', bg);

