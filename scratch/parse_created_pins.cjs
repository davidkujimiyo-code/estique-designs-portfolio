const fs = require('fs');
const path = require('path');

const contentPath = 'C:\\Users\\InfinityMFB\\.gemini\\antigravity\\brain\\00d59ef8-7ede-4d04-b203-b264a0f9849e\\.system_generated\\steps\\352\\content.md';

if (!fs.existsSync(contentPath)) {
    console.error("Content file not found:", contentPath);
    process.exit(1);
}

const rawContent = fs.readFileSync(contentPath, 'utf8');
console.log("File loaded, size:", rawContent.length, "bytes");

// Find script tags containing PWS_DATA or application/json
const scriptRegex = /<script[^>]*type="application\/json"[^>]*>([\s\S]*?)<\/script>/gi;
let match;
const jsonContents = [];

while ((match = scriptRegex.exec(rawContent)) !== null) {
    const text = match[1];
    if (text.includes('pinimg.com') || text.includes('Resource') || text.includes('props')) {
        try {
            jsonContents.push(JSON.parse(text));
        } catch (e) {
            // Ignore parse errors
        }
    }
}

console.log(`Found ${jsonContents.length} relevant script tags containing JSON data.`);

// Let's analyze the parsed JSON to find any Pin data
const pins = [];
const boards = [];

function deepSearch(obj) {
    if (!obj || typeof obj !== 'object') return;
    
    if (obj.images && obj.id && (obj.hasOwnProperty('title') || obj.hasOwnProperty('description'))) {
        if (!pins.some(p => p.id === obj.id)) {
            pins.push(obj);
        }
    }
    
    if (obj.name && obj.id && obj.hasOwnProperty('pin_count')) {
        if (!boards.some(b => b.id === obj.id)) {
            boards.push(obj);
        }
    }
    
    if (Array.isArray(obj)) {
        obj.forEach(deepSearch);
    } else {
        for (let k in obj) {
            deepSearch(obj[k]);
        }
    }
}

jsonContents.forEach(deepSearch);

console.log(`Found ${pins.length} unique pins in JSON`);
console.log(`Found ${boards.length} unique boards in JSON`);

if (pins.length > 0) {
    console.log("First pin sample:");
    console.log(JSON.stringify(pins[0], null, 2));
} else {
    console.log("No pins found. Let's do a regex search for images on pinimg.com...");
    const pinimgRegex = /https:\/\/i\.pinimg\.com\/[^\s"'>]+/g;
    const matches = rawContent.match(pinimgRegex) || [];
    const uniqueImages = Array.from(new Set(matches));
    console.log(`Found ${uniqueImages.length} unique pinimg links in HTML:`);
    uniqueImages.slice(0, 15).forEach(img => console.log(` - ${img}`));
}
