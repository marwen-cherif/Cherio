import { getTranslations } from 'next-intl/server';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import ProductsGrid from '@/components/ProductsGrid';

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
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/30 to-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              {t('title')}
            </h1>
            <p className="mt-4 text-base text-secondary">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

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

