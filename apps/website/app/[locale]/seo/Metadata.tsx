import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  locale: string;
  path: string;
}

export function generatePageMetadata({
  title,
  description,
  locale,
  path,
}: PageMetadata): Metadata {
  const baseUrl = 'https://cherio.me';
  const url = `${baseUrl}${path}`;
  const alternateUrls = {
    fr: `${baseUrl}/fr${path.replace(/^\/(fr|en)/, '')}`,
    en: `${baseUrl}/en${path.replace(/^\/(fr|en)/, '')}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'fr': alternateUrls.fr,
        'en': alternateUrls.en,
        'x-default': `${baseUrl}/fr${path.replace(/^\/(fr|en)/, '')}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cherio',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      alternateLocale: locale === 'fr' ? 'en_US' : 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

