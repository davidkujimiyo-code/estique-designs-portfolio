import type { SiteConfig } from '../config/site';

export const getWebPageSchema = (config: SiteConfig) => {
  return {
    "@type": "WebPage",
    "@id": `${config.siteUrl}/#webpage`,
    "url": config.siteUrl,
    "name": `${config.name} | Premium Graphic Designer & Brand Identity Studio`,
    "description": config.description,
    "isPartOf": {
      "@id": `${config.siteUrl}/#website`
    },
    "about": {
      "@id": `${config.siteUrl}/#organization`
    },
    "primaryImageOfPage": {
      "@id": `${config.siteUrl}/#og-image`
    },
    "dateModified": "2026-07-14"
  };
};
