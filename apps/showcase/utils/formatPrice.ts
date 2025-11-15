/**
 * Formats a price with currency symbol based on the locale
 * @param price - The price value as a number
 * @param currency - The currency code (e.g., 'EUR', 'USD', 'GBP')
 * @param locale - The locale code ('fr', 'en', 'ar')
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(
  price: number,
  currency: string,
  locale: 'fr' | 'en' | 'ar'
): string {
  // Map locale codes to Intl locale strings
  const localeMap: Record<'fr' | 'en' | 'ar', string> = {
    fr: 'fr-FR',
    en: 'en-US',
    ar: 'ar-SA', // Arabic (Saudi Arabia) - commonly used for Arabic locales
  };

  const intlLocale = localeMap[locale];

  try {
    // Use Intl.NumberFormat to format the price with currency
    const formatter = new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price);
  } catch (error) {
    // Fallback if currency is invalid or not supported
    // Return formatted number with currency code
    const numberFormatter = new Intl.NumberFormat(intlLocale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `${numberFormatter.format(price)} ${currency}`;
  }
}

