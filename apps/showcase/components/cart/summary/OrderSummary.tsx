'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { formatPrice } from '@/utils/formatPrice';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import { useClientStore } from '@/stores/clientStore';

interface OrderSummaryProps {
  translations: {
    total: string;
    subtotal: string;
    deliveryMethod: string;
    homeDelivery: string;
    pickupPoint: string;
    chooseDeliveryMethod: string;
    checkout: string;
    pay: string;
    continueShopping: string;
  };
  isRTL: boolean;
  totalPrice: number;
  currency: string;
  locale: 'fr' | 'en' | 'ar';
  isProductsCollapsed: boolean;
  isCartValid: boolean;
  validationError: string | null;
  onCheckout: () => void;
}

export default function OrderSummary({
  translations,
  isRTL,
  totalPrice,
  currency,
  locale,
  isProductsCollapsed,
  isCartValid,
  validationError,
  onCheckout,
}: OrderSummaryProps) {
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
        <h2 className="text-xl font-bold text-primary mb-4">{translations.total}</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-secondary">
            <span>{translations.subtotal}</span>
            <span className="font-semibold text-primary">
              {formatPrice(totalPrice, currency, locale)}
            </span>
          </div>

          {/* Delivery Method Summary */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold text-primary mb-2">
              {translations.deliveryMethod}
            </h3>
            {isDeliverySaved ? (
              <>
                {deliveryAddress && (
                  <div className="text-sm text-secondary space-y-1">
                    <p className="font-medium text-primary">{translations.homeDelivery}</p>
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
                    <p className="font-medium text-primary">{translations.pickupPoint}</p>
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
                {translations.chooseDeliveryMethod}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-border pt-4 mb-4">
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>{translations.total}</span>
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
          { `${translations.pay} (${formatPrice(totalPrice, currency, locale)})`}
        </Button>}

        {!isDeliverySaved &&<Button
          onClick={onCheckout}
          variant="primary"
          size={ButtonSize.Normal}
          isRTL={isRTL}
          disabled={!isCartValid}
          className="w-full"
        >
          {translations.chooseDeliveryMethod}
        </Button>}

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-secondary hover:text-primary transition-colors"
        >
          {translations.continueShopping}
        </Link>
      </motion.div>
    </div>
  );
}

