import type { SiteConfig } from '../config/site';

export const getOfferCatalogSchema = (config: SiteConfig) => {
  return {
    "@type": "OfferCatalog",
    "@id": `${config.url}/#catalog`,
    "name": `${config.name} Design Services`,
    "itemListElement": config.services.map((service) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "description": service.description
      }
    }))
  };
};
