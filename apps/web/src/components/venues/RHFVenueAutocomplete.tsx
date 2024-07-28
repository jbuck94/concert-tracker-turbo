import { useDebouncedState } from '@/hooks/useDebouncedState';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import {
  VenueAutocompleteResult,
  useVenueAutocompleteQuery,
} from 'apollo-hooks';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'options'
  > {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
}

export default function RHFVenueAutoComplete<
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  helperText,
  freeSolo,
  ...other
}: Omit<
  Props<VenueAutocompleteResult, Multiple, DisableClearable, FreeSolo>,
  'renderInput'
>) {
  const { control, setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const [searchResults, setSearchResults] = useState<VenueAutocompleteResult[]>(
    []
  );

  const [debouncedSearch, _, setDebouncedSearch] = useDebouncedState<
    string | null
  >(null);

  const { data, loading, error } = useVenueAutocompleteQuery({
    variables: {
      input: {
        name: debouncedSearch as string,
      },
      first: 5,
    },
    skip: !debouncedSearch,
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar('Failed to load venues - please try again', {
        variant: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    const results = (
      data?.venueAutocomplete.edges || []
    ).map<VenueAutocompleteResult>((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      addressString: edge.node.addressString,
    }));

    setSearchResults(results);
  }, [data?.venueAutocomplete.edges]);

  const onChangeSearch = (newValue: string) => {
    setValue(name, null);
    setDebouncedSearch(newValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          value={field.value ?? null}
          freeSolo={undefined}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          onInputChange={(_, value) => onChangeSearch(value)}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
            />
          )}
          isOptionEqualToValue={(option, value) => value?.id === option?.id}
          getOptionLabel={(option) => {
            return typeof option === 'string'
              ? option
              : 'id' in option
                ? option.name
                : '';
          }}
          noOptionsText={loading ? 'Loading...' : 'No Venues Found'}
          options={searchResults}
          {...other}
        />
      )}
    />
  );
}
