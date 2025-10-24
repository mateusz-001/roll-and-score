import * as React from 'react';

import { cn } from '@/utils';

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<'fieldset'>,
  'onChange' | 'children'
> & {
  name: string;
  legend?: string;
  hint?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
  children?: React.ReactNode;
};

export const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ legend, hint, error, orientation = 'vertical', className, children, ...rest }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn(
          'border-0 p-0 m-0 min-w-0',
          orientation === 'vertical' ? 'flex flex-col gap-3' : 'flex flex-row flex-wrap gap-4',
          className,
        )}
        aria-invalid={!!error || undefined}
        {...rest}
      >
        {legend ? (
          <legend className="text-body-lg font-semibold text-dark mb-2 md:mb-3">{legend}</legend>
        ) : null}
        {children}
        {(hint || error) && (
          <div className="mt-1 text-body-sm text-left">
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-dark-gray">{hint}</p>
            )}
          </div>
        )}
      </fieldset>
    );
  },
);
