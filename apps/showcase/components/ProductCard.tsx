'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Product } from '@/types/product';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products');
  const locale = useLocale() as 'fr' | 'en' | 'ar';
  const isRTL = locale === 'ar';

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:border-secondary"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-accent/20 cursor-pointer relative">
          <Image
            src={product.image || '/images/placeholder.jpg'}
            alt={product.name[locale]}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
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
            {product.price} {product.currency}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {product.links.amazon && (
            <motion.a
              href={product.links.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-amazon px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amazon-hover"
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
              className="inline-flex items-center gap-1 rounded-md bg-etsy px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-etsy-hover"
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
              className="inline-flex items-center gap-1 rounded-md bg-vinted px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-vinted-hover"
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

