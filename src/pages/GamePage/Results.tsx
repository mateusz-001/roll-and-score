import React from 'react';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { RadioGroup, RadioItem } from '@/components/Radio';
import { Toggle } from '@/components/Toggle';
import { cn } from '@/utils';

import { AvailableCombinations } from './GamePage';

interface Props {
  showPoints: boolean;
  bonusPoints: number;
  combinationsCanBeSetToNull: {
    top: string[];
    bottom: string[];
  };
  handleToggleShowPoints: () => void;
  availableCombinations: AvailableCombinations;
  hasTopAvailable: boolean;
  hasBottomAvailable: boolean;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
}

export const Results: React.FC<Props> = ({
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
              {availableCombinations.top.map(combination => (
                <li key={combination.combination} className="mb-3 last:mb-0">
                  <RadioItem
                    name="points-combination"
                    value={combination.combination}
                    onCheckedChange={setSelectedCombination}
                    checked={selectedCombination === combination.combination}
                    label={
                      <div>
                        <span>{combination.combination.toUpperCase()}</span>
                        {combination.bonusPoints !== 0 && (
                          <span
                            className={cn(
                              'absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-sm px-1 h-6 rounded-sm',
                              combination.bonusPoints > 0
                                ? 'text-green-500 bg-green-100'
                                : 'text-red-500 bg-red-100',
                            )}
                          >
                            <strong>
                              {combination.bonusPoints > 0
                                ? `+${combination.bonusPoints}`
                                : combination.bonusPoints}
                            </strong>
                          </span>
                        )}
                      </div>
                    }
                  />
                </li>
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
              {availableCombinations.bottom.map(combination => (
                <li key={combination.combination} className="mb-3 last:mb-0">
                  <RadioItem
                    name="points-combination"
                    value={combination.combination}
                    onCheckedChange={setSelectedCombination}
                    checked={selectedCombination === combination.combination}
                    label={
                      <div>
                        <span>{combination.combination.toUpperCase()}</span>
                        {showPoints && (
                          <span
                            className={cn(
                              'absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-sm px-1 h-6 rounded-sm',
                              combination.effectiveValue > 0
                                ? 'text-green-500 bg-green-100'
                                : 'text-red-500 bg-red-100',
                            )}
                          >
                            <strong>
                              {combination.effectiveValue > 0
                                ? `+${combination.effectiveValue}`
                                : combination.effectiveValue}
                            </strong>
                          </span>
                        )}
                      </div>
                    }
                  />
                </li>
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
              {combinationsCanBeSetToNull.bottom.map(combination => (
                <li key={combination} className="mb-3 last:mb-0">
                  <RadioItem
                    name="points-combination"
                    value={combination}
                    label={<div>{combination.toUpperCase()}</div>}
                    onCheckedChange={setSelectedCombination}
                    checked={selectedCombination === combination}
                  />
                </li>
              ))}
              {combinationsCanBeSetToNull.top.map(combination => (
                <li key={combination} className="mb-3 last:mb-0">
                  <RadioItem
                    name="points-combination"
                    value={combination}
                    label={<div>{combination.toUpperCase()}</div>}
                    onCheckedChange={setSelectedCombination}
                    checked={selectedCombination === combination}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </RadioGroup>
    </section>
  );
};
