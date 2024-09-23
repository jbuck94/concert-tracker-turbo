import { useEffect, useState } from 'react';

import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Controller, useFormContext } from 'react-hook-form';

import {
  SpotifyArtistFragment,
  useArtistAutocompleteQuery,
} from 'apollo/generated-types';
import { useDebouncedState } from 'src/hooks/useDebouncedState';

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

export default function RHFArtistAutocomplete<
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
  Props<SpotifyArtistFragment, Multiple, DisableClearable, FreeSolo>,
  'renderInput'
>) {
  const { control, setValue } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const [searchResults, setSearchResults] = useState<SpotifyArtistFragment[]>(
    []
  );

  const [debouncedSearch, _, setDebouncedSearch] = useDebouncedState<
    string | null
  >(null);

  const { data, loading, error } = useArtistAutocompleteQuery({
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
      enqueueSnackbar('Failed to load artists - please try again', {
        variant: 'error',
      });
    }
  }, [error, enqueueSnackbar]);

  useEffect(() => {
    const results = (
      data?.artistAutocomplete.edges || []
    ).map<SpotifyArtistFragment>((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
    }));

    setSearchResults(results);
  }, [data?.artistAutocomplete.edges]);

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
          getOptionKey={(option) => {
            return typeof option === 'string'
              ? option
              : 'id' in option
                ? option.id
                : '';
          }}
          getOptionLabel={(option) => {
            return typeof option === 'string'
              ? option
              : 'id' in option
                ? option.name
                : '';
          }}
          noOptionsText={loading ? 'Loading...' : 'No Artists Found'}
          options={searchResults}
          {...other}
        />
      )}
    />
  );
}
