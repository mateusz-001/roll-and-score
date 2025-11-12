import React from 'react';

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
  return (
    <div>
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
        <AnimationStaggerChildren>
          <AnimationSlideUp>
            <Heading level="h1">
              Roll.
              <br />
              <span className="text-primary">Score.</span>
              <br />
              Repeat.
            </Heading>
          </AnimationSlideUp>
          <AnimationSlideUp>
            <Paragraph size="regular" className="mt-4 md:mt-6 lg:max-w-md">
              Zapisuj wyniki gry w kości z rodziną i znajomymi — bez papieru, bez chaosu, z pełnym
              vibe’em. Prosty scoreboard z lokalnym zapisem i czytelnym UI.
            </Paragraph>
          </AnimationSlideUp>
          <AnimationSlideUp>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
              <Button size="lg" onClick={handleSetShowForm}>
                Zacznij grę
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
