import * as React from 'react';

import { cn } from '@/utils';

export type RadioProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'onChange'> & {
  value: string;
  checked?: boolean;
  onCheckedChange?: (value: string) => void;
  label: React.ReactNode;
  caption?: React.ReactNode;
};

export const RadioItem = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { name, value, checked, onCheckedChange, label, caption, disabled, className, ...rest },
    ref,
  ) => {
    const id = React.useId();

    return (
      <label
        htmlFor={id}
        className={cn(
          'relative group flex items-start gap-3 text-sm',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          className,
        )}
      >
        <span
          className={cn(
            'relative mt-[1px] h-5 w-5 shrink-0 rounded-full border-2',
            ' bg-white duration-200',
            checked ? 'border-primary' : 'border-dark-gray',
            'has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-primary/25',
            'transition-colors',
          )}
        >
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={value}
            checked={!!checked}
            onChange={() => onCheckedChange?.(value)}
            disabled={disabled}
            aria-describedby={caption ? `${id}-caption` : undefined}
            className="absolute inset-0 h-full w-full opacity-0"
            {...rest}
          />
          <span className="pointer-events-none absolute inset-0 grid place-items-center">
            <span
              className={cn(
                'h-2.5 w-2.5 rounded-full bg-primary',
                checked ? 'scale-100 opacity-100' : 'scale-10 opacity-0',
                'transition-all duration-200',
              )}
            />
          </span>
        </span>
        <span className="flex flex-col text-left">
          <span className="text-body-base font-medium">{label}</span>
          {caption ? (
            <span id={`${id}-caption`} className="text-body-xs font-normal italic text-dark-gray">
              {caption}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);
