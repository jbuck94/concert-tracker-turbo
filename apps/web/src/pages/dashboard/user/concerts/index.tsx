import {
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import { EventFragment, useMyEventsQuery } from 'apollo/generated-types';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Head from 'next/head';
import NextLink from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import ConcertCard from 'src/components/concerts/ConcertCard';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ConcertsTable } from 'src/components/concerts/ConcertsTable';

App.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

enum ViewMode {
  LIST = 'LIST',
  GRID = 'GRID',
}

function App() {
  const router = useRouter();

  const [search, setSearch] = useState('');

  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);

  const { data, loading, error } = useMyEventsQuery();

  const handleView = useCallback(
    (id: string) => {
      router.push('paths.dashboard.tour.details(id)');
    },
    [router]
  );

  const handleEdit = useCallback(
    (id: string) => {
      router.push('paths.dashboard.tour.edit(id)');
    },
    [router]
  );

  const handleDelete = useCallback((id: string) => {}, []);

  const handleChangeViewMode = (
    _event: React.MouseEvent<HTMLElement>,
    value: ViewMode
  ) => {
    setViewMode(value);
  };

  const events = useMemo<EventFragment[] | undefined>(() => {
    if (!data?.me) {
      return;
    }

    return data.me.events.edges.map((userEvents) => userEvents.node.event);
  }, [data]);

  return (
    <>
      <Head>
        <title>wento</title>
      </Head>
      <Container maxWidth='xl'>
        <CustomBreadcrumbs
          heading='My Concerts'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Concerts',
              href: PATH_DASHBOARD.concert.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.concert.create}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New Concert
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Stack
          flexDirection={'row'}
          spacing={3}
          alignItems='center'
          marginY={3}
        >
          <TextField
            fullWidth
            placeholder='Search'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleChangeViewMode}
          >
            <Tooltip title='List View'>
              <ToggleButton value={ViewMode.GRID}>
                <GridViewOutlinedIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title='Grid View'>
              <ToggleButton value={ViewMode.LIST}>
                <MenuOutlinedIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Stack>

        {viewMode === ViewMode.LIST && (
          <Box>
            <ConcertsTable events={events ?? []} />
          </Box>
        )}

        {viewMode === ViewMode.GRID && (
          <Box
            gap={3}
            display='grid'
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
          >
            {events?.map((event) => {
              return (
                <ConcertCard
                  key={event.id}
                  event={event}
                  onView={() => handleView('tour.id')}
                  onEdit={() => handleEdit('tour.id')}
                  onDelete={() => handleDelete('tour.id')}
                />
              );
            })}
          </Box>
        )}
      </Container>
    </>
  );
}

export default App;
