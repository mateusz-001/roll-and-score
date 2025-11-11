import * as React from 'react';

import { cn } from '@/utils';

export type ToggleProps = {
  id?: string;
  name?: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
};

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      id,
      name,
      label,
      hint,
      checked,
      defaultChecked,
      disabled,
      required,
      error,
      onCheckedChange,
      className = '',
    },
    ref,
  ) => {
    const inputId = React.useId();
    const finalId = id ?? `toggle-${inputId}`;
    const hintId = hint ? `${finalId}-hint` : undefined;

    return (
      <label
        htmlFor={finalId}
        className={cn(
          'flex items-start justify-between gap-3 rounded-xl p-3 md:p-4',
          'transition-colors',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
      >
        <input
          ref={ref}
          id={finalId}
          name={name}
          type="checkbox"
          className="sr-only peer"
          aria-describedby={hintId}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={e => onCheckedChange?.(e.target.checked)}
        />

        <span
          aria-hidden
          className={cn(
            'relative inline-flex h-6 w-10 select-none items-center rounded-full',
            'bg-gray transition-colors',
            'peer-checked:bg-primary',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary',
            'peer-checked:[&>span]:translate-x-4',
          )}
        >
          <span className="absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-md transform transition-transform" />
        </span>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-body-base font-medium text-left">{label}</span>
            {required ? (
              <span aria-hidden className="text-red-500">
                *
              </span>
            ) : null}
          </div>
          {hint ? (
            <span id={hintId} className="text-body-xs font-normal italic text-dark-gray text-left">
              {hint}
            </span>
          ) : null}
          {error ? (
            <span className="mt-1 block text-xs text-red-500 text-left">{error}</span>
          ) : null}
        </div>
      </label>
    );
  },
);
