import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/routing';

export default async function Footer() {
  const t = await getTranslations('footer');
  const tCommon = await getTranslations('common');

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Cherio</h3>
            <p className="text-gray-600 text-sm">{t('description')}</p>
          </div>
          <div className="animate-fade-in delay-200">
            <h4 className="text-sm font-semibold mb-4 uppercase text-gray-900">Liens</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                  {t('links.home')}
                </Link>
              </li>
              <li>
                <Link href="#apps" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                  {tCommon('apps')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                  {t('links.contact')}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200">
                  {t('links.about')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="animate-fade-in delay-400">
            <h4 className="text-sm font-semibold mb-4 uppercase text-gray-900">Informations</h4>
            <p className="text-gray-600 text-sm">{t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
