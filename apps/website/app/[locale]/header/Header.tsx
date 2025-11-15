import { getTranslations } from 'next-intl/server';
import { Link } from '../../../i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default async function Header({ locale }: { locale: string }) {
  const t = await getTranslations('common');

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            locale={locale}
            className="text-2xl font-bold text-gray-900 hover:text-gray-700"
          >
            Cherio
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" locale={locale} className="text-gray-700 hover:text-gray-900">
              {t('home')}
            </Link>
            <Link href="/contact" locale={locale} className="text-gray-700 hover:text-gray-900">
              {t('contact')}
            </Link>
            <LanguageSwitcher locale={locale} />
          </div>
        </nav>
      </div>
    </header>
  );
}
