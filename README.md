# Estique Designs Portfolio Website

An award-winning, premium digital showroom and booking platform built for **Estique Designs** (Esther Umoh), a world-class creative brand designer specializing in luxury monograms, book covers, and church media branding.

---

## 🌟 Overview

This project is a high-end personal branding website that showcases the editorial aesthetics, graphic craftsmanship, and typographic mastery of Estique Designs. It serves as both a public gallery and a high-converting business inquiry portal.

### Why This Project Exists
In the high-end creative industry, your digital presence is your first impression. Estique Designs needed a portal that speaks of luxury and restraint before a user reads a single sentence. The site moves away from generic, plain, two-column templates, introducing a cinematic, typography-rich, and WebGL-powered spatial gallery that positions Esther as an elite, premium creative force.

### Business Goals
* **Establish Premium Brand Authority**: Showcase curated high-resolution brand identity logotypes, book covers, and flyers as fine-art museum pieces.
* **Lead Conversion**: Convert visitor admiration into client inquiries through a seamless, secure, and authenticated Booking Funnel.
* **Flawless Multi-Device Portability**: Offer 60FPS fluid graphics across desktop, tablet, and mobile screens without battery drain or canvas context crashes.

### Design Philosophy
* **Minimal Luxury**: Curated colors (Pearl Ivory `#F7F5F0` / Graphite `#1A1A1A` / Champagne Gold `#D4B895` / Emerald Accent `#10b981`), elegant typography grids (Cinzel & Inter), and generous negative space.
* **Editorial Layouts**: Treat page columns like high-fashion magazine covers rather than standard grids.
* **Kinetic Interaction**: Subtly guide attention using cursor-responsive WebGL highlights, lightweight particles, and micro-interactions.

---

## 🚀 Live Demo & Screenshots

