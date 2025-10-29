export type TopCombination = {
  isPassed: boolean | null;
  score: number;
};

export type BottomCombination = {
  isPassed: boolean | null;
  idFirstThrow: boolean;
  score: number;
};

export type TopKey = 'one' | 'two' | 'three' | 'four' | 'five' | 'six';
export type BottomKey =
  | 'pair'
  | 'doublePair'
  | 'triple'
  | 'quadruple'
  | 'full'
  | 'smallStraight'
  | 'largeStraight'
  | 'poker'
  | 'chance';

export interface Player {
  id: number;
  name: string;
  game: {
    top: {
      combinations: {
        one: TopCombination;
        two: TopCombination;
        three: TopCombination;
        four: TopCombination;
        five: TopCombination;
        six: TopCombination;
      };
      bonus: number;
      score: number;
    };
    bottom: {
      combinations: {
        pair: BottomCombination;
        doublePair: BottomCombination;
        triple: BottomCombination;
        quadruple: BottomCombination;
        full: BottomCombination;
        smallStraight: BottomCombination;
        largeStraight: BottomCombination;
        poker: BottomCombination;
        chance: BottomCombination;
      };
      score: number;
    };
    overallScore: number;
  };
}
