import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';
import ProductsGrid from '@/components/products/ProductsGrid';
import { Hero } from '@/components/sections/Hero';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      languages: {
        'fr': '/fr',
        'en': '/en',
        'ar': '/ar',
        'x-default': '/'
      }
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const isRTL = locale === 'ar';

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <Hero title={t('title')} subtitle={t('subtitle')} isRTL={isRTL} />

      {/* Products Grid */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <ProductsGrid products={products} />
          ) : (
            <div className="text-center py-12" dir={isRTL ? 'rtl' : 'ltr'}>
              <p className="text-secondary">{t('noProducts')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

