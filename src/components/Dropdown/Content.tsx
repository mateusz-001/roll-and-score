import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/utils';

import { useDropdown } from './context';
import type { Align, Side } from './types';

type ContentProps = {
  children: React.ReactNode;
  className?: string;
  align?: Align;
  side?: Side;
  offset?: number;
};

export function Content({
  children,
  className,
  align = 'start',
  side = 'bottom',
  offset = 6,
}: ContentProps) {
  const { open, setOpen, triggerRef, menuRef, focusItem, setFocusedIndex, menuId } = useDropdown();

  const [styles, setStyles] = React.useState<React.CSSProperties>({});
  React.useLayoutEffect(() => {
    const t = triggerRef?.current,
      m = menuRef?.current;
    if (!t || !m || !open) return;

    const tRect = t.getBoundingClientRect();
    const mRect = m.getBoundingClientRect();

    let top = tRect.bottom + offset + window.scrollY;
    let left = tRect.left + window.scrollX;

    if (side === 'top') top = tRect.top - mRect.height - offset + window.scrollY;
    if (side === 'right') {
      top = tRect.top + window.scrollY;
      left = tRect.right + offset + window.scrollX;
    }
    if (side === 'left') {
      top = tRect.top + window.scrollY;
      left = tRect.left - mRect.width - offset + window.scrollX;
    }

    if (align === 'center') left = left + tRect.width / 2 - mRect.width / 2;
    if (align === 'end') left = left + tRect.width - mRect.width;

    setStyles({ position: 'absolute', top, left, minWidth: tRect.width });
  }, [open, align, side, offset, triggerRef, menuRef]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef?.current?.focus();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusItem(0);
      }
    }
    document.addEventListener('keydown', onKey);

    return () => document.removeEventListener('keydown', onKey);
  }, [open, setOpen, focusItem, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="dropdown-content"
          ref={menuRef}
          role="menu"
          id={menuId}
          aria-orientation="vertical"
          initial={{ opacity: 0, scale: 0.98, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -4 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          style={styles}
          className={cn(
            'z-50 rounded-lg border border-gray bg-white text-text shadow-xl',
            'dark:bg-dark-card dark:text-white dark:border-dark-gray',
            'p-1 outline-none',
            className,
          )}
          tabIndex={-1}
          onKeyDown={e => {
            const container = menuRef?.current!;
            const items = Array.from(
              container.querySelectorAll<HTMLDivElement>(
                '[role="menuitem"]:not([aria-disabled="true"])',
              ),
            );
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const idx = items.findIndex(el => el === document.activeElement);
              const next = idx < items.length - 1 ? idx + 1 : 0;
              (items[next] as HTMLDivElement)?.focus();
              setFocusedIndex(next);
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              const idx = items.findIndex(el => el === document.activeElement);
              const prev = idx > 0 ? idx - 1 : items.length - 1;
              (items[prev] as HTMLDivElement)?.focus();
              setFocusedIndex(prev);
            }
            if (e.key === 'Home') {
              e.preventDefault();
              (items[0] as HTMLDivElement)?.focus();
              setFocusedIndex(0);
            }
            if (e.key === 'End') {
              e.preventDefault();
              (items[items.length - 1] as HTMLDivElement)?.focus();
              setFocusedIndex(items.length - 1);
            }
            if (e.key === 'Tab') setOpen(false);
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
