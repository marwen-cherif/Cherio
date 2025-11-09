'use client';

import React from 'react';
import { CartItem } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/formatPrice';
import { useLocale } from '@/hooks/useLocale';
import { useTranslations } from 'next-intl';

export interface OrderItemsListProps {
  items: CartItem[];
  currency: string;
}

export function OrderItemsList({ items, currency }: OrderItemsListProps) {
  const t = useTranslations('cart');
  const { locale } = useLocale();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border-t border-border pt-4 mb-4">
      <h3 className="text-sm font-semibold text-primary mb-3">
        {t('productsList')}
      </h3>
      <div className="space-y-3">
        {items.map((item) => {
          const lineTotal = item.product.price * item.quantity;
          return (
            <div
              key={item.product.id}
              className="flex items-start justify-between gap-4 py-2 border-b border-border last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">
                  {item.product.name[locale]}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-secondary">
                  <span>
                    {formatPrice(item.product.price, currency, locale)}
                  </span>
                  <span>×</span>
                  <span>{item.quantity}</span>
                </div>
              </div>
              <div className="text-sm font-semibold text-primary whitespace-nowrap">
                {formatPrice(lineTotal, currency, locale)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

