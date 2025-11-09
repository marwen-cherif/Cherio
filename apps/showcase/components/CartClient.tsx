'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useCart } from '@/contexts/CartContext';
import { useLocale } from 'next-intl';
import { z } from 'zod';

interface CartClientProps {
  translations: {
    title: string;
    description: string;
    emptyCart: string;
    emptyCartDescription: string;
    continueShopping: string;
    yourCart: string;
    product: string;
    quantity: string;
    price: string;
    total: string;
    subtotal: string;
    remove: string;
    checkout: string;
    updateQuantity: string;
  };
  isRTL: boolean;
}

// Zod schema for cart validation
const cartSchema = z.object({
  hasItems: z.boolean().refine((val) => val === true, {
    message: 'Cart must contain at least one item',
  }),
});

export default function CartClient({ translations, isRTL }: CartClientProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const locale = useLocale() as 'fr' | 'en' | 'ar';
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    items.forEach((item) => {
      initial[item.product.id] = item.quantity;
    });
    return initial;
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  // Update quantities state when items change
  useEffect(() => {
    const newQuantities: Record<string, number> = {};
    items.forEach((item) => {
      newQuantities[item.product.id] = item.quantity;
    });
    setQuantities(newQuantities);
  }, [items]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const quantity = Math.max(1, Math.min(99, newQuantity || 1));
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
    updateQuantity(productId, quantity);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[productId];
      return newQuantities;
    });
  };

  const handleCheckout = () => {
    setValidationError(null);
    
    try {
      const validation = cartSchema.safeParse({
        hasItems: items.length > 0,
      });

      if (!validation.success) {
        setValidationError(validation.error.errors[0].message);
        return;
      }

      // Here you would typically redirect to checkout page or process the order
      // For now, we'll just show a success message
      alert('Checkout functionality would be implemented here');
    } catch (error) {
      setValidationError('An error occurred during validation');
    }
  };

  // Validate cart state for button disable
  const isCartValid = items.length > 0;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center" dir={isRTL ? 'rtl' : 'ltr'}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-4">
                {translations.emptyCart}
              </h1>
              <p className="text-secondary mb-8">{translations.emptyCartDescription}</p>
              <Link
                href="/"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary"
              >
                {translations.continueShopping}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-8">
            {translations.yourCart} ({totalItems} {totalItems === 1 ? translations.product : translations.product + 's'})
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row gap-4 rounded-lg border border-border bg-white p-4 shadow-sm"
                    >
                      {/* Product Image */}
                      <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                        <div className="aspect-square w-24 overflow-hidden rounded-lg bg-accent/20">
                          <Image
                            src={item.product.image || '/images/placeholder.jpg'}
                            alt={item.product.name[locale]}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="text-lg font-semibold text-primary hover:text-secondary transition-colors"
                          >
                            {item.product.name[locale]}
                          </Link>
                          <p className="text-sm text-secondary mt-1">
                            {item.product.shortDescription[locale]}
                          </p>
                          <p className="text-lg font-bold text-primary mt-2">
                            {item.product.price} {item.product.currency}
                          </p>
                        </div>

                        {/* Quantity and Remove */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <label htmlFor={`quantity-${item.product.id}`} className="text-sm font-medium text-primary">
                              {translations.quantity}:
                            </label>
                            <input
                              id={`quantity-${item.product.id}`}
                              type="number"
                              min="1"
                              max="99"
                              value={quantities[item.product.id] || item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.product.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                              className="w-20 rounded-md border border-border px-3 py-2 text-center text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                              dir={isRTL ? 'rtl' : 'ltr'}
                            />
                          </div>

                          <motion.button
                            onClick={() => handleRemove(item.product.id)}
                            className="p-2 text-secondary hover:text-primary transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={translations.remove}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
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
                      {totalPrice.toFixed(2)} {items[0]?.product.currency || 'EUR'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>{translations.total}</span>
                    <span>
                      {totalPrice.toFixed(2)} {items[0]?.product.currency || 'EUR'}
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

                <motion.button
                  onClick={handleCheckout}
                  className="w-full rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={isCartValid ? { scale: 1.02 } : {}}
                  whileTap={isCartValid ? { scale: 0.98 } : {}}
                  disabled={!isCartValid}
                >
                  {translations.checkout}
                </motion.button>

                <Link
                  href="/"
                  className="mt-4 block text-center text-sm text-secondary hover:text-primary transition-colors"
                >
                  {translations.continueShopping}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

