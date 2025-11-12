import { motion, Variants } from 'framer-motion';
import React from 'react';

import { cn } from '@/utils';

interface Props {
  className?: string;
}

export const AnimationStaggerChildren: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const container: Variants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={cn('order-2 z-10 md:order-1', className)}
      variants={container}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};
