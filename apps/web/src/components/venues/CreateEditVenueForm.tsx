import { useRouter } from 'next/router';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import {
  VenueAutocompleteResult,
  useArtistAutocompleteQuery,
  useVenueAutocompleteQuery,
} from 'apollo-hooks';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';

export const CreateEditVenueForm = () => {
  const [value, setValue] = useState<VenueAutocompleteResult | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<VenueAutocompleteResult[]>(
    []
  );

  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const { data, loading, error } = useVenueAutocompleteQuery({
    variables: {
      input: {
        name: searchTerm as string,
      },
      first: 5,
    },
    skip: !searchTerm,
  });

  // const [createArtist] = useCreateArtistMutation({
  //   // TODO: change this to single artist GET
  //   refetchQueries: (result) => [{ query: ArtistsDocument }],
  // });

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
    setSearchTerm(newValue);
  };

  const onSubmit = async () => {
    // try {
    //   const result = await createArtist({
    //     variables: {
    //       spotifyId: value!.id,
    //     },
    //   });
    //   switch (result.data?.createArtist.__typename) {
    //     case 'MutationCreateArtistSuccess': {
    //       enqueueSnackbar('Created new artist!', { variant: 'success' });
    //       break;
    //     }
    //     default: {
    //       enqueueSnackbar('Failed to create artist', {
    //         variant: 'error',
    //       });
    //       break;
    //     }
    //   }
    //   push(PATH_DASHBOARD.artist.root);
    // } catch (e) {
    //   enqueueSnackbar('Failed to create artist', { variant: 'error' });
    // }
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
            noOptionsText={loading ? 'Loading...' : 'No Venues Found'}
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
                <li {...props}>
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
