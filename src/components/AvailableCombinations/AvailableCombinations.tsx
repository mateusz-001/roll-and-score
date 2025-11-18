import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('game');

  return (
    <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
      <Heading level="h4" className="text-primary mb-2 md:mb-3">
        {t('choose_combination')}
      </Heading>
      <Toggle
        label={t('show_points')}
        checked={showPoints}
        className="!p-0 mb-4"
        onCheckedChange={handleToggleShowPoints}
      />
      <RadioGroup name="points-combination">
        {hasTopAvailable && (
          <>
            <div className="flex items-center justify-between gap-4 mt-0.5 mb-2 md:mb-3">
              <Heading level="h4" className="text-dark">
                {t('top')}
              </Heading>
              <Paragraph size="small" className="text-sm text-dark">
                {t('bonus')}:{' '}
                <span className="text-primary font-semibold">
                  {bonusPoints} {t('points')}
                </span>
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
              {t('bottom')}
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
              <Heading level="h4">{t('no_combinations')}</Heading>
              <Paragraph size="small" className="mt-2">
                {t('choose_to_set_null')}
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
