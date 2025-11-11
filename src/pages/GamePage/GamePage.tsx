import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGameStore } from '@/store/gameStore';

import { GamePageContent } from './GamePageContent';

export const GamePage: React.FC = () => {
  const { game } = useGameStore();
  const navigate = useNavigate();

  if (!game) {
    navigate('/');

    return null;
  }

  return <GamePageContent game={game} />;
};
