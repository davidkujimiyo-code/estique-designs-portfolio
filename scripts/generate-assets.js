import fs from 'fs';
import path from 'path';

const getSiteUrl = () => {
  // Check process.env.VITE_SITE_URL (loaded from environment files or Vercel dashboard overrides)
  if (process.env.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL;
  }
  // Default production fallback
  return "https://estique-designs-portfolio.vercel.app";
};

const siteUrl = getSiteUrl().replace(/\/$/, ""); // strip trailing slash

// Make sure target directories exist
const distPath = path.resolve('dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// 1. Compile robots.txt dynamically
const robotsContent = `# Standard Robots rules for Estique Designs
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(distPath, 'robots.txt'), robotsContent);

// 2. Compile sitemap.xml dynamically
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>2026-07-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapContent);

// 3. Compile site.webmanifest dynamically
const manifestContent = `{
  "name": "Estique Designs Portfolio",
  "short_name": "Estique Designs",
  "icons": [
    {
      "src": "${siteUrl}/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "${siteUrl}/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#0B0B0B",
  "background_color": "#FAF8F5",
  "display": "standalone",
  "start_url": "${siteUrl}/"
}
`;
fs.writeFileSync(path.join(distPath, 'site.webmanifest'), manifestContent);

// 4. Dynamically replace custom domain with active environment siteUrl in index.html
const indexHtmlPath = path.join(distPath, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let html = fs.readFileSync(indexHtmlPath, 'utf8');
  // Replace all instances of the hardcoded placeholder domain with our active environment domain
  html = html.replace(/https:\/\/estiquedesigns\.com/g, siteUrl);
  fs.writeFileSync(indexHtmlPath, html);
  console.log(`✓ Production index.html updated dynamically with siteUrl: ${siteUrl}`);
} else {
  console.warn(`⚠ Warning: dist/index.html not found. Could not apply dynamic URL injection.`);
}

console.log(`✓ Production-grade SEO assets successfully generated for domain: ${siteUrl}`);
