const fs = require('fs');
let page = fs.readFileSync('app/sound/page.tsx', 'utf8');
page = page.replace(/\/music\/\$\{release\.id\}/g, '/sound/${release.id}');
fs.writeFileSync('app/sound/page.tsx', page);
