'use client';

import React from 'react';
import ReactPhoneInput from 'react-phone-number-input';
import { useIsRTL } from '@/hooks/useLocale';
import { cn } from '@/utils/cn';
import 'react-phone-number-input/style.css';

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  defaultCountry?: string;
  international?: boolean;
  className?: string;
  error?: boolean;
  isRTL?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function PhoneInput({
  value,
  onChange,
  defaultCountry = 'FR',
  international = true,
  className,
  error = false,
  isRTL: isRTLProp,
  disabled = false,
  placeholder,
}: PhoneInputProps) {
  const isRTL = useIsRTL();
  const finalIsRTL = isRTLProp ?? isRTL;

  return (
    <div
      dir={finalIsRTL ? 'rtl' : 'ltr'}
      className={cn('phone-input', error && 'error', className)}
    >
      <ReactPhoneInput
        value={value}
        onChange={onChange}
        international={international}
        defaultCountry={defaultCountry as any}
        disabled={disabled}
        placeholder={placeholder}
        numberInputProps={{
          className: 'phone-input-number',
        }}
        style={{
          '--PhoneInputCountryFlag-height': '1.5em',
          '--PhoneInputCountryFlag-width': '2em',
        } as React.CSSProperties}
      />
    </div>
  );
}

