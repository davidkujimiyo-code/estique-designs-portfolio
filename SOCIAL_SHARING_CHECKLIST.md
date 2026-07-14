# 🚀 DK Digital Studio Social Sharing & SEO Launch Checklist
## Standard Verification Guidelines for Production Deployments

Use this checklist prior to launch for every client project (including Estique Designs and future brands like DamiGlow) to verify that metadata previews render consistently across WhatsApp, Facebook, LinkedIn, X, Slack, Telegram, and Discord.

---

## 🏢 1. Brand Asset Checklist
* [ ] **og-image.jpg**: Verify resolution is exactly **1200 x 630 pixels** (aspect ratio **1.91:1**).
* [ ] **og-image.jpg**: Confirm file size is optimized and **under 300KB** (and strictly under 1MB) for instant WhatsApp loading.
* [ ] **favicon.ico**: Standard browser tab favicon exists in `public/`.
* [ ] **logo.png**: Brand logo (512x512px) exists in `public/`.
* [ ] **apple-touch-icon.png**: Touch bookmark icon (180x180px) exists in `public/`.

---

## 🌐 2. Metadata & Open Graph HTML Checklist
Verify that the following tags exist in `index.html` (or are compiled dynamically):
* [ ] `canonical`: `<link rel="canonical" href="https://your-domain.com/" />`
* [ ] `og:image`: `<meta property="og:image" content="https://your-domain.com/og-image.jpg?v=1" />`
* [ ] `og:image:secure_url`: Mapped to the same absolute URL.
* [ ] `og:image:type`: Set to `image/jpeg` or `image/png`.
* [ ] `og:image:width`: Set to `1200`.
* [ ] `og:image:height`: Set to `630`.
* [ ] `og:image:alt`: Descriptive image alt text.
* [ ] `og:type`: Set to `website`.
* [ ] `og:url`: Set to the absolute canonical URL.
* [ ] `og:locale`: Set to `en_US`.
* [ ] `og:site_name`: Match client brand name.

---

## 🐦 3. Twitter / X Card Checklist
* [ ] `twitter:card`: Set to `summary_large_image`.
* [ ] `twitter:title`: Under 60 characters.
* [ ] `twitter:description`: Match Open Graph description.
* [ ] `twitter:image`: Mapped to same versioned Open Graph URL.
* [ ] `twitter:image:alt`: Match image description.
* [ ] `twitter:site` / `twitter:creator`: Mapped to official handle (e.g. `@EstiqueDesigns`).

---

## 🏢 4. Schema.org JSON-LD Checklist
* [ ] Graph links the `Organization`, `Person` (Founder), and `ProfessionalService` items using clean `@id` identifiers.
* [ ] Every image reference (`ImageObject`, logo, founder photo, WebPage image) resolves using the centralized configuration values.
* [ ] Run markup code through the [Google Rich Results Test](https://search.google.com/test/rich-results) to verify zero errors or warnings.
* [ ] Run graph code through the [Schema Markup Validator](https://validator.schema.org) to check parameter integrity.

---

## ⚙️ 5. Deployment & Vercel Checklist
* [ ] Verify `.env.development` is set to `http://localhost:5173`.
* [ ] Verify `.env.production` contains the correct target production domain (e.g. `https://estique-designs-portfolio.vercel.app`).
* [ ] Confirm that `npm run build` completes successfully and runs `generate-assets.js` to compile production assets.
* [ ] Inspect `dist/robots.txt`, `dist/sitemap.xml`, and `dist/site.webmanifest` to ensure they reference the target production URL.
* [ ] Check `dist/index.html` to confirm that all placeholders are dynamically replaced.

---

## 🔑 6. Custom Domain Connection Checklist
Once the custom domain (e.g., `https://estiquedesigns.com`) is connected:
* [ ] Open `.env.production` and change `VITE_SITE_URL` to `https://estiquedesigns.com`.
* [ ] Trigger a production build. All canonical URLs, sitemaps, webmanifests, and schema elements will update automatically.

---

## 🚀 7. Search Console & Webmaster Checklist
* [ ] **Google Search Console**: Verify domain ownership and submit the sitemap URL (e.g. `https://your-domain.com/sitemap.xml`).
* [ ] **Bing Webmaster Tools**: Import credentials from GSC and verify sitemap submission.
* [ ] **robots.txt**: Check that search engine crawlers are allowed and index paths correctly.

---

## ⚡ 8. Cache Busting & Social Refresh Checklist
When updating page headers, titles, or the Open Graph image:

1. **Increment the Version Parameter**: Change the version query inside [src/config/site.ts](file:///c:/Users/InfinityMFB/Documents/PORTFOLIO/src/config/site.ts) and `index.html` (e.g. `?v=1` to `?v=2`), or rename the file (e.g. `og-image-v2.jpg`).
2. **Force-Refresh Facebook**: Paste the page URL into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and click **Scrape Again**.
3. **Force-Refresh LinkedIn**: Paste the page URL into the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to rebuild the preview.
4. **Force-Refresh Twitter / X**: Share the link on Twitter, or append a temporary unused query variable (e.g. `?update=1`) to force Twitter's card crawler to request a fresh copy.
5. **Force-Refresh WhatsApp/Telegram**: WhatsApp caches link previews aggressively. Bust the cache by appending a unique version query (e.g. `https://estiquedesigns.com/?v=2`) to the link when sending the first test message.
