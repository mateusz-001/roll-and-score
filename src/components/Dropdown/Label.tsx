import * as React from 'react';

import { cn } from '@/utils';

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'px-3 py-2 text-xs font-semibold uppercase tracking-wider text-dark-gray dark:text-gray',
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
