import React, { FC } from 'react';
import { Label, Select as FSelect } from 'flowbite-react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

export type SelectOption = { value: string; label: string };

interface SelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  isRequired?: boolean;
  value?: SelectOption;
  onChange?: (option?: SelectOption) => void;
  errors?: FieldErrors;
  control: Control<any>;
}

export const Select: FC<SelectProps> = React.forwardRef<
  HTMLSelectElement,
  SelectProps
>(
  (
    { options, label, name, isRequired, value, onChange, errors, control },
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
              value={label}
              color={hasError ? 'failure' : undefined}
            />
          </div>
        )}

        <Controller
          render={({ field }) => (
            <FSelect
              id={field.name}
              name={field.name}
              required={isRequired}
              onChange={(e) => {
                const selectedOption = options.find(
                  (option) => option.value === e.target.value
                );

                if (onChange) {
                  onChange(selectedOption);
                }

                field.onChange(selectedOption);
              }}
              color={hasError ? 'failure' : undefined}
              helperText={
                errorMessage ? <>{errorMessage.message}</> : undefined
              }
              value={field.value?.value}
              ref={field.ref}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
          )}
          name={name}
          control={control}
        />
      </div>
    );
  }
);
