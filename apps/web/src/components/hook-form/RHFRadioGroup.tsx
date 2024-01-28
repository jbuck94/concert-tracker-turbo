// form
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = RadioGroupProps & {
  name: string;
  options: { label: string; value: any }[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  disabled?: boolean;
};

export default function RHFRadioGroup({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  onChange: handleOnChange,
  ...other
}: Props) {
  const { control } = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel
              component="legend"
              id={labelledby}
              sx={{ typography: 'body2' }}
            >
              {label}
            </FormLabel>
          )}

          <Stack
            direction={row ? 'row' : 'column'}
            alignItems={row ? 'center' : undefined}
            spacing={spacing || 2}
          >
            <RadioGroup
              {...field}
              aria-labelledby={labelledby}
              row={row}
              onChange={(event, value) => {
                field.onChange(event);
                if (handleOnChange) {
                  handleOnChange(event, value);
                }
              }}
              {...other}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  disabled={other.disabled}
                  sx={{
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 0,
                      '&:not(:last-of-type)': {
                        mr: spacing || 2,
                      },
                    }),
                  }}
                />
              ))}
            </RadioGroup>
          </Stack>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
