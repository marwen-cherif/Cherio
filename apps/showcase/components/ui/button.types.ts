import React from 'react';

export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'icon'
  | 'icon-circle'
  | 'amazon'
  | 'etsy'
  | 'vinted';

export enum ButtonSize {
  Small = 'small',
  Normal = 'normal',
  Big = 'big',
}

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isRTL?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  secondary: 'bg-secondary text-white hover:bg-primary',
  ghost: 'bg-transparent text-secondary hover:bg-accent/30 hover:text-primary',
  outline: 'border border-border bg-transparent text-primary hover:bg-accent/30 hover:border-secondary',
  icon: 'bg-transparent text-secondary hover:text-primary p-2',
  'icon-circle': 'rounded-full bg-primary text-white hover:bg-secondary shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2',
  amazon: 'bg-amazon text-white hover:bg-amazon-hover',
  etsy: 'bg-etsy text-white hover:bg-etsy-hover',
  vinted: 'bg-vinted text-white hover:bg-vinted-hover',
};

export const sizeStyles: Record<ButtonSize, string> = {
  [ButtonSize.Small]: 'px-3 py-1.5 text-xs',
  [ButtonSize.Normal]: 'px-6 py-3 text-base',
  [ButtonSize.Big]: 'px-8 py-4 text-lg',
};

export const iconSizeStyles: Record<ButtonSize, string> = {
  [ButtonSize.Small]: 'p-1.5',
  [ButtonSize.Normal]: 'p-3',
  [ButtonSize.Big]: 'p-4',
};

export const defaultButtonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const iconButtonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

