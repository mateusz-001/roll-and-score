import * as React from 'react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

import { RadioGroup, RadioItem, type RadioGroupProps } from '@/components/Radio';

type Option = {
  value: string;
  label: React.ReactNode;
  caption?: React.ReactNode;
  disabled?: boolean;
};

export type RadioFieldProps<TFieldValues extends FieldValues> = Omit<
  RadioGroupProps,
  'name' | 'children'
> & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  options: Option[];
};

export const RadioField = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  legend,
  hint,
  error,
  orientation,
  ...groupProps
}: RadioFieldProps<TFieldValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <RadioGroup
          name={field.name}
          legend={legend}
          hint={hint}
          error={error ?? fieldState.error?.message}
          orientation={orientation}
          {...groupProps}
        >
          {options.map(opt => (
            <RadioItem
              key={opt.value}
              value={opt.value}
              checked={field.value === opt.value}
              onCheckedChange={val => field.onChange(val)}
              label={opt.label}
              caption={opt.caption}
              disabled={opt.disabled}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};
