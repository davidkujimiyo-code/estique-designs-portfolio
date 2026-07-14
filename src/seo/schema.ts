import { siteConfig } from '../config/site';
import { getOrganizationSchema } from './organization';
import { getPersonSchema } from './person';
import { getProfessionalServiceSchema } from './professionalService';
import { getWebSiteSchema } from './website';
import { getWebPageSchema } from './webpage';
import { getImageObjects } from './imageObject';
import { getContactPointSchema } from './contactPoint';
import { getOfferCatalogSchema } from './offerCatalog';

export const generateSchema = () => {
  const config = siteConfig;
  
  const organization = getOrganizationSchema(config);
  const person = getPersonSchema(config);
  const professionalService = getProfessionalServiceSchema(config);
  const website = getWebSiteSchema(config);
  const webpage = getWebPageSchema(config);
  const images = getImageObjects(config);
  const contactPoint = getContactPointSchema(config);
  const catalog = getOfferCatalogSchema(config);

  // Attach contactPoint directly inside Organization schema structure
  (organization as any).contactPoint = contactPoint;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      person,
      professionalService,
      website,
      webpage,
      ...images,
      catalog
    ]
  };
};
