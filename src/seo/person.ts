import type { SiteConfig } from '../config/site';

export const getPersonSchema = (config: SiteConfig) => {
  return {
    "@type": "Person",
    "@id": `${config.siteUrl}/#person`,
    "name": config.founder.name,
    "jobTitle": config.founder.role,
    "worksFor": {
      "@id": `${config.siteUrl}/#organization`
    },
    "image": {
      "@id": `${config.siteUrl}/#person-image`
    },
    "sameAs": config.founder.socials,
    "hasOccupation": {
      "@type": "Occupation",
      "name": config.founder.occupation,
      "description": `${config.founder.name} is a professional ${config.founder.occupation} specializing in brand identity, logo, book covers, social media, and event graphics.`
    }
  };
};
