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

export default getRequestConfig(async ({ requestLocale }) => {
  let locale: string;
  
  try {
    const requested = await requestLocale;
    
    if (requested && hasLocale(routing.locales, requested)) {
      locale = requested;
    } else {
      locale = routing.defaultLocale;
    }
  } catch (error) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});

