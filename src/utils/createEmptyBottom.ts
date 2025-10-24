import { Player } from '@/types/player';

export const createEmptyBottom = (): Player['game']['bottom'] => ({
  pair: { isPassed: null, idFirstThrow: false, score: 0 },
  doublePair: { isPassed: null, idFirstThrow: false, score: 0 },
  triple: { isPassed: null, idFirstThrow: false, score: 0 },
  quadruple: { isPassed: null, idFirstThrow: false, score: 0 },
  full: { isPassed: null, idFirstThrow: false, score: 0 },
  smallStraight: { isPassed: null, idFirstThrow: false, score: 0 },
  largeStraight: { isPassed: null, idFirstThrow: false, score: 0 },
  poker: { isPassed: null, idFirstThrow: false, score: 0 },
  chance: { isPassed: null, idFirstThrow: false, score: 0 },
  score: 0,
});
