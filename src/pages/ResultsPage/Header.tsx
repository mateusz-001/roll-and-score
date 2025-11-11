import React from 'react';

import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';

export const Header: React.FC = () => {
  return (
    <header>
      <Heading level="h2" color="text-primary" className="text-center mb-3 md:mb-4">
        Historia gier
      </Heading>
      <Paragraph className="text-center">
        Gratulacje dla zwycięzców poprzednich rozgrywek! 👑
      </Paragraph>
      <Paragraph color="primary" className="text-center !text-body-xs">
        I tak wam się przyfarciło 😝
      </Paragraph>
    </header>
  );
};
