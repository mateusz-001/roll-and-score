/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@/components/Heading';
import { BottomKey, TopKey } from '@/types/player';
import { camelToSnakeCase } from '@/utils';

interface Props {
  availableCombinationsTop?: TopKey[];
  availableCombinationsBottom?: BottomKey[];
}

export const MissingCombinations: React.FC<Props> = ({
  availableCombinationsTop,
  availableCombinationsBottom,
}) => {
  const { t } = useTranslation('game');

  const hasTopAvailable = availableCombinationsTop?.length ?? 0 > 0;
  const hasBottomAvailable = availableCombinationsBottom?.length ?? 0 > 0;

  return (
    <section className="p-2 rounded-sm border-2 border-primary bg-slate-50 shadow-lg md:p-3">
      <Heading level="h4" className="text-primary mb-2 md:mb-3">
        {t('missing')}:
      </Heading>
      {hasTopAvailable && (
        <>
          <div className="flex items-center justify-between gap-4 mt-0.5 mb-2 md:mb-3">
            <Heading level="h4" className="text-dark">
              {t('top')}
            </Heading>
          </div>
          <ul>
            {availableCombinationsTop?.map(combination => (
              <li key={combination} className="mb-3 last:mb-0">
                {t(`combos.${camelToSnakeCase(combination)}` as any)}
              </li>
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
            {availableCombinationsBottom?.map(combination => (
              <li key={combination} className="mb-3 last:mb-0">
                {t(`combos.${camelToSnakeCase(combination)}` as any)}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
