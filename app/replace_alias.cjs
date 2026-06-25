const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'services-page');

function replaceInFile(filePath) {
    if (!fs.statSync(filePath).isFile()) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(/@\//g, '@services/');
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
    }
}

function processDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else {
            if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
                replaceInFile(fullPath);
            }
        }
    });
}

processDirectory(directoryPath);
console.log('Aliases replaced successfully.');
