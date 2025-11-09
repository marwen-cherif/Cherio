import { Product } from '@/types/product';

interface JsonLdProps {
  type: 'Product' | 'Organization' | 'WebSite';
  data: any;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

