import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartProviderWrapper from '@/components/cart/CartProviderWrapper';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });
  const isRTL = locale === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="fr" href="https://cherio.com/fr" />
        <link rel="alternate" hrefLang="en" href="https://cherio.com/en" />
        <link rel="alternate" hrefLang="ar" href="https://cherio.com/ar" />
        <link rel="alternate" hrefLang="x-default" href="https://cherio.com" />
      </head>

      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleProvider>
            <CartProviderWrapper>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 page-enter">{children}</main>
                <Footer />
              </div>
            </CartProviderWrapper>
          </LocaleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

