'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PaymentBlockProps {
  translations: {
    payment: string;
  };
  isRTL: boolean;
}

export default function PaymentBlock({ translations, isRTL }: PaymentBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-lg border border-border bg-white p-6 shadow-sm"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <h3 className="text-lg font-semibold text-primary mb-4">{translations.payment}</h3>
      
      {/* Payment content will be added here */}
      <div className="text-center py-8 text-secondary">
        <p>Bloc de paiement à implémenter</p>
      </div>
    </motion.div>
  );
}

