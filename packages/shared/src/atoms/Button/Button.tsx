'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import {
  BaseButtonProps,
  ButtonSize,
  variantStyles,
  sizeStyles,
  iconSizeStyles,
  defaultButtonVariants,
  iconButtonVariants,
} from './button.types';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'size' | 'children'>,
    BaseButtonProps {
  asChild?: boolean;
}

export function Button({
  variant = 'primary',
  size = ButtonSize.Normal,
  isLoading = false,
  isRTL = false,
  leftIcon,
  rightIcon,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isIconVariant = variant === 'icon' || variant === 'icon-circle';
  const isDisabled = disabled || isLoading;

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const roundedStyles = variant === 'icon-circle' ? 'rounded-full' : 'rounded-md';
  const sizeClass = isIconVariant ? iconSizeStyles[size] : sizeStyles[size];
  const variantClass = variantStyles[variant];

  const buttonVariants = isIconVariant ? iconButtonVariants : defaultButtonVariants;

  // Determine icon to display: prioritize icon prop, fallback to leftIcon/rightIcon for backward compatibility
  const iconToShow = icon || leftIcon || rightIcon;
  const showIconLeft = icon ? iconPosition === 'left' : !!leftIcon;
  const showIconRight = icon ? iconPosition === 'right' : !!rightIcon;

  const content = (
    <>
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && iconToShow && showIconLeft && (
        <span className={isRTL ? 'order-2' : ''}>{iconToShow}</span>
      )}
      {!isLoading && children && (
        <span className={isRTL && showIconLeft ? 'order-1' : ''}>{children}</span>
      )}
      {!isLoading && iconToShow && showIconRight && <span>{iconToShow}</span>}
    </>
  );

  return (
    <motion.button
      className={cn(baseStyles, roundedStyles, sizeClass, variantClass, className)}
      disabled={isDisabled}
      variants={buttonVariants}
      whileHover={!isDisabled ? 'hover' : undefined}
      whileTap={!isDisabled ? 'tap' : undefined}
      {...props}
    >
      {content}
    </motion.button>
  );
}
