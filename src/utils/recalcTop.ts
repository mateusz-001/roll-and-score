import { Player } from '@/types/player';

export const recalcTop = (player: Player) => {
  const top = player.game.top;
  const isAllPassed = Object.values(top.combinations).every(c => c.isPassed === true);
  const bonus =
    top.combinations.one.bonus +
    top.combinations.two.bonus +
    top.combinations.three.bonus +
    top.combinations.four.bonus +
    top.combinations.five.bonus +
    top.combinations.six.bonus;

  top.bonus = bonus;

  if (isAllPassed) {
    top.score =
      top.combinations.one.score +
      top.combinations.two.score +
      top.combinations.three.score +
      top.combinations.four.score +
      top.combinations.five.score +
      top.combinations.six.score +
      top.bonus +
      50;
  } else {
    top.score =
      top.combinations.one.score +
      top.combinations.two.score +
      top.combinations.three.score +
      top.combinations.four.score +
      top.combinations.five.score +
      top.combinations.six.score +
      top.bonus;
  }
};
