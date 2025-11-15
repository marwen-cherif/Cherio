import { getTranslations, setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '../seo/Metadata';
import JsonLd from '../seo/JsonLd';
import ContactForm from './ContactForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return generatePageMetadata({
    title: locale === 'fr' ? 'Contact - Cherio' : 'Contact - Cherio',
    description: t('description'),
    locale,
    path: `/${locale}/contact`,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const baseUrl = 'https://cherio.me';
  const t = await getTranslations('contact');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: locale === 'fr' ? 'Contact Cherio' : 'Contact Cherio',
    description: t('description'),
    url: `${baseUrl}/${locale}/contact`,
    inLanguage: locale,
    mainEntity: {
      '@type': 'Organization',
      name: 'Cherio',
      url: baseUrl,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{t('title')}</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">{t('subtitle')}</p>
            <p className="text-gray-700 mb-8">{t('description')}</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
