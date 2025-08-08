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
  const {
    open,
    setOpen,
    triggerRef,
    menuRef,
    setFocusedIndex,
    menuId,
    pendingFocus,
    setPendingFocus,
  } = useDropdown();

  // proste pozycjonowanie względem triggera
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

  // focus po otwarciu + intencja z Triggera
  React.useEffect(() => {
    if (!open) return;

    // przejmij fokus na kontener
    menuRef?.current?.focus();

    if (!pendingFocus) return;

    const focusByIntent = () => {
      const items = Array.from(
        menuRef?.current?.querySelectorAll<HTMLDivElement>(
          '[data-rs-menuitem]:not([aria-disabled="true"])',
        ) ?? [],
      );
      if (!items.length) return;
      const index = pendingFocus === 'first' ? 0 : items.length - 1;
      items[index]?.focus();
      setFocusedIndex(index);
      setPendingFocus(null);
    };

    // podwójny rAF, żeby mieć pewność że itemy są zamontowane
    requestAnimationFrame(() => requestAnimationFrame(focusByIntent));
  }, [open, pendingFocus, setPendingFocus, setFocusedIndex, menuRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="dropdown-content"
          ref={menuRef}
          role="menu"
          id={menuId}
          aria-orientation="vertical"
          initial={{ opacity: 0, scale: 0.9, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -15 }}
          transition={{
            opacity: { duration: 0.2, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 500 },
            y: { type: 'spring', stiffness: 500 },
          }}
          style={styles}
          className={cn(
            'z-50 rounded-lg shadow-xl',
            'bg-white border-2 border-primary text-light',
            'p-2 outline-none md:p-2.5',
            className,
          )}
          tabIndex={-1}
          onKeyDown={e => {
            const items = Array.from(
              menuRef?.current?.querySelectorAll<HTMLDivElement>(
                '[data-rs-menuitem]:not([aria-disabled="true"])',
              ) ?? [],
            );
            if (!items.length) return;

            const idxNow = items.findIndex(el => el === document.activeElement);

            const focusAt = (i: number) => {
              const clamped = (i + items.length) % items.length;
              items[clamped]?.focus();
              setFocusedIndex(clamped);
            };

            if (e.key === 'ArrowDown') {
              e.preventDefault();
              focusAt(idxNow < 0 ? 0 : idxNow + 1);
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              focusAt(idxNow < 0 ? items.length - 1 : idxNow - 1);
            }
            if (e.key === 'Home') {
              e.preventDefault();
              focusAt(0);
            }
            if (e.key === 'End') {
              e.preventDefault();
              focusAt(items.length - 1);
            }
            if (e.key === 'Tab') {
              e.preventDefault();
              if (e.shiftKey) focusAt(idxNow < 0 ? items.length - 1 : idxNow - 1);
              else focusAt(idxNow < 0 ? 0 : idxNow + 1);
            }
            if (e.key === 'Escape') {
              e.preventDefault();
              setOpen(false);
              requestAnimationFrame(() => triggerRef?.current?.focus());
            }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
