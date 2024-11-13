import React, { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { Label, FileInput as FFileInput } from 'flowbite-react';
import { FieldErrors } from 'react-hook-form';

interface FileInputProps {
  name: string;
  errors?: FieldErrors;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  isMultiple?: boolean;
  isRequired?: boolean;
}

export const FileInput: FC<FileInputProps> = ({
  onChange,
  onBlur,
  name,
  label,
  isMultiple = true,
  errors,
  isRequired = false,
}) => {
  const hasError = !!errors?.[name];
  const errorMessage = errors?.[name];

  return (
    <div className="mb-4">
      {label && (
        <div>
          <Label htmlFor={name} value={label} />
        </div>
      )}
      <FFileInput
        onChange={onChange}
        onBlur={onBlur}
        id={name}
        name={name}
        multiple={isMultiple}
        required={isRequired}
        color={hasError ? 'failure' : undefined}
        helperText={errorMessage ? <>{errorMessage.message}</> : undefined}
      />
    </div>
  );
};
