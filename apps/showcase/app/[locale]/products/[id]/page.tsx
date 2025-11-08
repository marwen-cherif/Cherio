import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { products } from '@/data/products';
import JsonLd from '@/components/JsonLd';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: 'products' });

  return {
    title: product.name[locale as 'fr' | 'en' | 'ar'],
    description: product.shortDescription[locale as 'fr' | 'en' | 'ar'],
    alternates: {
      languages: {
        'fr': `/fr/products/${id}`,
        'en': `/en/products/${id}`,
        'ar': `/ar/products/${id}`,
        'x-default': `/products/${id}`
      }
    },
    openGraph: {
      title: product.name[locale as 'fr' | 'en' | 'ar'],
      description: product.shortDescription[locale as 'fr' | 'en' | 'ar'],
      images: [product.image],
    }
  };
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string; id: string }> 
}) {
  const { locale, id } = await params;
  const product = products.find(p => p.id === id);
  
  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'products' });
  const isRTL = locale === 'ar';
  const localeKey = locale as 'fr' | 'en' | 'ar';

  const jsonLdData = {
    name: product.name[localeKey],
    description: product.description[localeKey],
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
      url: product.links.amazon || product.links.etsy || product.links.vinted
    }
  };

  return (
    <>
      <JsonLd type="Product" data={jsonLdData} />
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-[#FFDBD9]/20 border border-[#FFDBD9]">
              <Image
                src={product.image || '/images/placeholder.jpg'}
                alt={product.name[localeKey]}
                width={800}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
              <h1 className="text-4xl font-bold tracking-tight text-[#5C5451] sm:text-5xl mb-4">
                {product.name[localeKey]}
              </h1>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#5C5451]">
                  {product.price} {product.currency}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#5C5451] mb-2">
                  {t('description')}
                </h2>
                <p className="text-[#A18080] leading-relaxed">
                  {product.description[localeKey]}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#5C5451] mb-4">
                  {t('availableOn')}
                </h3>
                <div className="flex flex-wrap gap-4">
                  {product.links.amazon && (
                    <a
                      href={product.links.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
                    >
                      <span>Amazon</span>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {product.links.etsy && (
                    <a
                      href={product.links.etsy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-pink-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-pink-600"
                    >
                      <span>Etsy</span>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {product.links.vinted && (
                    <a
                      href={product.links.vinted}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
                    >
                      <span>Vinted</span>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

