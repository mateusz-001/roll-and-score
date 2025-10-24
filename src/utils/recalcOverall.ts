import { Player } from '@/types/player';

import { recalcBottom } from './recalcBottom';
import { recalcTop } from './recalcTop';

export const recalcOverall = (player: Player) => {
  recalcTop(player);
  recalcBottom(player);
  player.game.overallScore = player.game.top.score + player.game.bottom.score;
};
