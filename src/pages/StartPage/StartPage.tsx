import React from 'react';

import { PageWrapper } from '@/components/PageWrapper';

import { Intro } from './Intro';

export const StartPage: React.FC = () => {
  return (
    <PageWrapper className="h-screen">
      <Intro />
    </PageWrapper>
  );
};
