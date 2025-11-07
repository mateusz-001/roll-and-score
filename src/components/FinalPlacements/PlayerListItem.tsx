import React from 'react';

import { getRankLabel, RankedPlayer } from '@/utils';

import { Paragraph } from '../Paragraph';

const PLACEMENT_EMOJIS = ['🥇', '🥈', '🥉'];

interface Props {
  player: RankedPlayer;
}

export const PlayerListItem: React.FC<Props> = ({ player }) => {
  return (
    <li
      key={player.id}
      className="w-full flex items-center justify-between border-b-2 border-gray/50 pb-2 mb-2 last:mb-0 last:border-0"
    >
      <div className="flex items-center mr-4">
        <div className="text-[32px] min-w-[40px] text-center">
          {getRankLabel(player.rank, PLACEMENT_EMOJIS)}
        </div>
        <div className="ml-2 flex flex-col">
          <Paragraph size="large" className="font-semibold">
            {player.name}
          </Paragraph>
          {player.isTie && (
            <span className="text-xs text-dark-gray uppercase tracking-wide">ex aequo</span>
          )}
        </div>
      </div>
      <div>
        <span className="font-semibold bg-green-100 text-green-500 px-2 py-1 rounded-sm">
          {player.score} pkt
        </span>
      </div>
    </li>
  );
};
