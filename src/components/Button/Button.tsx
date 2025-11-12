import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useAnimation, type HTMLMotionProps } from 'framer-motion';
import React from 'react';

import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-body font-semibold transition-[background-color,opacity] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed select-none',
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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

type MotionExtras = {
  boopOnTap?: boolean;
  hoverLift?: boolean;
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
};

type AnimatedButtonProps = ButtonProps & HTMLMotionProps<'button'> & MotionExtras;

export const Button = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      disabled,
      boopOnTap = true,
      hoverLift = true,
      spring,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation();

    const stiffness = spring?.stiffness ?? 540;
    const damping = spring?.damping ?? 36;
    const mass = spring?.mass ?? 0.6;

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          className,
          'transform-gpu touch-manipulation',
        )}
        disabled={isLoading || disabled}
        aria-busy={isLoading || undefined}
        aria-live="polite"
        animate={controls}
        whileHover={
          hoverLift
            ? { y: -1, transition: { type: 'spring', duration: 0.6, stiffness, damping, mass } }
            : undefined
        }
        whileTap={{
          scale: 0.8,
          transition: { type: 'spring', duration: 0.6, stiffness, damping, mass },
        }}
        onTap={
          boopOnTap
            ? async () => {
                await controls.start({
                  scale: [0.8, 1.06, 0.85, 1],
                  transition: {
                    type: 'spring',
                    stiffness: 460,
                    damping: 24,
                    mass: 0.7,
                    times: [0, 0.45, 0.75, 1],
                    duration: 0.6,
                  },
                });
              }
            : undefined
        }
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-white/70" />
            <span className="opacity-80">Loading…</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
