import type { Player } from '@/types/player';

const SMALL_STRAIGHT_POINTS = 15;
const LARGE_STRAIGHT_POINTS = 20;
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

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

const toCounts = (dice: number[]) => {
  const counts = new Array(7).fill(0);
  for (const d of dice) counts[d]++;

  return counts as number[];
};

const findIndices = (dices: number[], value: number, limit: number): number[] => {
  const indices: number[] = [];
  dices.forEach((d, i) => {
    if (d === value && indices.length < limit) indices.push(i);
  });

  return indices;
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
  const counts = toCounts(dices);
  const total = sum(dices);

  const results: AvailableBottom[] = [];

  const pairValue = [...Array(7).keys()].reverse().find(v => counts[v] >= 2);
  if (pairValue) {
    results.push({
      combination: 'pair',
      score: pairValue * 2,
      effectiveValue: pairValue * 2,
      usedDiceIndices: findIndices(dices, pairValue, 2),
    });
  }

  const pairs = [...Array(7).keys()].filter(v => counts[v] >= 2).reverse();
  if (pairs.length >= 2) {
    const [high, low] = pairs.slice(0, 2);
    results.push({
      combination: 'doublePair',
      score: high * 2 + low * 2,
      effectiveValue: high * 2 + low * 2,
      usedDiceIndices: [...findIndices(dices, high, 2), ...findIndices(dices, low, 2)],
    });
  }

  const tripleValue = [...Array(7).keys()].reverse().find(v => counts[v] >= 3);
  if (tripleValue) {
    results.push({
      combination: 'triple',
      score: tripleValue * 3,
      effectiveValue: tripleValue * 3,
      usedDiceIndices: findIndices(dices, tripleValue, 3),
    });
  }

  const hasThree = [...Array(7).keys()].find(v => counts[v] === 3);
  const hasTwo = [...Array(7).keys()].find(v => counts[v] === 2);
  if (hasThree && hasTwo) {
    results.push({
      combination: 'full',
      score: total,
      effectiveValue: total,
      usedDiceIndices: [...findIndices(dices, hasThree, 3), ...findIndices(dices, hasTwo, 2)],
    });
  }

  const smallSet = [1, 2, 3, 4, 5];
  if (smallSet.every(v => counts[v] === 1)) {
    results.push({
      combination: 'smallStraight',
      score: SMALL_STRAIGHT_POINTS,
      effectiveValue: SMALL_STRAIGHT_POINTS,
      usedDiceIndices: dices.map((d, i) => (smallSet.includes(d) ? i : -1)).filter(i => i !== -1),
    });
  }

  const largeSet = [2, 3, 4, 5, 6];
  if (largeSet.every(v => counts[v] === 1)) {
    results.push({
      combination: 'largeStraight',
      score: LARGE_STRAIGHT_POINTS,
      effectiveValue: LARGE_STRAIGHT_POINTS,
      usedDiceIndices: dices.map((d, i) => (largeSet.includes(d) ? i : -1)).filter(i => i !== -1),
    });
  }

  const pokerValue = [...Array(7).keys()].find(v => counts[v] === 5);
  if (pokerValue) {
    const total = POKER_BASE_POINTS + pokerValue * 5;
    results.push({
      combination: 'poker',
      score: total,
      effectiveValue: total,
      usedDiceIndices: [0, 1, 2, 3, 4],
    });
  }

  results.push({
    combination: 'chance',
    score: total,
    effectiveValue: total,
    usedDiceIndices: [0, 1, 2, 3, 4],
  });

  if (isFirstThrow) {
    for (const r of results) {
      r.effectiveValue = r.score * 2;
    }
  }

  const freeResults = results.filter(r => !availableCombinations[r.combination]?.isPassed);

  freeResults.sort((a, b) => b.effectiveValue - a.effectiveValue);

  return freeResults;
};
