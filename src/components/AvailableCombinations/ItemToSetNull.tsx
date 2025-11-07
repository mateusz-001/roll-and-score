import React from 'react';

import { RadioItem } from '../Radio';

interface Props {
  combination: string;
  selectedCombination: string | null;
  setSelectedCombination: (value: string | null) => void;
}

export const ItemToSetNull: React.FC<Props> = ({
  combination,
  selectedCombination,
  setSelectedCombination,
}) => {
  return (
    <li key={combination} className="mb-3 last:mb-0">
      <RadioItem
        name="points-combination"
        value={combination}
        label={<div>{combination.toUpperCase()}</div>}
        onCheckedChange={setSelectedCombination}
        checked={selectedCombination === combination}
      />
    </li>
  );
};
