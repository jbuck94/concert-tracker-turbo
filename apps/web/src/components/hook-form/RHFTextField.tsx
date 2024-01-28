import { ChangeEvent } from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = TextFieldProps & {
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function RHFTextField({
  name,
  helperText,
  onChange: handleOnChange,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            typeof field.value === 'number' && field.value === 0
              ? ''
              : field.value
          }
          error={!!error}
          helperText={error ? error?.message : helperText}
          onChange={(event) => {
            field.onChange(event);
            if (handleOnChange) handleOnChange(event);
          }}
          {...other}
        />
      )}
    />
  );
}
