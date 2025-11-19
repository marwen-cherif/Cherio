import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { cherioApps } from '../../../../cherio.apps.config';
import { generatePageMetadata } from '../../seo/Metadata';
import JsonLd from '../../seo/JsonLd';
import AppDetailPage from './AppDetailPage';

export async function generateStaticParams() {
  const { routing } = await import('@/i18n/routing');
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of routing.locales) {
    for (const app of cherioApps) {
      params.push({ locale, slug: app.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const app = cherioApps.find((a) => a.slug === slug);

  if (!app) {
    return {};
  }

  return generatePageMetadata({
    title: `${app.publicName[locale as 'fr' | 'en']} - Cherio`,
    description: app.longDescription?.[locale as 'fr' | 'en'] || app.description[locale as 'fr' | 'en'],
    locale: locale as 'fr' | 'en',
    path: `/${locale}/apps/${slug}`,
  });
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const app = cherioApps.find((a) => a.slug === slug);

  if (!app) {
    notFound();
  }

  const baseUrl = 'https://cherio.me';
  const appLocale = locale as 'fr' | 'en';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.publicName[appLocale],
    description: app.longDescription?.[appLocale] || app.description[appLocale],
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${baseUrl}/${locale}/apps/${slug}`,
    inLanguage: locale,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <AppDetailPage app={app} locale={appLocale} />
    </>
  );
}

