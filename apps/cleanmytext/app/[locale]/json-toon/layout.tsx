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
  const messagesMap = {
    fr: frMessages,
    en: enMessages,
  } as const;
  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.en;
  const t = messages.jsonToon;

  return {
    title: t.title,
    description: t.description,
    keywords: [
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
    ],
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
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

