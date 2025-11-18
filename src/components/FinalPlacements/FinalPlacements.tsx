import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { useConfetti } from '@/hooks';
import { useGameStore } from '@/store/gameStore';
import { Game } from '@/types/game';
import { buildRankedPlayers } from '@/utils';

import { PlayerListItem } from './PlayerListItem';

interface Props {
  placement?: Game['placement'];
}

export const FinalPlacements: React.FC<Props> = ({ placement }) => {
  const { t } = useTranslation(['game', 'common']);
  const { saveAndReset } = useGameStore();
  const { burst } = useConfetti();

  const rankedPlayers = React.useMemo(() => buildRankedPlayers(placement), [placement]);
  const playersCount = rankedPlayers.length;

  React.useEffect(() => {
    const timer = setTimeout(() => burst(), 300);

    return () => clearTimeout(timer);
  }, [playersCount, burst]);

  if (!rankedPlayers.length) {
    return (
      <div className="flex flex-col items-center gap-3 min-h-full md:gap-4 lg:gap-6">
        <Heading level="h2" className="mb-3 text-center text-primary">
          {t('game:end_of_game')}
        </Heading>
        <Paragraph>{t('game:no_results')}</Paragraph>
        <Button variant="primary" size="lg" onClick={saveAndReset}>
          {t('common:buttons.save_exit')}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 min-h-full md:gap-4 lg:gap-6">
      <header className="text-center">
        <Heading level="h2" className="mb-3 text-primary">
          {t('game:end_of_game')}
        </Heading>
        <Heading level="h4">{t('game:results')}</Heading>
      </header>

      <ul className="w-full max-w-[400px]">
        {rankedPlayers.map((player, index) => (
          <PlayerListItem key={player.id} player={player} index={index} />
        ))}
      </ul>

      <Button className="mt-3 md:mt-4 lg:mt-6" variant="primary" size="lg" onClick={saveAndReset}>
        {t('common:buttons.save_exit')}
      </Button>
    </div>
  );
};
