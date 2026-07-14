import type { SiteConfig } from '../config/site';

export const getProfessionalServiceSchema = (config: SiteConfig) => {
  return {
    "@type": "ProfessionalService",
    "@id": `${config.url}/#service`,
    "name": config.name,
    "url": config.url,
    "logo": {
      "@id": `${config.url}/#logo`
    },
    "image": {
      "@id": `${config.url}/#og-image`
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
      "@id": `${config.url}/#organization`
    },
    "hasOfferCatalog": {
      "@id": `${config.url}/#catalog`
    }
  };
};
