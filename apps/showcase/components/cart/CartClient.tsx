'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useCart } from '@/contexts/CartContext';
import { useLocale } from 'next-intl';
import { z } from 'zod';
import { formatPrice } from '@/utils/formatPrice';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';
import HomeDeliveryForm from './HomeDeliveryForm';
import PickupPointSelector from './PickupPointSelector';
import PaymentBlock from './PaymentBlock';
import OrderSummary from './summary/OrderSummary';
import { DeliveryAddress, PickupPoint } from '@shared/index';
import { useClientStore } from '@/stores/clientStore';
import { CheckoutProvider, useCheckout } from './CheckoutContext';

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
    productsList: string;
    expandProducts: string;
    collapseProducts: string;
    deliveryInfo: string;
    editDeliveryInfo: string;
    saveDeliveryInfo: string;
    deliveryForm: {
      firstName: string;
      lastName: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      postalCode: string;
      country: string;
      department: string;
      additionalInfo: string;
      firstNameRequired: string;
      lastNameRequired: string;
      addressLine1Required: string;
      cityRequired: string;
      postalCodeRequired: string;
      countryRequired: string;
    };
    homeDelivery: string;
    pickupPoint: string;
    deliveryMethod: string;
    chooseDeliveryMethod: string;
    chooseAnotherDeliveryMethod: string;
    cancel: string;
    pay: string;
    payment: string;
    pickupPointForm: {
      searchAddress: string;
      selectPickupPoint: string;
      save: string;
      noPickupPoints: string;
      loading: string;
      distance: string;
      openingHours: string;
      phone: string;
      km: string;
    };
  };
  isRTL: boolean;
}

// Zod schema for cart validation
const cartSchema = z.object({
  hasItems: z.boolean().refine((val) => val === true, {
    message: 'Cart must contain at least one item',
  }),
});

