import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-body font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-button hover:bg-primary/90 focus-visible:ring-primary',
        secondary: 'bg-secondary text-text hover:bg-secondary/80 focus-visible:ring-secondary',
        ghost:
          'bg-transparent text-text border border-gray hover:bg-gray/30 focus-visible:ring-gray',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-lg',
        lg: 'h-12 px-6 text-lg rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? <span className="animate-pulse">...</span> : children}
      </button>
    );
  },
);
Button.displayName = 'Button';
