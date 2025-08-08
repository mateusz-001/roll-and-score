import React from 'react';

import { PendingFocus } from './types';

type DropdownContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null> | null;
  menuRef: React.RefObject<HTMLDivElement | null> | null;
  registerItem: (el: HTMLDivElement | null) => number;
  focusItem: (index: number) => void;
  focusedIndex: number;
  setFocusedIndex: (i: number) => void;
  onItemSelect: () => void;
  menuId: string;
  pendingFocus: PendingFocus;
  setPendingFocus: React.Dispatch<React.SetStateAction<PendingFocus>>;
};

export const DropdownCtx = React.createContext<DropdownContextValue | null>(null);

export const useDropdown = () => {
  const ctx = React.useContext(DropdownCtx);
  if (!ctx) throw new Error('Dropdown components must be used within <Dropdown>');

  return ctx;
};
