import { getTranslations } from 'next-intl/server';

export default async function Why() {
  const t = await getTranslations('why');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t('innovation.title')}
            </h3>
            <p className="text-gray-600">
              {t('innovation.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t('simplicity.title')}
            </h3>
            <p className="text-gray-600">
              {t('simplicity.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔗</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t('ecosystem.title')}
            </h3>
            <p className="text-gray-600">
              {t('ecosystem.description')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⭐</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t('quality.title')}
            </h3>
            <p className="text-gray-600">
              {t('quality.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

