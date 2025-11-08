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
              {locale === 'fr' && (
                <>
                  <li>Nom et prénom</li>
                  <li>Adresse e-mail</li>
                  <li>Numéro de téléphone (si fourni)</li>
                  <li>Adresse postale (si fournie)</li>
                  <li>Données de navigation et cookies</li>
                </>
              )}
              {locale === 'en' && (
                <>
                  <li>First and last name</li>
                  <li>Email address</li>
                  <li>Phone number (if provided)</li>
                  <li>Postal address (if provided)</li>
                  <li>Browsing data and cookies</li>
                </>
              )}
              {locale === 'ar' && (
                <>
                  <li>الاسم الأول والأخير</li>
                  <li>عنوان البريد الإلكتروني</li>
                  <li>رقم الهاتف (إن تم توفيره)</li>
                  <li>العنوان البريدي (إن تم توفيره)</li>
                  <li>بيانات التصفح والكوكيز</li>
                </>
              )}
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
              {locale === 'fr' && (
                <>
                  <li>Traiter vos commandes et demandes</li>
                  <li>Vous contacter concernant nos produits et services</li>
                  <li>Améliorer notre site web et nos services</li>
                  <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                </>
              )}
              {locale === 'en' && (
                <>
                  <li>Process your orders and requests</li>
                  <li>Contact you regarding our products and services</li>
                  <li>Improve our website and services</li>
                  <li>Send you marketing communications (with your consent)</li>
                </>
              )}
              {locale === 'ar' && (
                <>
                  <li>معالجة طلباتك وطلباتك</li>
                  <li>التواصل معك بخصوص منتجاتنا وخدماتنا</li>
                  <li>تحسين موقعنا وخدماتنا</li>
                  <li>إرسال رسائل تسويقية لك (بموافقتك)</li>
                </>
              )}
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
              {locale === 'fr' && (
                <>
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification de vos données</li>
                  <li>Droit à l'effacement de vos données</li>
                  <li>Droit d'opposition au traitement de vos données</li>
                  <li>Droit à la portabilité de vos données</li>
                </>
              )}
              {locale === 'en' && (
                <>
                  <li>Right to access your personal data</li>
                  <li>Right to rectify your data</li>
                  <li>Right to erasure of your data</li>
                  <li>Right to object to processing of your data</li>
                  <li>Right to data portability</li>
                </>
              )}
              {locale === 'ar' && (
                <>
                  <li>حق الوصول إلى بياناتك الشخصية</li>
                  <li>حق تصحيح بياناتك</li>
                  <li>حق حذف بياناتك</li>
                  <li>حق الاعتراض على معالجة بياناتك</li>
                  <li>حق نقل بياناتك</li>
                </>
              )}
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

