import React from 'react';

import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<Props> = ({ title, description, icon, children, className }) => {
  return (
    <div
      className={`statcard-gradient-border rounded-2xl bg-white/80 border border-transparent px-2 py-2 shadow-md md:py-3 md:px-4 ${className}`}
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
    </div>
  );
};