* **Live URL**: [https://estique-designs.vercel.app](https://estique-designs.vercel.app) *(or your deployed Vercel subdomain)*

### Visual Showcase (Before/After Theme Transitions)
* **Dark Mode (Luxury Showroom)**: Cinematic, high-contrast spotlight, warm golden accents, and emerald core gemstone highlights.
* **Light Mode (Luxury Design Studio)**: Airy, sophisticated, soft pearl ambient glows, and warm champagne breathing gradients.

---

## ✨ Features

* **WebGL Kinetic Cube Sculpture**: A custom-modeled 3D abstract kinetic sculpture built with React Three Fiber (`@react-three/fiber` and `@react-three/drei`). Features 6 breathing panels, coordinate orbits, an internal self-illuminating emerald octahedron core, and cursor parallax tracking highlights.
* **Theme-Aware Fallbacks**: Full `<ErrorBoundary>` handling for devices lacking WebGL, falling back to a custom-proportioned vector SVG rendering with zero visual layout shift.
* **Smart Filterable Portfolio Gallery**: Categorized views (Brand Identity, Book Cover, Church Media, Event Design) utilizing smooth CSS transitions and dynamic grid spacing.
* **Responsive Details Modal**: Immersive pop-up slides displaying rich case study context (Design Challenge, Creative Strategy, Business Outcome, and Toolkit).
* **Robust Booking Funnel**: Form featuring real-time client verification, Cloudflare Turnstile CAPTCHA validation, and resilient input sanitization.
* **Dual Database & Delivery Integration**: Integrates directly with Supabase Database for structured request archival and Resend API for immediate email alerts.
* **Enterprise-Grade Analytics**: Preconfigured Google Analytics 4 (GA4) and Microsoft Clarity SPA routing trackers, firing custom events for funnel progression.

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Strict typing, components modularity, and high-performance component state rendering. |
| **Build System** | Vite 8 + Rolldown | Ultra-fast bundling, hot-reloading, and optimized code splitting. |
| **Styling Engine** | Tailwind CSS 4 | Atomic utility classes for precise responsive controls and immediate build compilation. |
| **3D Rendering** | Three.js + React Three Fiber | Genuine WebGL context management, math matrices, and procedural orbital animations. |
| **Backend Integration** | Supabase | Postgres DB engine for structured client lead archival. |
| **Delivery Service** | Resend API | Clean SMTP server replacement for high-deliverability email routing. |
| **Security Layer** | Cloudflare Turnstile | User-friendly, non-intrusive CAPTCHA verification (no puzzles to solve). |

---

## 📂 Folder Structure

```
PORTFOLIO/
├── api/                   # Serverless edge function API endpoints (Vercel)
│   └── booking.ts         # Cloudflare Turnstile, Supabase, and Resend route handler
├── public/                # Static assets (Favicons, portfolio images, fonts)
│   └── portfolio/         # High-resolution client work images
├── src/                   # React frontend application
│   ├── assets/            # Local logo assets and brand marks
│   ├── components/        # React components (Layout, UI, Showroom)
│   │   ├── Hero3D/        # Three.js WebGL sub-components
│   │   │   ├── Scene.tsx  # Canvas container & MutationObserver
│   │   │   ├── Lights.tsx # Cursor-glide lights & ambient breathing
│   │   │   └── ...        # Other 3D elements
│   │   └── ...
│   ├── data/              # Static structured data (Portfolio database)
│   ├── hooks/             # Custom utility hooks (Scroll locking, state)
│   ├── index.css          # Tailwind variables, Google Fonts imports, custom animations
│   └── main.tsx           # React bootstrap entrypoint
├── package.json           # Project manifest
└── vite.config.ts         # Vite bundler parameters & build settings
```

---

## 💻 Installation & Local Development

### Prerequisites
* Node.js v18.0.0 or higher
* npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/estique-designs-portfolio.git
cd estique-designs-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Local Environment
Create a `.env` file in the project root folder based on `.env.example`:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Turnstile Public Verification (Frontend)
VITE_TURNSTILE_SITE_KEY=your-cloudflare-site-key
```

For the serverless edge routes, configure `.env` with backend credentials:
```env
# Backend Keys
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
RESEND_API_KEY=your-resend-api-key
TURNSTILE_SECRET_KEY=your-cloudflare-secret-key
ESTHER_ALERT_EMAIL=alerts@estiquedesigns.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
Verify typescript compliance and build performance bundles:
```bash
npm run build
```

---

## 📊 Analytics & Privacy

The website loads Google Analytics 4 and Microsoft Clarity strictly in **production** environments to prevent dev data noise.
* **SPA Tracking**: Detects virtual route/state switches automatically.
* **Custom Event Triggers**: Tracks booking form opens, step transitions, validation failures, email/WhatsApp inquiries, and successful requests.
* **Privacy Compliance**: IP masking enabled; no personal identification info is logged directly to Clarity dashboard metrics.

---

## 🔒 Security

* **Sanitized Inputs**: Edge route sanitizes form strings to remove script tags, brackets, and raw HTML.
* **Cross-Site Protection**: Cloudflare Turnstile token verification prevents automated API abuse.
* **Database Hardening**: Supabase operations are managed using authenticated service roles through serverless endpoints rather than exposing administrative permissions to clients.

---

## ⚡ Performance Optimization

* **Code Splitting**: WebGL and Three.js dependencies are split into a separate bundle (`Hero3D.js`), reducing the initial HTML page load by **~65%**.
* **DPR Capping**: The WebGL Device Pixel Ratio is capped between `1.0` and `1.5` to guarantee high framerates on low-end screens.
* **Zero Layout Shift**: Static fallback SVG layout has matching dimensions to the interactive canvas container, yielding a cumulative layout shift (CLS) score of `0.0`.

---

## ♿ Accessibility

* **Screen Readers**: Interactive links and icons carry explicit `aria-label` tags.
* **Reduced Motion Support**: Listens to system parameters (`prefers-reduced-motion: reduce`) to disable the heavy 3D canvas and dynamic animations, swapping to clean static layouts automatically.
* **Contrast Compliance**: Clear typography contrast borders between background ivory/graphite colors and white/gold texts.

---

## ✉️ Contact & Credits

* **Designer**: Esther Umoh / Estique Designs
* **Studio Inquiries**: [hello@estiquedesigns.com](mailto:hello@estiquedesigns.com)
* **Development**: Crafted with precision and premium code architectures.
