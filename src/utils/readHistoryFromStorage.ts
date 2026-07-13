import { parseGame } from '@/schemas/gameSchema';
import { Game } from '@/types/game';

const HISTORY_KEY = 'rs:history';
const STORAGE_VERSION = 1;

type HistoryEnvelope = {
  version: typeof STORAGE_VERSION;
  games: unknown[];
};

const getStoredGames = (value: unknown): unknown[] => {
  if (Array.isArray(value)) return value;

  if (
    value &&
    typeof value === 'object' &&
    'version' in value &&
    'games' in value &&
    (value as HistoryEnvelope).version === STORAGE_VERSION &&
    Array.isArray((value as HistoryEnvelope).games)
  ) {
    return (value as HistoryEnvelope).games;
  }

  return [];
};

export const readHistoryFromStorage = (): Game[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];

    return getStoredGames(parsed)
      .map(parseGame)
      .filter((game): game is Game => game !== null);
  } catch {
    return [];
  }
};

export const writeHistoryToStorage = (games: Game[]): void => {
  const envelope = { version: STORAGE_VERSION, games };

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(envelope));
};

export const readCurrentGameFromStorage = (key: string): Game | null => {
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;

  const parsed: unknown = JSON.parse(raw);

  if (
    parsed &&
    typeof parsed === 'object' &&
    'version' in parsed &&
    'game' in parsed &&
    parsed.version === STORAGE_VERSION
  ) {
    return parseGame(parsed.game);
  }

  return parseGame(parsed);
};

export const writeCurrentGameToStorage = (key: string, game: Game): void => {
  window.localStorage.setItem(key, JSON.stringify({ version: STORAGE_VERSION, game }));
};
