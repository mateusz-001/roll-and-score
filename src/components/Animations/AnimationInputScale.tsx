import { motion, type Variants } from 'framer-motion';
import React from 'react';

export const AnimationInputScale: React.FC<React.PropsWithChildren> = ({ children }) => {
  const shell: Variants = {
    initial: { height: 0 },
    animate: { height: 'auto', transition: { duration: 0.18, ease: 'easeOut' } },
    exit: { height: 0, transition: { duration: 0.18, ease: 'easeIn' } },
  };

  const content: Variants = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 420, damping: 28, mass: 0.6, delay: 0.08 },
    },
    exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.12 } },
  };

  return (
    <motion.div
      layout="size"
      variants={shell}
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-hidden"
    >
      <motion.div
        variants={content}
        className="flex items-center gap-3 transform-gpu will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
