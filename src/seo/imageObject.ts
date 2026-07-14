import type { SiteConfig } from '../config/site';

export const getImageObjects = (config: SiteConfig) => {
  return [
    {
      "@type": "ImageObject",
      "@id": `${config.url}/#logo`,
      "url": config.logoUrl,
      "caption": `${config.name} Logo`,
      "width": 512,
      "height": 512
    },
    {
      "@type": "ImageObject",
      "@id": `${config.url}/#og-image`,
      "url": config.ogImage,
      "caption": `${config.name} Brand Presentation`,
      "width": 1200,
      "height": 630
    },
    {
      "@type": "ImageObject",
      "@id": `${config.url}/#person-image`,
      "url": config.founder.image,
      "caption": `${config.founder.name} - ${config.founder.role}`
    }
  ];
};
