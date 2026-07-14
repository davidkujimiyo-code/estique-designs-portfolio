import type { SiteConfig } from '../config/site';

export const getContactPointSchema = (config: SiteConfig) => {
  return {
    "@type": "ContactPoint",
    "telephone": config.phone,
    "contactType": "customer service",
    "email": config.email,
    "availableLanguage": ["en"],
    "url": `${config.siteUrl}/#contact`
  };
};
