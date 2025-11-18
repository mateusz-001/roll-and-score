import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Dices } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Game } from '@/types/game';
import { formatDate, getGameDuration } from '@/utils';

import { Paragraph } from '../Paragraph';
import { ResultsTabs } from '../ResultsTabs';

interface Props {
  game: Game;
  delay?: number;
  index: number;
}

export const ResultsListItem: React.FC<Props> = ({ game, index }) => {
  const { t } = useTranslation('results');

  const { id, startedAt, endedAt, placement } = game;
  const firstPlace = placement && placement.length > 0 ? placement[0] : null;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleAccordion = () => setIsOpen(prev => !prev);

  return (
    <motion.li
      className="flex flex-col gap-2 rounded-2xl bg-white/80 border border-secondary px-2 py-2 shadow-md md:py-3 md:px-4"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.15,
        ease: 'easeInOut',
        duration: 0.3,
      }}
    >
      <div className="flex items-start justify-between gap-3" onClick={handleToggleAccordion}>
        <div className="flex flex-col gap-2">
          <Paragraph size="small" className="!text-text/40">
            {t('game')} #{id}
          </Paragraph>

          <div className="flex items-center justify-between">
            <Paragraph color="primary" className="flex items-center gap-1">
              <Dices className="inline-block" />
              <span className="font-semibold">{t('date')}:</span>
              <span className="font-normal text-text">{formatDate(startedAt)}</span>
            </Paragraph>
          </div>

          {placement && placement.length > 0 && (
            <div className="flex items-center gap-3">
              <Paragraph>🏆 {firstPlace?.name}</Paragraph>
              <Paragraph
                as="span"
                size="small"
                className="flex items-center px-1 !text-green-500 bg-green-100 font-semibold rounded-sm"
              >
                {firstPlace?.score} {t('points')}
              </Paragraph>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1">
          <Paragraph as="span" className="font-thin !text-sm w-min">
            {getGameDuration(startedAt, endedAt ?? '')}
          </Paragraph>

          <span className={isOpen ? 'text-primary rotate-180 -mr-1' : 'text-text/60 -mr-1'}>
            <ChevronDown className="w-7 h-7" />
          </span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && <ResultsTabs placement={placement} players={game.players} />}
      </AnimatePresence>
    </motion.li>
  );
};
