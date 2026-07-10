const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\InfinityMFB\\Documents\\all designs\\Book Cover Designs';
const destDir = 'c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO\\public\\portfolio';
const dbFile = 'c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO\\src\\data\\portfolio.ts';

if (!fs.existsSync(srcDir)) {
    console.error("Source directory not found:", srcDir);
    process.exit(1);
}

if (!fs.existsSync(dbFile)) {
    console.error("Database file not found:", dbFile);
    process.exit(1);
}

const files = fs.readdirSync(srcDir);
console.log(`Scanning Book Cover Designs folder. Found ${files.length} images...`);

// Copy files
files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file} to public assets.`);
});

// Import current portfolioData using regex or by reading the file
const fileContent = fs.readFileSync(dbFile, 'utf8');

// Parse the existing portfolioData from the file text
const dataStart = fileContent.indexOf('export const portfolioData: PortfolioItem[] = [');
if (dataStart === -1) {
    console.error("Could not find portfolioData array declaration in file.");
    process.exit(1);
}

const jsonStart = fileContent.indexOf('[', dataStart);
const jsonEnd = fileContent.lastIndexOf('];');
if (jsonStart === -1 || jsonEnd === -1) {
    console.error("Could not locate JSON array boundaries.");
    process.exit(1);
}

const jsonText = fileContent.substring(jsonStart, jsonEnd + 1);
let existingItems = [];
try {
    existingItems = JSON.parse(jsonText);
} catch (e) {
    console.error("Error parsing existing portfolioData JSON:", e);
    process.exit(1);
}

console.log(`Successfully parsed ${existingItems.length} existing projects from portfolio.ts.`);

// Create book cover items to append
const bookCoversMetadata = [
    {
        file: "B1.jpeg",
        title: "The Path of Wisdom",
        description: "Minimalist typographic book cover layout incorporating elegant visual hierarchy and subtle canvas overlays.",
        isFeatured: false
    },
    {
        file: "B2.jpeg",
        title: "Shadows in the Mist",
        description: "Moody, atmospheric book cover design balancing ambient color tones and custom serif lettering.",
        isFeatured: false
    },
    {
        file: "B3.jpeg",
        title: "Echoes of Eternity",
        description: "Elegant editorial book cover layout featuring deep contrasts, golden lighting overlays, and clean typographic spacing.",
        isFeatured: false
    },
    {
        file: "B4.jpeg",
        title: "The Architect's Mind",
        description: "Sleek, minimalist design cover blending structural line art with custom font layouts.",
        isFeatured: false
    },
    {
        file: "B5.jpeg",
        title: "Whispers of the Wind",
        description: "Beautiful illustrative cover layout featuring abstract background designs and clean title layouts.",
        isFeatured: true
    },
    {
        file: "B6.jpeg",
        title: "The Golden Age of Design",
        description: "Sophisticated cover layout with premium gold foil guides and high-end print mockup finishes.",
        isFeatured: true
    }
];

const newBookItems = bookCoversMetadata.map((bc, idx) => {
    const id = `proj-book-cover-b${idx + 1}`;
    return {
        id: id,
        title: bc.title,
        category: "Book Cover Designs",
        tags: ["Book Cover Designs", "Print Design", "Typography"],
        description: bc.description,
        imageUrl: `/portfolio/${bc.file}`,
        link: "https://www.pinterest.com/estheru0974/_created/",
        tools: ["InDesign", "Adobe Photoshop"],
        problem: "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
        solution: "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
        clientOutcome: "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
        gallery: [`/portfolio/${bc.file}`],
        boardName: "Book Cover Designs",
        isFeatured: bc.isFeatured
    };
});

// Append to existing items
const updatedItems = [...existingItems, ...newBookItems];
console.log(`Rebuilding database. Total portfolio items: ${updatedItems.length}`);

const newContent = `export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  imageUrl: string;
  link: string;
  tools: string[];
  problem: string;
  solution: string;
  clientOutcome: string;
  gallery: string[];
  boardName: string | null;
  isFeatured?: boolean;
}

export const portfolioData: PortfolioItem[] = ${JSON.stringify(updatedItems, null, 2)};
`;

fs.writeFileSync(dbFile, newContent);
console.log("SUCCESS: Appended Book Cover Designs to portfolio.ts!");
