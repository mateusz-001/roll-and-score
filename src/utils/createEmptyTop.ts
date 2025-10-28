import { Player } from '@/types/player';

export const createEmptyTop = (): Player['game']['top'] => ({
  combinations: {
    one: { isPassed: null, score: 0 },
    two: { isPassed: null, score: 0 },
    three: { isPassed: null, score: 0 },
    four: { isPassed: null, score: 0 },
    five: { isPassed: null, score: 0 },
    six: { isPassed: null, score: 0 },
  },
  bonus: 0,
  score: 0,
});
