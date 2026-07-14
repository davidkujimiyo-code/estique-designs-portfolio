import type { SiteConfig } from '../config/site';

export const getWebSiteSchema = (config: SiteConfig) => {
  return {
    "@type": "WebSite",
    "@id": `${config.siteUrl}/#website`,
    "name": config.name,
    "url": config.siteUrl,
    "publisher": {
      "@id": `${config.siteUrl}/#organization`
    },
    "inLanguage": config.language
  };
};
