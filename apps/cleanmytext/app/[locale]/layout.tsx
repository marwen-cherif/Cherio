import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/Navigation';
import type { Metadata } from 'next';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://text-cleaner.cherio.me';
  const messagesMap = {
    fr: frMessages,
    en: enMessages,
  } as const;
  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;
  const t = messages.common;

  const title = `${t.title} - ${t.description}`;
  const description =
    locale === 'fr'
      ? 'Nettoyez gratuitement les caractères cachés, les scripts invisibles et les caractères spéciaux de votre texte. Outil en ligne gratuit pour nettoyer et purifier votre texte instantanément.'
      : 'Free online tool to clean hidden characters, invisible scripts, and special characters from your text. Instantly clean and purify your text with our free text cleaner tool.';

  const keywords =
    locale === 'fr'
      ? [
          'nettoyeur de texte',
          'nettoyer texte',
          'caractères cachés',
          'scripts invisibles',
          'purifier texte',
          'nettoyer caractères spéciaux',
          'outil texte gratuit',
          'clean text online',
        ]
      : [
          'text cleaner',
          'clean text',
          'hidden characters',
          'invisible scripts',
          'purify text',
          'clean special characters',
          'free text tool',
          'clean text online',
        ];

  return {
    title: {
      default: title,
      template: `%s | ${t.title}`,
    },
    description,
    keywords,
    authors: [{ name: 'CleanMyText' }],
    creator: 'CleanMyText',
    publisher: 'CleanMyText',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `/${locale}`,
      title,
      description,
      siteName: 'CleanMyText',
      alternateLocale: routing.locales.filter((l) => l !== locale),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@cleanmytext',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'html-lang': locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messagesMap = {
    fr: frMessages,
    en: enMessages,
  } as const;

  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navigation />
      {children}
      <Toaster />
    </NextIntlClientProvider>
  );
}
