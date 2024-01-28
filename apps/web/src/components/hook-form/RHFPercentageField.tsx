import React from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import Iconify from 'src/components/iconify/Iconify';

type CustomNumericFormatProps = {
  decimalScale: number;
};

const PercentageFormat = React.forwardRef<
  NumericFormatProps,
  CustomNumericFormatProps
>(function PercentageFormat(props, ref) {
  return <NumericFormat {...props} getInputRef={ref} valueIsNumericString />;
});

type Props = TextFieldProps & {
  decimalScale: number;
  name: string;
};

export default function RHFPercentageField({
  decimalScale,
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
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...other}
            {...field}
            error={!!error}
            value={field.value ? parseFloat(field.value).toFixed(2) : ''}
            fullWidth
            helperText={error ? error?.message : helperText}
            InputProps={{
              inputComponent: PercentageFormat as any,
              inputProps: { decimalScale },
              startAdornment: (
                <InputAdornment position={'start'}>
                  <Iconify icon={'material-symbols:percent'} width={24} />
                </InputAdornment>
              ),
            }}
            onBlur={(e) => {
              field.onBlur();
              const { value } = e.target;
              const sanitizedValue = value ? parseFloat(value).toFixed(2) : '';

              field.value = sanitizedValue;

              field.onChange(sanitizedValue);

              if (handleOnChange) handleOnChange(e);
            }}
            onChange={(e) => {
              field.onChange(e);
              if (handleOnChange) handleOnChange(e);
            }}
          />
        );
      }}
    />
  );
}
