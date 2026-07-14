import type { SiteConfig } from '../config/site';

export const getOrganizationSchema = (config: SiteConfig) => {
  return {
    "@type": "Organization",
    "@id": `${config.siteUrl}/#organization`,
    "name": config.name,
    "url": config.siteUrl,
    "logo": {
      "@id": `${config.siteUrl}/#logo`
    },
    "image": {
      "@id": `${config.siteUrl}/#logo`
    },
    "description": config.description,
    "founder": {
      "@id": `${config.siteUrl}/#person`
    },
    "sameAs": config.socials
  };
};
