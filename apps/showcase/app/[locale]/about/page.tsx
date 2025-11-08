import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      languages: {
        'fr': '/fr/about',
        'en': '/en/about',
        'ar': '/ar/about',
        'x-default': '/about'
      }
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
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
              {t('story')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {locale === 'fr' && (
                <>
                  Notre histoire commence avec une passion pour l'artisanat et le désir de créer des produits uniques qui allient tradition et modernité. 
                  Chaque pièce que nous créons est le fruit d'un savoir-faire transmis de génération en génération, 
                  enrichi par notre vision contemporaine de la qualité et de l'esthétique.
                </>
              )}
              {locale === 'en' && (
                <>
                  Our story begins with a passion for craftsmanship and the desire to create unique products that combine tradition and modernity. 
                  Each piece we create is the result of know-how passed down from generation to generation, 
                  enriched by our contemporary vision of quality and aesthetics.
                </>
              )}
              {locale === 'ar' && (
                <>
                  تبدأ قصتنا بشغف بالحرفية والرغبة في إنشاء منتجات فريدة تجمع بين التقليد والحداثة. 
                  كل قطعة نصنعها هي ثمرة معرفة متوارثة من جيل إلى جيل، 
                  مثراة برؤيتنا المعاصرة للجودة والجماليات.
                </>
              )}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('values')}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-secondary">
              {locale === 'fr' && (
                <>
                  <li>Qualité supérieure et durabilité</li>
                  <li>Respect de l'environnement et des matériaux naturels</li>
                  <li>Innovation dans le respect de la tradition</li>
                  <li>Engagement envers l'excellence artisanale</li>
                </>
              )}
              {locale === 'en' && (
                <>
                  <li>Superior quality and durability</li>
                  <li>Respect for the environment and natural materials</li>
                  <li>Innovation while respecting tradition</li>
                  <li>Commitment to artisanal excellence</li>
                </>
              )}
              {locale === 'ar' && (
                <>
                  <li>جودة فائقة ومتانة</li>
                  <li>احترام البيئة والمواد الطبيعية</li>
                  <li>الابتكار مع احترام التقاليد</li>
                  <li>الالتزام بالتميز الحرفي</li>
                </>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">
              {t('mission')}
            </h2>
            <p className="text-secondary leading-relaxed">
              {locale === 'fr' && (
                <>
                  Notre mission est de créer des produits qui enrichissent la vie quotidienne tout en préservant 
                  les techniques artisanales traditionnelles. Nous nous engageons à offrir à nos clients des produits 
                  de qualité exceptionnelle, fabriqués avec soin et attention aux détails.
                </>
              )}
              {locale === 'en' && (
                <>
                  Our mission is to create products that enrich daily life while preserving traditional artisanal techniques. 
                  We are committed to offering our customers products of exceptional quality, made with care and attention to detail.
                </>
              )}
              {locale === 'ar' && (
                <>
                  مهمتنا هي إنشاء منتجات تثري الحياة اليومية مع الحفاظ على التقنيات الحرفية التقليدية. 
                  نحن ملتزمون بتقديم منتجات عالية الجودة لعملائنا، مصنوعة بعناية واهتمام بالتفاصيل.
                </>
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

