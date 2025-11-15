import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      languages: {
        'fr': '/fr/legal',
        'en': '/en/legal',
        'ar': '/ar/legal',
        'x-default': '/legal'
      }
    }
  };
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  const isRTL = locale === 'ar';

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-secondary">
            {t('subtitle')}
          </p>
        </div>

        <div className="prose prose-lg max-w-none" dir={isRTL ? 'rtl' : 'ltr'}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('companyInfo.title')}
            </h2>
            <div className="text-secondary leading-relaxed space-y-2">
              <p><strong>{t('companyInfo.companyName')} :</strong> {t('companyInfo.companyNameValue')}</p>
              <p><strong>{t('companyInfo.legalForm')} :</strong> {t('companyInfo.legalFormValue')}</p>
              <p><strong>{t('companyInfo.registeredOffice')} :</strong> {t('companyInfo.registeredOfficeValue')}</p>
              <p><strong>{t('companyInfo.registrationNumber')} :</strong> {t('companyInfo.registrationNumberValue')}</p>
              <p><strong>{t('companyInfo.publicationDirector')} :</strong> {t('companyInfo.publicationDirectorValue')}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('intellectualProperty.title')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {t('intellectualProperty.content')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('liability.title')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {t('liability.content')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {t('contact.content')}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}


