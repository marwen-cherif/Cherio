import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';
import { ReactQueryProvider } from '@/app/react-query-provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Sidebar } from '../components/Sidebar';
import { auth } from 'auth';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cherio',
  description: 'Care made simple.',
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  const locale = await getLocale();

  const messages = await getMessages();

  if (!session?.user) {
    return <></>;
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ToastContainer />
          <ReactQueryProvider>
            <div className="flex h-full min-h-screen w-full flex-col justify-start">
              <Header />

              <div className="flex flex-row flex-auto gap-4">
                <Sidebar />
                <main className="flex-auto p-8">{children}</main>
              </div>

              <Footer />
            </div>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
