import React from 'react';

import { PageWrapper } from '@/components/PageWrapper';

import { Intro } from './Intro';
import { IntroForm } from './IntroForm';

export const StartPage: React.FC = () => {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const handleSetShowForm = () => setShowForm(prev => !prev);

  return (
    <PageWrapper className="min-h-screen">
      <header className="relative pt-28 max-md:py-28">
        {!showForm && <Intro handleSetShowForm={handleSetShowForm} />}
        {showForm && <IntroForm handleSetShowForm={handleSetShowForm} />}
      </header>
    </PageWrapper>
  );
};
