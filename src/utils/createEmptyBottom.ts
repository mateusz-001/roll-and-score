import { Player } from '@/types/player';

export const createEmptyBottom = (): Player['game']['bottom'] => ({
  combinations: {
    pair: { isPassed: null, isFirstThrow: false, score: 0 },
    doublePair: { isPassed: null, isFirstThrow: false, score: 0 },
    triple: { isPassed: null, isFirstThrow: false, score: 0 },
    quadruple: { isPassed: null, isFirstThrow: false, score: 0 },
    full: { isPassed: null, isFirstThrow: false, score: 0 },
    smallStraight: { isPassed: null, isFirstThrow: false, score: 0 },
    largeStraight: { isPassed: null, isFirstThrow: false, score: 0 },
    poker: { isPassed: null, isFirstThrow: false, score: 0 },
    chance: { isPassed: null, isFirstThrow: false, score: 0 },
  },
  score: 0,
});
