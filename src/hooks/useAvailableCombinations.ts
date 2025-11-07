import React from 'react';

import { Game } from '@/types/game';
import { AvailableTop, AvailableBottom, evaluateTop, evaluateBottom } from '@/utils';

export type AvailableCombinations = {
  top: AvailableTop[] | [];
  bottom: AvailableBottom[] | [];
};

export function useAvailableCombinations(
  game: Game,
  activePlayerIndex: number,
  dices: (number | null)[],
  isFirstThrow: boolean,
): AvailableCombinations {
  const filtered = dices.filter((d): d is number => d !== null);

  return React.useMemo(() => {
    if (filtered.length !== 5) {
      return { top: [], bottom: [] };
    }

    const player = game.players[activePlayerIndex];

    const top = evaluateTop({
      availableCombinations: player.game.top.combinations,
      dices: filtered,
      currentBonusPoints: player.game.top.bonus || 0,
    });

    const bottom = evaluateBottom({
      availableCombinations: player.game.bottom.combinations,
      dices: filtered,
      isFirstThrow,
    });

    return { top, bottom };
  }, [
    game.players,
    activePlayerIndex,
    isFirstThrow,
    filtered.join(','), // bezpieczny deps od wartości
  ]);
}
