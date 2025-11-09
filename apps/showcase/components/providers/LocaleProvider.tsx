'use client';

import { useEffect } from 'react';
import { useLocale as useNextIntlLocale } from 'next-intl';
import { useLocaleStore, Locale } from '@/stores/localeStore';

/**
 * Provider component that initializes the locale store from next-intl
 * Should be placed in the app layout
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const nextIntlLocale = useNextIntlLocale() as Locale;
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    setLocale(nextIntlLocale);
  }, [nextIntlLocale, setLocale]);

  return <>{children}</>;
}

