import './App.css';

import { Heading } from './components/Heading';

function App() {
  return (
    <div className="flex flex-col gap-4">
      <Heading level="h1">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h2">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h3">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h4">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h5">Vite + React + TypeScript + Tailwind CSS</Heading>
      <Heading level="h6">Vite + React + TypeScript + Tailwind CSS</Heading>
    </div>
  );
}

export default App;
