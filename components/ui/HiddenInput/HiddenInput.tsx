import React, { ChangeEventHandler, FocusEventHandler } from 'react';
import { TextInput } from 'flowbite-react';

interface HiddenInputProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  value?: string;
}

export const HiddenInput = React.forwardRef<HTMLInputElement, HiddenInputProps>(
  ({ name, value, onChange, onBlur }, ref) => {
    return (
      <div className="hidden">
        <TextInput
          value={value}
          id={name}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
    );
  }
);
