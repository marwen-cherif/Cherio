import { getTranslations } from 'next-intl/server';
import CartClient from '@/components/cart/CartClient';

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
    productsList: t('productsList'),
    expandProducts: t('expandProducts'),
    collapseProducts: t('collapseProducts'),
    deliveryInfo: t('deliveryInfo'),
    editDeliveryInfo: t('editDeliveryInfo'),
    saveDeliveryInfo: t('saveDeliveryInfo'),
    cancel: t('cancel'),
    deliveryForm: {
      firstName: t('deliveryForm.firstName'),
      lastName: t('deliveryForm.lastName'),
      addressLine1: t('deliveryForm.addressLine1'),
      addressLine2: t('deliveryForm.addressLine2'),
      city: t('deliveryForm.city'),
      postalCode: t('deliveryForm.postalCode'),
      country: t('deliveryForm.country'),
      department: t('deliveryForm.department'),
      additionalInfo: t('deliveryForm.additionalInfo'),
      firstNameRequired: t('deliveryForm.firstNameRequired'),
      lastNameRequired: t('deliveryForm.lastNameRequired'),
      addressLine1Required: t('deliveryForm.addressLine1Required'),
      cityRequired: t('deliveryForm.cityRequired'),
      postalCodeRequired: t('deliveryForm.postalCodeRequired'),
      countryRequired: t('deliveryForm.countryRequired'),
    },
    homeDelivery: t('homeDelivery'),
    pickupPoint: t('pickupPoint'),
    deliveryMethod: t('deliveryMethod'),
    chooseDeliveryMethod: t('chooseDeliveryMethod'),
    chooseAnotherDeliveryMethod: t('chooseAnotherDeliveryMethod'),
    pay: t('pay'),
    payment: t('payment'),
    pickupPointForm: {
      searchAddress: t('pickupPointForm.searchAddress'),
      selectPickupPoint: t('pickupPointForm.selectPickupPoint'),
      save: t('pickupPointForm.save'),
      cancel: t('pickupPointForm.cancel'),
      noPickupPoints: t('pickupPointForm.noPickupPoints'),
      loading: t('pickupPointForm.loading'),
      distance: t('pickupPointForm.distance'),
      openingHours: t('pickupPointForm.openingHours'),
      phone: t('pickupPointForm.phone'),
      km: t('pickupPointForm.km'),
    },
  };

  return <CartClient translations={translations} isRTL={isRTL} />;
}

