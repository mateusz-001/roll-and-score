import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { RadioGroup } from '@/components/Radio';
import { Toggle } from '@/components/Toggle';
import { AvailableCombinations as AvailableCombinationsType } from '@/hooks';

import { ItemBottom } from './ItemBottom';
import { ItemTop } from './ItemTop';
import { ItemToSetNull } from './ItemToSetNull';

interface Props {
  showPoints: boolean;
  bonusPoints: number;
  combinationsCanBeSetToNull: {
    top: string[];
    bottom: string[];
  };
  handleToggleShowPoints: () => void;
  availableCombinations: AvailableCombinationsType;
  hasTopAvailable: boolean;
  hasBottomAvailable: boolean;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
}

export const AvailableCombinations: React.FC<Props> = ({
  showPoints,
  handleToggleShowPoints,
  availableCombinations,
  hasTopAvailable,
  hasBottomAvailable,
  selectedCombination,
  setSelectedCombination,
  bonusPoints,
  combinationsCanBeSetToNull,
}) => {
  return (
    <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
      <Heading level="h4" className="text-primary mb-2 md:mb-3">
        Wybór kombinacji punktowej
      </Heading>
      <Toggle
        label="Pokaż punkty"
        checked={showPoints}
        className="!p-0 mb-4"
        onCheckedChange={handleToggleShowPoints}
      />
      <RadioGroup name="points-combination">
        {hasTopAvailable && (
          <>
            <div className="flex items-center justify-between gap-4 mt-0.5 mb-2 md:mb-3">
              <Heading level="h4" className="text-dark">
                Góra
              </Heading>
              <Paragraph size="small" className="text-sm text-dark">
                Bonus: <span className="text-primary font-semibold">{bonusPoints} pkt</span>
              </Paragraph>
            </div>
            <ul>
              {availableCombinations.top.map((combination, index) => (
                <ItemTop
                  key={combination.combination}
                  combination={combination}
                  selectedCombination={selectedCombination}
                  setSelectedCombination={setSelectedCombination}
                  index={index}
                />
              ))}
            </ul>
          </>
        )}
        {hasBottomAvailable && (
          <>
            <Heading level="h4" className="text-dark mb-1 mt-4 md:mb-3 md:mt-6">
              Dół
            </Heading>
            <ul>
              {availableCombinations.bottom.map((combination, index) => (
                <ItemBottom
                  key={combination.combination}
                  combination={combination}
                  selectedCombination={selectedCombination}
                  setSelectedCombination={setSelectedCombination}
                  showPoints={showPoints}
                  index={index}
                />
              ))}
            </ul>
          </>
        )}
        {!hasTopAvailable && !hasBottomAvailable && (
          <>
            <div className="text-dark mb-1 mt-4 md:mb-3 md:mt-6">
              <Heading level="h4">Brak dostępnych kombinacji</Heading>
              <Paragraph size="small" className="mt-2">
                Wybierz kombinację do wykreślenia
              </Paragraph>
            </div>
            <ul>
              <AnimatePresence>
                {combinationsCanBeSetToNull.bottom.map((combination, index) => (
                  <ItemToSetNull
                    key={combination}
                    combination={combination}
                    selectedCombination={selectedCombination}
                    setSelectedCombination={setSelectedCombination}
                    index={index}
                  />
                ))}
                {combinationsCanBeSetToNull.top.map((combination, index) => (
                  <ItemToSetNull
                    key={combination}
                    combination={combination}
                    selectedCombination={selectedCombination}
                    setSelectedCombination={setSelectedCombination}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </ul>
          </>
        )}
      </RadioGroup>
    </section>
  );
};
