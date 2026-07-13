// useTurnFlow.ts
import React from 'react';

import { CombinationSelectionMode, Game } from '@/types/game';
import { BottomKey, CombinationKey, TopKey } from '@/types/player';

import type { AvailableCombinations } from './useAvailableCombinations';

interface TurnFlowDeps {
  setTopCell: (
    playerId: number,
    key: TopKey,
    data: { score: number; bonus: number; isPassed: boolean },
  ) => void;
  setBottomCell: (
    playerId: number,
    key: BottomKey,
    data: { score: number; isFirstThrow: boolean; isPassed: boolean },
  ) => void;
  setActivePlayer: (index: number) => void;
  nextRound: () => void;
  finishGame: () => void;
  checkpoint: (why?: 'turn') => void;
}

interface GoToNextArgs {
  selectedCombination: CombinationKey;
  availableCombinations: AvailableCombinations;
  isFirstThrow: boolean;
  selectionMode: CombinationSelectionMode;
}

export function useTurnFlow(game: Game, deps: TurnFlowDeps) {
  const { activePlayer, players, round, maxRounds } = game;
  const playersCount = players.length;
  const hasPlayers = playersCount > 0;

  const isFinalRound = round === maxRounds;
  const hasNextPlayer = activePlayer.index < playersCount - 1;

  const activePlayerData = players[activePlayer.index];

  const goToNext = React.useCallback(
    ({
      selectedCombination,
      availableCombinations,
      isFirstThrow,
      selectionMode,
    }: GoToNextArgs): 'idle' | 'next' | 'finished' => {
      if (!hasPlayers || !selectedCombination) return 'idle';

      const { setTopCell, setBottomCell, setActivePlayer, nextRound, finishGame, checkpoint } =
        deps;
      const { game: activePlayerGame, id: activePlayerId } = activePlayerData;

      const found = [...availableCombinations.top, ...availableCombinations.bottom].find(
        combo => combo.combination === selectedCombination,
      );
      const isSelectedTopCombination = Object.prototype.hasOwnProperty.call(
        activePlayerGame.top.combinations,
        selectedCombination,
      );

      if (selectionMode === 'crossOut') {
        if (isSelectedTopCombination) {
          setTopCell(activePlayerId, selectedCombination as TopKey, {
            score: 0,
            bonus: 0,
            isPassed: false,
          });
        } else {
          setBottomCell(activePlayerId, selectedCombination as BottomKey, {
            score: 0,
            isFirstThrow,
            isPassed: false,
          });
        }
      } else {
        if (!found) {
          console.warn('[Roll&Score] Selected scoring combination is not currently available.');

          return 'idle';
        }

        if ('bonusPoints' in found) {
          setTopCell(activePlayerId, selectedCombination as TopKey, {
            score: found.score,
            bonus: found.bonusPoints ?? 0,
            isPassed: true,
          });
        } else {
          setBottomCell(activePlayerId, selectedCombination as BottomKey, {
            score: found.score,
            isFirstThrow,
            isPassed: true,
          });
        }
      }

      // KONIEC GRY – tylko ostatni gracz w ostatniej rundzie
      if (isFinalRound && !hasNextPlayer) {
        finishGame();

        return 'finished';
      }

      // KOLEJNY GRACZ / RUNDA
      if (!hasNextPlayer) {
        nextRound();
        setActivePlayer(0);
      } else {
        setActivePlayer(activePlayer.index + 1);
      }

      checkpoint('turn');

      return 'next';
    },
    [deps, hasPlayers, activePlayer.index, activePlayerData, hasNextPlayer, isFinalRound],
  );

  return {
    activePlayerData,
    isFinalRound,
    hasNextPlayer,
    goToNext,
  };
}
