import { Game } from '@/types/game';
import { BottomKey, TopKey } from '@/types/player';

interface Params {
  playerId: number;
  game: Game;
}

type CombinationKey = TopKey | BottomKey;

export const findCanBeSetToNull = ({ playerId, game }: Params) => {
  const topCombinations = game.players.find(p => p.id === playerId)?.game.top.combinations;
  const bottomCombinations = game.players.find(p => p.id === playerId)?.game.bottom.combinations;

  let topCombinationsCanBeSetToNull: TopKey[] = [];
  let bottomCombinationsCanBeSetToNull: BottomKey[] = [];

  for (const key in topCombinations) {
    const combinationKey = key as CombinationKey;
    if (topCombinations[combinationKey as TopKey].isPassed === null) {
      topCombinationsCanBeSetToNull.push(combinationKey as TopKey);
    }
  }

  for (const key in bottomCombinations) {
    const combinationKey = key as CombinationKey;
    if (bottomCombinations[combinationKey as BottomKey].isPassed === null) {
      bottomCombinationsCanBeSetToNull.push(combinationKey as BottomKey);
    }
  }

  return {
    top: topCombinationsCanBeSetToNull,
    bottom: bottomCombinationsCanBeSetToNull,
  };
};
