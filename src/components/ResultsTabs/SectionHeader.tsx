import React from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils';

import { Heading } from '../Heading';

interface SectionHeaderProps {
  label: string;
  score: number;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, score, className }) => {
  const { t } = useTranslation('game');

  return (
    <Heading
      level="h6"
      className={cn(
        'mt-3 mb-3 flex items-center justify-between border-b-2 border-b-gray/50 px-2 pb-3',
        className,
      )}
    >
      {label}
      <span className="flex h-6 items-center justify-center px-1 rounded-sm bg-gray/50 text-sm font-body">
        <strong>
          {score} {t('points')}
        </strong>
      </span>
    </Heading>
  );
};
