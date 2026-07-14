import type { SiteConfig } from '../config/site';

export const getProfessionalServiceSchema = (config: SiteConfig) => {
  return {
    "@type": "ProfessionalService",
    "@id": `${config.siteUrl}/#service`,
    "name": config.name,
    "url": config.siteUrl,
    "logo": {
      "@id": `${config.siteUrl}/#logo`
    },
    "image": {
      "@id": `${config.siteUrl}/#og-image`
    },
    "description": config.description,
    "telephone": config.phone,
    "email": config.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": config.address.country,
      "addressLocality": config.address.locality,
      "addressRegion": config.address.region
    },
    "priceRange": "$$",
    "parentOrganization": {
      "@id": `${config.siteUrl}/#organization`
    },
    "hasOfferCatalog": {
      "@id": `${config.url}/#catalog`
    }
  };
};
