import { motion, useAnimation } from 'framer-motion';
import React from 'react';

export const AnimationDiceSpring: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dice = useAnimation();

  React.useEffect(() => {
    (async () => {
      await dice.start({
        scale: 1,
        opacity: 1,
        rotate: 0,
        transition: {
          type: 'spring',
          stiffness: 340,
          damping: 16,
          mass: 0.7,
          velocity: 2,
          bounce: 0.45,
          duration: 0.6,
          delay: 0.2,
        },
      });

      await dice.start({
        scale: [1, 1.08, 0.98, 1.02, 1],
        rotate: [0, -8, 4, -2, 0],
        transition: {
          duration: 1.1,
          times: [0, 0.22, 0.5, 0.78, 1],
          ease: 'easeOut',
        },
        transformOrigin: '70% 80%',
      });
    })();
  }, [dice]);

  return (
    <motion.div
      className="absolute right-0 -bottom-28 max-w-md order-1 sm:-bottom-3/4 md:order-2 md:-bottom-1/2 xl:right-18"
      initial={{ scale: 0, opacity: 0, rotate: -6 }}
      animate={dice}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};
