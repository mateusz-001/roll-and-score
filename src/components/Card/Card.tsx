import React from 'react';

import { cn } from '@/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: 'primary' | 'secondary' | 'accent' | 'danger' | 'dark-gray' | 'gray';
}

const borderColorMap: Record<NonNullable<CardProps['borderColor']>, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  accent: 'border-accent',
  danger: 'border-red-500',
  'dark-gray': 'border-dark-gray',
  gray: 'border-gray',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  borderColor = 'dark-gray',
}) => (
  <div
    className={cn(
      'rounded-xl md:rounded-2xl border-2 shadow-card overflow-hidden p-3 md:p-4',
      borderColorMap[borderColor],
      className,
    )}
  >
    {children}
  </div>
);
