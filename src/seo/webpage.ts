import type { SiteConfig } from '../config/site';

export const getWebPageSchema = (config: SiteConfig) => {
  return {
    "@type": "WebPage",
    "@id": `${config.url}/#webpage`,
    "url": config.url,
    "name": `${config.name} | Premium Graphic Designer & Brand Identity Studio`,
    "description": config.description,
    "isPartOf": {
      "@id": `${config.url}/#website`
    },
    "about": {
      "@id": `${config.url}/#organization`
    },
    "primaryImageOfPage": {
      "@id": `${config.url}/#og-image`
    },
    "dateModified": "2026-07-14"
  };
};
