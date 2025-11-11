import * as React from 'react';

import type { Game } from '@/types/game';
import { readHistoryFromStorage } from '@/utils';

export const useHistoryPagination = (pageSize: number = 2) => {
  const [history, setHistory] = React.useState<Game[]>([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setHistory(readHistoryFromStorage());
  }, []);

  const refresh = React.useCallback(() => {
    setHistory(readHistoryFromStorage());
  }, []);

  const totalItems = history.length;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1;

  // pilnujemy, żeby page nie wyjechał poza zakres
  const safePage = React.useMemo(() => Math.min(Math.max(page, 1), totalPages), [page, totalPages]);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const items = history.slice(start, end);

  const pages = React.useMemo(
    () => (totalItems > 0 ? Array.from({ length: totalPages }, (_, i) => i + 1) : []),
    [totalItems, totalPages],
  );

  const goToPage = (target: number) => {
    if (target < 1 || target > totalPages) return;
    setPage(target);
  };

  const nextPage = () => {
    setPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  return {
    history,
    items,
    page: safePage,
    pages,
    totalPages,
    totalItems,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
    goToPage,
    nextPage,
    prevPage,
    setPage: goToPage,
    refresh,
  };
};
