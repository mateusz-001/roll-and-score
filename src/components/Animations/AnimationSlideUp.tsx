import { motion, Variants } from 'framer-motion';
import React from 'react';

interface Props {
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
}

export const AnimationSlideUp: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  y = 14,
  duration = 0.4,
  delay = 0,
}) => {
  const item: Variants = {
    initial: { opacity: 0, y, filter: 'blur(2px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};
