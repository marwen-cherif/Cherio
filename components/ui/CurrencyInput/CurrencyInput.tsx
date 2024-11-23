import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import ReactCurrencyInput from 'react-currency-input-field';
import { Label } from 'flowbite-react';
import { FieldErrors } from 'react-hook-form';
import { Currency } from '../../../prisma/generated/client';
import { useLocale } from 'next-intl';

interface CurrencyInputProps {
  name: string;
  errors?: FieldErrors;
  onValueChange: (
    value: string | undefined,
    name: string | undefined,
    values: any
  ) => void;
  value?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  allowNegativeValue?: boolean;
  currency?: Currency;
}

export const CurrencyInput: FC<CurrencyInputProps> = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(
  (
    {
      errors,
      isRequired,
      name,
      value,
      label,
      placeholder,
      onValueChange,
      isDisabled,
      allowNegativeValue = true,
      currency = Currency.EUR,
    },
    ref
  ) => {
    const locale = useLocale();
    const hasError = !!errors?.[name];
    const errorMessage = errors?.[name];

    return (
      <div className="max-w flex-auto mb-2">
        {label && (
          <div className="mb-2 block">
            <Label
              htmlFor={name}
              color={hasError ? 'failure' : undefined}
              value={label}
            />
          </div>
        )}
        <ReactCurrencyInput
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={value}
          decimalsLimit={2}
          onValueChange={onValueChange}
          className={`border p-2 rounded ${hasError ? 'border-red-500' : ''}`}
          disabled={isDisabled}
          ref={ref}
          allowNegativeValue={allowNegativeValue}
          intlConfig={{ locale, currency }}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-1">
            {errorMessage.message?.toString()}
          </p>
        )}
      </div>
    );
  }
);
