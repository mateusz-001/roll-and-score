import React from 'react';

import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Paragraph } from '@/components/Paragraph';
import { ResultsList } from '@/components/ResultsList';
import { ResultsPagination } from '@/components/ResultsPagination';
import { useHistoryPagination } from '@/hooks/useHistoryPagination';

import { Header } from './Header';

export const ResultsPage: React.FC = () => {
  const { items, page, pages, hasPrev, hasNext, prevPage, nextPage, goToPage } =
    useHistoryPagination(2);

  const hasResults = items.length > 0;

  return (
    <PageWrapper className="relative h-screen">
      <PageCard>
        <Header />
        <main className="mt-6">
          {hasResults ? (
            <>
              <ResultsList items={items} />
              <ResultsPagination
                page={page}
                pages={pages}
                hasPrev={hasPrev}
                hasNext={hasNext}
                goToPage={goToPage}
                prevPage={prevPage}
                nextPage={nextPage}
              />
            </>
          ) : (
            <Paragraph className="text-center">Brak zapisanej historii gier.</Paragraph>
          )}
        </main>
      </PageCard>
    </PageWrapper>
  );
};
