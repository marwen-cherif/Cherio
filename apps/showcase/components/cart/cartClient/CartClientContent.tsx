import { useCart } from '../../../contexts/CartContext';
import { useLocale } from '../../../hooks/useLocale';
import React, { useEffect, useState } from 'react';
import { DeliveryType, useClientStore } from '../../../stores/clientStore';
import { useCheckout } from '../CheckoutContext';
import { DeliveryAddress, PickupPoint } from '@shared/types';
import { motion } from 'framer-motion';
import { Button } from '@shared/atoms/Button';
import { ButtonSize } from '@shared/atoms/Button';

import HomeDeliveryForm from '../HomeDeliveryForm';
import PickupPointSelector from '../PickupPointSelector';
import PaymentBlock from '../PaymentBlock';
import OrderSummary from '../summary/OrderSummary';
import { cartSchema } from './CartClientContent.schema';
import { CartItems } from './CartItems';
import { useTranslations } from 'next-intl';
import { HomeSimpleDoor, Shop } from 'iconoir-react';
import { EmptyCart } from './EmptyCart';

export interface CartClientProps {}

export function CartClientContent({}: CartClientProps) {
  const t = useTranslations('cart');
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const { isRTL } = useLocale();
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    items.forEach((item) => {
      initial[item.product.id] = item.quantity;
    });
    return initial;
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const deliveryAddress = useClientStore((state) => state.deliveryAddress);
  const pickupPoint = useClientStore((state) => state.pickupPoint);

  const clearDeliveryInfo = useClientStore((state) => state.clearDeliveryInfo);

  const deliveryType = useClientStore((state) => state.deliveryType);
  const setDeliveryType = useClientStore((state) => state.setDeliveryType);

  const isDeliverySaved = !!(deliveryAddress || pickupPoint);

  const { toggleProducts, toggleDelivery, collapseDelivery, expandDelivery, uiState } =
    useCheckout();

  const prevDeliverySavedRef = React.useRef(isDeliverySaved);
  const hasInitializedCollapseRef = React.useRef(false);

  useEffect(() => {
    if (isDeliverySaved && !prevDeliverySavedRef.current && !hasInitializedCollapseRef.current) {
      toggleProducts();
      hasInitializedCollapseRef.current = true;
    } else if (!isDeliverySaved) {
      hasInitializedCollapseRef.current = false;
    }
    prevDeliverySavedRef.current = isDeliverySaved;
  }, [isDeliverySaved]); // Only depend on isDeliverySaved to avoid loops

  useEffect(() => {
    if (items.length === 0 && isDeliverySaved) {
      clearDeliveryInfo();
    }
  }, [items.length, isDeliverySaved, clearDeliveryInfo]);

  const isProductsCollapsed = isDeliverySaved ? uiState.isProductsCollapsed : false;
  const showPayment = isDeliverySaved;

  const deliveryInitialIsOpen = !isDeliverySaved;

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

  // Validate cart state for button disable
  const isCartValid = items.length > 0;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return <EmptyCart />;
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
            {t('yourCart')} ({totalItems} {totalItems === 1 ? t('product') : t('product') + 's'})
          </h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <CartItems
                items={items}
                quantities={quantities}
                totalItems={totalItems}
                handleQuantityChange={handleQuantityChange}
                handleRemove={handleRemove}
              />

              <div className="space-y-4">
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
                      className="flex-1"
                      icon={<HomeSimpleDoor />}
                    >
                      {t('homeDelivery')}
                    </Button>
                    <Button
                      onClick={handlePickupPoint}
                      variant="secondary"
                      size={ButtonSize.Normal}
                      className="flex-1"
                      icon={<Shop />}
                    >
                      {t('pickupPoint')}
                    </Button>
                  </motion.div>
                )}

                {deliveryType === 'home' && (
                  <HomeDeliveryForm
                    initialData={deliveryAddress}
                    onSave={handleDeliverySave}
                    onCancel={handleCancelDelivery}
                    initialIsOpen={deliveryInitialIsOpen}
                  />
                )}

                {deliveryType === 'pickup' && (
                  <PickupPointSelector
                    initialData={pickupPoint}
                    onSave={handlePickupPointSave}
                    onCancel={handleCancelDelivery}
                    initialIsOpen={deliveryInitialIsOpen}
                  />
                )}
              </div>

              <PaymentBlock />
            </div>

            <OrderSummary
              totalPrice={totalPrice}
              currency={items[0]?.product.currency || 'EUR'}
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
