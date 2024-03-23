import { Box, Button, Container } from '@mui/material';
import { useEventsQuery } from 'apollo-hooks';
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
  const router = useRouter();

  const { data, loading, error } = useEventsQuery();
  console.log({ data, loading, error });

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
        <Box
          gap={3}
          display='grid'
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {data?.events.edges.map((edge) => {
            return (
              <ConcertCard
                key={edge.node.id}
                event={edge.node}
                onView={() => handleView('tour.id')}
                onEdit={() => handleEdit('tour.id')}
                onDelete={() => handleDelete('tour.id')}
              />
            );
          })}
        </Box>
      </Container>
    </>
  );
}

export default App;
