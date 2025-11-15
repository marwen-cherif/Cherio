'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// UI state only - data is managed by Zustand store
type CheckoutUIState = {
  isProductsCollapsed: boolean;
  isDeliveryCollapsed: boolean;
  showPayment: boolean;
};

type CheckoutUIAction =
  | { type: 'START_CHECKOUT' }
  | { type: 'SHOW_PAYMENT' }
  | { type: 'HIDE_PAYMENT' }
  | { type: 'TOGGLE_PRODUCTS' }
  | { type: 'TOGGLE_DELIVERY' }
  | { type: 'COLLAPSE_DELIVERY' }
  | { type: 'EXPAND_DELIVERY' }
  | { type: 'RESET' };

const checkoutUIReducer = (state: CheckoutUIState, action: CheckoutUIAction): CheckoutUIState => {
  switch (action.type) {
    case 'START_CHECKOUT':
      return {
        ...state,
        isProductsCollapsed: true,
        isDeliveryCollapsed: false,
        showPayment: false,
      };
    case 'SHOW_PAYMENT':
      return {
        ...state,
        isProductsCollapsed: true,
        isDeliveryCollapsed: true,
        showPayment: true,
      };
    case 'HIDE_PAYMENT':
      return {
        ...state,
        showPayment: false,
      };
    case 'TOGGLE_PRODUCTS':
      return {
        ...state,
        isProductsCollapsed: !state.isProductsCollapsed,
      };
    case 'TOGGLE_DELIVERY':
      return {
        ...state,
        isDeliveryCollapsed: !state.isDeliveryCollapsed,
        showPayment: state.isDeliveryCollapsed ? false : state.showPayment,
      };
    case 'COLLAPSE_DELIVERY':
      return {
        ...state,
        isDeliveryCollapsed: true,
        showPayment: false,
      };
    case 'EXPAND_DELIVERY':
      return {
        ...state,
        isDeliveryCollapsed: false,
        showPayment: false,
      };
    case 'RESET':
      return {
        isProductsCollapsed: false,
        isDeliveryCollapsed: false,
        showPayment: false,
      };
    default:
      return state;
  }
};

interface CheckoutContextType {
  uiState: CheckoutUIState;
  startCheckout: () => void;
  showPayment: () => void;
  hidePayment: () => void;
  toggleProducts: () => void;
  toggleDelivery: () => void;
  collapseDelivery: () => void;
  expandDelivery: () => void;
  reset: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [uiState, dispatch] = useReducer(checkoutUIReducer, {
    isProductsCollapsed: false,
    isDeliveryCollapsed: false,
    showPayment: false,
  });

  const startCheckout = () => dispatch({ type: 'START_CHECKOUT' });
  const showPayment = () => dispatch({ type: 'SHOW_PAYMENT' });
  const hidePayment = () => dispatch({ type: 'HIDE_PAYMENT' });
  const toggleProducts = () => dispatch({ type: 'TOGGLE_PRODUCTS' });
  const toggleDelivery = () => dispatch({ type: 'TOGGLE_DELIVERY' });
  const collapseDelivery = () => dispatch({ type: 'COLLAPSE_DELIVERY' });
  const expandDelivery = () => dispatch({ type: 'EXPAND_DELIVERY' });
  const reset = () => dispatch({ type: 'RESET' });

  return (
    <CheckoutContext.Provider
      value={{
        uiState,
        startCheckout,
        showPayment,
        hidePayment,
        toggleProducts,
        toggleDelivery,
        collapseDelivery,
        expandDelivery,
        reset,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}

