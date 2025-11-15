import { getLocale, getTranslations } from 'next-intl/server';
import { generatePageMetadata } from './seo/Metadata';
import JsonLd from './seo/JsonLd';
import Hero from './sections/Hero';
import Vision from './sections/Vision';
import Apps from './sections/Apps';
import Why from './sections/Why';
import About from './sections/About';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generatePageMetadata({
    title:
      locale === 'fr'
        ? "Cherio - Écosystème d'applications créatives"
        : 'Cherio - Creative Application Ecosystem',
    description:
      locale === 'fr'
        ? "Découvrez l'écosystème Cherio : applications pour la création, le commerce et l'innovation. Shop Cherio, Cherio Studio, Cherio Core et Portfolio Cherio."
        : 'Discover the Cherio ecosystem: applications for creation, commerce, and innovation. Shop Cherio, Cherio Studio, Cherio Core, and Cherio Portfolio.',
    locale,
    path: `/${locale}`,
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  console.log('LOCALE 11111', locale);

  const baseUrl = 'https://cherio.me';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Cherio',
    description:
      locale === 'fr'
        ? "Écosystème d'applications pour la création, le commerce et l'innovation"
        : 'Application ecosystem for creation, commerce, and innovation',
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Vision />
      <Apps />
      <Why />
      <About />
    </>
  );
}
