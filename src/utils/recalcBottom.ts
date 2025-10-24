import { Player } from '@/types/player';

export const recalcBottom = (player: Player) => {
  const bottom = player.game.bottom;
  bottom.score =
    bottom.pair.score +
    bottom.doublePair.score +
    bottom.triple.score +
    bottom.full.score +
    bottom.smallStraight.score +
    bottom.largeStraight.score +
    bottom.poker.score +
    bottom.chance.score;
};
