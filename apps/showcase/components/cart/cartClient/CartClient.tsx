'use client';

import React from 'react';
import {CheckoutProvider} from '../CheckoutContext';
import {CartClientContent, CartClientProps} from "./CartClientContent";

export default function CartClient(props: CartClientProps) {
  return (
    <CheckoutProvider>
      <CartClientContent {...props} />
    </CheckoutProvider>
  );
}

