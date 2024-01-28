import { Box, Container, Button } from '@mui/material';
import { useListArtistsQuery } from 'apollo-hooks';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import ConcertCard from 'src/components/concerts/ConcertCard';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

App.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function App() {
  const { data, error, loading } = useListArtistsQuery();
  console.log({ data, error, loading });

  const router = useRouter();

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

  const handleDelete = useCallback((id: string) => {
    console.info('DELETE', id);
  }, []);

  return (
    <>
      <Head>
        <title>Concert Tracker</title>
      </Head>
      <Container maxWidth='xl'>
        <CustomBreadcrumbs
          heading='Concerts'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Concerts',
              href: 'PATH_DASHBOARD.tour.root',
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={NextLink}
              href={'PATH_DASHBOARD.tour.new'}
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
        <Box
          gap={3}
          display='grid'
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <ConcertCard
            onView={() => handleView('tour.id')}
            onEdit={() => handleEdit('tour.id')}
            onDelete={() => handleDelete('tour.id')}
          />
          <ConcertCard
            onView={() => handleView('tour.id')}
            onEdit={() => handleEdit('tour.id')}
            onDelete={() => handleDelete('tour.id')}
          />
          <ConcertCard
            onView={() => handleView('tour.id')}
            onEdit={() => handleEdit('tour.id')}
            onDelete={() => handleDelete('tour.id')}
          />
          <ConcertCard
            onView={() => handleView('tour.id')}
            onEdit={() => handleEdit('tour.id')}
            onDelete={() => handleDelete('tour.id')}
          />
          <ConcertCard
            onView={() => handleView('tour.id')}
            onEdit={() => handleEdit('tour.id')}
            onDelete={() => handleDelete('tour.id')}
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
