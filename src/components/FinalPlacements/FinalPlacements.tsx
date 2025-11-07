import React from 'react';

import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { useGameStore } from '@/store/gameStore';
import { Game } from '@/types/game';
import { buildRankedPlayers } from '@/utils';

import { PlayerListItem } from './PlayerListItem';

interface Props {
  placement?: Game['placement'];
}

export const FinalPlacements: React.FC<Props> = ({ placement }) => {
  const { saveAndReset } = useGameStore();

  const rankedPlayers = React.useMemo(() => buildRankedPlayers(placement), [placement]);

  if (!rankedPlayers.length) {
    return (
      <div className="flex flex-col items-center gap-3 min-h-full md:gap-4 lg:gap-6">
        <Heading level="h2" className="mb-3 text-center text-primary">
          Koniec gry!
        </Heading>
        <Paragraph>Brak danych o wynikach.</Paragraph>
        <Button variant="primary" size="lg" onClick={saveAndReset}>
          Zapisz i wyjdź
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 min-h-full md:gap-4 lg:gap-6">
      <header className="text-center">
        <Heading level="h2" className="mb-3 text-primary">
          Koniec gry!
        </Heading>
        <Heading level="h4">Zobacz ostateczne wyniki</Heading>
      </header>

      <ul className="w-full max-w-[400px]">
        {rankedPlayers.map(player => (
          <PlayerListItem key={player.id} player={player} />
        ))}
      </ul>

      <Button className="mt-3 md:mt-4 lg:mt-6" variant="primary" size="lg" onClick={saveAndReset}>
        Zapisz i wyjdź
      </Button>
    </div>
  );
};
