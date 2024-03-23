import { Box, Button, Container } from '@mui/material';
import { useVenuesQuery } from 'apollo-hooks';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import VenueCard from 'src/components/venues/VenueCard';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

Venues.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Venues() {
  const router = useRouter();

  const { data, loading, error } = useVenuesQuery();

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
          heading='Venues'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Venues',
              href: PATH_DASHBOARD.venue.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.venue.create}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New Venue
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
          {data?.venues.edges.map((edge) => {
            return (
              <VenueCard
                key={edge.node.id}
                venue={edge.node}
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

export default Venues;
