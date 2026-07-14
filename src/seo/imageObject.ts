import type { SiteConfig } from '../config/site';

export const getImageObjects = (config: SiteConfig) => {
  return [
    {
      "@type": "ImageObject",
      "@id": `${config.siteUrl}/#logo`,
      "url": config.logo,
      "caption": `${config.name} Logo`,
      "width": 512,
      "height": 512
    },
    {
      "@type": "ImageObject",
      "@id": `${config.siteUrl}/#og-image`,
      "url": config.ogImage,
      "caption": `${config.name} Brand Presentation`,
      "width": 1200,
      "height": 630
    },
    {
      "@type": "ImageObject",
      "@id": `${config.siteUrl}/#person-image`,
      "url": config.founder.image,
      "caption": `${config.founder.name} - ${config.founder.role}`
    }
  ];
};
