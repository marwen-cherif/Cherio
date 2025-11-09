import { create } from 'zustand';

export type Locale = 'fr' | 'en' | 'ar';

interface LocaleState {
  locale: Locale;
  isRTL: boolean;
  
  // Actions
  setLocale: (locale: Locale) => void;
}

const calculateIsRTL = (locale: Locale): boolean => {
  return locale === 'ar';
};

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'fr', // Default locale
  isRTL: false,
  
  setLocale: (locale) => {
    set({
      locale,
      isRTL: calculateIsRTL(locale),
    });
  },
}));

