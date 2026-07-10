const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\InfinityMFB\\Documents\\all designs';
const bookDir = 'C:\\Users\\InfinityMFB\\Documents\\all designs\\Book Cover Designs';
const destDir = 'c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO\\public\\portfolio';
const dbFile = 'c:\\Users\\InfinityMFB\\Documents\\PORTFOLIO\\src\\data\\portfolio.ts';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const portfolioItems = [];

// 1. Process main designs folder (31 files)
const mainFiles = fs.readdirSync(baseDir);
console.log(`Processing main designs folder. Found ${mainFiles.length} files...`);

const mainFilesMetadata = {
    "artboard 3 copy.png": {
        title: "Estique Monogram Logotype",
        category: "Logo Design",
        tags: ["Logo Design", "Branding", "Vector"],
        description: "Bespoke vector logotype exploring minimal visual alignment and geometric symmetry, designed for a luxury creative brand seeking a timeless and clean monogram identity.",
        problem: "The client required a brand logotype that stands out across digital interfaces and physical print finishes, maintaining scalable legibility.",
        solution: "Structured a balanced geometric symbol utilizing precise stroke weights and minimal line intersections.",
        outcome: "Created a distinctive, recognizable trademark that establishes visual authority for the brand."
    },
    "artboard 8.png": {
        title: "Estique Branding Logomark",
        category: "Logo Design",
        tags: ["Logo Design", "Vector", "Brand Identity"],
        description: "Custom corporate monogram design showcasing vector grid lines, golden luxury textures, and precise typography alignment to create a premium brand mark.",
        problem: "The goal was to present a corporate mark that evokes heritage, elegance, and premium positioning in a competitive marketplace.",
        solution: "Crafted a custom vector monogram layout using clean serif stems and gold foil texture rendering.",
        outcome: "Delivered a high-end brand identity asset suitable for stationery, signage, and digital branding."
    },
    "designer page.jfif": {
        title: "Designer Portfolio Interface",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "UI Layout", "Figma"],
        description: "Editorial web landing page layout for a professional designer, prioritizing minimalist grids, elegant whitespace, and high-impact typographic alignment to display creative portfolios.",
        problem: "The visual designer needed a portfolio interface that reflects their commitment to clean grids and minimal layout styling.",
        solution: "Arranged components dynamically using extensive margins, sans-serif typography, and framed visual content cards.",
        outcome: "Unified digital profile presentation, leading to higher client conversion rates and clear navigation."
    },
    "easter service.jfif": {
        title: "Easter Celebration Service Banner",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Ministry Banner"],
        description: "Promotional artwork for an Easter resurrection service, communicating hope and celebration through cinematic backlighting, bold headline typography, and refined editorial spacing.",
        problem: "The ministry required a high-impact graphic that announces Easter Sunday clearly without feeling cluttered or generic.",
        solution: "Designed a clean typographic composition utilizing cinematic backlighting and a high-contrast heading grid.",
        outcome: "Dramatically increased social shares and online stream attendance during the Easter service."
    },
    "family meeting design.jfif": {
        title: "Family Meeting Service Banner",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Fellowship Card"],
        description: "Announcing a church family meeting through a clean social media flyer, utilizing a structured editorial grid and neutral color palettes to invite families to fellowship.",
        problem: "The team needed a flyer that presents meeting times and details clearly while maintaining an elegant, friendly visual tone.",
        solution: "Arranged event schedules inside a balanced column structure, pairing soft backdrop tones with bold serif text headers.",
        outcome: "Provided clear visual communication, resulting in strong attendance and positive congregation response."
    },
    "first communion of the year.jfif": {
        title: "First Communion Of The Year",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Sermon Slide"],
        description: "Sermon announcement banner capturing the solemnity of the first communion, using clean serif headings, soft glowing accents, and spacious visual layouts.",
        problem: "The church needed a visual banner that honors the sacred nature of communion while presenting date details legibly.",
        solution: "Combined dark ambient backgrounds, gold lighting details, and elegant spacing to highlight the communion theme.",
        outcome: "Successfully announced the service across digital bulletin feeds, elevating church event branding."
    },
    "game day flyer design idea.jfif": {
        title: "Game Day Sports Event Flyer",
        category: "Event Flyers",
        tags: ["Event Flyers", "Promotional", "Sports Graphic"],
        description: "High-impact sports flyer for a game day event, utilizing athletic action photography overlays, intense color grading, and heavy typography to drive viewer interest.",
        problem: "A sports bar client needed high-impact promotional graphics for a weekly watch party campaign.",
        solution: "Engineered a dynamic layout pairing bold industrial headers with active player cutouts and vivid backlighting.",
        outcome: "Drove high table bookings and watch party attendance through coordinated social postings."
    },
    "hair brand promotional flyer designs.jfif": {
        title: "Luxury Salon Promotional Layout",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Marketing", "Hair Boutique"],
        description: "Luxury promotional flyer layout for an upscale hair salon, combining high-resolution portrait imagery, metallic gold typography, and a structured product grid.",
        problem: "A high-end salon required promotional graphics that justify their premium pricing structure.",
        solution: "Designed a clean advertising template pairing luxury typography with a minimalist background frame and model photography.",
        outcome: "Elevated brand aesthetic, leading to a rise in premium treatment bookings."
    },
    "happy birthday my pastor (1).jfif": {
        title: "Senior Pastor Birthday Celebration",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Ministry", "Celebratory"],
        description: "Refined birthday celebration card design honoring a senior pastor, combining elegant serif scripts, ambient golden gradients, and clean layout margins.",
        problem: "The administrative team wanted to publish a premium birthday card for their lead pastor's social media accounts.",
        solution: "Drafted a high-end graphic balancing classic typography with gold textures and refined margins.",
        outcome: "Unified church social media aesthetic and garnered strong positive comments from church members."
    },
    "happy birthday my pastor.jfif": {
        title: "Pastor Birthday Anniversary Flyer",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Ministry", "Celebratory"],
        description: "Sermon and social media birthday banner featuring gold typography accents, geometric border frames, and spacious layouts designed to honor a leader's birthday.",
        problem: "The media department needed a commemorative flyer to celebrate their pastor on the official church channel.",
        solution: "Utilized a dark charcoal canvas layered with thin gold frames and clean, legible font spacing.",
        outcome: "Delivered a respectful, visually striking graphic that aligns with the church's premium aesthetic standards."
    },
    "happy birthday pst grace.jfif": {
        title: "Pastor Grace Birthday Commemoration",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Ministry", "Celebratory"],
        description: "Elegant social media birthday flyer created for Pastor Grace, balancing soft floral accents, ambient lighting effects, and modern serif text hierarchy.",
        problem: "A special commemorative graphic was required to celebrate Pastor Grace's birthday on Instagram and newsletter headers.",
        solution: "Blended light background hues, soft serif typography, and elegant visual layers for a clean, personal presentation.",
        outcome: "Provided a beautiful social asset that received warm engagement from the community."
    },
    "shoe brand flyer design.jfif": {
        title: "Footwear Brand Promotional Card",
        category: "Event Flyers",
        tags: ["Event Flyers", "Promotional", "Product Card"],
        description: "Sleek footwear marketing flyer utilizing minimal product alignment, clean background lines, and focused call-to-actions to announce a premium sports shoe release.",
        problem: "A sports retail brand needed digital flyers that place the focus entirely on a new product release.",
        solution: "Created a minimalist design that isolates the product image, framed by light gray visual buffers and clean text.",
        outcome: "Drove click-through engagement on the client's e-commerce launch portal."
    },
    "sunday service design.jfif": {
        title: "Sunday Worship Service Flyer",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Service Announcement"],
        description: "Modern church service poster combining deep blue background gradients, structural typography contrast, and high-contrast spacing to welcome visitors to worship.",
        problem: "The design team needed a fresh template for weekly service invites that stands out in a crowded social feed.",
        solution: "Created a balanced layout featuring elegant headers, clean timing callouts, and a deep gradient backdrop.",
        outcome: "Helped establish consistent weekly branding, boosting new guest attendance."
    },
    "sunday service.png": {
        title: "Minimalist Sunday Service Card",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Service Announcement"],
        description: "Spacious social media flyer for Sunday services, utilizing minimal editorial grids, bold sans-serif headlines, and clean layout margins for digital screens.",
        problem: "A contemporary church wanted visual announcements that feel modern and avoid busy graphics.",
        solution: "Designed a clean, typography-led banner prioritizing whitespace and strict informational hierarchy.",
        outcome: "Streamlined communication, making service details instantly readable for mobile users."
    },
    "tpr 1.png": {
        title: "TPR Corporate Logotype",
        category: "Logo Design",
        tags: ["Logo Design", "Branding", "Corporate Identity"],
        description: "Bespoke corporate branding logotype showing line logo structures, minimalist monochrome pairings, and custom brand alignment for a modern venture.",
        problem: "The corporation required a visual logotype that communicates efficiency, structure, and forward-looking strategy.",
        solution: "Designed custom geometric letters with precise line tracking, optimized for both dark and light backdrops.",
        outcome: "Established a professional corporate identity, aligning materials for partner and client presentations."
    },
    "weekly service design.jfif": {
        title: "Weekly Fellowship Service Graphic",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Weekly Service"],
        description: "Clean announcement card designed for weekly church meetings, emphasizing high-contrast layout grids, readable text blocks, and structured event timing headers.",
        problem: "The weekly service graphics lacked a consistent structure, leading to confusion over service times.",
        solution: "Built a modular template dividing space between theme visuals and service schedule cards.",
        outcome: "Improved informational clarity, resulting in regular and prompt attendance at mid-week meetings."
    },
    "word feast - themes_ the power if the blessing -.jfif": {
        title: "Word Feast Sermon Series Flyer",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Sermon Series"],
        description: "Announcement graphics for the 'Word Feast' sermon series, combining a glowing light flare background, metallic gold titles, and bold typography grids.",
        problem: "A special monthly sermon series required custom graphics that express the spiritual weight of the theme.",
        solution: "Aligned high-impact gold lettering on a dark, texturized background with radiant light flare accents.",
        outcome: "Created a visually compelling sermon campaign asset that was widely shared by the congregation."
    },
    "another weekly Church Service.jfif": {
        title: "Mid-Week Service Announcement Banner",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Weekly Service"],
        description: "Modern announcement banner for weekly Bible study, utilizing balanced layout spacing, clean serif fonts, and elegant gold borders for church feeds.",
        problem: "The client needed a recurring mid-week design that could be quickly updated without losing brand identity.",
        solution: "Engineered a templated layout with dedicated spaces for guest speakers and scheduling text blocks.",
        outcome: "Simplified content creation for the media department while maintaining premium quality."
    },
    "birthday invitation card.jfif": {
        title: "Classic Birthday Invitation Card",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Print", "Invitation Card"],
        description: "Minimalist birthday invitation design featuring elegant script lettering, subtle paper textures, and a clean text hierarchy for physical or digital sharing.",
        problem: "An event planner requested elegant invitation templates that feel personal, classic, and premium.",
        solution: "Arranged script-stamped headings and event coordinates over a clean, textured gray canvas.",
        outcome: "Produced a sophisticated invite that set a premium tone for the client's private dinner party."
    },
    "brand identity of DFLOURISH LEATHER.jfif": {
        title: "D'Flourish Leather Brand System",
        category: "Brand Identity",
        tags: ["Brand Identity", "Brand Guidelines", "Corporate Identity"],
        description: "Premium brand identity board for DFlourish Leather, detailing custom typography systems, visual leather textures, and minimalist gold-foil guidelines for packaging.",
        problem: "The brand needed to communicate handcrafted quality and luxury positioning through all its physical leather tags and packaging.",
        solution: "Constructed a branding kit showing logo variants, custom visual tags, and gold-foil leather design rules.",
        outcome: "Positioned the brand for premium market pricing and built instant shopper trust."
    },
    "church weekly Service.jfif": {
        title: "Weekly Mid-Week Bible Study",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Weekly Service"],
        description: "Mid-week church service announcement card designed with structured columns, gold-emerald borders, and clean serif text to announce fellowship times.",
        problem: "A design was needed to promote mid-week Bible studies that visually separates them from regular Sunday services.",
        solution: "Selected an emerald green theme detailed with thin gold lines, focusing text on topic discussion points.",
        outcome: "Clearly demarcated mid-week sessions, leading to a steady increase in study participation."
    },
    "couples' hangout.jfif": {
        title: "Couples' Hangout Event Flyer",
        category: "Event Flyers",
        tags: ["Event Flyers", "Promotional", "Couples Retreat"],
        description: "Warm event flyer for a couples' hangout, utilizing romantic lighting, soft red borders, and clean, readable event detail sections.",
        problem: "An event organizer needed flyers for a private couples' hangout dinner that feels intimate and welcoming.",
        solution: "Structured a balanced design featuring ambient warm light flares and classic layout spacing.",
        outcome: "Helped drive strong RSVPs and successfully established the visual theme for the night."
    },
    "fire conference !!!!!!1.jfif": {
        title: "Youth Fire Conference Flyer",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Youth Event"],
        description: "Dynamic fire conference flyer utilizing bold industrial font treatments, custom flame textures, and high-contrast styling to appeal to youth attendees.",
        problem: "The youth department needed highly engaging graphics to announce a major regional conference.",
        solution: "Blended dark metal textures, glowing text effects, and energetic fire visual accents.",
        outcome: "Generated significant excitement and drove record youth registrations for the event."
    },
    "happy birthday design.jfif": {
        title: "Serif Birthday Celebration Card",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Celebratory", "Template"],
        description: "Minimalist birthday celebration slide featuring custom serif type, clean whitespace, and elegant floral accents for social media stories.",
        problem: "The studio required clean birthday announcement cards that match their minimalist design guidelines.",
        solution: "Designed a simple editorial layout centering high-contrast serif headlines over floral border details.",
        outcome: "Provided a beautiful social media template that reflects the brand's premium design philosophy."
    },
    "happy birthday flyer design.jfif": {
        title: "Premium Birthday Announcement Layout",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Celebratory", "Flyer"],
        description: "Commemorative birthday flyer combining a soft portrait frame shadow, metallic gold letterings, and a premium editorial page layout.",
        problem: "A client requested a personal celebration graphic that feels editorial, like a page from a design magazine.",
        solution: "Constructed a grid-based card layout utilizing soft shadows, gold accents, and spacious visual columns.",
        outcome: "Delivered a premium digital asset that was widely shared by the client's family and colleagues."
    },
    "iniobong.png": {
        title: "Iniobong Editorial Layout",
        category: "Social Media Designs",
        tags: ["Social Media Designs", "Editorial", "Layout"],
        description: "Editorial design concept showing portfolio photo grids, structured text block alignment, and clean geometric layout margins for high-end fashion branding.",
        problem: "A fashion client requested portfolio layout layouts that feel clean, spacious, and focus on image assets.",
        solution: "Balanced bold, asymmetric typography columns against high-resolution photography grid containers.",
        outcome: "Delivered an editorial lookbook template that aligns with contemporary design aesthetics."
    },
    "mid year thanksgiving.jfif": {
        title: "Mid-Year Thanksgiving Service Banner",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Service Announcement"],
        description: "High-contrast thanksgiving flyer combining ambient golden lighting, premium decorative typography, and clean spacing to celebrate the mid-year thanksgiving service.",
        problem: "The ministry required graphics that convey gratitude and celebration for a mid-year service.",
        solution: "Engineered a graphic utilizing warm gold lighting effects, bold headers, and spacious informational text.",
        outcome: "Successfully announced the event, driving record attendance for the thanksgiving service."
    },
    "perfect peace.jfif": {
        title: "Perfect Peace Sermon Graphic",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Sermon Series"],
        description: "Tranquil sermon graphic for 'Perfect Peace' series, using soft radial color blurs, minimal font weights, and spacious margin alignments.",
        problem: "The pastor wanted a visual theme for a sermon series on peace that looks calm, modern, and serene.",
        solution: "Created a minimalist layout using soft, blue-gray radial gradients and thin typography spacing.",
        outcome: "Provided a coherent visual branding theme for slides, booklets, and social media feeds."
    },
    "premium and luxury together in one design.jfif": {
        title: "Premium Luxury Concept Tag",
        category: "Brand Identity",
        tags: ["Brand Identity", "Vector Guidelines", "Concept"],
        description: "Brand design guidelines presenting luxury color matches, metallic accents, and elegant logotype alignments for a premium creative partner portfolio.",
        problem: "The studio needed a visual board demonstrating how luxury visual elements interact in a single grid layout.",
        solution: "Assembled gold foil details, dark charcoal backgrounds, and fine script lettering inside a structural guide board.",
        outcome: "Served as a key visual reference for clients seeking premium, high-end branding systems."
    },
    "sunday service design (1).jfif": {
        title: "Worship Service Announcement Flyer",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Service Announcement"],
        description: "Digital Sunday service flyer utilizing bold sermon headlines, high legibility spacing, and structured event details for online congregation channels.",
        problem: "The client requested weekly service invite templates that can be easily scanned on mobile screens.",
        solution: "Designed high-contrast text blocks, keeping key times and speaker details in clear vertical structures.",
        outcome: "Streamlined weekly announcements and improved online visitor registration metrics."
    },
    "visible progress.jfif": {
        title: "Visible Progress Sermon Slides",
        category: "Church Designs",
        tags: ["Church Designs", "Social Media", "Sermon Series"],
        description: "Inspirational sermon banner designed around 'Visible Progress' theme, using high-impact font styling, clean borders, and premium visual layouts.",
        problem: "A service theme needed graphic representations that inspire forward movement and church growth.",
        solution: "Paired large, bold geometric typography with structural border lines and bright visual gradients.",
        outcome: "Created a memorable sermon brand that resonated deeply with the online congregation."
    }
};

