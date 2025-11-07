import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { Game } from '@/types/game';
import { BottomCombination, BottomKey, TopCombination, TopKey } from '@/types/player';
import { Throw } from '@/types/throw';
import { createEmptyBottom, createEmptyTop, nowISO, recalcOverall, STORAGE } from '@/utils';

type CheckpointReason = 'registration' | 'turn' | 'round' | 'manual' | 'unload' | 'finish';

type GameState = {
  game: Game | null;
  lastThrows: Throw[];
};

type GameActions = {
  initializeGame: (players: { id: number; name: string }[]) => void;
  loadFromStorage: () => void;
  resetGame: () => void;
  nextRound: () => void;
  finishGame: () => void;
  saveAndReset: () => void;
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
        round: 15,
        activePlayer: { ...players[0], index: 0 },
        maxRounds: 15,
        isFinished: false,
        startedAt: nowISO(),
        endedAt: null,
      };

      set(state => {
        state.game = newGame;
        state.lastThrows = [];
      });

      get().checkpoint('registration');
    },

    loadFromStorage() {
      try {
        const savedData = localStorage.getItem(STORAGE.currentGame);
        if (!savedData) return;

        const parsedGame: Game = JSON.parse(savedData);
        set(state => {
          state.game = parsedGame;
        });
      } catch (error) {
        console.warn('Failed to load game from localStorage:', error);
      }
    },

    setActivePlayer(index: number) {
      set(state => {
        if (!state.game) return;

        state.game.activePlayer = {
          id: state.game.players[index].id,
          name: state.game.players[index].name,
          index: index,
        };
      });
    },

    resetGame() {
      set(state => {
        state.game = null;
        state.lastThrows = [];
      });
      localStorage.removeItem(STORAGE.currentGame);
    },

    nextRound() {
      set(state => {
        if (!state.game || state.game.isFinished) return;
        state.game.round += 1;
      });

      get().checkpoint('round');
    },

    finishGame() {
      set(state => {
        const currentGame = state.game;
        if (!currentGame) return;

        currentGame.endedAt = nowISO();

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
      if (!currentGame) return;

      const finishedGame = {
        ...currentGame,
        endedAt: currentGame.endedAt ?? nowISO(),
      };

      try {
        const storedHistory = localStorage.getItem(STORAGE.history);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedHistory: any[] = storedHistory ? JSON.parse(storedHistory) : [];
        const historyArray = Array.isArray(parsedHistory) ? parsedHistory : [];
        const historyWithoutDuplicates = historyArray.filter(game => game?.id !== finishedGame.id);

        historyWithoutDuplicates.unshift(finishedGame);
        localStorage.setItem(STORAGE.history, JSON.stringify(historyWithoutDuplicates));
        currentGame.isFinished = true;
      } catch (error) {
        console.error('❌ Saving game history failed:', error);
      }

      set(state => {
        state.game = null;
        state.lastThrows = [];
      });

      try {
        localStorage.removeItem(STORAGE.currentGame);
      } catch (error) {
        console.error('⚠️ Failed to clear game data:', error);
      }
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
        localStorage.setItem(STORAGE.currentGame, JSON.stringify(game));
      } catch (error) {
        console.error(`Failed to save checkpoint (${why})`, error);
      }
    },
  })),
);
