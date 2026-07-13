import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { RadioGroup } from '@/components/Radio';
import { Toggle } from '@/components/Toggle';
import { AvailableCombinations as AvailableCombinationsType } from '@/hooks';
import type { CombinationSelectionMode } from '@/types/game';
import type { BottomKey, CombinationKey, TopKey } from '@/types/player';

import { CombinationModeTabs } from './CombinationModeTabs';
import { ItemBottom } from './ItemBottom';
import { ItemTop } from './ItemTop';
import { ItemToSetNull } from './ItemToSetNull';

interface Props {
  showPoints: boolean;
  bonusPoints: number;
  combinationsCanBeSetToNull: {
    top: TopKey[];
    bottom: BottomKey[];
  };
  handleToggleShowPoints: () => void;
  availableCombinations: AvailableCombinationsType;
  hasTopAvailable: boolean;
  hasBottomAvailable: boolean;
  selectionMode: CombinationSelectionMode;
  onSelectionModeChange: (value: CombinationSelectionMode) => void;
  selectedCombination: CombinationKey | null;
  setSelectedCombination: (value: CombinationKey | null) => void;
}

export const AvailableCombinations: React.FC<Props> = ({
  showPoints,
  handleToggleShowPoints,
  availableCombinations,
  hasTopAvailable,
  hasBottomAvailable,
  selectionMode,
  onSelectionModeChange,
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
      <CombinationModeTabs value={selectionMode} onChange={onSelectionModeChange} />

      <AnimatePresence mode="popLayout" initial={false}>
        {selectionMode === 'score' ? (
          <motion.div
            key="score"
            id="combination-panel-score"
            role="tabpanel"
            aria-labelledby="combination-tab-score"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <RadioGroup name="points-combination-score">
              {hasTopAvailable ? (
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
              ) : null}

              {hasBottomAvailable ? (
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
              ) : null}

              {!hasTopAvailable && !hasBottomAvailable ? (
                <div className="rounded-sm border border-secondary/70 bg-secondary/15 p-3">
                  <Heading level="h5">{t('no_combinations')}</Heading>
                  <Paragraph size="small" className="mt-1">
                    {t('score_mode_empty', { defaultValue: t('no_combinations') })}
                  </Paragraph>
                </div>
              ) : null}
            </RadioGroup>
          </motion.div>
        ) : (
          <motion.div
            key="crossOut"
            id="combination-panel-crossOut"
            role="tabpanel"
            aria-labelledby="combination-tab-crossOut"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Paragraph size="small" className="mb-3 rounded-sm bg-red-50 p-2 !text-red-700">
              {t('cross_out_hint')}
            </Paragraph>
            <RadioGroup name="points-combination-cross-out">
              {combinationsCanBeSetToNull.top.length > 0 ? (
                <>
                  <Heading level="h4" className="text-dark mb-2 md:mb-3">
                    {t('top')}
                  </Heading>
                  <ul>
                    {combinationsCanBeSetToNull.top.map((combination, index) => (
                      <ItemToSetNull
                        key={combination}
                        combination={combination}
                        selectedCombination={selectedCombination}
                        setSelectedCombination={setSelectedCombination}
                        index={index}
                      />
                    ))}
                  </ul>
                </>
              ) : null}

              {combinationsCanBeSetToNull.bottom.length > 0 ? (
                <>
                  <Heading level="h4" className="text-dark mb-2 mt-4 md:mb-3 md:mt-6">
                    {t('bottom')}
                  </Heading>
                  <ul>
                    {combinationsCanBeSetToNull.bottom.map((combination, index) => (
                      <ItemToSetNull
                        key={combination}
                        combination={combination}
                        selectedCombination={selectedCombination}
                        setSelectedCombination={setSelectedCombination}
                        index={index}
                      />
                    ))}
                  </ul>
                </>
              ) : null}
            </RadioGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
