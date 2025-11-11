import React from 'react';

import { cn } from '@/utils';

import { Paragraph } from '../Paragraph';

interface Props {
  label: string;
  combo: {
    isPassed: boolean | null;
    bonus: number;
    score: number;
  };
  showBonus?: boolean;
}

export const TabsListItemTop: React.FC<Props> = ({ label, combo, showBonus }) => {
  const hasBonusPositive = combo.bonus && combo.bonus > 0;
  const passedLabel = combo.isPassed ? '✅' : '❌';

  return (
    <li className="flex items-center justify-between gap-3 py-2 border-b border-b-gray/50 last:border-b-0">
      <div className="flex items-center gap-2">
        <Paragraph size="small" weight="semibold" className="capitalize">
          {label}
        </Paragraph>
        <span className="text-body-xs">{passedLabel}</span>
      </div>

      {showBonus && (
        <span
          className={cn(
            'flex items-center justify-center h-6 px-1 rounded-sm text-sm',
            hasBonusPositive ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500',
          )}
        >
          <strong>{hasBonusPositive ? `+${combo.bonus}` : combo.bonus}</strong>
        </span>
      )}
    </li>
  );
};
