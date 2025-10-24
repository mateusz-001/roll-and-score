import { Player } from '@/types/player';

export const recalcTop = (player: Player) => {
  const top = player.game.top;

  top.score =
    top.one.score +
    top.one.bonus +
    top.two.score +
    top.two.bonus +
    top.three.score +
    top.three.bonus +
    top.four.score +
    top.four.bonus +
    top.five.score +
    top.five.bonus +
    top.six.score +
    top.six.bonus;
};
