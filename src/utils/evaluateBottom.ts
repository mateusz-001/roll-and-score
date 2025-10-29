import type { Player } from '@/types/player';

const SMALL_STRAIGHT_POINTS = 15;
const SMALL_STRAIGHT_SET = [1, 2, 3, 4, 5] as const;
const LARGE_STRAIGHT_POINTS = 20;
const LARGE_STRAIGHT_SET = [2, 3, 4, 5, 6] as const;
const POKER_BASE_POINTS = 50;

export type BottomKey =
  | 'pair'
  | 'doublePair'
  | 'triple'
  | 'full'
  | 'smallStraight'
  | 'largeStraight'
  | 'poker'
  | 'chance';

export type AvailableBottom = {
  combination: BottomKey;
  score: number;
  effectiveValue: number;
  usedDiceIndices: number[];
};

const sumDices = (dicesValues: number[]) => dicesValues.reduce((sum, value) => sum + value, 0);

const countDiceValues = (diceValues: number[]) => {
  const valueCounts = new Array(7).fill(0);
  for (const value of diceValues) valueCounts[value]++;

  return valueCounts as number[];
};

const mapValueToIndices = (diceValues: number[]) => {
  const valueToIndices = new Map<number, number[]>();

  diceValues.forEach((value, index) => {
    if (!valueToIndices.has(value)) {
      valueToIndices.set(value, []);
    }
    valueToIndices.get(value)!.push(index);
  });

  return valueToIndices;
};

const getIndicesForValue = (
  valueToIndices: Map<number, number[]>,
  value: number,
  limit: number,
): number[] => {
  const indices = valueToIndices.get(value) ?? [];

  return indices.slice(0, limit);
};

const getIndicesForSet = (diceValues: number[], validValues: readonly number[]) =>
  diceValues
    .map((value, index) => (validValues.includes(value) ? index : -1))
    .filter(index => index !== -1);

const findOfKind = (valueCounts: number[], requiredCount: number): number | null => {
  for (let face = 6; face >= 1; face--) {
    if (valueCounts[face] >= requiredCount) return face;
  }

  return null;
};

const findTopTwoPairs = (valueCounts: number[]): [number, number] | null => {
  const pairValues: number[] = [];
  for (let face = 6; face >= 1; face--) {
    if (valueCounts[face] >= 2) pairValues.push(face);
  }

  return pairValues.length >= 2 ? [pairValues[0], pairValues[1]] : null;
};

const isExactStraight = (valueCounts: number[], straightSet: readonly number[]) =>
  straightSet.every(face => valueCounts[face] === 1);

const addResult = (
  results: AvailableBottom[],
  entry: Omit<AvailableBottom, 'effectiveValue'> & { effectiveValue?: number },
) => {
  results.push({
    ...entry,
    effectiveValue: entry.effectiveValue ?? entry.score,
  });
};

export const evaluateBottom = ({
  availableCombinations,
  dices,
  isFirstThrow,
}: {
  availableCombinations: Player['game']['bottom']['combinations'];
  dices: number[];
  isFirstThrow: boolean;
}): AvailableBottom[] => {
  const valueCounts = countDiceValues(dices);
  const totalSum = sumDices(dices);
  const valueToIndices = mapValueToIndices(dices);

  const results: AvailableBottom[] = [];

  const pairValue = findOfKind(valueCounts, 2);
  if (pairValue) {
    addResult(results, {
      combination: 'pair',
      score: pairValue * 2,
      usedDiceIndices: getIndicesForValue(valueToIndices, pairValue, 2),
    });
  }

  const twoPairValues = findTopTwoPairs(valueCounts);
  if (twoPairValues) {
    const [higherPair, lowerPair] = twoPairValues;
    addResult(results, {
      combination: 'doublePair',
      score: higherPair * 2 + lowerPair * 2,
      usedDiceIndices: [
        ...getIndicesForValue(valueToIndices, higherPair, 2),
        ...getIndicesForValue(valueToIndices, lowerPair, 2),
      ],
    });
  }

  const tripleValue = findOfKind(valueCounts, 3);
  if (tripleValue) {
    addResult(results, {
      combination: 'triple',
      score: tripleValue * 3,
      usedDiceIndices: getIndicesForValue(valueToIndices, tripleValue, 3),
    });
  }

  const threeOfKind = [1, 2, 3, 4, 5, 6].find(face => valueCounts[face] === 3);
  const twoOfKind = [1, 2, 3, 4, 5, 6].find(face => valueCounts[face] === 2);
  if (threeOfKind && twoOfKind) {
    addResult(results, {
      combination: 'full',
      score: totalSum,
      usedDiceIndices: [
        ...getIndicesForValue(valueToIndices, threeOfKind, 3),
        ...getIndicesForValue(valueToIndices, twoOfKind, 2),
      ],
    });
  }

  if (isExactStraight(valueCounts, SMALL_STRAIGHT_SET)) {
    addResult(results, {
      combination: 'smallStraight',
      score: SMALL_STRAIGHT_POINTS,
      usedDiceIndices: getIndicesForSet(dices, SMALL_STRAIGHT_SET),
    });
  }

  if (isExactStraight(valueCounts, LARGE_STRAIGHT_SET)) {
    addResult(results, {
      combination: 'largeStraight',
      score: LARGE_STRAIGHT_POINTS,
      usedDiceIndices: getIndicesForSet(dices, LARGE_STRAIGHT_SET),
    });
  }

  const pokerValue = findOfKind(valueCounts, 5);
  if (pokerValue) {
    const pokerScore = POKER_BASE_POINTS + pokerValue * 5;
    addResult(results, {
      combination: 'poker',
      score: pokerScore,
      usedDiceIndices: [0, 1, 2, 3, 4],
    });
  }

  addResult(results, {
    combination: 'chance',
    score: totalSum,
    usedDiceIndices: [0, 1, 2, 3, 4],
  });

  if (isFirstThrow) {
    for (const result of results) {
      result.effectiveValue = result.score * 2;
    }
  }

  const freeCombinations = results.filter(
    result => !availableCombinations[result.combination]?.isPassed,
  );

  freeCombinations.sort((a, b) => b.effectiveValue - a.effectiveValue || b.score - a.score);

  return freeCombinations;
};