mainFiles.forEach(file => {
    const srcPath = path.join(baseDir, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) return; // skip subdirectories like Book Cover Designs
    
    const ext = path.extname(file).toLowerCase();
    if (!['.jfif', '.png', '.jpg', '.jpeg'].includes(ext)) return;
    
    const lowercaseName = file.toLowerCase();
    const meta = mainFilesMetadata[lowercaseName];
    
    let title = "";
    let category = "Social Media Designs";
    let tags = [];
    let tools = ["Adobe Photoshop", "Typography System"];
    let description = "A custom professional design by Estique Designs.";
    let problem = "The client required a premium graphic design element to elevate their visual communication.";
    let solution = "Designed a custom graphic utilizing modern spacing, color harmony, and a refined typography hierarchy.";
    let outcome = "Enhanced brand credibility, audience engagement, and overall market positioning.";
    
    if (meta) {
        title = meta.title;
        category = meta.category;
        tags = meta.tags;
        description = meta.description;
        problem = meta.problem;
        solution = meta.solution;
        outcome = meta.outcome;
    } else {
        const nameWithoutExt = path.basename(file, ext);
        title = nameWithoutExt.replace(/_/g, ' ').replace(/-/g, ' ');
        title = title.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    }
    
    // Custom tools based on category
    if (category === "Brand Identity" || category === "Logo Design") {
        tools = ["Adobe Illustrator", "Figma", "Brand Guidelines"];
    } else if (category === "Event Flyers" || category === "Church Designs") {
        tools = ["Adobe Photoshop", "Adobe Illustrator", "Typography System"];
    } else {
        tools = ["Figma", "Adobe Photoshop"];
    }
    
    // Choose featured status (featured logos will be handled separately in the logo items array, but let's keep the existing strong projects)
    const featuredIds = [
        "proj-church-easter", 
        "proj-flyer-shoe", 
        "proj-social-hair",
        "proj-church-first",
        "proj-book-cover-b6"
    ];
    
    let id = "proj-" + category.toLowerCase().split(' ')[0] + "-" + path.basename(file, ext).toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '');
    if (lowercaseName.includes('pastor')) {
        id = id + "pastor";
    }
    if (lowercaseName.includes('dflourish')) {
        id = "proj-brand-dflourish";
    }
    if (lowercaseName.startsWith('tpr')) {
        id = "proj-logo-tpr";
    }
    if (lowercaseName.includes('artboard 8')) {
        id = "proj-logo-artboard8";
    }
    if (lowercaseName.includes('easter')) {
        id = "proj-church-easter";
    }
    if (lowercaseName.includes('first')) {
        id = "proj-church-first";
    }
    if (lowercaseName.includes('shoe')) {
        id = "proj-flyer-shoe";
    }
    if (lowercaseName.includes('game')) {
        id = "proj-flyer-game";
    }
    if (lowercaseName.includes('hair')) {
        id = "proj-social-hair";
    }
    
    // Check if it's already a logo collage component, we will skip it to avoid duplicates
    if (lowercaseName.includes('dflourish') && lowercaseName.includes('leather')) {
        // We will skip this one because we are adding the individual DFlourish Leather from the collage!
        console.log(`Skipping duplicate database entry for: ${file}`);
        return;
    }
    
    const isFeatured = featuredIds.includes(id);
    
    portfolioItems.push({
        id: id,
        title: title,
        category: category,
        tags: tags,
        description: description,
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

// 2. Process book covers folder (6 files)
if (fs.existsSync(bookDir)) {
    const bookFiles = fs.readdirSync(bookDir);
    console.log(`Processing Book Cover Designs folder. Found ${bookFiles.length} files...`);
    
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
            isFeatured: false
        },
        {
            file: "B6.jpeg",
            title: "The Golden Age of Design",
            description: "Sophisticated cover layout with premium gold foil guides and high-end print mockup finishes.",
            isFeatured: true
        }
    ];

    bookFiles.forEach(file => {
        const srcPath = path.join(bookDir, file);
        const stat = fs.statSync(srcPath);
        
        if (stat.isDirectory()) return;
        
        const ext = path.extname(file).toLowerCase();
        if (!['.jfif', '.png', '.jpg', '.jpeg'].includes(ext)) return;
        
        const meta = bookCoversMetadata.find(m => m.file.toLowerCase() === file.toLowerCase());
        const title = meta ? meta.title : `Book Cover ${file}`;
        const description = meta ? meta.description : "Premium typographic book cover layout designed by Estique Designs.";
        const isFeatured = meta ? meta.isFeatured : false;
        
        const idxStr = file.replace(/[^0-9]/g, '');
        const id = `proj-book-cover-b${idxStr || Math.random().toString(36).substr(2, 4)}`;
        
        portfolioItems.push({
            id: id,
            title: title,
            category: "Book Cover Designs",
            tags: ["Book Cover Designs", "Print Design", "Typography"],
            description: description,
            imageUrl: `/portfolio/${file}`,
            link: "https://www.pinterest.com/estheru0974/_created/",
            tools: ["InDesign", "Adobe Photoshop"],
            problem: "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
            solution: "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
            clientOutcome: "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
            gallery: [`/portfolio/${file}`],
            boardName: "Book Cover Designs",
            isFeatured: isFeatured
        });
    });
}

// 3. Process the 18 new Client Logo entries from the collage
const clientLogosData = [
  {
    id: "proj-logo-kobit",
    title: "Kobit Stores Brand Identity",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "E-commerce"],
    description: "Sleek typographic logo combining a shopping bag icon with clean geometric lettering, designed to establish a trustworthy e-commerce brand presence.",
    problem: "A digital retail shop required a modern logomark that communicates ease, delivery speed, and shopper reliability.",
    solution: "Designed a geometric icon combining a stylized shipping container with a shopping bag cutout, layered with structural sans-serif headings.",
    clientOutcome: "Positioned the retail brand for premium consumer trust, enhancing click-through checkouts.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Retail & E-commerce",
    designStyle: "Modern",
    isFeatured: true // Featured project!
  },
  {
    id: "proj-logo-daughters",
    title: "Daughters With Oil Identity",
    category: "Logo Design",
    tags: ["Logo Design", "Symbolic", "Feminine"],
    description: "Organic visual emblem featuring a stylized oil droplet and leaf motif, representing spiritual anointing, growth, and feminine empowerment.",
    problem: "A community ministry for women required an identity symbol that feels organic, sacred, and visually delicate.",
    solution: "Hand-drafted an interlocking leaf and droplet emblem, using soft curves and high-contrast black contours.",
    clientOutcome: "Provided a beautiful emblem for program booklets, banner boards, and social media icons.",
    tools: ["Adobe Illustrator", "Vector Graphics"],
    industry: "Community / Non-Profit",
    designStyle: "Elegant / Symbolic",
    isFeatured: true // Featured project!
  },
  {
    id: "proj-logo-exceedia",
    title: "Exceedia Media Logotype",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Corporate"],
    description: "Dynamic geometric logotype utilizing clean forward-leaning letterforms and high-contrast wordmarks to communicate speed, media innovation, and growth.",
    problem: "A modern broadcasting agency needed an visual identity representing growth, digital excellence, and speed.",
    solution: "Engineered an abstract 'E' icon constructed from parallel speed tracks, paired with high-legibility corporate wordmarks.",
    clientOutcome: "Created a strong visual anchor for digital media broadcasts and corporate letterheads.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Media & Advertising",
    designStyle: "Corporate",
    isFeatured: false
  },
  {
    id: "proj-logo-unique",
    title: "Esther Unique Monogram",
    category: "Logo Design",
    tags: ["Logo Design", "Luxury", "Monogram"],
    description: "Sophisticated golden monogram combining the initials 'E' and 'U' with clean symmetry and textured metallic foil styling.",
    problem: "A luxury lifestyle designer needed a premium monogram logo suitable for product seals and high-end packaging.",
    solution: "Designed an interlocking serif monogram ('EU') featuring symmetrical gridlines and gold-textured finishes.",
    clientOutcome: "Delivered a trademark mark that serves as the visual anchor for luxury product lines.",
    tools: ["Adobe Illustrator", "Gold Texture Mapping"],
    industry: "Luxury Personal Brand",
    designStyle: "Luxury / Elegant",
    isFeatured: true // Featured project!
  },
  {
    id: "proj-logo-elevra",
    title: "Elevra Brand Mark",
    category: "Logo Design",
    tags: ["Logo Design", "Corporate", "Minimalist"],
    description: "High-contrast geometric wordmark utilizing horizontal pill structures and clean sans-serif letterings to build a modern visual style.",
    problem: "A consulting services group requested a minimal logo layout that is scalable and modern.",
    solution: "Constructed three clean horizontal bands representing steps or consulting layers, paired with a custom geometric typeface.",
    clientOutcome: "Provided a highly versatile vector mark that integrates onto mobile icons, web headers, and stationery.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Consulting & Tech Services",
    designStyle: "Minimalist",
    isFeatured: false
  },
  {
    id: "proj-logo-loiza",
    title: "Evritin Loiza 360 Logotype",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Modern"],
    description: "Minimalist circular monogram combining an inner 'L' and outer dynamic rings to convey completeness, motion, and comprehensive business solutions.",
    problem: "A logistics brand needed a professional emblem showing their all-around delivery services.",
    solution: "Designed a clean typographic logo centering a block 'L' framed by thin circular orbit lines to symbolise 360-degree coverage.",
    clientOutcome: "Unified vehicle wrap templates, delivery boxes, and digital mobile app buttons.",
    tools: ["Adobe Illustrator", "Brand System Guidelines"],
    industry: "Logistics & Corporate Services",
    designStyle: "Modern",
    isFeatured: false
  },
  {
    id: "proj-logo-dflourish",
    title: "DFlourish Leather Branding",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Luxury"],
    description: "Detailed interlocking typographic monogram detailed with traditional serif stems, communicating craftsmanship, leather luxury, and timeless appeal.",
    problem: "A luxury leather goods manufacturer needed a hallmark stamp to emboss directly onto premium hides.",
    solution: "Engineered a custom interlocking monogram logo ('DFL') with high-contrast thick and thin serif strokes.",
    clientOutcome: "Provided a striking hallmark for leather tags, packaging foil stamps, and boutique store headers.",
    tools: ["Adobe Illustrator", "Print Mockup Finishes"],
    industry: "Fashion & Lifestyle",
    designStyle: "Luxury / Serif",
    isFeatured: true // Featured project!
  },
  {
    id: "proj-logo-fulness",
    title: "Fulness Hairvens Salon Identity",
    category: "Logo Design",
    tags: ["Logo Design", "Beauty", "Feminine"],
    description: "A premium hair salon emblem pairing flowing feminine silhouette profiles with elegant serif text, evoking luxury and beauty care excellence.",
    problem: "A premium salon required a brand mark that communicates volume, beauty, and premium care services.",
    solution: "Blended a flowing hair portrait drawing with circular branding frames, adding soft luxury typography coordinates.",
    clientOutcome: "Established a professional beauty studio brand, attracting high-end local client bookings.",
    tools: ["Adobe Illustrator", "Figma"],
    industry: "Beauty & Personal Care",
    designStyle: "Fashion / Elegant",
    isFeatured: false
  },
  {
    id: "proj-logo-kohted",
    title: "Kohted Ventures Identity",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Corporate"],
    description: "Strong, geometric logo mark utilizing angled parallel line shapes to symbolize construction, venture growth, stability, and corporate momentum.",
    problem: "An investment and holdings firm requested a corporate visual mark that communicates growth and protection.",
    solution: "Formed a bold abstract geometric 'K' using parallel solid slabs pointing forward and upward.",
    clientOutcome: "Established a commanding identity on business cards, property signage, and report covers.",
    tools: ["Adobe Illustrator", "Corporate Identity Kit"],
    industry: "Real Estate & Holding Ventures",
    designStyle: "Corporate / Bold",
    isFeatured: false
  },
  {
    id: "proj-logo-therest",
    title: "The Rest Podcast Logomark",
    category: "Logo Design",
    tags: ["Logo Design", "Media", "Creative"],
    description: "Clever podcast emblem blending a retro microphone symbol with a structural bed frame, expressing rest, conversations, and audio entertainment.",
    problem: "A wellness podcast needed a memorable, cheeky logo mark that stands out on digital podcast directories.",
    solution: "Merged the visual elements of a classic microphone grille and a minimalist bed silhouette inside an outline stamp.",
    clientOutcome: "Boosted podcast artwork downloads, becoming highly recognizable on Spotify and Apple Podcasts.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Media & Entertainment",
    designStyle: "Modern / Minimalist",
    isFeatured: false
  },
  {
    id: "proj-logo-ajeku",
    title: "Ajeku Creative Identity",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Cultural"],
    description: "Stylized logomark incorporating a traditional food bowl emblem with geometric tribal guidelines, designed for a modern food brand.",
    problem: "A restaurant brand requested an identity system showing rich cultural roots with clean modern styling.",
    solution: "Designed a geometric food bowl detailing traditional linear patterns, topped with a customized typography wordmark.",
    clientOutcome: "Enhanced packaging stickers, delivery bags, and menu branding consistency.",
    tools: ["Adobe Illustrator", "Packaging Design"],
    industry: "Food & Hospitality",
    designStyle: "Modern / Cultural",
    isFeatured: false
  },
  {
    id: "proj-logo-christ",
    title: "Christ Discipleship Hub Emblem",
    category: "Logo Design",
    tags: ["Logo Design", "Ministry", "Religious"],
    description: "Elegant ministry banner combining an open Bible layout, a central cross icon, and clean uppercase sans-serif headings for study guides.",
    problem: "A study and discipleship group needed a clean emblem for social media overlays and printed Bible booklets.",
    solution: "Aligned a minimalist line-art open Bible under a delicate cross emblem, framed by clean modern spacing.",
    clientOutcome: "Streamlined discipleship study materials, creating a recognizable look for weekly modules.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Religious / Ministry",
    designStyle: "Church / Symbolic",
    isFeatured: false
  },
  {
    id: "proj-logo-sparklepro",
    title: "SparklePro Nigeria Branding",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Fresh"],
    description: "Dynamic cleaning service logo showing active sparkle stars, water droplet elements, and friendly rounded lettering to convey hygiene excellence.",
    problem: "A premium cleaning company requested an identity that communicates hygiene, cleanliness, and friendliness.",
    solution: "Built a customized letter 'S' with sparkles, bubbles, and refreshing blue-green tones, pairing it with round headings.",
    clientOutcome: "Differentiated the company from competitors, driving organic service inquiries.",
    tools: ["Adobe Illustrator", "Color Theory Guides"],
    industry: "Cleaning & Maintenance Services",
    designStyle: "Modern / Fresh",
    isFeatured: false
  },
  {
    id: "proj-logo-storm",
    title: "Storm Outreach Logo Mark",
    category: "Logo Design",
    tags: ["Logo Design", "Outreach", "Bold"],
    description: "Striking community outreach logo blending a lightning bolt icon with clean industrial typography, communicating energy, power, and outreach impact.",
    problem: "A community action outreach group required a bold identity representing action, urgency, and power.",
    solution: "Drafted high-contrast letterforms with an integrated lightning icon slicing through the center 'O'.",
    clientOutcome: "Created an energetic branding system for t-shirts, flags, and local charity event flyers.",
    tools: ["Adobe Illustrator", "Vector Graphics"],
    industry: "NGO & Community Outreach",
    designStyle: "Bold / Symbolic",
    isFeatured: false
  },
  {
    id: "proj-logo-exgey",
    title: "Exgey Fitness Logo",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Athletic"],
    description: "Dynamic wellness mark combining a heart shape icon with weights and arrow brackets, symbolizing energetic heart health and athletic conditioning.",
    problem: "A fitness apparel startup requested a brand mark that represents both healthy living and high-performance training.",
    solution: "Merged a barbell weights vector, a heart shape silhouette, and motion brackets into a clean monochrome emblem.",
    clientOutcome: "Successfully applied to sportswear apparel tags, gym bags, and activewear branding.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Fitness & Wellness",
    designStyle: "Modern / Bold",
    isFeatured: false
  },
  {
    id: "proj-logo-fem",
    title: "Fem International Logotype",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Corporate"],
    description: "Sleek international trade logo showcasing a custom letter 'F' extending into globe lines, representing global connectivity and logistics.",
    problem: "An import-export group needed a corporate visual system representing global reach and reliable logistics.",
    solution: "Engineered an abstract geometric logo combining the initial 'F' with curved global parallel longitude paths.",
    clientOutcome: "Established a professional corporate appearance for international business partnerships.",
    tools: ["Adobe Illustrator", "Corporate Identity Kit"],
    industry: "Global Trade & Logistics",
    designStyle: "Corporate / Minimalist",
    isFeatured: false
  },
  {
    id: "proj-logo-nails",
    title: "Nails Art By Tee Identity",
    category: "Logo Design",
    tags: ["Logo Design", "Beauty", "Fashion"],
    description: "Chic salon logo mark showcasing a stylized nail polish brush icon detailed with high-fashion serif letterings, evoking artistic beauty expertise.",
    problem: "A premium nail tech artist required a luxury signature logo for social media watermarks and boutique labels.",
    solution: "Designed a clean visual identity combining a nail polish brush tip, fluid black curves, and classic high-fashion font tracks.",
    clientOutcome: "Created a luxury signature watermark that elevated the presentation of client work.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Beauty & Fashion",
    designStyle: "Elegant / Luxury",
    isFeatured: false
  },
  {
    id: "proj-logo-damiglow",
    title: "DamiGlow Tribe Monogram",
    category: "Brand Identity",
    tags: ["Brand Identity", "Logo Design", "Skincare"],
    description: "Refined geometric monogram combining the letters 'D' and 'G', designed to position a wellness community focused on healthy skincare glow.",
    problem: "A luxury skincare and wellness community needed a minimal monogram trademark.",
    solution: "Molded the initials 'D' and 'G' into a interlocking geometric square block vector, focusing on clean parallel lines.",
    clientOutcome: "Provided a beautiful visual seal for lotion bottle packaging, cosmetic boxes, and stickers.",
    tools: ["Figma", "Adobe Illustrator"],
    industry: "Beauty & Skincare",
    designStyle: "Modern / Elegant",
    isFeatured: false
  }
];

