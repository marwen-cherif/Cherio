'use client';

import React from 'react';
import ReactSelect, { StylesConfig, GroupBase, OptionsOrGroups } from 'react-select';
import { useIsRTL } from '@/hooks/useLocale';
import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>;
  value?: SelectOption | null;
  onChange?: (option: SelectOption | null) => void;
  placeholder?: string;
  isSearchable?: boolean;
  isDisabled?: boolean;
  className?: string;
  error?: boolean;
  isRTL?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  placeholder,
  isSearchable = false,
  isDisabled = false,
  className,
  error = false,
  isRTL: isRTLProp,
}: SelectProps) {
  const isRTL = useIsRTL();
  const finalIsRTL = isRTLProp ?? isRTL;

  const customStyles: StylesConfig<SelectOption, false> = {
    control: (base, state) => ({
      ...base,
      minHeight: '42px',
      borderRadius: '0.375rem',
      borderColor: error
        ? '#ef4444'
        : state.isFocused
        ? 'var(--primary)'
        : 'var(--border)',
      boxShadow: state.isFocused
        ? '0 0 0 1px var(--primary)'
        : 'none',
      backgroundColor: 'var(--white)',
      '&:hover': {
        borderColor: error ? '#ef4444' : 'var(--primary)',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0.5rem 0.75rem',
    }),
    input: (base) => ({
      ...base,
      color: 'var(--primary)',
      margin: 0,
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      color: 'var(--primary)',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'var(--muted)',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? 'var(--white)' : 'var(--primary)',
      backgroundColor: state.isSelected
        ? 'var(--primary)'
        : state.isFocused
        ? 'var(--accent)'
        : 'transparent',
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? 'var(--primary)' : 'var(--accent)',
      },
    }),
  };

  return (
    <ReactSelect<SelectOption, false>
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      isDisabled={isDisabled}
      isRtl={finalIsRTL}
      classNamePrefix="react-select"
      className={cn('react-select-container', error && 'error', className)}
      styles={customStyles}
    />
  );
}

