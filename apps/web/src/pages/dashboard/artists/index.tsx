import { Box, Button, Container } from '@mui/material';
import { useArtistsQuery } from 'apollo-hooks';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import ArtistCard from 'src/components/artists/ArtistCard';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

Artists.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function Artists() {
  const router = useRouter();

  const { data, loading, error } = useArtistsQuery({});

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
          heading='Artists'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Artists',
              href: PATH_DASHBOARD.artist.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={NextLink}
              href={PATH_DASHBOARD.artist.create}
              variant='contained'
              startIcon={<Iconify icon='mingcute:add-line' />}
            >
              New Artist
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
          {data?.artists.edges.map((edge) => {
            return (
              <ArtistCard
                key={edge.node.id}
                artist={edge.node}
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

export default Artists;
