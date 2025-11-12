import { Heading } from '@/components/Heading';
import { Paragraph } from '@/components/Paragraph';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header>
      <Heading level="h2" color="text-primary" className="text-center mb-3 md:mb-4">
        Zresetuj
      </Heading>
      <Paragraph className="text-center">
        Strona słuąca do resetowania gry lub historii gier.
      </Paragraph>
    </header>
  );
};
