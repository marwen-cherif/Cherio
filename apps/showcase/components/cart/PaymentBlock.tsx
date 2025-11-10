'use client';

import React from 'react';
import { Card } from '@shared/atoms/Card';
import { useTranslations } from 'next-intl';
import { useClientStore } from '../../stores/clientStore';

export default function PaymentBlock() {
  const t = useTranslations('cart');

  const deliveryAddress = useClientStore((state) => state.deliveryAddress);
  const pickupPoint = useClientStore((state) => state.pickupPoint);
  const isDeliverySaved = !!(deliveryAddress || pickupPoint);

  if (!isDeliverySaved) {
    return <></>;
  }

  return (
    <Card title={t('payment')} isOpen={isDeliverySaved}>
      {/* Payment content will be added here */}
      <div className="text-center py-8 text-secondary">
        <p>Bloc de paiement à implémenter</p>
      </div>
    </Card>
  );
}
