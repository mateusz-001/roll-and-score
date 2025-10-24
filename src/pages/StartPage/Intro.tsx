import React from 'react';

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
        <div className="order-2 z-10 md:order-1">
          <Heading level="h1">
            Roll.
            <br />
            <span className="text-primary">Score.</span>
            <br />
            Repeat.
          </Heading>
          <Paragraph size="regular" className="mt-4 md:mt-6 lg:max-w-md">
            Zapisuj wyniki gry w kości z rodziną i znajomymi — bez papieru, bez chaosu, z pełnym
            vibe’em. Prosty scoreboard z lokalnym zapisem i czytelnym UI.
          </Paragraph>
          <div className="mt-4 flex flex-wrap gap-3 md:mt-6">
            <Button size="lg" onClick={handleSetShowForm}>
              Zacznij grę
            </Button>
          </div>
        </div>

        <div className="absolute right-0 -bottom-2/3 max-w-md order-1 animate-scale-pulse bg-radial-primary sm:-bottom-3/4 md:order-2 md:-bottom-1/2 xl:right-18">
          <img
            src="/assets/start-page-dices.png"
            alt="Three dice showing different numbers"
            className="max-w-64 sm:max-w-96"
            width={360}
            height={360}
          />
        </div>
      </div>
    </div>
  );
};
