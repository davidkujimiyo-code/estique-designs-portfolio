import React from 'react';
import { generateSchema } from '../seo/schema';

export const SchemaMarkup: React.FC = () => {
  const schema = generateSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
