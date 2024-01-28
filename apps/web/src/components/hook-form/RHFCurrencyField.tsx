import React from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import Iconify from 'src/components/iconify/Iconify';

const CurrencyFormat = React.forwardRef<NumericFormatProps>(
  function CurrencyFormat(props, ref) {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        valueIsNumericString
        decimalScale={2}
      />
    );
  }
);

type Props = TextFieldProps & {
  name: string;
};

export default function RHFCurrencyField({
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
              inputComponent: CurrencyFormat as any,
              startAdornment: (
                <InputAdornment position={'start'}>
                  <Iconify icon={'material-symbols:attach-money'} width={24} />
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
