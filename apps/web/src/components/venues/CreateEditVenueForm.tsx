import { useRouter } from 'next/router';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  VenueAutocompleteResult,
  useCreateVenueMutation,
  useVenueAutocompleteQuery,
} from 'apollo/generated-types';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDebouncedState } from '@/hooks/useDebouncedState';

export const CreateEditVenueForm = () => {
  const [value, setValue] = useState<VenueAutocompleteResult | null>(null);
  const [searchResults, setSearchResults] = useState<VenueAutocompleteResult[]>(
    []
  );

  const [debouncedSearch, _, setDebouncedSearch] = useDebouncedState<
    string | null
  >(null);

  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const { data, loading, error } = useVenueAutocompleteQuery({
    variables: {
      input: {
        name: debouncedSearch as string,
      },
      first: 5,
    },
    skip: !debouncedSearch,
  });

  const [createVenue] = useCreateVenueMutation();

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
    setValue(null);
    setDebouncedSearch(newValue);
  };

  const onSubmit = async () => {
    try {
      const result = await createVenue({
        variables: {
          seatGeekId: value!.id,
        },
      });
      switch (result.data?.createVenue.__typename) {
        case 'MutationCreateVenueSuccess': {
          enqueueSnackbar('Created new venue!', { variant: 'success' });
          push(PATH_DASHBOARD.venue.root);
          break;
        }
        default: {
          enqueueSnackbar('Failed to create venue', {
            variant: 'error',
          });
          break;
        }
      }
    } catch (e) {
      enqueueSnackbar('Failed to create artist', { variant: 'error' });
    }
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        p: 2,
        gap: 3,
        zIndex: 0,
      }}
    >
      <Typography
        variant='overline'
        sx={{ display: 'block', color: 'text.secondary' }}
      >
        Section Name
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            value={value}
            isOptionEqualToValue={(option, value) => value.id === option.id}
            getOptionLabel={(option) => option.name}
            noOptionsText={
              loading
                ? 'Loading...'
                : value
                  ? 'No Venues Found'
                  : 'Search for a venue'
            }
            onChange={(_, newValue) => setValue(newValue)}
            onInputChange={(event, newInputValue) =>
              onChangeSearch(newInputValue)
            }
            options={searchResults}
            renderInput={(params) => (
              <TextField {...params} label='Add a location' {...params} />
            )}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.id}>
                  <Grid container alignItems='center'>
                    <Grid item sx={{ display: 'flex', width: 44 }}>
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: 'calc(100% - 44px)',
                        wordWrap: 'break-word',
                      }}
                    >
                      <Box
                        component='span'
                        sx={{
                          fontWeight: 'bold',
                        }}
                      >
                        {option.name}
                      </Box>

                      <Typography variant='body2' color='text.secondary'>
                        {option.addressString}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant='soft'
                LinkComponent={NextLink}
                href={PATH_DASHBOARD.artist.root}
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant='soft'
                color='primary'
                disabled={!value}
                fullWidth
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
