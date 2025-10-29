import { Player } from '@/types/player';

export const recalcTop = (player: Player) => {
  const top = player.game.top;

  top.score =
    top.combinations.one.score +
    top.combinations.two.score +
    top.combinations.three.score +
    top.combinations.four.score +
    top.combinations.five.score +
    top.combinations.six.score +
    top.bonus;
};
