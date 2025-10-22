import React from 'react';

import { cn } from '@/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn('px-2.5 py-4 w-full md:mx-auto md:px-4 md:py-6 md:max-w-5xl', className)}>
      {children}
    </div>
  );
};
