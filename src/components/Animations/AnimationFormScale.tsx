import { motion, Variants } from 'framer-motion';
import React from 'react';

export const AnimationFormScale: React.FC<React.PropsWithChildren> = ({ children }) => {
  const formVariants: Variants = {
    initial: { opacity: 0, scale: 0.86 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 360,
        damping: 22,
        mass: 0.7,
        bounce: 0.38,
        velocity: 2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        type: 'spring',
        stiffness: 380,
        damping: 26,
        mass: 0.7,
      },
    },
  };

  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow-card border-2 border-secondary max-w-2xl mx-auto md:p-6 transform-gpu origin-center"
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
