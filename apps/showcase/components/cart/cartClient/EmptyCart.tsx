import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../../i18n/routing';
import { useLocale } from '../../../hooks/useLocale';
import { useTranslations } from 'next-intl';

export const EmptyCart: FC = () => {
  const { isRTL } = useLocale();
  const t = useTranslations('cart');

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
              {t('emptyCart')}
            </h1>
            <p className="text-secondary mb-8">{t('emptyCartDescription')}</p>
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary"
            >
              {t('continueShopping')}
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
