import { motion } from 'framer-motion';
import { CircleSlash2, ListChecks } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import type { CombinationSelectionMode } from '@/types/game';
import { cn } from '@/utils';

interface Props {
  value: CombinationSelectionMode;
  onChange: (value: CombinationSelectionMode) => void;
}

const TABS: { value: CombinationSelectionMode; icon: React.ReactNode }[] = [
  { value: 'score', icon: <ListChecks className="h-4 w-4" aria-hidden /> },
  { value: 'crossOut', icon: <CircleSlash2 className="h-4 w-4" aria-hidden /> },
];

export const CombinationModeTabs: React.FC<Props> = ({ value, onChange }) => {
  const { t } = useTranslation('game');
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? TABS.length - 1
          : event.key === 'ArrowRight'
            ? (index + 1) % TABS.length
            : (index - 1 + TABS.length) % TABS.length;
    const nextTab = TABS[nextIndex];

    onChange(nextTab.value);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={t('mode_tabs_label')}
      className="relative mb-4 grid grid-cols-2 gap-1 rounded-md bg-secondary/25 p-1"
    >
      {TABS.map((tab, index) => {
        const isActive = tab.value === value;

        return (
          <button
            key={tab.value}
            ref={element => {
              tabRefs.current[index] = element;
            }}
            id={`combination-tab-${tab.value}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`combination-panel-${tab.value}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.value)}
            onKeyDown={event => handleKeyDown(event, index)}
            className={cn(
              'relative isolate flex min-h-10 items-center justify-center gap-2 rounded-sm px-2 py-2',
              'text-body-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isActive ? 'text-primary' : 'text-text/65 hover:text-text',
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="active-combination-mode"
                className="absolute inset-0 -z-10 rounded-sm bg-white shadow-card"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            ) : null}
            {tab.icon}
            <span>{t(tab.value === 'score' ? 'mode_score' : 'mode_cross_out')}</span>
          </button>
        );
      })}
    </div>
  );
};
