import React, { FocusEventHandler } from 'react';
import { Label, Datepicker as FDatepicker } from 'flowbite-react';
import { FieldErrors } from 'react-hook-form';
import { DatepickerRef } from 'flowbite-react/dist/types/components/Datepicker/Datepicker';

interface InputProps {
  name: string;
  errors?: FieldErrors;
  onChange: (date?: Date) => void;
  onBlur: FocusEventHandler<HTMLInputElement>;
  value?: Date;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Datepicker = React.forwardRef<DatepickerRef, InputProps>(
  (
    {
      errors,
      isRequired,
      name,
      value,
      label,
      placeholder,
      onChange,
      onBlur,
      disabled,
    },
    ref
  ) => {
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
        <FDatepicker
          value={value}
          id={name}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          color={hasError ? 'failure' : undefined}
          helperText={errorMessage ? <>{errorMessage.message}</> : undefined}
          onChange={(date) => onChange(date ?? undefined)}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
        />
      </div>
    );
  }
);
