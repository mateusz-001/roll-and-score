/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { camelToSnakeCase } from '@/utils';

import { RadioItem } from '../Radio';

interface Props {
  combination: string;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
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
        name="points-combination"
        value={combination}
        label={<div>{t(`combos.${camelToSnakeCase(combination)}` as any)}</div>}
        onCheckedChange={setSelectedCombination}
        checked={selectedCombination === combination}
      />
    </motion.li>
  );
};
