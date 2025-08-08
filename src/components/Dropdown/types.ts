import * as React from 'react';

export type Align = 'start' | 'center' | 'end';
export type Side = 'top' | 'right' | 'bottom' | 'left';

export type ButtonLikeProps = React.ComponentPropsWithoutRef<'button'>;

export type PendingFocus = 'first' | 'last' | null;

export type DropdownContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
  registerItem: (el: HTMLDivElement | null) => number;
  focusItem: (index: number) => void;
  focusedIndex: number;
  setFocusedIndex: (i: number) => void;
  onItemSelect: () => void;
  menuId: string;
  pendingFocus: PendingFocus;
  setPendingFocus: React.Dispatch<React.SetStateAction<PendingFocus>>;
};
