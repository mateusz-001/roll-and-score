import { Game } from '@/types/game';

const HISTORY_KEY = 'rs:history';

export const readHistoryFromStorage = (): Game[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};
