import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import React from 'react';

import { Heading } from '@/components/Heading';
import { Toggle } from '@/components/Toggle';

import { Dice } from './Dice';

interface Props {
  selectedDices: (number | null)[];
  handleSetDices: (diceIndex: number | null, face: number | null) => void;
  isFirstThrow: boolean;
  handleToggleFirstThrow: () => void;
}

const DICES_COUNT = 5;
export const MAX_DICE_VALUE = 6;
export const DICE_ICONS: Record<number, React.FC<{ className?: string }>> = {
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
    <section className="overflow-visible p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
      <Heading level="h4" className="text-primary mb-2 md:mb-3">
        Rzut
      </Heading>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="overflow-x-auto pb-2">
          {Array.from({ length: DICES_COUNT }, (_, index) => (
            <Dice
              key={index}
              index={index}
              selectedDices={selectedDices}
              handleSetDices={handleSetDices}
            />
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
