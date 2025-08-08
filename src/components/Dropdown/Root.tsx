import * as React from 'react';

import { DropdownCtx } from './context';
import { useOutsideClick } from './helpers';
import type { DropdownContextValue, PendingFocus } from './types';

export const Dropdown = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const itemsRef = React.useRef<HTMLDivElement[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [pendingFocus, setPendingFocus] = React.useState<PendingFocus>(null);
  const menuId = React.useId();

  const registerItem = (el: HTMLDivElement | null) => {
    if (!el) return -1;
    const idx = itemsRef.current.indexOf(el);
    if (idx === -1) itemsRef.current.push(el);

    return itemsRef.current.indexOf(el);
  };

  const focusItem = (i: number) => {
    const clamped = Math.max(0, Math.min(i, itemsRef.current.length - 1));
    const el = itemsRef.current[clamped];
    if (el) {
      el.focus();
      setFocusedIndex(clamped);
    }
  };

  const onItemSelect = () => {
    setOpen(false);
    setFocusedIndex(-1);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useOutsideClick([triggerRef, menuRef], () => setOpen(false));

  const value: DropdownContextValue = {
    open,
    setOpen,
    triggerRef,
    menuRef,
    registerItem,
    focusItem,
    focusedIndex,
    setFocusedIndex,
    onItemSelect,
    menuId,
    pendingFocus,
    setPendingFocus,
  };

  return <DropdownCtx.Provider value={value}>{children}</DropdownCtx.Provider>;
};
