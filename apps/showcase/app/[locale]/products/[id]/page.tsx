import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { products } from '@/data/products';
import JsonLd from '@/components/JsonLd';
import ProductDetailClient from '@/components/ProductsGrid/ProductDetailClient';

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

  // Extract translations as strings to pass to client component
  const translations = {
    backToProducts: t('backToProducts'),
    description: t('description'),
    availableOn: t('availableOn'),
    addToCart: t('addToCart'),
    addedToCart: t('addedToCart'),
    quantity: t('quantity'),
  };

  return (
    <>
      <JsonLd type="Product" data={jsonLdData} />
      <ProductDetailClient
        product={product}
        locale={localeKey}
        isRTL={isRTL}
        translations={translations}
      />
    </>
  );
}

