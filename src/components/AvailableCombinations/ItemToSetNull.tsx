/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CombinationKey } from '@/types/player';
import { camelToSnakeCase } from '@/utils';

import { RadioItem } from '../Radio';

interface Props {
  combination: CombinationKey;
  selectedCombination: CombinationKey | null;
  setSelectedCombination: (value: CombinationKey | null) => void;
  index: number;
}

export const ItemToSetNull: React.FC<Props> = ({
  combination,
  selectedCombination,
  setSelectedCombination,
  index,
}) => {
  const { t } = useTranslation('game');

  return (
    <motion.li
      key={combination}
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
        className="w-full pr-16"
        name="points-combination"
        value={combination}
        label={
          <div>
            <span>{t(`combos.${camelToSnakeCase(combination)}` as any)}</span>
            <span className="absolute right-0 top-1/2 flex h-6 -translate-y-1/2 items-center rounded-sm bg-red-100 px-1 text-sm text-red-600">
              <strong>0 {t('points')}</strong>
            </span>
          </div>
        }
        onCheckedChange={value => setSelectedCombination(value as CombinationKey)}
        checked={selectedCombination === combination}
      />
    </motion.li>
  );
};
