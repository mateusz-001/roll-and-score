import { Player } from '@/types/player';

export const createEmptyTop = (): Player['game']['top'] => ({
  one: { isPassed: false, bonus: 0, score: 0 },
  two: { isPassed: false, bonus: 0, score: 0 },
  three: { isPassed: false, bonus: 0, score: 0 },
  four: { isPassed: false, bonus: 0, score: 0 },
  five: { isPassed: false, bonus: 0, score: 0 },
  six: { isPassed: false, bonus: 0, score: 0 },
  score: 0,
});
