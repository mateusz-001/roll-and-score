import { motion, useReducedMotion, Variants } from 'framer-motion';
import React from 'react';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];

export const PageTransition: React.FC<React.PropsWithChildren> = ({ children }) => {
  const reduced = useReducedMotion();

  const variants: Variants = {
    initial: { opacity: 0, y: reduced ? 0 : 16, filter: 'blur(2px)', scale: 0.995 },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.3, ease: EASE_OUT },
    },
    exit: {
      opacity: 0,
      y: reduced ? 0 : -12,
      filter: 'blur(2px)',
      scale: 0.995,
      transition: { duration: 0.25, ease: EASE_IN },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative h-full"
    >
      {children}
    </motion.div>
  );
};
