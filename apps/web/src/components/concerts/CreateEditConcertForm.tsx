import { useRouter } from 'next/router';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, List, ListItem, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateUserEventMutation } from 'apollo/generated-types';
import RHFArtistAutocomplete from 'src/components/artists/RHFArtistAutocomplete';
import FormProvider from 'src/components/hook-form/FormProvider';
import RHFDatePicker from 'src/components/hook-form/RHFDatePicker';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import Iconify from 'src/components/iconify/Iconify';
import RHFVenueAutoComplete from 'src/components/venues/RHFVenueAutocomplete';
import { PATH_DASHBOARD } from 'src/routes/paths';

const schema = z.object({
  venue: z.object({ id: z.string(), name: z.string() }),
  date: z.date(),
  notes: z.string({}).nullable(),
  artists: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1, 'You must include at least one artist'),
});

type Artist = {
  id: string;
  name: string;
};

export const CreateEditConcertForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const methods = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onBlur',
    defaultValues: {
      venue: {} as z.infer<typeof schema>['venue'],
      notes: '',
      date: new Date(),
      artists: [] as Artist[],
    },
  });

  const { control, handleSubmit, getValues, formState, watch } = methods;

  const { append, remove, fields } = useFieldArray({
    control,
    name: 'artists',
  });

  const onSubmit = async () => {
    const data = getValues();

    if (!data.venue) {
      return enqueueSnackbar('You must select a venue', { variant: 'warning' });
    }

    try {
      const result = await createEvent({
        variables: {
          input: {
            date: data.date,
            artistSpotifyIds: data.artists.map((artist) => artist.id),
            venueSeatGeekId: data.venue.id,
            notes: data.notes,
          },
        },
      });

      switch (result.data?.createEvent.__typename) {
        case 'MutationCreateEventSuccess': {
          enqueueSnackbar('Created new event!', { variant: 'success' });
          push(PATH_DASHBOARD.user.concerts);
          break;
        }
        case 'ErrorEventExists': {
          return enqueueSnackbar(`This event already exists`, {
            variant: 'warning',
          });
        }
        default:
          return enqueueSnackbar('Failed to create artist', {
            variant: 'error',
          });
      }
    } catch (e) {
      return enqueueSnackbar('Failed to create concert', { variant: 'error' });
    }
  };

  const [createEvent, { loading: createEventLoading }] =
    useCreateUserEventMutation();

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
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="overline"
          sx={{ display: 'block', color: 'text.secondary', mb: 2 }}
        >
          Section Name
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            {/* <RHFTextField name='venue' label='Venue' /> */}
            <RHFVenueAutoComplete name="venue" label="Venue" />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker name="date" label="Date" />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="overline"
              sx={{ display: 'block', color: 'text.secondary' }}
            >
              Artists
            </Typography>
            <List>
              {fields.map((artist, index) => {
                return (
                  <ListItem key={artist.id} sx={{ px: 0 }}>
                    <RHFArtistAutocomplete
                      name={`artists.${index}`}
                      fullWidth
                    />
                    <Button
                      sx={{ ml: 3 }}
                      variant="outlined"
                      color="error"
                      // @ts-ignore
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </Grid>

          <Grid item xs={12} display={'flex'}>
            <Button
              variant="outlined"
              color={formState?.errors?.artists?.message ? 'warning' : 'info'}
              // @ts-ignore
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => append({} as Artist)}
              sx={{
                transition: '.3s',
              }}
            >
              {formState?.errors?.artists?.message
                ? 'Click to add an artist'
                : 'Add Artist'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <RHFTextField name="notes" label="Notes" multiline minRows={3} />
          </Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
            <LoadingButton type="submit" loading={createEventLoading}>
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </Card>
  );
};
