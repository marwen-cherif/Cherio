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

// For static export, we return default config
// The actual locale is managed by NextIntlClientProvider in the layout
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  };
});
