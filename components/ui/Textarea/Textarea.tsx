import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { Label, Textarea as FTextarea } from 'flowbite-react';
import { FieldErrors } from 'react-hook-form';

interface TextareaProps {
  name: string;
  errors?: FieldErrors;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  value?: string;
  isRequired?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
        <FTextarea
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
          disabled={disabled}
        />
      </div>
    );
  }
);
