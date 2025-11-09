import { getTranslations } from 'next-intl/server';
import { products } from '@/data/products';
import ProductsGrid from '@/components/ProductsGrid/ProductsGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      languages: {
        'fr': '/fr/products',
        'en': '/en/products',
        'ar': '/ar/products',
        'x-default': '/products'
      }
    }
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products' });
  const isRTL = locale === 'ar';

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-secondary">
            {t('subtitle')}
          </p>
        </div>

        {products.length > 0 ? (
          <ProductsGrid products={products} />
        ) : (
          <div className="text-center py-12" dir={isRTL ? 'rtl' : 'ltr'}>
            <p className="text-secondary">{t('noProducts')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

