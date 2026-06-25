const fs = require('fs');
const p = JSON.parse(fs.readFileSync('package.json', 'utf8'));

p.dependencies["@radix-ui/react-slot"] = "1.2.4";
p.devDependencies["@types/node"] = "22.0.0";
p.devDependencies["caniuse-lite"] = "1.0.30001793";

p.overrides = {
  "@radix-ui/react-compose-refs": "1.1.2",
  "@radix-ui/react-slot": "$@radix-ui/react-slot",
  "caniuse-lite": "$caniuse-lite",
  "@types/node": "$@types/node"
};

fs.writeFileSync('package.json', JSON.stringify(p, null, 2));
