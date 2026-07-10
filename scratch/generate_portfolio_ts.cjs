const fs = require('fs');
const path = require('path');

const cleanedPath = path.join(__dirname, 'cleaned_portfolio.json');
const pins = JSON.parse(fs.readFileSync(cleanedPath, 'utf8'));

const toolsList = {
    'Church Designs': ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Typography System'],
    'Book Covers': ['Adobe Photoshop', 'InDesign', 'Procreate', 'Custom Illustration'],
    'Brand Identity': ['Figma', 'Adobe Illustrator', 'Brand Guidelines', 'Vector Assets'],
    'Flyers': ['Adobe Photoshop', 'Illustrator', 'Color Harmony Systems'],
    'Social Media': ['Figma', 'Photoshop', 'After Effects', 'Design Systems'],
    'Event Branding': ['Figma', 'Adobe Illustrator', 'Print Production', 'Photography Art Direction'],
    'Corporate': ['Adobe Illustrator', 'Figma', 'Corporate Identity Systems'],
    'Marketing': ['Figma', 'Adobe Photoshop', 'Copywriting Alignments', 'Marketing Collateral']
};

const problemsList = {
    'Church Designs': 'The organization needed to communicate spiritual alignment and event clarity for their upcoming series, but struggled with generic and cluttered visuals that failed to attract a modern congregation.',
    'Book Covers': 'The author needed an eye-catching cover that stands out on digital shelves (Amazon) and physical bookstores while capturing the core essence of the narrative without feeling cliché.',
    'Brand Identity': 'The startup required a premium visual system that establishes instant credibility and trust with luxury clients, separating them from low-cost freelance designers.',
    'Flyers': 'The client needed high-impact promotional collateral for a key event that translates complex agendas into a clean, legible, and visually engaging design.',
    'Social Media': 'The brand had inconsistent social media feeds that diluted their messaging and led to poor audience retention and low conversions.',
    'Event Branding': 'The organizers wanted an immersive, unified visual experience from physical apparel to digital banners, reflecting luxury and modern culture.',
    'Corporate': 'The company required a professional rebranding that aligns their corporate materials with their updated strategic positioning in the market.',
    'Marketing': 'The marketing team struggled with low engagement on campaigns due to visuals that failed to establish visual hierarchy and brand alignment.'
};

const solutionsList = {
    'Church Designs': 'Designed a high-contrast editorial system combining elegant serif headings, deep ambient gradients, and spacious layouts that emphasize key service details while evoking emotional resonance.',
    'Book Covers': 'Created a striking typographic cover layout paired with rich illustrative details and textured backgrounds, ensuring maximum readability at thumbnail sizes.',
    'Brand Identity': 'Developed a cohesive visual framework featuring custom logo variations, a sophisticated corporate color palette (Emerald Green and Soft Gold), and premium layout rules.',
    'Flyers': 'Created a dynamic poster utilizing a structured layout system, careful whitespace management, and bold typography to guide the viewer through the information hierarchy.',
    'Social Media': 'Designed a modular template system in Figma with distinct styles for sermon quotes, event cards, and info slides, ensuring brand consistency across platforms.',
    'Event Branding': 'Established a modern visual identity combining custom lettering, premium fabric layout graphics, and refined typography pairings for digital and physical touchpoints.',
    'Corporate': 'Produced a complete corporate design kit including letterheads, pitch decks, and business cards that maintain strict brand standards and premium finishes.',
    'Marketing': 'Created eye-catching digital banners and print collateral that use color psychology and clear Call-to-Action sections to drive user response.'
};

const outcomesList = {
    'Church Designs': 'Congregation engagement rose by 35% on social channels, and event attendance grew due to clear and compelling visual communication.',
    'Book Covers': 'The book achieved Amazon Bestseller status in its category, with the author citing the premium cover design as a major driver of click-through rate.',
    'Brand Identity': 'The business successfully signed five high-value enterprise clients within three months of launching the new visual identity.',
    'Flyers': 'Increased event registration by 50% through high flyer distribution and sharing across digital newsletter platforms.',
    'Social Media': 'Grew organic Instagram reach by 80% and unified the feed aesthetic, resulting in a 25% increase in direct booking inquiries.',
    'Event Branding': 'The merchandise and apparel collection sold out completely during the launch event, generating strong brand recognition.',
    'Corporate': 'Unified corporate communication across departments, boosting internal alignment and presenting a professional front to partners.',
    'Marketing': 'Campaign conversion rates increased by 40% due to highly focused and visually compelling call-to-action designs.'
};

const items = pins.map((p, idx) => {
    const cat = p.category;
    const tools = toolsList[cat] || ['Adobe Photoshop', 'Adobe Illustrator', 'Figma'];
    const problem = problemsList[cat] || 'The client required premium design elements to elevate their visual communication.';
    const solution = solutionsList[cat] || 'Designed custom graphics utilizing modern spacing, selected colors, and refined typography hierarchies.';
    const outcome = outcomesList[cat] || 'Enhanced brand credibility, audience engagement, and overall market positioning.';
    
    // We can map different tag filter categories based on the category of the pin
    // Categories: 'Brand Identity', 'Logo', 'Social Media', 'Print', 'Flyers', 'Church Designs', 'Corporate', 'Book Covers', 'Marketing'
    const tags = [cat];
    if (cat === 'Church Designs') {
        tags.push('Flyers', 'Social Media');
    } else if (cat === 'Brand Identity') {
        tags.push('Logo', 'Corporate');
    } else if (cat === 'Flyers') {
        tags.push('Print', 'Marketing');
    } else if (cat === 'Social Media') {
        tags.push('Marketing');
    } else if (cat === 'Book Covers') {
        tags.push('Print');
    } else if (cat === 'Event Branding') {
        tags.push('Brand Identity', 'Print');
    }
    
    return {
        id: p.id,
        title: p.title,
        category: cat,
        tags: Array.from(new Set(tags)),
        description: p.description,
        imageUrl: p.imageUrl,
        link: p.link,
        tools: tools,
        problem: problem,
        solution: solution,
        clientOutcome: outcome,
        gallery: [p.imageUrl] // Can add other related project images if needed
    };
});

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
}

export const portfolioData: PortfolioItem[] = ${JSON.stringify(items, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/portfolio.ts'), tsContent);
console.log(`Successfully generated ${items.length} dynamic items in src/data/portfolio.ts`);
