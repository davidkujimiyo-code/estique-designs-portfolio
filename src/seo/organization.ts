import type { SiteConfig } from '../config/site';

export const getOrganizationSchema = (config: SiteConfig) => {
  return {
    "@type": "Organization",
    "@id": `${config.url}/#organization`,
    "name": config.name,
    "url": config.url,
    "logo": {
      "@id": `${config.url}/#logo`
    },
    "image": {
      "@id": `${config.url}/#logo`
    },
    "description": config.description,
    "founder": {
      "@id": `${config.url}/#person`
    },
    "sameAs": config.socials
  };
};
