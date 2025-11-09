'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '@/types/product';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { formatPrice } from '@/utils/formatPrice';
import { Button } from '@/components/ui/Button';
import { ButtonSize } from '@/components/ui/button.types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products');
  const locale = useLocale() as 'fr' | 'en' | 'ar';
  const isRTL = locale === 'ar';
  const { addToCart } = useCart();
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-secondary h-full"
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.id}`}>
        <div
          className="aspect-square overflow-hidden bg-accent/20 cursor-pointer relative"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={product.image || '/images/placeholder.jpg'}
            alt={product.name[locale]}
            width={400}
            height={400}
            className="h-full w-full object-cover"
          />

          {/* Price Tooltip on Image Hover */}
          <AnimatePresence>
            {isImageHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-4 z-10 rounded-lg bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-lg`}
              >
                <p className="text-sm font-bold text-primary">
                  {formatPrice(product.price, product.currency, locale)}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Add to Cart Button in Corner */}
          <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} bottom-4 z-10`}>
            <Button
              variant="icon-circle"
              size={ButtonSize.Normal}
              onClick={handleAddToCart}
              isRTL={isRTL}
              aria-label={t('addToCart')}
              className="h-12 w-12"
            >
              {showAddedMessage ? (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-4 sm:p-6" dir={isRTL ? 'rtl' : 'ltr'}>
        <Link href={`/products/${product.id}`}>
          <h3 className="mb-2 text-lg sm:text-xl font-semibold text-primary hover:text-secondary transition-colors cursor-pointer line-clamp-2">
            {product.name[locale]}
          </h3>
        </Link>

        <p className="mb-4 text-sm text-secondary line-clamp-2 min-h-[2.5rem]">
          {product.shortDescription[locale]}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl sm:text-2xl font-bold text-primary">
            {formatPrice(product.price, product.currency, locale)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.links.amazon && (
            <motion.a
              href={product.links.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-amazon px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-amazon-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Amazon
            </motion.a>
          )}
          {product.links.etsy && (
            <motion.a
              href={product.links.etsy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-etsy px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-etsy-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Etsy
            </motion.a>
          )}
          {product.links.vinted && (
            <motion.a
              href={product.links.vinted}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-vinted px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-vinted-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Vinted
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

