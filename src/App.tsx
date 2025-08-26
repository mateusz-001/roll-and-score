import React from 'react';
import { useForm } from 'react-hook-form';

import './App.css';
import { Button } from './components/Button';
import { Content, Dropdown, Item, Label, Separator, Trigger } from './components/Dropdown';
import { Heading } from './components/Heading';
import { Input } from './components/Input';
import { Paragraph } from './components/Paragraph';
import { RadioField } from './components/Radio/RadioField';

function App() {
  const { control } = useForm<{ email: string; fruit: string }>();

  return (
    <div className="flex flex-col items-center gap-4 mb-48">
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
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="danger">Danger Button</Button>
      <Button variant="primary" size="lg">
        Primary Button
      </Button>
      <Button variant="secondary" size="lg">
        Secondary Button
      </Button>
      <Button variant="ghost" size="lg">
        Ghost Button
      </Button>
      <Button variant="danger" size="lg">
        Danger Button
      </Button>
      <Button variant="primary" isLoading>
        Loading Button
      </Button>
      <Button variant="secondary" isLoading>
        Loading Button
      </Button>
      <Button variant="ghost" isLoading>
        Loading Button
      </Button>
      <Button variant="danger" isLoading>
        Loading Button
      </Button>
      <Button variant="primary" size="sm">
        Small Primary Button
      </Button>
      <Button variant="secondary" size="sm">
        Small Secondary Button
      </Button>
      <Button variant="ghost" size="sm">
        Small Ghost Button
      </Button>
      <Button variant="danger" size="sm">
        Small Danger Button
      </Button>
      <Input
        name="example"
        control={control}
        label="Example Input"
        placeholder="Type something..."
        className="mt-4"
        required
      />
      <Dropdown>
        <Trigger asChild>
          <Button variant="primary">Menu</Button>
        </Trigger>

        <Content side="bottom" align="start" offset={8} className="w-56">
          <Label>Quick actions</Label>
          <Item onSelect={() => console.log('New file')}>New file</Item>
          <Item onSelect={() => console.log('Duplicate')}>Duplicate</Item>
          <Separator />
          <Item disabled>Disabled option</Item>
          <Item onSelect={() => console.log('Logout')}>Logout</Item>
        </Content>
      </Dropdown>
      <RadioField
        control={control}
        name="fruit"
        legend="Choose your fruit"
        hint="Pick one fruit only."
        options={[
          { value: 'apple', label: 'Apple', caption: 'Crispy classic' },
          { value: 'banana', label: 'Banana', caption: 'Soft & sweet' },
          { value: 'plum', label: 'Plum', caption: 'Underrated gem' },
        ]}
      />
    </div>
  );
}

export default App;
