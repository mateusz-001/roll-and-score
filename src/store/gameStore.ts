import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Game } from '@/types/game';
import { BottomCombination, BottomKey, TopCombination, TopKey } from '@/types/player';
import { Throw } from '@/types/throw';
import {
  createEmptyBottom,
  createEmptyTop,
  nowISO,
  readCurrentGameFromStorage,
  readHistoryFromStorage,
  recalcOverall,
  STORAGE,
  writeCurrentGameToStorage,
  writeHistoryToStorage,
} from '@/utils';

type CheckpointReason = 'registration' | 'turn' | 'round' | 'manual' | 'unload' | 'finish';

type GameState = {
  game: Game | null;
  hasHydrated: boolean;
  lastThrows: Throw[];
};

type GameActions = {
  initializeGame: (players: { id: number; name: string }[]) => void;
  loadFromStorage: () => void;
  resetGame: () => boolean;
  nextRound: () => void;
  finishGame: () => void;
  saveAndReset: () => boolean;
  setActivePlayer: (index: number) => void;
  checkpoint: (why?: CheckpointReason) => void;

  setTopCell: (
    playerId: number,
    key: TopKey,
    data: Partial<TopCombination> & { score?: number },
  ) => void;
  setBottomCell: (
    playerId: number,
    key: BottomKey,
    data: Partial<BottomCombination> & { score?: number },
  ) => void;
};

export const useGameStore = create<GameState & GameActions>()(
  immer((set, get) => ({
    game: null,
    hasHydrated: false,
    lastThrows: [],

    initializeGame(players) {
      const newGame: Game = {
        id: uuidv4(),
        players: players.map(player => ({
          id: player.id,
          name: player.name,
          game: {
            top: createEmptyTop(),
            bottom: createEmptyBottom(),
            overallScore: 0,
          },
        })),
        placement: [],
        round: 1,
        activePlayer: { ...players[0], index: 0 },
        maxRounds: 15,
        isFinished: false,
        startedAt: nowISO(),
        endedAt: null,
      };

      set(state => {
        state.game = newGame;
        state.hasHydrated = true;
        state.lastThrows = [];
      });

      get().checkpoint('registration');
    },

    loadFromStorage() {
      try {
        const savedGame = readCurrentGameFromStorage(STORAGE.currentGame);

        set(state => {
          state.game = savedGame;
          state.hasHydrated = true;
        });
      } catch (error) {
        console.warn('Failed to load game from localStorage:', error);
        set(state => {
          state.game = null;
          state.hasHydrated = true;
        });
      }
    },

    setActivePlayer(index: number) {
      set(state => {
        if (!state.game) return;
        const player = state.game.players[index];
        if (!player) return;

        state.game.activePlayer = {
          id: player.id,
          name: player.name,
          index: index,
        };
      });
    },

    resetGame() {
      try {
        localStorage.removeItem(STORAGE.currentGame);
      } catch (error) {
        console.error('Failed to clear current game data:', error);

        return false;
      }

      set(state => {
        state.game = null;
        state.hasHydrated = true;
        state.lastThrows = [];
      });

      return true;
    },

    nextRound() {
      set(state => {
        if (!state.game || state.game.isFinished) return;
        state.game.round += 1;
      });
    },

    finishGame() {
      set(state => {
        const currentGame = state.game;
        if (!currentGame) return;

        currentGame.endedAt = nowISO();
        currentGame.isFinished = true;

        const sortedPlayers = [...currentGame.players].sort(
          (a, b) => b.game.overallScore - a.game.overallScore || a.name.localeCompare(b.name),
        );

        currentGame.placement = sortedPlayers.map(player => ({
          id: player.id,
          name: player.name,
          score: player.game.overallScore,
        }));
      });

      get().checkpoint('finish');
    },

    saveAndReset() {
      const currentGame = get().game;
      if (!currentGame) return false;

      const finishedGame = {
        ...currentGame,
        endedAt: currentGame.endedAt ?? nowISO(),
        isFinished: true,
      };

      try {
        const historyWithoutDuplicates = readHistoryFromStorage().filter(
          game => game.id !== finishedGame.id,
        );

        historyWithoutDuplicates.unshift(finishedGame);
        writeHistoryToStorage(historyWithoutDuplicates);
        localStorage.removeItem(STORAGE.currentGame);
      } catch (error) {
        console.error('❌ Saving game history failed:', error);

        return false;
      }

      set(state => {
        state.game = null;
        state.hasHydrated = true;
        state.lastThrows = [];
      });

      return true;
    },

    setTopCell(playerId, key, data) {
      set((state: GameState) => {
        const game = state.game;
        if (!game || game.isFinished) return;

        const player = game.players.find(p => p.id === playerId);

        if (!player) return;

        const cell = player.game.top.combinations[key];
        Object.assign(cell, data);
        recalcOverall(player);
      });
    },

    setBottomCell(playerId, key, data) {
      set((state: GameState) => {
        const game = state.game;
        if (!game || game.isFinished) return;

        const player = game.players.find(p => p.id === playerId);
        if (!player) return;

        const cell = player.game.bottom.combinations[key];
        Object.assign(cell, data);
        recalcOverall(player);
      });
    },

    checkpoint(why = 'manual') {
      const game = get().game;
      if (!game) return;

      try {
        writeCurrentGameToStorage(STORAGE.currentGame, game);
      } catch (error) {
        console.error(`Failed to save checkpoint (${why})`, error);
      }
    },
  })),
);
