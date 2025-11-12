import React from 'react';

import { AnimationSlideUp } from '@/components/Animations';
import { Button } from '@/components/Button';
import { PageCard } from '@/components/PageCard';
import { PageWrapper } from '@/components/PageWrapper';

import { Header } from './Header';
import { Paragraph } from '../../components/Paragraph/Paragraph';

export const ResetPage: React.FC = () => {
  return (
    <PageWrapper className="relative h-screen">
      <PageCard>
        <Header />
        <main className="mt-6 flex flex-col gap-6 md:gap-8">
          <AnimationSlideUp delay={0.2} duration={0.6}>
            <div className="flex flex-col justify-between border-2 border-red-500 p-3 rounded-md shadow-lg">
              <Paragraph size="small" className="mb-2">
                Zresetuj obecną grę.
              </Paragraph>
              <Button variant="danger" size="md" className="w-[200px]">
                Zresetuj grę
              </Button>
            </div>
          </AnimationSlideUp>
          <AnimationSlideUp delay={0.4} duration={0.6}>
            <div className="flex flex-col justify-between border-2 border-red-500 p-3 rounded-md shadow-lg">
              <Paragraph size="small" className="mb-2">
                Wyczyść historię zapisanych gier. Operacji tej nie można cofnąć.
              </Paragraph>
              <Paragraph size="small" weight="semibold" className="mb-2 !text-red-500">
                Operacji tej nie można cofnąć.
              </Paragraph>
              <Button variant="danger" size="md" className="w-[200px]">
                Wyczyść historię gier
              </Button>
            </div>
          </AnimationSlideUp>
        </main>
      </PageCard>
    </PageWrapper>
  );
};
