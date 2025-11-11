import { Player } from '@/types/player';

export const recalcBottom = (player: Player) => {
  const bottom = player.game.bottom;
  bottom.score =
    bottom.combinations.pair.score +
    bottom.combinations.doublePair.score +
    bottom.combinations.triple.score +
    bottom.combinations.full.score +
    bottom.combinations.smallStraight.score +
    bottom.combinations.largeStraight.score +
    bottom.combinations.poker.score +
    bottom.combinations.chance.score;
};
