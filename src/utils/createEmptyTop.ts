import { Player } from '@/types/player';

export const createEmptyTop = (): Player['game']['top'] => ({
  one: { isPassed: null, bonus: 0, score: 0 },
  two: { isPassed: null, bonus: 0, score: 0 },
  three: { isPassed: null, bonus: 0, score: 0 },
  four: { isPassed: null, bonus: 0, score: 0 },
  five: { isPassed: null, bonus: 0, score: 0 },
  six: { isPassed: null, bonus: 0, score: 0 },
  score: 0,
});
