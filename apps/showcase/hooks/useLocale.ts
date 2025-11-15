'use client';

import { useLocale as useNextIntlLocale } from 'next-intl';
import { useEffect } from 'react';
import { useLocaleStore, Locale } from '@/stores/localeStore';

/**
 * Custom hook that synchronizes next-intl locale with Zustand store
 * Returns locale and isRTL from the store
 */
export function useLocale() {
  const nextIntlLocale = useNextIntlLocale() as Locale;
  const storeLocale = useLocaleStore((state) => state.locale);
  const isRTL = useLocaleStore((state) => state.isRTL);
  const setLocale = useLocaleStore((state) => state.setLocale);

  // Sync next-intl locale with Zustand store
  useEffect(() => {
    if (nextIntlLocale !== storeLocale) {
      setLocale(nextIntlLocale);
    }
  }, [nextIntlLocale, storeLocale, setLocale]);

  return {
    locale: storeLocale,
    isRTL,
  };
}

/**
 * Hook to get only isRTL flag
 */
export function useIsRTL() {
  const { isRTL } = useLocale();
  return isRTL;
}

