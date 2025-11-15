import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import frMessages from '../messages/fr.json';
import enMessages from '../messages/en.json';
import { hasLocale } from 'next-intl';

// Static import map for all locale messages
const messages = {
  fr: frMessages,
  en: enMessages,
} as const;

// For static export, we need to handle requestLocale carefully
// During build, requestLocale may call headers() which isn't available
// So we catch the error and use defaultLocale as fallback
// The layout will call setRequestLocale() which ensures getTranslations() 
// uses the correct locale from route params
export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string;
  
  try {
    // Try to get locale from requestLocale (resolved from route params during static generation)
    const requested = await requestLocale;
    
    // Validate the locale
    if (requested && hasLocale(routing.locales, requested)) {
      locale = requested;
    } else {
      locale = routing.defaultLocale;
    }
  } catch (error) {
    // If requestLocale fails (e.g., calls headers() during static export),
    // use defaultLocale. The layout will call setRequestLocale() with the correct
    // locale from params, which will make getTranslations() work correctly.
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
