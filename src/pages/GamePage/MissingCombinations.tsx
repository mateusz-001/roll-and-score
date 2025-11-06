import React from 'react';

import { Heading } from '@/components/Heading';
import { BottomKey, TopKey } from '@/types/player';

interface Props {
  availableCombinationsTop?: TopKey[];
  availableCombinationsBottom?: BottomKey[];
}

export const MissingCombinations: React.FC<Props> = ({
  availableCombinationsTop,
  availableCombinationsBottom,
}) => {
  const hasTopAvailable = availableCombinationsTop?.length ?? 0 > 0;
  const hasBottomAvailable = availableCombinationsBottom?.length ?? 0 > 0;

  return (
    <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
      <Heading level="h4" className="text-primary mb-2 md:mb-3">
        Brakuje ci jeszcze:
      </Heading>
      {hasTopAvailable && (
        <>
          <div className="flex items-center justify-between gap-4 mt-0.5 mb-2 md:mb-3">
            <Heading level="h4" className="text-dark">
              Góra
            </Heading>
          </div>
          <ul>
            {availableCombinationsTop?.map(combination => (
              <li key={combination} className="mb-3 last:mb-0">
                {combination.toUpperCase()}
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
            {availableCombinationsBottom?.map(combination => (
              <li key={combination} className="mb-3 last:mb-0">
                {combination.toUpperCase()}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
