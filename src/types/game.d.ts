import { Player } from './player';

export type CombinationSelectionMode = 'score' | 'crossOut';

interface Game {
  id: number | string;
  players: Player[];
  placement: {
    id: number;
    name: string;
    score: number;
  }[];
  round: number;
  activePlayer: {
    id: number;
    name: string;
    index: number;
  };
  maxRounds: number;
  isFinished: boolean;
  startedAt: string;
  endedAt: string | null;
}
