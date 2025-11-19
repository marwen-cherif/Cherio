import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from './header/Header';
import Footer from './Footer';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Set the locale for static rendering (avoids headers() call)
  setRequestLocale(locale);

  // Load messages directly from JSON files based on locale
  // This ensures we get the correct messages for the locale
  const messagesMap = {
    fr: frMessages,
    en: enMessages,
  } as const;

  const messages = messagesMap[locale as keyof typeof messagesMap] || messagesMap.fr;

  return (
    <>
      <link rel="alternate" hrefLang="fr" href="https://cherio.me/fr" />
      <link rel="alternate" hrefLang="en" href="https://cherio.me/en" />
      <link rel="alternate" hrefLang="x-default" href="https://cherio.me" />

      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="flex min-h-screen flex-col">
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </>
  );
}
