const fs = require('fs');
const path = require('path');

const userDir = 'C:\\Users\\InfinityMFB';
const maxAgeMs = 30 * 60 * 1000; // 30 minutes in milliseconds
const now = Date.now();
const results = [];

function search(dir) {
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
            // Avoid deep scanning system or node folders
            if (file !== 'node_modules' && !file.startsWith('.') && file !== 'AppData' && file !== 'Microsoft' && file !== 'Windows') {
                search(filePath);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.webp', '.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
                const age = now - stats.mtimeMs;
                if (age < maxAgeMs) {
                    results.push({
                        path: filePath,
                        name: file,
                        mtime: stats.mtime,
                        size: stats.size
                    });
                }
            }
        }
    }
}

// Search under documents first
search(path.join(userDir, 'Documents'));
// Search under .gemini folder
search(path.join(userDir, '.gemini'));
// Search under brain folder for our conversation
search('C:\\Users\\InfinityMFB\\.gemini\\antigravity\\brain\\00d59ef8-7ede-4d04-b203-b264a0f9849e');

console.log(`Found ${results.length} recently modified images:`);
results.forEach(r => {
    console.log(`- Path: ${r.path}`);
    console.log(`  Size: ${(r.size / 1024).toFixed(2)} KB`);
    console.log(`  Modified: ${r.mtime}`);
    console.log('---');
});
