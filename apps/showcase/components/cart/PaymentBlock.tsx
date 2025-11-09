'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { useTranslations } from 'next-intl';

interface PaymentBlockProps {
  initialIsOpen?: boolean;
}

export default function PaymentBlock({ initialIsOpen = true }: PaymentBlockProps) {
  const t = useTranslations('cart');
  return (
    <Card
      title={t('payment')}
      initialIsOpen={initialIsOpen}
    >
      {/* Payment content will be added here */}
      <div className="text-center py-8 text-secondary">
        <p>Bloc de paiement à implémenter</p>
      </div>
    </Card>
  );
}

