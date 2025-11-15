import { getTranslations } from 'next-intl/server';

export default async function Vision() {
  const t = await getTranslations('vision');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t('content')}
          </p>
        </div>
      </div>
    </section>
  );
}

