import { useCallback, useEffect, useState } from 'react';

import { Game } from '@/types/game';
import { Player } from '@/types/player';
import { readHistoryFromStorage } from '@/utils';

type NormalizedPlayer = {
  id: number;
  name: string;
  totalScore: number;
  topScore: number;
  bottomScore: number;
};

type NormalizedGame = {
  id: string | number;
  date: string;
  players: NormalizedPlayer[];
};

type HighestScoreRecord = {
  playerId: number;
  playerName: string;
  score: number;
  gameId: string;
  gameDate: string;
  playersCount: number;
};

type WinningStreakRecord = {
  playerId: number;
  playerName: string;
  streakLength: number;
};

type BalanceRecord = {
  gameId: string;
  gameDate: string;
  scoreDifference: number;
  playersCount: number;
  winnerName: string;
  loserName: string;
};

type SectionKingRecord = {
  playerId: number;
  playerName: string;
  score: number;
  gameId: string;
  gameDate: string;
  playersCount: number;
};

export type HallOfFameStats = {
  highestScoreEver?: HighestScoreRecord;
  longestWinningStreak?: WinningStreakRecord;
  mostBalancedGame?: BalanceRecord;
  mostUnbalancedGame?: BalanceRecord;
  topSectionKing?: SectionKingRecord;
  bottomSectionKing?: SectionKingRecord;
  totalGames: number;
};

const normalizeGame = (game: Game): NormalizedGame | null => {
  if (!game?.players || game.players.length === 0) return null;

  const players: NormalizedPlayer[] = game.players.map((player: Player) => ({
    id: player.id,
    name: player.name,
    totalScore: player.game.overallScore,
    topScore: player.game.top.score,
    bottomScore: player.game.bottom.score,
  }));

  return {
    id: game.id,
    date: game.startedAt,
    players,
  };
};

const loadNormalizedHistory = (): NormalizedGame[] => {
  const history = readHistoryFromStorage();

  if (!Array.isArray(history)) return [];

  return history.map(normalizeGame).filter((game): game is NormalizedGame => Boolean(game));
};

const calculateHighestScoreRecord = (games: NormalizedGame[]): HighestScoreRecord | undefined => {
  let bestRecord: HighestScoreRecord | undefined;

  for (const game of games) {
    for (const player of game.players) {
      const isBetter = !bestRecord || player.totalScore > bestRecord.score;

      if (isBetter) {
        bestRecord = {
          playerId: player.id,
          playerName: player.name,
          score: player.totalScore,
          gameId: game.id as string,
          gameDate: game.date,
          playersCount: game.players.length,
        };
      }
    }
  }

  return bestRecord;
};

const calculateLongestWinningStreak = (
  games: NormalizedGame[],
): WinningStreakRecord | undefined => {
  if (games.length === 0) return undefined;

  const winnerIdsPerGame: number[][] = games.map(game => {
    const highestScore = Math.max(...game.players.map(p => p.totalScore));

    return game.players.filter(p => p.totalScore === highestScore).map(p => p.id);
  });

  type StreakData = { current: number; best: number };
  const streakByPlayerId = new Map<number, StreakData>();

  for (const winnerIds of winnerIdsPerGame) {
    const currentWinners = new Set(winnerIds);

    for (const [playerId, data] of streakByPlayerId.entries()) {
      if (currentWinners.has(playerId)) {
        data.current += 1;
        if (data.current > data.best) data.best = data.current;
      } else {
        data.current = 0;
      }
    }

    for (const winnerId of currentWinners) {
      if (!streakByPlayerId.has(winnerId)) {
        streakByPlayerId.set(winnerId, { current: 1, best: 1 });
      }
    }
  }

  let bestPlayerId: number | undefined;
  let bestStreakLength = 0;

  for (const [playerId, { best }] of streakByPlayerId.entries()) {
    if (best > bestStreakLength) {
      bestStreakLength = best;
      bestPlayerId = playerId;
    }
  }

  if (!bestPlayerId || bestStreakLength <= 1) {
    return undefined;
  }

  const anyGameWithPlayer = games.find(game => game.players.some(p => p.id === bestPlayerId));
  const playerName = anyGameWithPlayer?.players.find(p => p.id === bestPlayerId)?.name ?? 'Unknown';

  return {
    playerId: bestPlayerId,
    playerName,
    streakLength: bestStreakLength,
  };
};

const calculateBalanceRecords = (
  games: NormalizedGame[],
): {
  mostBalancedGame?: BalanceRecord;
  mostUnbalancedGame?: BalanceRecord;
} => {
  let mostBalancedGame: BalanceRecord | undefined;
  let mostUnbalancedGame: BalanceRecord | undefined;

  for (const game of games) {
    if (game.players.length < 2) continue;

    const sortedPlayers = [...game.players].sort((a, b) => b.totalScore - a.totalScore);

    const winner = sortedPlayers[0];
    const loser = sortedPlayers[sortedPlayers.length - 1];
    const scoreDifference = winner.totalScore - loser.totalScore;

    const record: BalanceRecord = {
      gameId: game.id as string,
      gameDate: game.date,
      scoreDifference,
      playersCount: game.players.length,
      winnerName: winner.name,
      loserName: loser.name,
    };

    if (!mostBalancedGame || scoreDifference < mostBalancedGame.scoreDifference) {
      mostBalancedGame = record;
    }

    if (!mostUnbalancedGame || scoreDifference > mostUnbalancedGame.scoreDifference) {
      mostUnbalancedGame = record;
    }
  }

  return { mostBalancedGame, mostUnbalancedGame };
};

const calculateSectionKing = (
  games: NormalizedGame[],
  section: 'top' | 'bottom',
): SectionKingRecord | undefined => {
  let bestRecord: SectionKingRecord | undefined;

  for (const game of games) {
    const playersCount = game.players.length;

    for (const player of game.players) {
      const sectionScore = section === 'top' ? player.topScore : player.bottomScore;

      if (!Number.isFinite(sectionScore)) continue;

      const isBetter = !bestRecord || sectionScore > bestRecord.score;

      if (isBetter) {
        bestRecord = {
          playerId: player.id,
          playerName: player.name,
          score: sectionScore,
          gameId: game.id as string,
          gameDate: game.date,
          playersCount,
        };
      }
    }
  }

  return bestRecord;
};

export const useHallOfFameStats = () => {
  const [stats, setStats] = useState<HallOfFameStats | null>(null);

  const recomputeStats = useCallback(() => {
    const games = loadNormalizedHistory();

    if (games.length === 0) {
      setStats({ totalGames: 0 });

      return;
    }

    const highestScoreEver = calculateHighestScoreRecord(games);
    const longestWinningStreak = calculateLongestWinningStreak(games);
    const { mostBalancedGame, mostUnbalancedGame } = calculateBalanceRecords(games);
    const topSectionKing = calculateSectionKing(games, 'top');
    const bottomSectionKing = calculateSectionKing(games, 'bottom');

    setStats({
      highestScoreEver,
      longestWinningStreak,
      mostBalancedGame,
      mostUnbalancedGame,
      topSectionKing,
      bottomSectionKing,
      totalGames: games.length,
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      recomputeStats();
    }
  }, [recomputeStats]);

  return {
    stats,
    refresh: recomputeStats,
    isEmpty: !stats || stats.totalGames === 0,
  };
};
