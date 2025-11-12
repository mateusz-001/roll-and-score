import confetti from 'canvas-confetti';
import { useCallback, useMemo } from 'react';

type Direction = 'ltr' | 'rtl' | 'bottom-top';

const COLORS = ['#9B5DE5', '#CDB4DB', '#FDCB6E', '#1F1F1F'];

export const useConfetti = () => {
  const reduced = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  const burst = useCallback(() => {
    if (reduced) return;

    confetti({
      particleCount: 140,
      spread: 120,
      startVelocity: 65,
      gravity: 0.9,
      ticks: 350,
      scalar: 1.1,
      origin: { x: 0.5, y: 0.2 },
      colors: COLORS,
    });
  }, [reduced]);

  const cannonAcrossScreen = useCallback(
    ({
      direction = 'ltr',
      duration = 2800,
      intensity = 2,
    }: {
      direction?: Direction;
      duration?: number;
      intensity?: number;
    } = {}) => {
      if (reduced) return;
      if (typeof window === 'undefined') return;

      const start = performance.now();

      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);

        let originX = t;
        let originY = 0.85;
        let angle = 0;

        if (direction === 'rtl') {
          originX = 1 - t;
          originY = 0.85;
          angle = 180;
        } else if (direction === 'bottom-top') {
          originX = 0.5;
          originY = 1 - t;
          angle = 90;
        }

        for (let i = 0; i < intensity; i++) {
          confetti({
            particleCount: 300,
            startVelocity: 65,
            spread: 40,
            angle,
            gravity: 0.45,
            drift: 0.15,
            ticks: 400,
            scalar: 0.9,
            origin: { x: originX, y: originY },
            colors: COLORS,
          });
        }

        if (t < 1) requestAnimationFrame(step);
        else {
          confetti({
            particleCount: 300,
            spread: 70,
            startVelocity: 30,
            gravity: 0.9,
            ticks: 320,
            origin: { x: originX, y: originY },
            colors: COLORS,
          });
        }
      };

      requestAnimationFrame(step);
    },
    [reduced],
  );

  return { burst, cannonAcrossScreen };
};
