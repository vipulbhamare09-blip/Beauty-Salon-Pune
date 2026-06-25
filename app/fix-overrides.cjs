const fs = require('fs');
const p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
p.overrides = {
  "@radix-ui/react-compose-refs": "1.1.2",
  "@radix-ui/react-slot": "1.2.4",
  "caniuse-lite": "1.0.30001793",
  "@types/node": "22.0.0"
};
fs.writeFileSync('package.json', JSON.stringify(p, null, 2));
