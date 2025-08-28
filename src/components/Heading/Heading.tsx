import React from 'react';

import { HeadingTag } from '@/types';
import { cn } from '@/utils';

interface HeadingProps {
  level: HeadingTag;
  className?: string;
  children: React.ReactNode;
  color?: 'text-dark' | 'text-primary' | 'text-secondary' | 'text-accent';
}

const sizeMap: Record<HeadingTag, string> = {
  h1: 'text-[2.25rem] md:text-[3rem] lg:text-[3.75rem] leading-[2.5rem] md:leading-[3.25rem] lg:leading-[4rem]',
  h2: 'text-[1.875rem] md:text-[2.25rem] lg:text-[2.5rem] leading-[2.25rem] md:leading-[2.5rem] lg:leading-[2.75rem]',
  h3: 'text-[1.5rem] md:text-[1.875rem] lg:text-[2rem] leading-[2rem] md:leading-[2.25rem] lg:leading-[2.5rem]',
  h4: 'text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] leading-[1.75rem] md:leading-[2rem] lg:leading-[2.25rem]',
  h5: 'text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] leading-[1.75rem] md:leading-[1.75rem] lg:leading-[2rem]',
  h6: 'text-[1rem] md:text-[1.125rem] lg:text-[1.25rem] leading-[1.5rem] md:leading-[1.75rem] lg:leading-[1.75rem]',
};

export const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className,
  color = 'text-dark',
}) => {
  const Tag = level;

  return <Tag className={cn('font-heading', sizeMap[level], color, className)}>{children}</Tag>;
};
