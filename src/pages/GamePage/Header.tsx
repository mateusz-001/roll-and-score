import React from 'react';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

interface Props {
  currentPlayerName: string | null;
  nextPlayerName: string | null;
  currentRound: number;
}

export const Header: React.FC<Props> = ({ currentPlayerName, nextPlayerName, currentRound }) => {
  return (
    <header>
      <Heading level="h2" className="mb-3 md:mb-4 lg:mb-6">
        <span className="text-primary">{currentPlayerName}!</span>
        <br /> Czas ustrzelić parę punktów
      </Heading>
      <div className="flex max-sm:flex-col sm:gap-1 sm:justify-between">
        <Paragraph size="small">
          Runda:{' '}
          <span className="font-semibold">
            <span className="text-primary">{currentRound}</span> z 15
          </span>
        </Paragraph>
        <Paragraph size="small">
          Przygotuj się: <span className="text-primary font-semibold">{nextPlayerName}</span>
        </Paragraph>
      </div>
    </header>
  );
};
