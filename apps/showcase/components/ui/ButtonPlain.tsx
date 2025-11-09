'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import {
  BaseButtonProps,
  variantStyles,
  sizeStyles,
  iconSizeStyles,
} from './button.types';

export interface ButtonPlainProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseButtonProps {}

export function ButtonPlain({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isRTL = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}: ButtonPlainProps) {
  const isIconVariant = variant === 'icon' || variant === 'icon-circle';
  const isDisabled = disabled || isLoading;

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  const roundedStyles = variant === 'icon-circle' ? 'rounded-full' : 'rounded-md';
  const sizeClass = isIconVariant ? iconSizeStyles[size] : sizeStyles[size];
  const variantClass = variantStyles[variant];

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
      {!isLoading && leftIcon && <span className={cn(isRTL && 'order-2')}>{leftIcon}</span>}
      {!isLoading && children && (
        <span className={cn(isRTL && leftIcon && 'order-1')}>{children}</span>
      )}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </>
  );

  return (
    <button
      className={cn(
        baseStyles,
        roundedStyles,
        sizeClass,
        variantClass,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {content}
    </button>
  );
}

