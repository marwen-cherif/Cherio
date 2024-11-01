import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { Label, TextInput } from 'flowbite-react';
import { FieldErrors } from 'react-hook-form';

interface InputProps {
  name: string;
  errors?: FieldErrors;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  value?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { errors, isRequired, name, value, label, placeholder, onChange, onBlur },
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
        <TextInput
          value={value}
          id={name}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          color={hasError ? 'failure' : undefined}
          helperText={errorMessage ? <>{errorMessage.message}</> : undefined}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
    );
  }
);
