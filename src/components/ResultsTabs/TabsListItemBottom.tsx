/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useTranslation } from 'react-i18next';

import { camelToSnakeCase } from '@/utils';

import { Paragraph } from '../Paragraph';

interface Props {
  label: string;
  combo: {
    isPassed: boolean | null;
    isFirstThrow?: boolean;
    score: number;
  };
  showScore?: boolean;
}

export const TabsListItemBottom: React.FC<Props> = ({ label, combo, showScore }) => {
  const { t } = useTranslation(['results', 'game']);

  const passedLabel = combo.isPassed ? '✅' : '❌';

  return (
    <li className="flex items-center justify-between gap-3 py-2 border-b border-b-gray/50 last:border-b-0">
      <div className="flex items-center gap-2">
        <Paragraph size="small" weight="semibold">
          {t(`game:combos.${camelToSnakeCase(label)}` as any)}
        </Paragraph>
        <span className="text-body-xs">{passedLabel}</span>
      </div>

      {showScore && (
        <Paragraph className="!text-body-xs flex items-center gap-1">
          <span className="flex items-center justify-center h-6 px-1 rounded-sm text-sm bg-green-100 text-green-500">
            <strong>{combo.score}</strong>
          </span>
          {combo.isFirstThrow && (
            <span className="flex items-center justify-center h-6 px-1 rounded-sm text-sm bg-green-100 text-green-500">
              <strong>{t('results:first_throw')}</strong>
            </span>
          )}
        </Paragraph>
      )}
    </li>
  );
};
