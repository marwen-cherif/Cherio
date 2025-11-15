import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('title')}</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">{t('subtitle')}</p>
          <a
            href="#apps"
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
