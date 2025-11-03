import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import React from 'react';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { Toggle } from '@/components/Toggle';
import { cn } from '@/utils/cn';

interface Props {
  selectedDices: (number | null)[];
  handleSetDices: (diceIndex: number | null, face: number | null) => void;
  isFirstThrow: boolean;
  handleToggleFirstThrow: () => void;
}

const DICES_COUNT = 5;
const MAX_DICE_VALUE = 6;
const DICE_ICONS: Record<number, React.FC<{ className?: string }>> = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6,
};

export const DicesPick: React.FC<Props> = ({
  selectedDices,
  handleSetDices,
  isFirstThrow,
  handleToggleFirstThrow,
}) => {
  return (
    <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
      <Heading level="h4" className="text-primary mb-2 md:mb-3">
        Rzut
      </Heading>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="overflow-x-auto pb-2">
          {Array.from({ length: DICES_COUNT }, (_, diceIndex) => (
            <React.Fragment key={diceIndex}>
              <Paragraph size="small" className="italic">
                {diceIndex + 1} kość:
              </Paragraph>
              <div className="flex gap-2 overflow-y-visible md:gap-3 lg:gap-4">
                {Array.from({ length: MAX_DICE_VALUE }, (_, i) => i + 1).map(face => {
                  const DiceIcon = DICE_ICONS[face];
                  const isSelected = selectedDices[diceIndex] === face;

                  return (
                    <button
                      key={face}
                      type="button"
                      onClick={() => handleSetDices(diceIndex, face)}
                      aria-pressed={isSelected}
                      aria-label={`Ustaw kość ${diceIndex + 1} na ${face}`}
                      className={cn(
                        'p-1 rounded-md transition-transform duration-150 md:p-2',
                        'focus:outline-none focus:ring-2 focus:ring-primary',
                        isSelected
                          ? 'bg-secondary/30 ring-2 ring-primary scale-105'
                          : 'hover:bg-gray/30',
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
          ))}
        </div>
        <Toggle
          label="Rzuciłeś z ręki?"
          checked={isFirstThrow}
          className="!p-0"
          onCheckedChange={handleToggleFirstThrow}
        />
      </div>
    </section>
  );
};
