import * as React from 'react';

export const mergeRefs = <T>(...refs: (React.Ref<T> | undefined)[]) => {
  return (node: T) => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as React.MutableRefObject<T | null>).current = node;
    });
  };
};

export const composeEventHandlers = <E>(
  theirHandler: ((e: E) => void) | undefined,
  ourHandler: (e: E) => void,
) => {
  return (e: E) => {
    theirHandler?.(e);
    // @ts-expect-error ok for DOM events
    if (!e.defaultPrevented) ourHandler(e);
  };
};

export const useOutsideClick = (
  refs: Array<React.RefObject<HTMLElement | null>>,
  handler: () => void,
) => {
  React.useEffect(() => {
    function onDown(e: MouseEvent | PointerEvent) {
      const target = e.target as Node;
      const inside = refs.some(r => r.current && r.current.contains(target));
      if (!inside) handler();
    }
    document.addEventListener('pointerdown', onDown);

    return () => document.removeEventListener('pointerdown', onDown);
  }, [refs, handler]);
};
