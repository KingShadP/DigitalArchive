const fs = require('fs');

// We also need to fix missing 'export' in cinematic background if there is one
// and fix backgrounds on page wrappers.

let code = fs.readFileSync('app/archive/[id]/client-page.tsx', 'utf8');
code = code.replace("bg-background text-foreground", "text-foreground");
fs.writeFileSync('app/archive/[id]/client-page.tsx', code);

let archiveClient = fs.readFileSync('app/archive/client-page.tsx', 'utf8');
archiveClient = archiveClient.replace("bg-background text-foreground", "text-foreground");
fs.writeFileSync('app/archive/client-page.tsx', archiveClient);

