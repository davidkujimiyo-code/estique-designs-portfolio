const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\InfinityMFB\\Documents\\all designs';
const destDir = 'c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO\\public\\portfolio';

// Create destination directory if not exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

if (!fs.existsSync(srcDir)) {
    console.error("Source directory not found:", srcDir);
    process.exit(1);
}

const files = fs.readdirSync(srcDir);
const portfolioItems = [];

console.log(`Scanning ${files.length} files from ${srcDir}...`);

// Categorize and generate metadata based on filenames
files.forEach((file, idx) => {
    const srcPath = path.join(srcDir, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) return;
    
    // Copy file to destDir
    const destPath = path.join(destDir, file);
    fs.copyFileSync(srcPath, destPath);
    
    const ext = path.extname(file).toLowerCase();
    if (!['.jfif', '.png', '.jpg', '.jpeg'].includes(ext)) {
        return;
    }
    
    // Process filename to derive properties
    const nameWithoutExt = path.basename(file, ext);
    let title = nameWithoutExt.replace(/_/g, ' ').replace(/-/g, ' ');
    // Capitalize words
    title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    
    let category = "Social Media Designs";
    let tags = [];
    let tools = ["Adobe Photoshop", "Typography System"];
    let problem = "The client required a premium graphic design element to elevate their visual communication.";
    let solution = "Designed a custom graphic utilizing modern spacing, color harmony, and a refined typography hierarchy.";
    let outcome = "Enhanced brand credibility, audience engagement, and overall market positioning.";
    
    const lowerName = nameWithoutExt.toLowerCase();
    
    // Categorize
    if (
        lowerName.includes('service') || 
        lowerName.includes('communion') || 
        lowerName.includes('feast') || 
        lowerName.includes('thanksgiving') || 
        lowerName.includes('conference') || 
        lowerName.includes('pastor') || 
        lowerName.includes('word') || 
        lowerName.includes('peace')
    ) {
        category = "Church Designs";
        tags = ["Church Designs", "Social Media", "Ministry Banner"];
        tools = ["Adobe Photoshop", "Typography System"];
        problem = "The ministry needed a high-impact visual presentation to announce their event online, requiring clear details and spiritual focus.";
        solution = "Utilized clean grids, deep color contrasts, and modern typography layouts to convey the event's theme.";
        outcome = "Increased online stream attendance and heightened community engagement across digital channels.";
    } else if (lowerName.includes('brand') || lowerName.includes('identity') || lowerName.includes('leather') || lowerName.includes('dflourish')) {
        category = "Brand Identity";
        tags = ["Brand Identity", "Vector Guidelines", "Corporate Identity"];
        tools = ["Figma", "Adobe Illustrator", "Brand Guidelines"];
        problem = "The startup needed a strategic visual framework to differentiate itself and appeal to high-end boutique consumers.";
        solution = "Crafted custom logotypes, selected primary colors, and created layout mockups showing brand deployment.";
        outcome = "Successfully established brand positioning, enabling a confident market launch.";
    } else if (lowerName.includes('logo') || lowerName.includes('tpr') || lowerName.includes('artboard 3') || lowerName.includes('artboard 8')) {
        category = "Logo Design";
        tags = ["Logo Design", "Vector", "Brand Identity"];
        tools = ["Adobe Illustrator", "Figma"];
        problem = "The brand required a highly memorable, vector-scalable logo that reflects luxury and attention to detail.";
        solution = "Developed a clean typographic monogram emblem, optimizing spacing and symmetry.";
        outcome = "Delivered a distinctive trademark that establishes instant credibility.";
    } else if (lowerName.includes('flyer') || lowerName.includes('shoe') || lowerName.includes('game') || lowerName.includes('hangout')) {
        category = "Event Flyers";
        tags = ["Event Flyers", "Promotional", "Print Design"];
        tools = ["Adobe Photoshop", "Adobe Illustrator"];
        problem = "The client needed promotional collateral that presents event details and values in an eye-catching grid layout.";
        solution = "Arranged components dynamically using whitespace buffers, vivid accent colors, and clear event info headers.";
        outcome = "Generated positive response and strong RSVPs for the client's promotional campaign.";
    } else if (lowerName.includes('designer') || lowerName.includes('iniobong') || lowerName.includes('progress') || lowerName.includes('birthday')) {
        category = "Social Media Designs";
        tags = ["Social Media Designs", "Digital Marketing", "Figma Templates"];
        tools = ["Figma", "Adobe Photoshop"];
        problem = "The brand needed high-impact social layouts to maintain consistency and keep profiles visually engaging.";
        solution = "Designed structured template files for announcement slides, quotes, and product features.";
        outcome = "Unified profile aesthetic, resulting in higher organic reach and client inquiries.";
    }
    
    // Special cleanups for title
    if (title.includes('!!!!')) {
        title = title.replace(/!/g, '').trim() + ' Announcement';
    }
    if (title.includes(' (1)')) {
        title = title.replace(' (1)', '').trim();
    }
    if (title.toLowerCase() === 'tpr 1') {
        title = 'TPR Branding Logotype';
    }
    if (title.toLowerCase() === 'iniobong') {
        title = 'Iniobong Portfolio Layout';
    }
    if (title.toLowerCase().startsWith('artboard')) {
        title = 'Estique ' + title;
    }
    
    // Choose featured status: Let's feature 8 distinct designs (one of each category, mostly high resolution or strong titles)
    const featuredIds = [
        "proj-brand-dflourish", 
        "proj-church-easter", 
        "proj-logo-tpr", 
        "proj-flyer-shoe", 
        "proj-social-hair",
        "proj-church-first",
        "proj-flyer-game",
        "proj-logo-artboard8"
    ];
    
    // Generate clean id
    let id = "proj-" + category.toLowerCase().split(' ')[0] + "-" + nameWithoutExt.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '');
    if (nameWithoutExt.toLowerCase().includes('pastor')) {
        id = id + "pastor";
    }
    if (nameWithoutExt.toLowerCase().includes('dflourish')) {
        id = "proj-brand-dflourish";
    }
    if (nameWithoutExt.toLowerCase() === 'tpr 1') {
        id = "proj-logo-tpr";
    }
    if (nameWithoutExt.toLowerCase().includes('artboard 8')) {
        id = "proj-logo-artboard8";
    }
    if (nameWithoutExt.toLowerCase().includes('easter')) {
        id = "proj-church-easter";
    }
    if (nameWithoutExt.toLowerCase().includes('first')) {
        id = "proj-church-first";
    }
    if (nameWithoutExt.toLowerCase().includes('shoe')) {
        id = "proj-flyer-shoe";
    }
    if (nameWithoutExt.toLowerCase().includes('game')) {
        id = "proj-flyer-game";
    }
    if (nameWithoutExt.toLowerCase().includes('hair')) {
        id = "proj-social-hair";
    }
    
    const isFeatured = featuredIds.includes(id);
    
    portfolioItems.push({
        id: id,
        title: title,
        category: category,
        tags: tags,
        description: `A custom professional design by Estique Designs, showcasing editorial formatting and brand visual strategy.`,
        imageUrl: `/portfolio/${file}`,
        link: "https://www.pinterest.com/estheru0974/_created/",
        tools: tools,
        problem: problem,
        solution: solution,
        clientOutcome: outcome,
        gallery: [`/portfolio/${file}`],
        boardName: "Created Portfolio",
        isFeatured: isFeatured
    });
});

console.log(`Processed ${portfolioItems.length} valid portfolio designs.`);

// Output data schema
const tsContent = `export interface PortfolioItem {
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

export const portfolioData: PortfolioItem[] = ${JSON.stringify(portfolioItems, null, 2)};
`;

fs.writeFileSync('c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO\\src\\data\\portfolio.ts', tsContent);
console.log("SUCCESS: Rebuilt portfolio.ts database using original designs folder assets!");
