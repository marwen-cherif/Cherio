import { getTranslations } from 'next-intl/server';
import CartClient from '../../../components/cart/cartClient/CartClient';

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
  return <CartClient />;
}

