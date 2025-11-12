import { motion } from 'framer-motion';
import React from 'react';

import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const StatCard: React.FC<Props> = ({
  title,
  description,
  icon,
  children,
  className,
  delay,
}) => {
  return (
    <motion.div
      className={`statcard-gradient-border rounded-2xl bg-white/80 border border-transparent px-2 py-2 shadow-md md:py-3 md:px-4 ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 120,
          damping: 10,
          mass: 0.8,
          bounce: 0.1,
          delay: delay ?? 0,
          duration: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
      transition={{ delay: delay ?? 0 }}
    >
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="text-lg">{icon}</div>
          <Heading level="h6" color="text-primary">
            {title}
          </Heading>
        </div>
        <Paragraph className="italic !text-body-sm pb-2 md:pb-3 border-b border-gray/50">
          {description}
        </Paragraph>
      </div>
      <div className="mt-3 md:mt-4">{children}</div>
    </motion.div>
  );
};