// Combine the logo entries with our existing projects
clientLogosData.forEach(item => {
    // Slices from collage will load dynamic imageUrl from React state/context.
    // We set imageUrl initially to 'collage' or 'placeholder' so the UI knows to render the dynamic slice.
    // In React we will match item.id to slicedImages[item.id]!
    portfolioItems.push({
        id: item.id,
        title: item.title,
        category: item.category,
        tags: item.tags,
        description: item.description,
        imageUrl: `sliced:${item.id}`, // Custom prefix so slicer recognizes it!
        link: "https://www.pinterest.com/estheru0974/_created/",
        tools: item.tools,
        problem: item.problem,
        solution: item.solution,
        clientOutcome: item.clientOutcome,
        gallery: [`sliced:${item.id}`],
        boardName: "Created Portfolio",
        isFeatured: item.isFeatured,
        // Custom fields for case study page metadata
        industry: item.industry,
        designStyle: item.designStyle
    });
});

console.log(`Rebuilding database. Combined portfolio items: ${portfolioItems.length}`);

// Output file content
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
  industry?: string;
  designStyle?: string;
}

export const portfolioData: PortfolioItem[] = ${JSON.stringify(portfolioItems, null, 2)};
`;

fs.writeFileSync(dbFile, tsContent);
console.log("SUCCESS: Rebuilt portfolio.ts database combining all designs and the 18 client logo projects!");
