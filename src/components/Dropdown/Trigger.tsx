import React from 'react';

import { useDropdown } from './context';
import { composeEventHandlers, mergeRefs } from './helpers';
import { ButtonLikeProps } from './types';

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean };

export function Trigger({ asChild, children, ...props }: TriggerProps) {
  const { open, setOpen, triggerRef, menuId } = useDropdown();

  if (asChild && React.isValidElement<ButtonLikeProps>(children)) {
    const childRef = (children as unknown as { ref?: React.Ref<HTMLButtonElement> }).ref;
    const child = children as React.ReactElement<ButtonLikeProps>;

    return React.cloneElement(child, {
      ...(child.props as Record<string, unknown>),

      ref: mergeRefs(childRef, triggerRef),

      'aria-haspopup': 'menu',
      'aria-expanded': open,
      'aria-controls': open ? menuId : undefined,

      onClick: composeEventHandlers(child.props.onClick, () => {
        setOpen(o => !o);
      }),

      onKeyDown: composeEventHandlers<React.KeyboardEvent<HTMLButtonElement>>(
        child.props.onKeyDown,
        e => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        },
      ),

      type: child.props.type ?? 'button',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  }

  return (
    <button
      {...props}
      ref={triggerRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? menuId : undefined}
      onClick={composeEventHandlers(props.onClick, () => setOpen(o => !o))}
      onKeyDown={composeEventHandlers<React.KeyboardEvent<HTMLButtonElement>>(
        props.onKeyDown,
        e => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(true);
          }
        },
      )}
    >
      {children}
    </button>
  );
}
