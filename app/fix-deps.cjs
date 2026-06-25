const fs = require('fs');
const p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
for (const key in p.dependencies) p.dependencies[key] = "*";
for (const key in p.devDependencies) p.devDependencies[key] = "*";
fs.writeFileSync('package.json', JSON.stringify(p, null, 2));
