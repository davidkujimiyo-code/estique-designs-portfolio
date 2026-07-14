import type { SiteConfig } from '../config/site';

export const getPersonSchema = (config: SiteConfig) => {
  return {
    "@type": "Person",
    "@id": `${config.url}/#person`,
    "name": config.founder.name,
    "jobTitle": config.founder.role,
    "worksFor": {
      "@id": `${config.url}/#organization`
    },
    "image": {
      "@id": `${config.url}/#person-image`
    },
    "sameAs": config.founder.socials,
    "hasOccupation": {
      "@type": "Occupation",
      "name": config.founder.occupation,
      "description": `${config.founder.name} is a professional ${config.founder.occupation} specializing in brand identity, logo, book covers, social media, and event graphics.`
    }
  };
};
