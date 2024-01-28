// form
import {
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  Switch,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface Props extends Omit<FormControlLabelProps, 'control'> {
  name: string;
  helperText?: React.ReactNode;
}

export default function RHFSwitch({
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
        <>
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(event, checked) => {
                  field.onChange(event);
                  if (handleOnChange) {
                    handleOnChange(event, checked);
                  }
                }}
              />
            }
            {...other}
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
}
