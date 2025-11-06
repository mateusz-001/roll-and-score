import React from 'react';

import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import { useGameStore } from '@/store/gameStore';
import { Game } from '@/types/game';

const PLACEMENT_EMOJIS = ['🥇', '🥈', '🥉'];

interface Props {
  placement?: Game['placement'];
}

export const FinalPlacements: React.FC<Props> = ({ placement }) => {
  const { saveAndReset } = useGameStore();

  return (
    <div className="flex flex-col items-center gap-3 min-h-full md:gap-4 lg:gap-6">
      <header>
        <Heading level="h2" className="mb-3 text-center text-primary">
          Koniec gry!
        </Heading>
        <Heading level="h4" className="">
          Zobacz ostateczne wyniki
        </Heading>
      </header>
      <ul className="w-full max-w-[400px]">
        {placement?.map((player, index) => (
          <li
            key={player.id}
            className="w-full flex items-center justify-between border-b-2 border-gray/50 pb-2 mb-2 last:mb-0 last:border-0"
          >
            <div className="flex items-center mr-4">
              <div className="text-[32px]">{PLACEMENT_EMOJIS[index]}</div>
              <Paragraph size="large" className="ml-2 font-semibold">
                {player.name}
              </Paragraph>
            </div>
            <div>
              <span className="font-semibold bg-green-100 text-green-500 p-2 rounded-sm">
                {player.score} pkt
              </span>{' '}
            </div>
          </li>
        ))}
      </ul>
      <Button
        className="mt-3 md:mt-4 lg:mt-6"
        variant="primary"
        size="lg"
        onClick={() => {
          saveAndReset();
        }}
      >
        Zapisz i wyjdź
      </Button>
    </div>
  );
};
