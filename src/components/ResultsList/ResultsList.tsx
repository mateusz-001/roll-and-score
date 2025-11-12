import { motion } from 'framer-motion';
import React from 'react';

import { Game } from '@/types/game';

import { ResultsListItem } from './ResultsListItem';

interface Props {
  items: Game[];
}

export const ResultsList: React.FC<Props> = ({ items }) => {
  return (
    <motion.ul className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {items.map((game, index) => (
        <ResultsListItem key={game.id} game={game} index={index} />
      ))}
    </motion.ul>
  );
};
