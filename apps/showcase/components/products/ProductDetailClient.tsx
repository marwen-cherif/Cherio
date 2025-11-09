'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import ImageCarousel from '@/components/ui/ImageCarousel';
import { formatPrice } from '@/utils/formatPrice';

interface ProductDetailClientProps {
  product: Product;
  locale: 'fr' | 'en' | 'ar';
  isRTL: boolean;
  translations: {
    backToProducts: string;
    description: string;
    availableOn: string;
    addToCart: string;
    addedToCart: string;
    quantity: string;
  };
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const infoVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function ProductDetailClient({
  product,
  locale,
  isRTL,
  translations,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };
  return (
    <div className="py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <svg
              className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>{translations.backToProducts}</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image Carousel */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <ImageCarousel
              mainImage={product.image}
              images={product.images}
              video={product.video}
              productName={product.name[locale]}
              isRTL={isRTL}
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xl sm:text-xl lg:text-2xl font-bold tracking-tight text-primary mb-2"
            >
              {product.name[locale]}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mb-6"
            >
              <span className="text-xl sm:text-xl font-bold text-primary">
                {formatPrice(product.price, product.currency, locale)}
              </span>
            </motion.div>

            {/* Add to Cart Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-3">
                  <label htmlFor="quantity" className="text-sm font-medium text-primary">
                    {translations.quantity}:
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                    className="w-20 rounded-md border border-border px-3 py-2 text-center text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {showAddedMessage ? translations.addedToCart : translations.addToCart}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-lg font-semibold text-primary mb-3">
                {translations.description}
              </h2>
              <p className="text-secondary leading-relaxed text-base sm:text-lg">
                {product.description[locale]}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">
                {translations.availableOn}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.links.amazon && (
                  <motion.a
                    href={product.links.amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-amazon px-2 py-1.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-amazon-hover"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span>Amazon</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                )}
                {product.links.etsy && (
                  <motion.a
                    href={product.links.etsy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-etsy px-2 py-1.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-etsy-hover"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span>Etsy</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                )}
                {product.links.vinted && (
                  <motion.a
                    href={product.links.vinted}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-vinted px-2 py-1.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-vinted-hover"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <span>Vinted</span>
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

