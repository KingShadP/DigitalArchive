const fs = require('fs');

let code = fs.readFileSync('components/system.tsx', 'utf8');
code = code.replace(
  "const baseStyles = 'relative overflow-hidden border transition-all duration-700';",
  "const baseStyles = 'relative overflow-hidden border transition-all duration-700 bg-surface/30 backdrop-blur-sm';"
);
fs.writeFileSync('components/system.tsx', code);
