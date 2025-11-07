import { Game } from '@/types/game';

export type RankedPlayer = {
  id: number;
  name: string;
  score: number;
  rank: number;
  isTie: boolean;
};

export const buildRankedPlayers = (placement?: Game['placement']): RankedPlayer[] => {
  if (!placement?.length) return [];

  const sortedPlayers = [...placement].sort((a, b) => b.score - a.score);

  const scoreOccurrences = sortedPlayers.reduce<Record<number, number>>((acc, player) => {
    acc[player.score] = (acc[player.score] || 0) + 1;

    return acc;
  }, {});

  let previousScore: number | null = null;
  let previousRank = 0;

  return sortedPlayers.map((player, index) => {
    let rank: number;

    if (index === 0) {
      rank = 1;
    } else if (player.score === previousScore) {
      rank = previousRank;
    } else {
      rank = index + 1;
    }

    previousScore = player.score;
    previousRank = rank;

    return {
      id: player.id,
      name: player.name,
      score: player.score,
      rank,
      isTie: scoreOccurrences[player.score] > 1,
    };
  });
};
