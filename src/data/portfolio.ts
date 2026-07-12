export interface PortfolioItem {
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

export const portfolioData: PortfolioItem[] = [
  {
    "id": "proj-church-another",
    "title": "Mid-Week Service Announcement Banner",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Weekly Service"
    ],
    "description": "Modern announcement banner for weekly Bible study, utilizing balanced layout spacing, clean serif fonts, and elegant gold borders for church feeds.",
    "imageUrl": "/portfolio/another weekly Church Service.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The client needed a recurring mid-week design that could be quickly updated without losing brand identity.",
    "solution": "Engineered a templated layout with dedicated spaces for guest speakers and scheduling text blocks.",
    "clientOutcome": "Simplified content creation for the media department while maintaining premium quality.",
    "gallery": [
      "/portfolio/another weekly Church Service.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-logo-artboard",
    "title": "Estique Monogram Logotype",
    "category": "Logo Design",
    "tags": [
      "Logo Design",
      "Branding",
      "Vector"
    ],
    "description": "Bespoke vector logotype exploring minimal visual alignment and geometric symmetry, designed for a luxury creative brand seeking a timeless and clean monogram identity.",
    "imageUrl": "/portfolio/Artboard 3 copy.png",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Illustrator",
      "Figma",
      "Brand Guidelines"
    ],
    "problem": "The client required a brand logotype that stands out across digital interfaces and physical print finishes, maintaining scalable legibility.",
    "solution": "Structured a balanced geometric symbol utilizing precise stroke weights and minimal line intersections.",
    "clientOutcome": "Created a distinctive, recognizable trademark that establishes visual authority for the brand.",
    "gallery": [
      "/portfolio/Artboard 3 copy.png"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-logo-artboard8",
    "title": "Dami Glow Brand Visual System",
    "category": "Brand Identity",
    "tags": [
      "Brand Identity",
      "Social Media",
      "Flyer Design"
    ],
    "description": "Premium brand visual system and promotional designs created for Dami Glow, featuring clean layouts, custom typography, and warm aesthetic social media creatives.",
    "imageUrl": "/portfolio/brand-collage-3.jpg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Figma",
      "Brand Guidelines"
    ],
    "problem": "The client required cohesive, luxury-positioned flyers for relationship and marriage talking sessions to boost digital engagement.",
    "solution": "Engineered elegant grid templates utilizing gold and rose-pink accents, combined with balanced typography systems.",
    "clientOutcome": "Enhanced brand credibility and audience reach, establishing Dami Glow as a leading voice in relationship coaching.",
    "gallery": [
      "/portfolio/brand-collage-3.jpg"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-social-birthday",
    "title": "Classic Birthday Invitation Card",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Print",
      "Invitation Card"
    ],
    "description": "Minimalist birthday invitation design featuring elegant script lettering, subtle paper textures, and a clean text hierarchy for physical or digital sharing.",
    "imageUrl": "/portfolio/birthday invitation card.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "An event planner requested elegant invitation templates that feel personal, classic, and premium.",
    "solution": "Arranged script-stamped headings and event coordinates over a clean, textured gray canvas.",
    "clientOutcome": "Produced a sophisticated invite that set a premium tone for the client's private dinner party.",
    "gallery": [
      "/portfolio/birthday invitation card.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-brand-dflourish",
    "title": "D'Flourish Leather Brand System",
    "category": "Corporate Branding",
    "tags": [
      "Corporate Branding",
      "Brand Guidelines",
      "Corporate Identity"
    ],
    "description": "Premium brand identity board for DFlourish Leather, detailing custom typography systems, visual leather textures, and minimalist gold-foil guidelines for packaging.",
    "imageUrl": "/portfolio/brand identity of DFLOURISH LEATHER.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Illustrator",
      "Figma",
      "Brand Guidelines"
    ],
    "problem": "The brand needed to communicate handcrafted quality and luxury positioning through all its physical leather tags and packaging.",
    "solution": "Constructed a branding kit showing logo variants, custom visual tags, and gold-foil leather design rules.",
    "clientOutcome": "Positioned the brand for premium market pricing and built instant shopper trust.",
    "gallery": [
      "/portfolio/brand identity of DFLOURISH LEATHER.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-church-church",
    "title": "Weekly Mid-Week Bible Study",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Weekly Service"
    ],
    "description": "Mid-week church service announcement card designed with structured columns, gold-emerald borders, and clean serif text to announce fellowship times.",
    "imageUrl": "/portfolio/church weekly Service.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "A design was needed to promote mid-week Bible studies that visually separates them from regular Sunday services.",
    "solution": "Selected an emerald green theme detailed with thin gold lines, focusing text on topic discussion points.",
    "clientOutcome": "Clearly demarcated mid-week sessions, leading to a steady increase in study participation.",
    "gallery": [
      "/portfolio/church weekly Service.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-event-couples",
    "title": "Couples' Hangout Event Flyer",
    "category": "Event Flyers",
    "tags": [
      "Event Flyers",
      "Promotional",
      "Couples Retreat"
    ],
    "description": "Warm event flyer for a couples' hangout, utilizing romantic lighting, soft red borders, and clean, readable event detail sections.",
    "imageUrl": "/portfolio/couples' hangout.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "An event organizer needed flyers for a private couples' hangout dinner that feels intimate and welcoming.",
    "solution": "Structured a balanced design featuring ambient warm light flares and classic layout spacing.",
    "clientOutcome": "Helped drive strong RSVPs and successfully established the visual theme for the night.",
    "gallery": [
      "/portfolio/couples' hangout.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-designer",
    "title": "Designer Portfolio Interface",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "UI Layout",
      "Figma"
    ],
    "description": "Editorial web landing page layout for a professional designer, prioritizing minimalist grids, elegant whitespace, and high-impact typographic alignment to display creative portfolios.",
    "imageUrl": "/portfolio/Designer page.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "The visual designer needed a portfolio interface that reflects their commitment to clean grids and minimal layout styling.",
    "solution": "Arranged components dynamically using extensive margins, sans-serif typography, and framed visual content cards.",
    "clientOutcome": "Unified digital profile presentation, leading to higher client conversion rates and clear navigation.",
    "gallery": [
      "/portfolio/Designer page.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-easter",
    "title": "Easter Celebration Service Banner",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Ministry Banner"
    ],
    "description": "Promotional artwork for an Easter resurrection service, communicating hope and celebration through cinematic backlighting, bold headline typography, and refined editorial spacing.",
    "imageUrl": "/portfolio/EASTER SERVICE.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The ministry required a high-impact graphic that announces Easter Sunday clearly without feeling cluttered or generic.",
    "solution": "Designed a clean typographic composition utilizing cinematic backlighting and a high-contrast heading grid.",
    "clientOutcome": "Dramatically increased social shares and online stream attendance during the Easter service.",
    "gallery": [
      "/portfolio/EASTER SERVICE.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-church-family",
    "title": "Family Meeting Service Banner",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Fellowship Card"
    ],
    "description": "Announcing a church family meeting through a clean social media flyer, utilizing a structured editorial grid and neutral color palettes to invite families to fellowship.",
    "imageUrl": "/portfolio/FAMILY MEETING DESIGN.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The team needed a flyer that presents meeting times and details clearly while maintaining an elegant, friendly visual tone.",
    "solution": "Arranged event schedules inside a balanced column structure, pairing soft backdrop tones with bold serif text headers.",
    "clientOutcome": "Provided clear visual communication, resulting in strong attendance and positive congregation response.",
    "gallery": [
      "/portfolio/FAMILY MEETING DESIGN.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-fire",
    "title": "Youth Fire Conference Flyer",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Youth Event"
    ],
    "description": "Dynamic fire conference flyer utilizing bold industrial font treatments, custom flame textures, and high-contrast styling to appeal to youth attendees.",
    "imageUrl": "/portfolio/fire conference !!!!!!1.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The youth department needed highly engaging graphics to announce a major regional conference.",
    "solution": "Blended dark metal textures, glowing text effects, and energetic fire visual accents.",
    "clientOutcome": "Generated significant excitement and drove record youth registrations for the event.",
    "gallery": [
      "/portfolio/fire conference !!!!!!1.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-first",
    "title": "First Communion Of The Year",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Sermon Slide"
    ],
    "description": "Sermon announcement banner capturing the solemnity of the first communion, using clean serif headings, soft glowing accents, and spacious visual layouts.",
    "imageUrl": "/portfolio/FIRST COMMUNION OF THE YEAR.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The church needed a visual banner that honors the sacred nature of communion while presenting date details legibly.",
    "solution": "Combined dark ambient backgrounds, gold lighting details, and elegant spacing to highlight the communion theme.",
    "clientOutcome": "Successfully announced the service across digital bulletin feeds, elevating church event branding.",
    "gallery": [
      "/portfolio/FIRST COMMUNION OF THE YEAR.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-flyer-game",
    "title": "Game Day Sports Event Flyer",
    "category": "Event Flyers",
    "tags": [
      "Event Flyers",
      "Promotional",
      "Sports Graphic"
    ],
    "description": "High-impact sports flyer for a game day event, utilizing athletic action photography overlays, intense color grading, and heavy typography to drive viewer interest.",
    "imageUrl": "/portfolio/Game Day flyer design idea.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "A sports bar client needed high-impact promotional graphics for a weekly watch party campaign.",
    "solution": "Engineered a dynamic layout pairing bold industrial headers with active player cutouts and vivid backlighting.",
    "clientOutcome": "Drove high table bookings and watch party attendance through coordinated social postings.",
    "gallery": [
      "/portfolio/Game Day flyer design idea.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-hair",
    "title": "Luxury Salon Promotional Layout",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Marketing",
      "Hair Boutique"
    ],
    "description": "Luxury promotional flyer layout for an upscale hair salon, combining high-resolution portrait imagery, metallic gold typography, and a structured product grid.",
    "imageUrl": "/portfolio/HAIR BRAND PROMOTIONAL FLYER DESIGNS.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "A high-end salon required promotional graphics that justify their premium pricing structure.",
    "solution": "Designed a clean advertising template pairing luxury typography with a minimalist background frame and model photography.",
    "clientOutcome": "Elevated brand aesthetic, leading to a rise in premium treatment bookings.",
    "gallery": [
      "/portfolio/HAIR BRAND PROMOTIONAL FLYER DESIGNS.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-social-happy",
    "title": "Serif Birthday Celebration Card",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Celebratory",
      "Template"
    ],
    "description": "Minimalist birthday celebration slide featuring custom serif type, clean whitespace, and elegant floral accents for social media stories.",
    "imageUrl": "/portfolio/happy birthday design.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "The studio required clean birthday announcement cards that match their minimalist design guidelines.",
    "solution": "Designed a simple editorial layout centering high-contrast serif headlines over floral border details.",
    "clientOutcome": "Provided a beautiful social media template that reflects the brand's premium design philosophy.",
    "gallery": [
      "/portfolio/happy birthday design.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-happy",
    "title": "Premium Birthday Announcement Layout",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Celebratory",
      "Flyer"
    ],
    "description": "Commemorative birthday flyer combining a soft portrait frame shadow, metallic gold letterings, and a premium editorial page layout.",
    "imageUrl": "/portfolio/happy birthday flyer design.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "A client requested a personal celebration graphic that feels editorial, like a page from a design magazine.",
    "solution": "Constructed a grid-based card layout utilizing soft shadows, gold accents, and spacious visual columns.",
    "clientOutcome": "Delivered a premium digital asset that was widely shared by the client's family and colleagues.",
    "gallery": [
      "/portfolio/happy birthday flyer design.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-happypastor",
    "title": "Senior Pastor Birthday Celebration",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Ministry",
      "Celebratory"
    ],
    "description": "Refined birthday celebration card design honoring a senior pastor, combining elegant serif scripts, ambient golden gradients, and clean layout margins.",
    "imageUrl": "/portfolio/HAPPY BIRTHDAY MY PASTOR (1).jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "The administrative team wanted to publish a premium birthday card for their lead pastor's social media accounts.",
    "solution": "Drafted a high-end graphic balancing classic typography with gold textures and refined margins.",
    "clientOutcome": "Unified church social media aesthetic and garnered strong positive comments from church members.",
    "gallery": [
      "/portfolio/HAPPY BIRTHDAY MY PASTOR (1).jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-happypastor",
    "title": "Pastor Birthday Anniversary Flyer",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Ministry",
      "Celebratory"
    ],
    "description": "Sermon and social media birthday banner featuring gold typography accents, geometric border frames, and spacious layouts designed to honor a leader's birthday.",
    "imageUrl": "/portfolio/HAPPY BIRTHDAY MY PASTOR.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "The media department needed a commemorative flyer to celebrate their pastor on the official church channel.",
    "solution": "Utilized a dark charcoal canvas layered with thin gold frames and clean, legible font spacing.",
    "clientOutcome": "Delivered a respectful, visually striking graphic that aligns with the church's premium aesthetic standards.",
    "gallery": [
      "/portfolio/HAPPY BIRTHDAY MY PASTOR.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-happy",
    "title": "Pastor Grace Birthday Commemoration",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Ministry",
      "Celebratory"
    ],
    "description": "Elegant social media birthday flyer created for Pastor Grace, balancing soft floral accents, ambient lighting effects, and modern serif text hierarchy.",
    "imageUrl": "/portfolio/HAPPY BIRTHDAY PST GRACE.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "A special commemorative graphic was required to celebrate Pastor Grace's birthday on Instagram and newsletter headers.",
    "solution": "Blended light background hues, soft serif typography, and elegant visual layers for a clean, personal presentation.",
    "clientOutcome": "Provided a beautiful social asset that received warm engagement from the community.",
    "gallery": [
      "/portfolio/HAPPY BIRTHDAY PST GRACE.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-social-iniobong",
    "title": "Iniobong Editorial Layout",
    "category": "Social Media Designs",
    "tags": [
      "Social Media Designs",
      "Editorial",
      "Layout"
    ],
    "description": "Editorial design concept showing portfolio photo grids, structured text block alignment, and clean geometric layout margins for high-end fashion branding.",
    "imageUrl": "/portfolio/iniobong.png",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Figma",
      "Adobe Photoshop"
    ],
    "problem": "A fashion client requested portfolio layout layouts that feel clean, spacious, and focus on image assets.",
    "solution": "Balanced bold, asymmetric typography columns against high-resolution photography grid containers.",
    "clientOutcome": "Delivered an editorial lookbook template that aligns with contemporary design aesthetics.",
    "gallery": [
      "/portfolio/iniobong.png"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-mid",
    "title": "Mid-Year Thanksgiving Service Banner",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Service Announcement"
    ],
    "description": "High-contrast thanksgiving flyer combining ambient golden lighting, premium decorative typography, and clean spacing to celebrate the mid-year thanksgiving service.",
    "imageUrl": "/portfolio/mid year thanksgiving.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The ministry required graphics that convey gratitude and celebration for a mid-year service.",
    "solution": "Engineered a graphic utilizing warm gold lighting effects, bold headers, and spacious informational text.",
    "clientOutcome": "Successfully announced the event, driving record attendance for the thanksgiving service.",
    "gallery": [
      "/portfolio/mid year thanksgiving.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-perfect",
    "title": "Perfect Peace Sermon Graphic",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Sermon Series"
    ],
    "description": "Tranquil sermon graphic for 'Perfect Peace' series, using soft radial color blurs, minimal font weights, and spacious margin alignments.",
    "imageUrl": "/portfolio/perfect peace.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The pastor wanted a visual theme for a sermon series on peace that looks calm, modern, and serene.",
    "solution": "Created a minimalist layout using soft, blue-gray radial gradients and thin typography spacing.",
    "clientOutcome": "Provided a coherent visual branding theme for slides, booklets, and social media feeds.",
    "gallery": [
      "/portfolio/perfect peace.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-brand-premium",
    "title": "Evritin Loiza 360 Branding System",
    "category": "Brand Identity",
    "tags": [
      "Brand Identity",
      "Social Media",
      "Promotional"
    ],
    "description": "Comprehensive visual brand system for Evritin Loiza 360, showcasing ushering campaigns, perfume branding, healthy drinks packaging layouts, and social media flyers.",
    "imageUrl": "/portfolio/brand-collage-1.jpg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Brand Identity"
    ],
    "problem": "The business needed to unify their diverse operations under a single premium aesthetic for their marketing materials.",
    "solution": "Created a royal purple and gold brand identity system applied across packaging, flyers, and ushering services.",
    "clientOutcome": "Streamlined marketing visuals and presented a unified, high-end presence that attracted premium clientele.",
    "gallery": [
      "/portfolio/brand-collage-1.jpg"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-flyer-shoe",
    "title": "Footwear Brand Promotional Card",
    "category": "Event Flyers",
    "tags": [
      "Event Flyers",
      "Promotional",
      "Product Card"
    ],
    "description": "Sleek footwear marketing flyer utilizing minimal product alignment, clean background lines, and focused call-to-actions to announce a premium sports shoe release.",
    "imageUrl": "/portfolio/SHOE BRAND FLYER DESIGN.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "A sports retail brand needed digital flyers that place the focus entirely on a new product release.",
    "solution": "Created a minimalist design that isolates the product image, framed by light gray visual buffers and clean text.",
    "clientOutcome": "Drove click-through engagement on the client's e-commerce launch portal.",
    "gallery": [
      "/portfolio/SHOE BRAND FLYER DESIGN.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-church-sunday",
    "title": "Worship Service Announcement Flyer",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Service Announcement"
    ],
    "description": "Digital Sunday service flyer utilizing bold sermon headlines, high legibility spacing, and structured event details for online congregation channels.",
    "imageUrl": "/portfolio/sunday service design (1).jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The client requested weekly service invite templates that can be easily scanned on mobile screens.",
    "solution": "Designed high-contrast text blocks, keeping key times and speaker details in clear vertical structures.",
    "clientOutcome": "Streamlined weekly announcements and improved online visitor registration metrics.",
    "gallery": [
      "/portfolio/sunday service design (1).jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-sunday",
    "title": "Sunday Worship Service Flyer",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Service Announcement"
    ],
    "description": "Modern church service poster combining deep blue background gradients, structural typography contrast, and high-contrast spacing to welcome visitors to worship.",
    "imageUrl": "/portfolio/SUNDAY SERVICE DESIGN.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The design team needed a fresh template for weekly service invites that stands out in a crowded social feed.",
    "solution": "Created a balanced layout featuring elegant headers, clean timing callouts, and a deep gradient backdrop.",
    "clientOutcome": "Helped establish consistent weekly branding, boosting new guest attendance.",
    "gallery": [
      "/portfolio/SUNDAY SERVICE DESIGN.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-sunday",
    "title": "Minimalist Sunday Service Card",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Service Announcement"
    ],
    "description": "Spacious social media flyer for Sunday services, utilizing minimal editorial grids, bold sans-serif headlines, and clean layout margins for digital screens.",
    "imageUrl": "/portfolio/SUNDAY SERVICE.png",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "A contemporary church wanted visual announcements that feel modern and avoid busy graphics.",
    "solution": "Designed a clean, typography-led banner prioritizing whitespace and strict informational hierarchy.",
    "clientOutcome": "Streamlined communication, making service details instantly readable for mobile users.",
    "gallery": [
      "/portfolio/SUNDAY SERVICE.png"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-logo-tpr",
    "title": "TPR Corporate Logotype",
    "category": "Logo Design",
    "tags": [
      "Logo Design",
      "Branding",
      "Corporate Identity"
    ],
    "description": "Bespoke corporate branding logotype showing line logo structures, minimalist monochrome pairings, and custom brand alignment for a modern venture.",
    "imageUrl": "/portfolio/TPR 1.png",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Illustrator",
      "Figma",
      "Brand Guidelines"
    ],
    "problem": "The corporation required a visual logotype that communicates efficiency, structure, and forward-looking strategy.",
    "solution": "Designed custom geometric letters with precise line tracking, optimized for both dark and light backdrops.",
    "clientOutcome": "Established a professional corporate identity, aligning materials for partner and client presentations.",
    "gallery": [
      "/portfolio/TPR 1.png"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": true
  },
  {
    "id": "proj-church-visible",
    "title": "Visible Progress Sermon Slides",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Sermon Series"
    ],
    "description": "Inspirational sermon banner designed around 'Visible Progress' theme, using high-impact font styling, clean borders, and premium visual layouts.",
    "imageUrl": "/portfolio/visible progress.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "A service theme needed graphic representations that inspire forward movement and church growth.",
    "solution": "Paired large, bold geometric typography with structural border lines and bright visual gradients.",
    "clientOutcome": "Created a memorable sermon brand that resonated deeply with the online congregation.",
    "gallery": [
      "/portfolio/visible progress.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-weekly",
    "title": "Weekly Fellowship Service Graphic",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Weekly Service"
    ],
    "description": "Clean announcement card designed for weekly church meetings, emphasizing high-contrast layout grids, readable text blocks, and structured event timing headers.",
    "imageUrl": "/portfolio/WEEKLY SERVICE DESIGN.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "The weekly service graphics lacked a consistent structure, leading to confusion over service times.",
    "solution": "Built a modular template dividing space between theme visuals and service schedule cards.",
    "clientOutcome": "Improved informational clarity, resulting in regular and prompt attendance at mid-week meetings.",
    "gallery": [
      "/portfolio/WEEKLY SERVICE DESIGN.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-church-word",
    "title": "Word Feast Sermon Series Flyer",
    "category": "Church Designs",
    "tags": [
      "Church Designs",
      "Social Media",
      "Sermon Series"
    ],
    "description": "Announcement graphics for the 'Word Feast' sermon series, combining a glowing light flare background, metallic gold titles, and bold typography grids.",
    "imageUrl": "/portfolio/WORD FEAST - THEMES_ THE POWER IF THE BLESSING -.jfif",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Typography System"
    ],
    "problem": "A special monthly sermon series required custom graphics that express the spiritual weight of the theme.",
    "solution": "Aligned high-impact gold lettering on a dark, texturized background with radiant light flare accents.",
    "clientOutcome": "Created a visually compelling sermon campaign asset that was widely shared by the congregation.",
    "gallery": [
      "/portfolio/WORD FEAST - THEMES_ THE POWER IF THE BLESSING -.jfif"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  },
  {
    "id": "proj-book-cover-b1",
    "title": "The Path of Wisdom",
    "category": "Book Cover Designs",
    "tags": [
      "Book Cover Designs",
      "Print Design",
      "Typography"
    ],
    "description": "Minimalist typographic book cover layout incorporating elegant visual hierarchy and subtle canvas overlays.",
    "imageUrl": "/portfolio/B1.jpeg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "InDesign",
      "Adobe Photoshop"
    ],
    "problem": "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
    "solution": "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
    "clientOutcome": "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
    "gallery": [
      "/portfolio/B1.jpeg"
    ],
    "boardName": "Book Cover Designs",
    "isFeatured": false
  },
  {
    "id": "proj-book-cover-b2",
    "title": "Shadows in the Mist",
    "category": "Book Cover Designs",
    "tags": [
      "Book Cover Designs",
      "Print Design",
      "Typography"
    ],
    "description": "Moody, atmospheric book cover design balancing ambient color tones and custom serif lettering.",
    "imageUrl": "/portfolio/B2.jpeg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "InDesign",
      "Adobe Photoshop"
    ],
    "problem": "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
    "solution": "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
    "clientOutcome": "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
    "gallery": [
      "/portfolio/B2.jpeg"
    ],
    "boardName": "Book Cover Designs",
    "isFeatured": false
  },
  {
    "id": "proj-book-cover-b3",
    "title": "Echoes of Eternity",
    "category": "Book Cover Designs",
    "tags": [
      "Book Cover Designs",
      "Print Design",
      "Typography"
    ],
    "description": "Elegant editorial book cover layout featuring deep contrasts, golden lighting overlays, and clean typographic spacing.",
    "imageUrl": "/portfolio/B3.jpeg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "InDesign",
      "Adobe Photoshop"
    ],
    "problem": "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
    "solution": "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
    "clientOutcome": "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
    "gallery": [
      "/portfolio/B3.jpeg"
    ],
    "boardName": "Book Cover Designs",
    "isFeatured": false
  },
  {
    "id": "proj-book-cover-b4",
    "title": "The Architect's Mind",
    "category": "Book Cover Designs",
    "tags": [
      "Book Cover Designs",
      "Print Design",
      "Typography"
    ],
    "description": "Sleek, minimalist design cover blending structural line art with custom font layouts.",
    "imageUrl": "/portfolio/B4.jpeg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "InDesign",
      "Adobe Photoshop"
    ],
    "problem": "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
    "solution": "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
    "clientOutcome": "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
    "gallery": [
      "/portfolio/B4.jpeg"
    ],
    "boardName": "Book Cover Designs",
    "isFeatured": false
  },
  {
    "id": "proj-book-cover-b5",
    "title": "Whispers of the Wind",
    "category": "Book Cover Designs",
    "tags": [
      "Book Cover Designs",
      "Print Design",
      "Typography"
    ],
    "description": "Beautiful illustrative cover layout featuring abstract background designs and clean title layouts.",
    "imageUrl": "/portfolio/B5.jpeg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "InDesign",
      "Adobe Photoshop"
    ],
    "problem": "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
    "solution": "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
    "clientOutcome": "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
    "gallery": [
      "/portfolio/B5.jpeg"
    ],
    "boardName": "Book Cover Designs",
    "isFeatured": false
  },
  {
    "id": "proj-book-cover-b6",
    "title": "The Golden Age of Design",
    "category": "Book Cover Designs",
    "tags": [
      "Book Cover Designs",
      "Print Design",
      "Typography"
    ],
    "description": "Sophisticated cover layout with premium gold foil guides and high-end print mockup finishes.",
    "imageUrl": "/portfolio/B6.jpeg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "InDesign",
      "Adobe Photoshop"
    ],
    "problem": "The author required an attention-grabbing book cover that stands out clearly at thumbnail sizes on digital store shelves.",
    "solution": "Designed a clean, typography-focused cover layout using strong visual contrast and strategic spacing alignments.",
    "clientOutcome": "Helped establish immediate shelf presence, driving online clicks and category engagement for the launch campaign.",
    "gallery": [
      "/portfolio/B6.jpeg"
    ],
    "boardName": "Book Cover Designs",
    "isFeatured": true
  },
  {
    "id": "proj-brand-logo-collection",
    "title": "Estique Designs Brand Logo Collection",
    "category": "Brand Identity",
    "tags": [
      "Brand Identity",
      "Logo Design",
      "Vector"
    ],
    "description": "A curated collection of professional logos and custom brand marks created for diverse businesses, ministries, and creative entrepreneurs.",
    "imageUrl": "/portfolio/brand-collage-2.jpg",
    "link": "https://www.pinterest.com/estheru0974/_created/",
    "tools": [
      "Adobe Illustrator",
      "Figma",
      "Creative Direction"
    ],
    "problem": "The studio wanted a single showcase piece summarizing their extensive portfolio of custom logo creations.",
    "solution": "Organized a grid-based branding sheet displaying 15+ vector marks alongside professional headshots.",
    "clientOutcome": "Immediately demonstrates creative breadth and design authority to potential branding clients.",
    "gallery": [
      "/portfolio/brand-collage-2.jpg"
    ],
    "boardName": "Created Portfolio",
    "isFeatured": false
  }
];
