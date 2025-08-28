import React from 'react';
import { FieldValues, Control, Path, Controller } from 'react-hook-form';

import { ToggleProps, Toggle } from './Toggle';

export type ToggleFieldProps<T extends FieldValues> = Omit<
  ToggleProps,
  'checked' | 'defaultChecked' | 'onCheckedChange' | 'name'
> & {
  control: Control<T>;
  name: Path<T>;
  rules?: Parameters<typeof Controller<T>>[0]['rules'];
};

export const ToggleField = <T extends FieldValues>({
  control,
  name,
  rules,
  ...rest
}: ToggleFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ref, name }, fieldState }) => (
        <Toggle
          {...rest}
          name={name}
          checked={!!value}
          onCheckedChange={onChange}
          ref={ref}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
