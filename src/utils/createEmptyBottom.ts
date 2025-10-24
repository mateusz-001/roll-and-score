import { Player } from '@/types/player';

export const createEmptyBottom = (): Player['game']['bottom'] => ({
  pair: { isPassed: false, idFirstThrow: false, score: 0 },
  doublePair: { isPassed: false, idFirstThrow: false, score: 0 },
  triple: { isPassed: false, idFirstThrow: false, score: 0 },
  quadruple: { isPassed: false, idFirstThrow: false, score: 0 },
  full: { isPassed: false, idFirstThrow: false, score: 0 },
  smallStraight: { isPassed: false, idFirstThrow: false, score: 0 },
  largeStraight: { isPassed: false, idFirstThrow: false, score: 0 },
  poker: { isPassed: false, idFirstThrow: false, score: 0 },
  chance: { isPassed: false, idFirstThrow: false, score: 0 },
  score: 0,
});
