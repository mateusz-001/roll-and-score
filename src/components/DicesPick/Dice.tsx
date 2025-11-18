import React from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils';

import { Paragraph } from '../Paragraph';
import { DICE_ICONS, MAX_DICE_VALUE } from './DicesPick';

interface Props {
  index: number;
  selectedDices: (number | null)[];
  handleSetDices: (diceIndex: number | null, face: number | null) => void;
}

export const Dice: React.FC<Props> = ({ index, selectedDices, handleSetDices }) => {
  const { t } = useTranslation('game');

  return (
    <React.Fragment key={index}>
      <Paragraph size="small" className="italic">
        {t('dice_index', { index: index + 1 })}:
      </Paragraph>
      <div className="flex gap-2 overflow-y-visible px-1 md:gap-3 lg:gap-4">
        {Array.from({ length: MAX_DICE_VALUE }, (_, i) => i + 1).map(face => {
          const DiceIcon = DICE_ICONS[face];
          const isSelected = selectedDices[index] === face;

          return (
            <button
              key={face}
              type="button"
              onClick={() => handleSetDices(index, face)}
              aria-pressed={isSelected}
              aria-label={t('dice_aria_label', { index: index + 1, value: face })}
              className={cn(
                'p-1 rounded-md transition-transform duration-150 md:p-2',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                isSelected ? 'bg-secondary/30 ring-2 ring-primary scale-105' : 'hover:bg-gray/30',
              )}
            >
              <DiceIcon
                className={cn(
                  'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12',
                  isSelected ? 'text-primary' : 'text-black',
                )}
              />
            </button>
          );
        })}
      </div>
    </React.Fragment>
  );
};
