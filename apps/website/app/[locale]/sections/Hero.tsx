import { getTranslations } from 'next-intl/server';

export default async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 md:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-200">
            {t('subtitle')}
          </p>
          <a
            href="#apps"
            className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up delay-400"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
