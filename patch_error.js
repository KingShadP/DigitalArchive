const fs = require('fs');

let code = fs.readFileSync('app/error.tsx', 'utf8');
code = code.replace(
  "console.error(error);",
  "console.error(error.message, error.stack);"
);
fs.writeFileSync('app/error.tsx', code);
