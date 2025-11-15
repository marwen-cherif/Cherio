import { getTranslations } from 'next-intl/server';
import { Link } from '../../i18n/routing';

export default async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Cherio</h3>
            <p className="text-gray-600 text-sm">{t('description')}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase">Liens</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
                  {t('links.home')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase">Informations</h4>
            <p className="text-gray-600 text-sm">{t('copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
