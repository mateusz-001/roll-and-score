import React from 'react';
import { forwardRef, InputHTMLAttributes } from 'react';
import { Controller, type Control } from 'react-hook-form';

import { cn } from '@/utils';

type InputProps = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  rules: Record<string, unknown>;
  label?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'className'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      control,
      label,
      placeholder,
      type = 'text',
      disabled,
      required,
      className,
      rules,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const hasValue = field.value && field.value.length > 0;
          const showRequired = required && !hasValue;
          const floatLabel = isFocused || hasValue;

          return (
            <div className={cn('relative w-full', fieldState.error ? 'mb-5' : '', className)}>
              <input
                {...field}
                {...rest}
                id={name}
                ref={ref}
                type={type}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  field.onBlur();
                }}
                placeholder={placeholder || ''}
                disabled={disabled}
                className={cn(
                  'peer w-full rounded-xl border-2 border-secondary border-gray-300 bg-white px-4 pt-5 pb-2 text-body-base text-black placeholder-transparent',
                  'focus:outline-none focus-visible:border-primary',
                  'transition-colors duration-200',
                  disabled ? 'opacity-50 cursor-not-allowed' : '',
                  fieldState.error ? '!border-red-500' : '',
                )}
              />
              <label
                htmlFor={name}
                className={cn(
                  'absolute left-[18px] transition-all duration-200',
                  floatLabel
                    ? 'text-body-xs top-2'
                    : 'text-body-md top-1/2 transform -translate-y-1/2 opacity-50',
                )}
              >
                {label}
                {showRequired && <span className="text-red-500 font-bold">*</span>}
              </label>
              {fieldState.error && (
                <p className="absolute left-0 -bottom-5 mt-1 text-left ml-2 text-xs text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          );
        }}
      />
    );
  },
);

Input.displayName = 'Input';
