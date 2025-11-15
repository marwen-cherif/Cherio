import { useTranslations, useLocale } from 'next-intl';
import { cherioApps } from '../../../cherio.apps.config';

export default function Apps() {
  const t = useTranslations('apps');
  const locale = useLocale() as 'fr' | 'en';

  return (
    <section id="apps" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cherioApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                {app.icon ? (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{app.publicName[locale]}</h3>
              <p className="text-gray-600 text-sm mb-4">{app.description[locale]}</p>
              {app.published ? (
                <a
                  href={app.urls[locale]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-900 text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  {locale === 'fr' ? 'Visiter' : 'Visit'}
                </a>
              ) : (
                <span className="inline-block bg-gray-200 text-gray-600 px-4 py-2 rounded text-sm">
                  {t('comingSoon')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
