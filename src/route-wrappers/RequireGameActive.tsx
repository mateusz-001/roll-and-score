import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGameStore } from '@/store/gameStore';

export const RequireGameActive: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const game = useGameStore(s => s.game);
  const loadFromStorage = useGameStore(s => s.loadFromStorage);

  React.useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  React.useEffect(() => {
    if (!game || game.isFinished) navigate('/', { replace: true });
  }, [game, navigate]);

  if (!game || game.isFinished) return null;

  return <>{children}</>;
};
