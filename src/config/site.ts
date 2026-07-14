// Central Business & Branding Configuration for Estique Designs
// To deploy this framework for a future client project, simply replace the values below.
export const siteConfig = {
  name: "Estique Designs",
  founder: {
    name: "Esther Udoh",
    role: "Founder & Creative Director",
    occupation: "Graphic Designer",
    // Compiled production path or public folder absolute asset link
    image: "https://estiquedesigns.com/assets/headshot-CInt_e5X.jpg",
    socials: [
      "https://www.pinterest.com/estheru0974/_created/",
      "https://wa.me/2349027966779"
    ]
  },
  url: "https://estiquedesigns.com",
  logoUrl: "https://estiquedesigns.com/android-chrome-512x512.png",
  ogImage: "https://estiquedesigns.com/og-image.jpg",
  heroImage: "https://estiquedesigns.com/og-image.jpg",
  description: "Estique Designs is a premium design studio in Nigeria specializing in strategic brand identity, logo design, luxury book cover design, social media graphics, and church media design.",
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
  language: "en-US",
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
