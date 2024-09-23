// form
import { FormHelperText } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFormContext } from 'react-hook-form';

type RHFDatePickerProps = DatePickerProps<any> & {
  name: string;
  helperText?: React.ReactNode;
};
export default function RHFDatePicker({
  name,
  helperText,
  onChange: handleOnChange,
  label,
  ...other
}: RHFDatePickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <DatePicker
              {...field}
              label={label}
              inputRef={field.ref}
              value={field.value}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
              onChange={(value, context) => {
                field.onChange(value);
                if (handleOnChange) handleOnChange(value, context);
              }}
              {...other}
            />

            {(!!error || helperText) && (
              <FormHelperText error={!!error}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}
