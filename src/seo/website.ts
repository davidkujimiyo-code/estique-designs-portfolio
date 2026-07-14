import type { SiteConfig } from '../config/site';

export const getWebSiteSchema = (config: SiteConfig) => {
  return {
    "@type": "WebSite",
    "@id": `${config.url}/#website`,
    "name": config.name,
    "url": config.url,
    "publisher": {
      "@id": `${config.url}/#organization`
    },
    "inLanguage": config.language
  };
};
