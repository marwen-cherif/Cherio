import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';
import { ReactQueryProvider } from '@/app/react-query-provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { Sidebar } from '../components/Sidebar';
import { auth } from 'auth';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cherio',
  description: 'Care made simple.',
};

export default async function RootLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (!session?.user) {
    return <></>;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
