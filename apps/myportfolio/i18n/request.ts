import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import frMessages from '../messages/fr.json';
import enMessages from '../messages/en.json';

// Static import map for all locale messages
const messages = {
  fr: frMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});

