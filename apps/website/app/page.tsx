import { redirect } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

// This page only renders when the user visits the root URL
export default function RootPage() {
  // Redirect to the default locale with explicit locale in URL
  redirect({ href: '/', locale: routing.defaultLocale });
}

