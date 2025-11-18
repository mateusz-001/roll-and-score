import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AvailableBottom, camelToSnakeCase, cn } from '@/utils';

import { RadioItem } from '../Radio';

interface Props {
  combination: AvailableBottom;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
  showPoints: boolean;
  index: number;
}

export const ItemBottom: React.FC<Props> = ({
  combination,
  setSelectedCombination,
  selectedCombination,
  showPoints,
  index,
}) => {
  const { t } = useTranslation('game');

  return (
    <motion.li
      key={combination.combination}
      className="mb-3 last:mb-0"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{
        delay: index * 0.1,
        ease: 'easeInOut',
        duration: 0.2,
      }}
    >
      <RadioItem
        name="points-combination"
        value={combination.combination}
        onCheckedChange={setSelectedCombination}
        checked={selectedCombination === combination.combination}
        label={
          <div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <span>{t(`combos.${camelToSnakeCase(combination.combination)}` as any)}</span>
            <AnimatePresence>
              {showPoints && (
                <motion.span
                  className={cn(
                    'absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-sm px-1 h-6 rounded-sm',
                    combination.effectiveValue > 0
                      ? 'text-green-500 bg-green-100'
                      : 'text-red-500 bg-red-100',
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0 }}
                >
                  <strong>
                    {combination.effectiveValue > 0
                      ? `+${combination.effectiveValue}`
                      : combination.effectiveValue}
                  </strong>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        }
      />
    </motion.li>
  );
};
