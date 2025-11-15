import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      languages: {
        'fr': '/fr/privacy',
        'en': '/en/privacy',
        'ar': '/ar/privacy',
        'x-default': '/privacy'
      }
    }
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
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
              {t('dataCollection.title')}
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              {t('dataCollection.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary">
              <li>{t('dataCollection.items.name')}</li>
              <li>{t('dataCollection.items.email')}</li>
              <li>{t('dataCollection.items.phone')}</li>
              <li>{t('dataCollection.items.address')}</li>
              <li>{t('dataCollection.items.browsing')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('dataUsage.title')}
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              {t('dataUsage.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary">
              <li>{t('dataUsage.items.orders')}</li>
              <li>{t('dataUsage.items.contact')}</li>
              <li>{t('dataUsage.items.improve')}</li>
              <li>{t('dataUsage.items.marketing')}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('dataProtection.title')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {t('dataProtection.content')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('cookies.title')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {t('cookies.content')}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('rights.title')}
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              {t('rights.content')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-secondary">
              <li>{t('rights.items.access')}</li>
              <li>{t('rights.items.rectify')}</li>
              <li>{t('rights.items.erasure')}</li>
              <li>{t('rights.items.object')}</li>
              <li>{t('rights.items.portability')}</li>
            </ul>
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


