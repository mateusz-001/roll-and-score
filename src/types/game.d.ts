import { Player } from './player';

interface Game {
  id: number | string;
  players: Player[];
  placement: {
    id: number;
    name: string;
    score: number;
  }[];
  round: number;
  isFinished: boolean;
  startedAt: string;
  endedAt: string | null;
}