function CartClientContent({ translations, isRTL }: CartClientProps) {
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
  
  // Get data from Zustand store
  const deliveryAddress = useClientStore((state) => state.deliveryAddress);
  const pickupPoint = useClientStore((state) => state.pickupPoint);
  const deliveryType = useClientStore((state) => state.deliveryType);
  const setDeliveryType = useClientStore((state) => state.setDeliveryType);
  const setDeliveryAddress = useClientStore((state) => state.setDeliveryAddress);
  const setPickupPoint = useClientStore((state) => state.setPickupPoint);
  const clearDeliveryInfo = useClientStore((state) => state.clearDeliveryInfo);
  
  // Check if delivery method is saved (declarative - based on data)
  const isDeliverySaved = !!(deliveryAddress || pickupPoint);
  
  // Use checkout context for UI state only (toggle actions)
  const {
    toggleProducts,
    toggleDelivery,
    collapseDelivery,
    expandDelivery,
  } = useCheckout();
  
  // Calculate UI state based on data from store (declarative)
  // If delivery is saved: products collapsed, delivery collapsed, payment shown
  // If delivery not saved: products expanded, delivery buttons shown, payment hidden
  const isProductsCollapsed = isDeliverySaved;
  const isDeliveryCollapsed = isDeliverySaved;
  const showPayment = isDeliverySaved;

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

  // Declarative checkout handler - UI reacts based on data state
  const handleCheckout = () => {
    setValidationError(null);
    
    try {
      const validation = cartSchema.safeParse({
        hasItems: items.length > 0,
      });

      if (!validation.success) {
        setValidationError(validation.error.issues[0].message);
        return;
      }

      // If delivery is saved, payment block is already shown (based on isDeliverySaved)
      // If delivery type is selected but not saved, reset to show delivery buttons
      if (deliveryType !== null && !isDeliverySaved) {
        setDeliveryType(null);
        return;
      }

      // Otherwise, if no delivery type selected, just ensure delivery type is null
      // UI will react automatically based on isDeliverySaved
      if (deliveryType === null && !isDeliverySaved) {
        // User can start selecting delivery method
        // UI will show delivery buttons automatically when !isDeliverySaved
      }
    } catch (error) {
      setValidationError('An error occurred during validation');
    }
  };

  // Simple handlers that just update data - UI reacts automatically based on isDeliverySaved
  const handleHomeDelivery = () => {
    setDeliveryType('home');
  };

  const handlePickupPoint = () => {
    setDeliveryType('pickup');
  };

  const handleDeliverySave = (data: DeliveryAddress) => {
    // Store is already updated by HomeDeliveryForm
    // UI will react automatically based on isDeliverySaved
  };

  const handlePickupPointSave = (point: PickupPoint) => {
    // Store is already updated by PickupPointSelector
    // UI will react automatically based on isDeliverySaved
  };

  const handleCancelDelivery = () => {
    // Reset to delivery method selection - just clear the data
    clearDeliveryInfo();
  };

  const toggleProductsCollapse = () => {
    toggleProducts();
  };

  const toggleDeliveryCollapse = () => {
    toggleDelivery();
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
                {/* Products List Header with Collapse Toggle */}
                {isProductsCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-lg border border-border bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-primary">
                        {translations.productsList} ({totalItems} {totalItems === 1 ? translations.product : translations.product + 's'})
                      </h3>
                      <Button
                        variant="secondary"
                        size={ButtonSize.Small}
                        onClick={toggleProductsCollapse}
                        isRTL={isRTL}
                      >
                        {translations.expandProducts}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Products List */}
                <AnimatePresence>
                  {!isProductsCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
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
                                {formatPrice(item.product.price, item.product.currency, locale)}
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

                              <Button
                                variant="icon"
                                size={ButtonSize.Small}
                                onClick={() => handleRemove(item.product.id)}
                                isRTL={isRTL}
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
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Delivery Options */}
                {/* Show delivery buttons when delivery is not saved, or show delivery forms/payment when delivery is saved */}
                {(!isDeliverySaved || isProductsCollapsed) && (
                  <div className="space-y-4">
                    {/* Delivery Method Selection Buttons - Show when delivery is not saved */}
                    {!isDeliverySaved && !deliveryType && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <Button
                          onClick={handleHomeDelivery}
                          variant="primary"
                          size={ButtonSize.Normal}
                          isRTL={isRTL}
                          className="flex-1"
                        >
                          {translations.homeDelivery}
                        </Button>
                        <Button
                          onClick={handlePickupPoint}
                          variant="secondary"
                          size={ButtonSize.Normal}
                          isRTL={isRTL}
                          className="flex-1"
                        >
                          {translations.pickupPoint}
                        </Button>
                      </motion.div>
                    )}

                    {/* Home Delivery Form - Show when delivery type is 'home' */}
                    {deliveryType === 'home' && (
                      <HomeDeliveryForm
                        translations={{
                          ...translations.deliveryForm,
                          saveDeliveryInfo: translations.saveDeliveryInfo,
                          cancel: translations.cancel,
                          chooseAnotherDeliveryMethod: translations.chooseAnotherDeliveryMethod,
                        }}
                        isRTL={isRTL}
                        initialData={deliveryAddress}
                        onSave={handleDeliverySave}
                        onCancel={handleCancelDelivery}
                        isCollapsed={isDeliveryCollapsed}
                        onToggleCollapse={toggleDeliveryCollapse}
                        editLabel={translations.editDeliveryInfo}
                        deliveryInfoLabel={translations.deliveryInfo}
                      />
                    )}

                    {/* Pickup Point Selector - Show when delivery type is 'pickup' */}
                    {deliveryType === 'pickup' && (
                      <PickupPointSelector
                        translations={{
                          ...translations.pickupPointForm,
                          cancel: translations.cancel,
                          chooseAnotherDeliveryMethod: translations.chooseAnotherDeliveryMethod,
                        }}
                        isRTL={isRTL}
                        initialData={pickupPoint}
                        onSave={handlePickupPointSave}
                        onCancel={handleCancelDelivery}
                        isCollapsed={isDeliveryCollapsed}
                        onToggleCollapse={toggleDeliveryCollapse}
                        editLabel={translations.editDeliveryInfo}
                        pickupPointLabel={translations.pickupPoint}
                      />
                    )}

                    {/* Delivery Info Display - Show when delivery is saved (collapsed) */}
                    {isDeliverySaved && (() => {
                      const savedDeliveryAddress = deliveryAddress;
                      const savedPickupPoint = pickupPoint;
                      return (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg border border-border bg-white p-4 shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-semibold text-primary">
                              {translations.deliveryMethod}
                            </h3>
                            <Button
                              variant="secondary"
                              size={ButtonSize.Small}
                              onClick={toggleDeliveryCollapse}
                              isRTL={isRTL}
                            >
                              {isDeliveryCollapsed ? translations.editDeliveryInfo : translations.collapseProducts}
                            </Button>
                          </div>
                          {!isDeliveryCollapsed && (
                            <div className="mt-4 space-y-2">
                              {savedDeliveryAddress && (
                                <div className="text-sm text-secondary space-y-1">
                                  <p className="font-medium text-primary">{translations.homeDelivery}</p>
                                  <p>{savedDeliveryAddress.firstName} {savedDeliveryAddress.lastName}</p>
                                  <p>{savedDeliveryAddress.addressLine1}</p>
                                  {savedDeliveryAddress.addressLine2 && <p>{savedDeliveryAddress.addressLine2}</p>}
                                  <p>{savedDeliveryAddress.postalCode} {savedDeliveryAddress.city}</p>
                                </div>
                              )}
                              {savedPickupPoint && (
                                <div className="text-sm text-secondary space-y-1">
                                  <p className="font-medium text-primary">{translations.pickupPoint}</p>
                                  <p>{savedPickupPoint.name}</p>
                                  <p>{savedPickupPoint.address}</p>
                                  <p>{savedPickupPoint.postalCode} {savedPickupPoint.city}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </motion.div>
                      );
                    })()}
                  </div>
                )}

                {/* Payment Block - Show when delivery is saved */}
                {isDeliverySaved && (
                  <PaymentBlock
                    translations={{
                      payment: translations.payment,
                    }}
                    isRTL={isRTL}
                  />
                )}
              </div>
            </div>

            {/* Order Summary */}
            <OrderSummary
              translations={{
                total: translations.total,
                subtotal: translations.subtotal,
                deliveryMethod: translations.deliveryMethod,
                homeDelivery: translations.homeDelivery,
                pickupPoint: translations.pickupPoint,
                chooseDeliveryMethod: translations.chooseDeliveryMethod,
                checkout: translations.checkout,
                pay: translations.pay,
                continueShopping: translations.continueShopping,
              }}
              isRTL={isRTL}
              totalPrice={totalPrice}
              currency={items[0]?.product.currency || 'EUR'}
              locale={locale}
              isProductsCollapsed={isProductsCollapsed}
              isCartValid={isCartValid}
              validationError={validationError}
              onCheckout={handleCheckout}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CartClient(props: CartClientProps) {
  return (
    <CheckoutProvider>
      <CartClientContent {...props} />
    </CheckoutProvider>
  );
}

