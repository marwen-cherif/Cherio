'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { formatPrice } from '@/utils/formatPrice';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import { useClientStore } from '@/stores/clientStore';
import { useLocale } from '@/hooks/useLocale';
import { useTranslations } from 'next-intl';

interface OrderSummaryProps {
  totalPrice: number;
  currency: string;
  isProductsCollapsed: boolean;
  isCartValid: boolean;
  validationError: string | null;
  onCheckout: () => void;
}

export default function OrderSummary({
  totalPrice,
  currency,
  isProductsCollapsed,
  isCartValid,
  validationError,
  onCheckout,
}: OrderSummaryProps) {
  const t = useTranslations('cart');
  // Get locale and isRTL from store
  const { locale, isRTL } = useLocale();
  
  // Get delivery data from Zustand store
  const deliveryAddress = useClientStore((state) => state.deliveryAddress);
  const pickupPoint = useClientStore((state) => state.pickupPoint);
  
  // Check if delivery method is saved (declarative - based on data)
  const isDeliverySaved = !!(deliveryAddress || pickupPoint);
  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="sticky top-24 rounded-lg border border-border bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-primary mb-4">{t('total')}</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-secondary">
            <span>{t('subtotal')}</span>
            <span className="font-semibold text-primary">
              {formatPrice(totalPrice, currency, locale)}
            </span>
          </div>

          {/* Delivery Method Summary */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-primary mb-2">
              {t('deliveryMethod')}
            </h3>
            {isDeliverySaved ? (
              <>
                {deliveryAddress && (
                  <div className="text-sm text-secondary space-y-1">
                    <p className="font-medium text-primary">{t('homeDelivery')}</p>
                    <p>{deliveryAddress.firstName} {deliveryAddress.lastName}</p>
                    <p>{deliveryAddress.addressLine1}</p>
                    {deliveryAddress.addressLine2 && <p>{deliveryAddress.addressLine2}</p>}
                    <p>
                      {deliveryAddress.postalCode} {deliveryAddress.city}
                    </p>
                  </div>
                )}
                {pickupPoint && (
                  <div className="text-sm text-secondary space-y-1">
                    <p className="font-medium text-primary">{t('pickupPoint')}</p>
                    <p>{pickupPoint.name}</p>
                    <p>{pickupPoint.address}</p>
                    <p>
                      {pickupPoint.postalCode} {pickupPoint.city}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-secondary italic">
                {t('chooseDeliveryMethod')}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-4 mb-4">
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>{t('total')}</span>
            <span>
              {formatPrice(totalPrice, currency, locale)}
            </span>
          </div>
        </div>

        {validationError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800"
          >
            {validationError}
          </motion.div>
        )}

        {isDeliverySaved &&<Button
          onClick={onCheckout}
          variant="primary"
          size={ButtonSize.Normal}
          isRTL={isRTL}
          disabled={!isCartValid}
          className="w-full"
        >
          { `${t('pay')} (${formatPrice(totalPrice, currency, locale)})`}
        </Button>}

        {!isDeliverySaved &&<Button
          onClick={onCheckout}
          variant="primary"
          size={ButtonSize.Normal}
          isRTL={isRTL}
          disabled={!isCartValid}
          className="w-full"
        >
          {t('chooseDeliveryMethod')}
        </Button>}

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-secondary hover:text-primary transition-colors"
        >
          {t('continueShopping')}
        </Link>
      </motion.div>
    </div>
  );
}

