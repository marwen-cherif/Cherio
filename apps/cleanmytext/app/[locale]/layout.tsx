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
  return {
    title: 'CleanMyText - Clean Hidden Characters',
    description: 'Clean hidden characters and invisible scripts from your text',
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

