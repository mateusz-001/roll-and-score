import React from 'react';

import { cn } from '@/utils';

type ParagraphTag = 'p' | 'span';
type ParagraphSize = 'small' | 'regular' | 'large';
type ParagraphColor = 'text' | 'primary' | 'secondary' | 'accent' | 'gray' | 'white';
type ParagraphWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface ParagraphProps {
  as?: ParagraphTag;
  size?: ParagraphSize;
  color?: ParagraphColor;
  weight?: ParagraphWeight;
  className?: string;
  children: React.ReactNode;
}

const sizeMap: Record<ParagraphSize, string> = {
  large: 'text-[1.125rem] leading-[1.75rem] md:text-[1.25rem] md:leading-[1.875rem]',
  regular: 'text-[1rem] leading-[1.5rem] md:text-[1.125rem] md:leading-[1.75rem]',
  small: 'text-[0.875rem] leading-[1.25rem] md:text-[1rem] md:leading-[1.5rem]',
};

const colorMap: Record<ParagraphColor, string> = {
  text: 'text-text',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  gray: 'text-gray',
  white: 'text-white',
};

const weightMap: Record<ParagraphWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export const Paragraph: React.FC<ParagraphProps> = ({
  as = 'p',
  size = 'regular',
  color = 'text',
  weight = 'normal',
  className,
  children,
}) => {
  const Tag = as;

  return (
    <Tag className={cn('font-body', sizeMap[size], colorMap[color], weightMap[weight], className)}>
      {children}
    </Tag>
  );
};
