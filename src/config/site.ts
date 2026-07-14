// Detect the site URL dynamically based on Vite/Vercel environments
const getSiteUrl = (): string => {
  // Check if VITE_SITE_URL environment variable is provided (loaded from .env.production/.env.development or dashboard overrides)
  const envUrl = import.meta.env.VITE_SITE_URL;
  if (envUrl && envUrl.trim() !== '') {
    return envUrl.replace(/\/$/, ""); // strip trailing slash
  }

  // Default production fallback
  return "https://estique-designs-portfolio.vercel.app";
};

export const baseUrl = getSiteUrl();

export const siteConfig = {
  // Central Brand Identifiers
  siteName: "Estique Designs",
  siteDescription: "Estique Designs is a premium design studio in Nigeria specializing in strategic brand identity, logo design, luxury book cover design, social media graphics, and church media design.",
  siteUrl: baseUrl,
  logo: `${baseUrl}/logo.png`,
  favicon: `${baseUrl}/favicon.ico`,
  appleTouchIcon: `${baseUrl}/apple-touch-icon.png`,
  ogImage: `${baseUrl}/og-image.jpg?v=1`,
  twitterImage: `${baseUrl}/og-image.jpg?v=1`,
  organizationImage: `${baseUrl}/logo.png`,
  language: "en-US",
  author: "Estique Designs",
  publisher: "Estique Designs",

  // Founder Information
  founder: {
    name: "Esther Udoh",
    role: "Founder & Creative Director",
    occupation: "Graphic Designer",
    image: `${baseUrl}/assets/headshot-CInt_e5X.jpg`,
    socials: [
      "https://www.pinterest.com/estheru0974/_created/",
      "https://wa.me/2349027966779"
    ]
  },

  // Contacts & Metadata Details
  email: "estherudoh27@gmail.com",
  phone: "+2349027966779",
  address: {
    country: "Nigeria",
    locality: "Uyo",
    region: "Akwa Ibom"
  },
  socials: [
    "https://www.pinterest.com/estheru0974/_created/",
    "https://wa.me/2349027966779"
  ],
  category: "Graphic Design Studio",
  orgType: "Organization",

  // Backwards compatibility mappings
  name: "Estique Designs",
  description: "Estique Designs is a premium design studio in Nigeria specializing in strategic brand identity, logo design, luxury book cover design, social media graphics, and church media design.",
  url: baseUrl,
  logoUrl: `${baseUrl}/logo.png`,
  heroImage: `${baseUrl}/og-image.jpg?v=1`,
  services: [
    {
      id: "service-brand-identity",
      name: "Brand Identity Design",
      description: "Bespoke brand visual guidelines, color systems, and corporate alignment schemes."
    },
    {
      id: "service-logo-design",
      name: "Logo Design",
      description: "Custom minimalist and watch-grade vector monograms and lettermarks."
    },
    {
      id: "service-book-cover",
      name: "Book Cover Design",
      description: "Premium relationship, marriage, and motivational book covers for print and digital publishing."
    },
    {
      id: "service-church-media",
      name: "Church Media Design",
      description: "Inspiring sermon series flyers, announcement graphics, and weekly bulletins."
    },
    {
      id: "service-social-media",
      name: "Social Media Design",
      description: "Cohesive social media feed systems, promotional cards, and template guidelines."
    },
    {
      id: "service-event-design",
      name: "Event Design",
      description: "Welcome banners, ticket materials, and event branding flyers."
    },
    {
      id: "service-creative-consultation",
      name: "Creative Consulting",
      description: "Strategic creative direction and consulting for brands looking to establish authority."
    }
  ]
};
export type SiteConfig = typeof siteConfig;
