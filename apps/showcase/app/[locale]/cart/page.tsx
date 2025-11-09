import { getTranslations } from 'next-intl/server';
import CartClient from '@/components/CartClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cart' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        'fr': '/fr/cart',
        'en': '/en/cart',
        'ar': '/ar/cart',
        'x-default': '/cart'
      }
    }
  };
}

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cart' });
  const isRTL = locale === 'ar';

  const translations = {
    title: t('title'),
    description: t('description'),
    emptyCart: t('emptyCart'),
    emptyCartDescription: t('emptyCartDescription'),
    continueShopping: t('continueShopping'),
    yourCart: t('yourCart'),
    product: t('product'),
    quantity: t('quantity'),
    price: t('price'),
    total: t('total'),
    subtotal: t('subtotal'),
    remove: t('remove'),
    checkout: t('checkout'),
    updateQuantity: t('updateQuantity'),
  };

  return <CartClient translations={translations} isRTL={isRTL} />;
}

