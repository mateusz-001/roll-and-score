import React from 'react';

import { useGameStore } from '@/store/gameStore';

import { GamePageContent } from './GamePageContent';

export const GamePage: React.FC = () => {
  const game = useGameStore(state => state.game);

  if (!game) return null;

  return <GamePageContent game={game} />;
};
