import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { Game } from '@/types/game';
import { cn } from '@/utils';

import { Heading } from '../Heading';
import { SectionHeader } from './SectionHeader';
import { TabsListItemBottom } from './TabsListItemBottom';
import { TabsListItemTop } from './TabsListItemTop';

interface Props {
  placement: Game['placement'];
  players: Game['players'];
}

const TOP_COMBINATIONS = [
  { key: 'one', label: '1' },
  { key: 'two', label: '2' },
  { key: 'three', label: '3' },
  { key: 'four', label: '4' },
  { key: 'five', label: '5' },
  { key: 'six', label: '6' },
] as const;

const BOTTOM_COMBINATIONS = [
  { key: 'pair', label: 'pair' },
  { key: 'doublePair', label: 'double pair' },
  { key: 'triple', label: 'triple' },
  { key: 'quadruple', label: 'quadruple' },
  { key: 'smallStraight', label: 'small straight' },
  { key: 'largeStraight', label: 'large straight' },
  { key: 'full', label: 'full' },
  { key: 'poker', label: 'poker' },
  { key: 'chance', label: 'chance' },
] as const;

export const ResultsTabs: React.FC<Props> = ({ placement, players }) => {
  const [activePlayerId, setActivePlayerId] = React.useState(() => players[0]?.id ?? null);

  const activePlayer = players.find(player => player.id === activePlayerId) ?? null;

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.22, ease: 'easeInOut' }}
    >
      <div className="mt-2 pt-2 flex gap-2 overflow-x-auto">
        {placement.map(player => {
          const isActive = player.id === activePlayer?.id;

          return (
            <button
              key={player.id}
              type="button"
              onClick={() => setActivePlayerId(player.id)}
              className={cn(
                'px-3 py-1 rounded-full border-2 text-sm font-medium transition-colors duration-300 whitespace-nowrap',
                isActive
                  ? 'border-primary bg-primary text-white shadow-sm focus-visible:ring-primary'
                  : 'border-gray text-text/80 hover:bg-gray/30 focus-visible:ring-gray',
              )}
            >
              {player.name} - {player.score}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activePlayer && (
          <motion.div
            key={activePlayer.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="mt-2 flex flex-col text-xs md:text-sm text-text/80"
          >
            <div className="mt-2 flex items-center justify-between px-2 py-2 rounded-md bg-gray/20">
              <Heading level="h5">{activePlayer.name}</Heading>
              <span className="px-1 rounded-sm bg-green-100 text-green-500 font-semibold">
                {activePlayer.game.overallScore} pkt
              </span>
            </div>

            <SectionHeader label="Góra" score={activePlayer.game.top.score} />
            <ul className="px-2 flex flex-col gap-y-1">
              {TOP_COMBINATIONS.map(({ key, label }) => {
                const combo = activePlayer.game.top.combinations[key];

                if (!combo) return null;

                const showBonus = combo.bonus && combo.bonus !== 0;

                return (
                  <TabsListItemTop
                    key={key}
                    label={label}
                    combo={combo}
                    showBonus={showBonus ? true : false}
                  />
                );
              })}
            </ul>

            <SectionHeader label="Dół" score={activePlayer.game.bottom.score} className="mt-6" />
            <ul className="px-2 flex flex-col gap-y-1 mb-2">
              {BOTTOM_COMBINATIONS.map(({ key, label }) => {
                const combo = activePlayer.game.bottom.combinations[key];

                if (!combo) return null;

                const showScore = combo.isPassed && typeof combo.score === 'number';

                return (
                  <TabsListItemBottom
                    key={key}
                    label={label}
                    combo={combo}
                    showScore={showScore ?? false}
                  />
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
