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
              {locale === 'fr' && (
                <>
                  <p><strong>Raison sociale :</strong> Eva Accessories</p>
                  <p><strong>Forme juridique :</strong> Micro-entreprise</p>
                  <p><strong>Siège social :</strong> 76 Rue dian fossey, 7000 Melun France</p>
                  <p><strong>Numéro SIRET :</strong> 993 121 466</p>
                  <p><strong>Directeur de publication :</strong> Marwen Cherif</p>
                </>
              )}
              {locale === 'en' && (
                <>
                  <p><strong>Company name :</strong> Eva Accessories</p>
                  <p><strong>Legal form :</strong> Micro-business</p>
                  <p><strong>Registered office :</strong> 76 Rue dian fossey, 7000 Melun France</p>
                  <p><strong>Registration number :</strong> 993 121 466</p>
                  <p><strong>Publication director :</strong> Marwen Cherif</p>
                </>
              )}
              {locale === 'ar' && (
                <>
                  <p><strong>اسم الشركة :</strong>Eva Accessories</p>
                  <p><strong>الشكل القانوني :</strong> مشروع صغير </p>
                  <p><strong>المقر الاجتماعي :</strong>76 Rue dian fossey, 7000 Melun France</p>
                  <p><strong>رقم التسجيل :</strong>993 121 466</p>
                  <p><strong>مدير النشر :</strong> مروان الشريف</p>
                </>
              )}
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

