'use client';

import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Link} from '../../../i18n/routing';
import {Button} from '../../ui/Button';
import {ButtonSize} from '../../ui/button.types';
import Image from 'next/image';
import {formatPrice} from '../../../utils/formatPrice';
import {CartItem} from '../../../contexts/CartContext';
import {useTranslations} from 'next-intl';
import {useLocale} from '../../../hooks/useLocale';

export interface CartItemsProps {
    items: CartItem[];
    quantities: Record<string, number>;
    isProductsCollapsed: boolean;
    totalItems: number;
    handleQuantityChange: (productId: string, newQuantity: number) => void;
    handleRemove: (productId: string) => void;
    toggleProductsCollapse: () => void;
}

export function CartItems({
    items,
    quantities,
    isProductsCollapsed,
    totalItems,
    handleQuantityChange,
    handleRemove,
    toggleProductsCollapse,
}: CartItemsProps) {
    const t = useTranslations('cart');
    const {locale, isRTL} = useLocale();
    return (
        <div className="space-y-4">
            {/* Products List Header with Collapse Toggle */}
            {isProductsCollapsed && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    className="rounded-lg border border-border bg-white p-4 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-primary">
                            {t('productsList')} ({totalItems} {totalItems === 1 ? t('product') : t('product') + 's'})
                        </h3>
                        <Button
                            variant="secondary"
                            size={ButtonSize.Small}
                            onClick={toggleProductsCollapse}
                        >
                            {t('expandProducts')}
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Products List */}
            <AnimatePresence>
                {!isProductsCollapsed && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: 'auto'}}
                        exit={{opacity: 0, height: 0}}
                        className="space-y-4"
                    >
                        {items.map((item) => (
                            <motion.div
                                key={item.product.id}
                                initial={{opacity: 0, x: -20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 20}}
                                transition={{duration: 0.3}}
                                className="flex flex-col sm:flex-row gap-4 rounded-lg border border-border bg-white p-4 shadow-sm"
                            >
                                {/* Product Image */}
                                <Link href={`/products/${item.product.id}`}
                                      className="flex-shrink-0">
                                    <div
                                        className="aspect-square w-24 overflow-hidden rounded-lg bg-accent/20">
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
                                <div
                                    className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
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
                                            <label htmlFor={`quantity-${item.product.id}`}
                                                   className="text-sm font-medium text-primary">
                                                {t('quantity')}:
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
                                            aria-label={t('remove')}
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
        </div>
    );
}

