import React from 'react';

import { AvailableBottom, cn } from '@/utils';

import { RadioItem } from '../Radio';

interface Props {
  combination: AvailableBottom;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
  showPoints: boolean;
}

export const ItemBottom: React.FC<Props> = ({
  combination,
  setSelectedCombination,
  selectedCombination,
  showPoints,
}) => {
  return (
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
  );
};
