import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGameStore } from '@/store/gameStore';

export const RequireNoGame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const game = useGameStore(s => s.game);
  const hasHydrated = useGameStore(s => s.hasHydrated);
  const loadFromStorage = useGameStore(s => s.loadFromStorage);

  React.useEffect(() => {
    if (!hasHydrated) loadFromStorage();
  }, [hasHydrated, loadFromStorage]);

  React.useEffect(() => {
    if (hasHydrated && game) navigate('/game', { replace: true });
  }, [game, hasHydrated, navigate]);

  if (!hasHydrated || game) return null;

  return <>{children}</>;
};
