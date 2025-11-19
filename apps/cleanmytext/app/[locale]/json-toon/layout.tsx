import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';

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
  const t = messages.jsonToon;

  const title = t.title;
  const description = t.seoDescription || t.description;
  const keywords = [
    'JSON to TOON',
    'TOON to JSON',
    'JSON converter',
    'TOON format',
    'LLM token optimization',
    'JSON optimization',
    'data format converter',
    'bidirectional JSON converter',
    'reduce API costs',
    'token-efficient format',
    'Token-Oriented Object Notation',
    'JSON TOON converter online',
    'free JSON converter',
  ];

  return {
    title: {
      default: title,
      template: `%s | CleanMyText`,
    },
    description,
    keywords,
    authors: [{ name: 'CleanMyText' }],
    creator: 'CleanMyText',
    publisher: 'CleanMyText',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}/json-toon`,
      languages: {
        en: '/en/json-toon',
        fr: '/fr/json-toon',
        'x-default': '/en/json-toon',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `/${locale}/json-toon`,
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

export default async function JsonToonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    return null;
  }

  setRequestLocale(locale);

  return <>{children}</>;
}
