import { getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '../../seo/JsonLd';
import { generatePageMetadata } from '../../seo/Metadata';
import BeWelCalculator from './BeWelCalculator';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('beWel');

  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    locale,
    path: `/${locale}/residence/be-wel`,
  });
}

export default async function BeWelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('beWel');
  const baseUrl = 'https://cherio.me';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('metaTitle'),
    description: t('metaDescription'),
    url: `${baseUrl}/${locale}/residence/be-wel`,
    inLanguage: locale,
    applicationCategory: 'UtilitiesApplication',
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <header className="mb-8 text-center">
              <span className="inline-block rounded-full bg-blue-100 px-3.5 py-1 text-xs font-semibold text-blue-800">
                {t('badge')}
              </span>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">{t('title')}</h1>
              <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">{t('subtitle')}</p>
            </header>

            <BeWelCalculator locale={locale} />
          </div>
        </div>
      </div>
    </>
  );
}
