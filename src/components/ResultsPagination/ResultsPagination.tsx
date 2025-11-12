import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

import { cn } from '@/utils';

import { Button } from '../Button';

interface Props {
  page: number;
  pages: number[];
  hasPrev: boolean;
  hasNext: boolean;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export const ResultsPagination: React.FC<Props> = ({
  page,
  pages,
  hasPrev,
  hasNext,
  goToPage,
  prevPage,
  nextPage,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
      <Button key={page - 1} variant="ghost" size="sm" onClick={prevPage} disabled={!hasPrev}>
        <ArrowLeft className="w-4" />
      </Button>

      {pages.map(p => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={cn(
            'min-w-8 rounded-full px-3 py-1 text-sm transition font-semibold',
            p === page
              ? 'bg-primary text-white shadow-sm'
              : 'bg-white/80 text-neutral-800 hover:bg-primary/10',
          )}
        >
          {p}
        </button>
      ))}

      <Button key={page + 1} variant="ghost" size="sm" onClick={nextPage} disabled={!hasNext}>
        <ArrowRight className="w-4" />
      </Button>
    </div>
  );
};
