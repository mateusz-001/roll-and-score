import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  AnimationDiceSpring,
  AnimationSlideUp,
  AnimationStaggerChildren,
} from '@/components/Animations';
import { Button } from '@/components/Button';
import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

interface Props {
  handleSetShowForm: () => void;
}

export const Intro: React.FC<Props> = ({ handleSetShowForm }) => {
  const { t } = useTranslation(['start', 'common']);

  return (
    <div>
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
        <AnimationStaggerChildren>
          <AnimationSlideUp>
            <Heading level="h1">
              {t('start:roll')}.
              <br />
              <span className="text-primary">{t('start:score')}.</span>
              <br />
              {t('start:repeat')}.
            </Heading>
          </AnimationSlideUp>
          <AnimationSlideUp>
            <Paragraph size="regular" className="mt-4 md:mt-6 lg:max-w-md">
              {t('start:description')}
            </Paragraph>
          </AnimationSlideUp>
          <AnimationSlideUp>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
              <Button size="lg" onClick={handleSetShowForm}>
                {t('common:buttons.start_game')}
              </Button>
            </div>
          </AnimationSlideUp>
        </AnimationStaggerChildren>

        <AnimationDiceSpring>
          <img
            src="/assets/start-page-dices.png"
            alt="Three dice showing different numbers"
            className="max-w-64 sm:max-w-96"
            width={360}
            height={360}
          />
        </AnimationDiceSpring>
      </div>
    </div>
  );
};
