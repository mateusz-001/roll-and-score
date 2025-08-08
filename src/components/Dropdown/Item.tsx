import * as React from 'react';

import { cn } from '@/utils';

import { useDropdown } from './context';

type ItemProps = {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
};

export function Item({ children, onSelect, disabled, className }: ItemProps) {
  const { registerItem, onItemSelect } = useDropdown();
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    registerItem(ref.current);
  }, [registerItem]);

  return (
    <div
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? undefined : -1}
      aria-disabled={disabled || undefined}
      className={cn(
        'flex cursor-pointer select-none items-center rounded-md px-2 py-1 text-sm text-text font-medium font-body outline-none md:px-3 md:py-2',
        'duration-300 transform-gpu ease-in-out origin-center',
        'focus:bg-primary focus:text-white focus:scale-105 hover:bg-primary hover:text-white hover:scale-105',
        disabled ? 'pointer-events-none opacity-50' : '',
        className,
      )}
      onClick={() => {
        if (disabled) return;
        onSelect?.();
        onItemSelect();
      }}
      onKeyDown={e => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.();
          onItemSelect();
        }
      }}
    >
      {children}
    </div>
  );
}
