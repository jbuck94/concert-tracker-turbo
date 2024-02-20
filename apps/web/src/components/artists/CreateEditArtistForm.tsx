import { useRouter } from 'next/router';

import {
  Autocomplete,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  ArtistsDocument,
  SpotifyArtistFragment,
  useArtistAutocompleteQuery,
  useCreateArtistMutation,
} from 'apollo-hooks';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useDebouncedState } from '@/hooks/useDebouncedState';

export const CreateEditArtistForm = () => {
  const [value, setValue] = useState<SpotifyArtistFragment | null>(null);
  const [debouncedSearch, _, setDebouncedSearch] = useDebouncedState<
    string | null
  >(null);

  const [searchResults, setSearchResults] = useState<SpotifyArtistFragment[]>(
    []
  );

  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const { data, loading, error } = useArtistAutocompleteQuery({
    variables: {
      input: {
        name: debouncedSearch as string,
      },
      first: 5,
    },
    skip: !debouncedSearch,
  });

  const [createArtist] = useCreateArtistMutation({
    // TODO: change this to single artist GET
    refetchQueries: (result) => [{ query: ArtistsDocument }],
  });

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
    setValue(null);
    setDebouncedSearch(newValue);
  };

  const onSubmit = async () => {
    try {
      const result = await createArtist({
        variables: {
          spotifyId: value!.id,
        },
      });

      switch (result.data?.createArtist.__typename) {
        case 'MutationCreateArtistSuccess': {
          enqueueSnackbar('Created new artist!', { variant: 'success' });
          break;
        }
        default: {
          enqueueSnackbar('Failed to create artist', {
            variant: 'error',
          });
          break;
        }
      }
      push(PATH_DASHBOARD.artist.root);
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
            noOptionsText={loading ? 'Loading...' : 'No Artists Found'}
            onInputChange={(_, value) => onChangeSearch(value)}
            onChange={(_, value) => setValue(value)}
            options={searchResults}
            renderInput={(params) => (
              <TextField label={'Search Artists'} error={!!error} {...params} />
            )}
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
