import './App.css';

import { Heading } from './components/Heading';
import { Paragraph } from './components/Paragraph';

function App() {
  return (
    <div className="flex flex-col gap-4">
      <Heading level="h1">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h2">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h3">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h4">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h5">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h6">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Paragraph size="large" color="primary" weight="bold">
        This is a large paragraph with primary color and bold weight.
      </Paragraph>
      <Paragraph size="regular" color="secondary" weight="semibold">
        This is a regular paragraph with secondary color and semibold weight.
      </Paragraph>
      <Paragraph size="small" color="accent" weight="medium">
        This is a small paragraph with accent color and medium weight.
      </Paragraph>
      <Paragraph size="small" color="gray" weight="normal">
        This is a small paragraph with gray color and normal weight.
      </Paragraph>
      <Paragraph size="regular" color="white" weight="normal">
        This is a regular paragraph with white color and normal weight.
      </Paragraph>
      <Paragraph as="span" size="large" color="text" weight="bold">
        This is a large span paragraph with text color and bold weight.
      </Paragraph>
      <Paragraph as="span" size="regular" color="primary" weight="semibold">
        This is a regular span paragraph with primary color and semibold weight.
      </Paragraph>
      <Paragraph as="span" size="small" color="secondary" weight="medium">
        This is a small span paragraph with secondary color and medium weight.
      </Paragraph>
      <Paragraph as="span" size="small" color="accent" weight="normal">
        This is a small span paragraph with accent color and normal weight.
      </Paragraph>
    </div>
  );
}

export default App;
