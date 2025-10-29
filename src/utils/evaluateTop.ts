import { Player, TopKey } from '@/types/player';

export type AvailableTop = {
  combination: TopKey;
  score: number;
  bonusPoints: number;
  effectiveValue: number;
};

const faceKeys: TopKey[] = ['one', 'two', 'three', 'four', 'five', 'six'];

const toCounts = (dice: number[]) => {
  const counts: Record<TopKey, number> = {
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
  };
  dice.forEach(v => {
    const key = faceKeys[v - 1];
    if (key) counts[key]++;
  });

  return counts;
};

export const evaluateTop = ({
  availableCombinations,
  dices,
  currentBonusPoints,
}: {
  availableCombinations: Player['game']['top']['combinations'];
  dices: number[];
  currentBonusPoints: number | null;
}): AvailableTop[] => {
  if (dices.length !== 5) throw new Error(`evaluateTop expects 5 dice, got ${dices.length}`);

  const counts = toCounts(dices);
  const results: AvailableTop[] = [];

  faceKeys.forEach((k, idx) => {
    const face = idx + 1;
    const count = counts[k];

    if (count >= 2) {
      if (currentBonusPoints !== null && currentBonusPoints >= face) {
        results.push({
          combination: k,
          score: face,
          bonusPoints: -face,
          effectiveValue: face + -face,
        });
      }
    }

    if (count === 3) {
      results.push({
        combination: k,
        score: face,
        bonusPoints: 0,
        effectiveValue: face,
      });
    }

    if (count > 3) {
      const score = face * count;
      const gainedBonus = (count - 3) * face;

      results.push({
        combination: k,
        score: face,
        bonusPoints: gainedBonus,
        effectiveValue: score + gainedBonus,
      });
    }
  });

  const onlyFree = results.filter(result => {
    const cell = availableCombinations[result.combination];

    return !cell?.isPassed;
  });

  if (onlyFree.length === 0) return [];

  const maxEffective = Math.max(...onlyFree.map(result => result.effectiveValue));
  const best = onlyFree
    .filter(result => result.effectiveValue === maxEffective)
    .sort((a, b) => {
      const faceA = faceKeys.indexOf(a.combination) + 1;
      const faceB = faceKeys.indexOf(b.combination) + 1;

      if (b.effectiveValue !== a.effectiveValue) {
        return b.effectiveValue - a.effectiveValue;
      }

      if (faceB !== faceA) {
        return faceB - faceA;
      }

      return b.score - a.score;
    });

  return best;
};
