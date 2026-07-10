const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO';
const patterns = [
    /hello@estique/i,
    /800\s?000/i,
    /2348000/i,
    /logo-monogram\.webp/i,
    /headshot\.webp/i,
    /wa\.me\/2348/i
];

const found = [];

function scanDir(dir) {
    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        return;
    }
    
    for (let file of files) {
        const filePath = path.join(dir, file);
        let stats;
        try {
            stats = fs.statSync(filePath);
        } catch (e) {
            continue;
        }
        
        if (stats.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'scratch') {
                scanDir(filePath);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.ts', '.tsx', '.json', '.html', '.css'].includes(ext)) {
                const content = fs.readFileSync(filePath, 'utf8');
                patterns.forEach((pattern, idx) => {
                    if (pattern.test(content)) {
                        const lines = content.split('\n');
                        lines.forEach((line, lineNo) => {
                            if (pattern.test(line)) {
                                found.push({
                                    file: filePath,
                                    line: lineNo + 1,
                                    content: line.trim(),
                                    pattern: pattern.toString()
                                });
                            }
                        });
                    }
                });
            }
        }
    }
}

scanDir(srcDir);

if (found.length === 0) {
    console.log("SUCCESS: No placeholder details or incorrect assets found in the codebase!");
} else {
    console.log(`FOUND ${found.length} issues to fix:`);
    found.forEach(f => {
        console.log(`- File: ${f.file}:${f.line}`);
        console.log(`  Content: ${f.content}`);
        console.log(`  Matched Pattern: ${f.pattern}`);
        console.log('---');
    });
}
