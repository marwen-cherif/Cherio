import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: t('title'),
    description: t('description'),
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
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tProducts = await getTranslations({ locale, namespace: 'products' });
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  const isRTL = locale === 'ar';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FFDBD9] to-[#FFFBF5] py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center animate-fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl font-bold tracking-tight text-[#5C5451] sm:text-6xl">
              {t('title')}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#A18080]">
              {t('subtitle')}
            </p>
            <p className="mt-4 text-base text-[#A18080]">
              {t('description')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/products"
                className="rounded-md bg-[#5C5451] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#A18080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C5451]"
              >
                {t('cta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-3xl font-bold tracking-tight text-[#5C5451] sm:text-4xl">
              {tProducts('title')}
            </h2>
            <p className="mt-4 text-lg text-[#A18080]">
              {tProducts('subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-[#5C5451] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#A18080]"
            >
              {tProducts('viewAll')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

