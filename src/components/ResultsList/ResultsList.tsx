import React from 'react';

import { Game } from '@/types/game';

import { ResultsListItem } from './ResultsListItem';

interface Props {
  items: Game[];
}

export const ResultsList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="flex flex-col gap-4">
      {items.map(game => (
        <ResultsListItem key={game.id} game={game} />
      ))}
    </ul>
  );
};
