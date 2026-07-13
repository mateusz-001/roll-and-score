import { Crown } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

interface Props {
  totalGames: number;
}

export const Header: React.FC<Props> = ({ totalGames }) => {
  const { t } = useTranslation('hof');

  return (
    <header className="pb-3 mb-3 md:pb-4 md:mb-4 border-b-2 border-gray/50">
      <Heading
        level="h2"
        color="text-primary"
        className="flex items-center justify-center mb-3 md:mb-4"
      >
        <Crown className="inline mb-1 mr-2 text-yellow-400" size={28} />
        {t('header')}
      </Heading>
      <Paragraph className="text-center">{t('subtitle')}</Paragraph>
      <Paragraph color="primary" weight="semibold" className="text-center !text-body-sm">
        {t('played_games', { count: totalGames })}
      </Paragraph>
    </header>
  );
};
