import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFNumberField({
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
            value={field.value ?? ''}
            fullWidth
            helperText={error ? error?.message : helperText}
            type="number"
            onWheel={(e) => {
              // https://medium.com/modernnerd-code/how-to-disabled-scrolling-on-html-number-input-in-react-6548841166fb

              // Prevent the input value change
              // @ts-ignore
              https: e.target.blur();

              // Prevent the page/container scrolling
              e.stopPropagation();

              // Refocus immediately, on the next tick (after the currentfunction is done)
              setTimeout(() => {
                // @ts-ignore
                e.target.focus();
              }, 0);
            }}
            inputProps={{ inputMode: 'numeric' }}
            onChange={(e) => {
              e.target.value
                ? field.onChange(parseFloat(e.target.value))
                : field.onChange('');

              if (handleOnChange) handleOnChange(e);
            }}
          />
        );
      }}
    />
  );
}
