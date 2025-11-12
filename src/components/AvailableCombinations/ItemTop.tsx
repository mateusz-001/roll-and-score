import { motion } from 'framer-motion';
import React from 'react';

import { AvailableTop, cn } from '@/utils';

import { RadioItem } from '../Radio';

interface Props {
  combination: AvailableTop;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
  index: number;
}

export const ItemTop: React.FC<Props> = ({
  combination,
  setSelectedCombination,
  selectedCombination,
  index,
}) => {
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
    </motion.li>
  );
};
