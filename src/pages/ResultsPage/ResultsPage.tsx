import React from 'react';
import { useTranslation } from 'react-i18next';

import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';
import { Paragraph } from '@/components/Paragraph';
import { ResultsList } from '@/components/ResultsList';
import { ResultsPagination } from '@/components/ResultsPagination';
import { useHistoryPagination } from '@/hooks/useHistoryPagination';

import { Header } from './Header';

export const ResultsPage: React.FC = () => {
  const { t } = useTranslation('results');

  const { items, page, pages, hasPrev, hasNext, prevPage, nextPage, goToPage } =
    useHistoryPagination(5);

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
            <Paragraph className="text-center">{t('no_history')}</Paragraph>
          )}
        </main>
      </PageCard>
    </PageWrapper>
  );
};
