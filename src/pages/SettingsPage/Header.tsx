import React from 'react';
import { useTranslation } from 'react-i18next';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

export const Header: React.FC = () => {
  const { t } = useTranslation('settings');

  return (
    <header>
      <Heading level="h2" color="text-primary" className="text-center mb-3 md:mb-4">
        {t('header')}
      </Heading>
      <Paragraph className="text-center">{t('description')}</Paragraph>
    </header>
  );
};
