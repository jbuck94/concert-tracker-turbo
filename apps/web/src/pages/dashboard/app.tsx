import { Box, Container, Button, Typography } from '@mui/material';
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
  console.log('data: ', data);

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
        <Typography>Concert Tracker</Typography>
      </Container>
    </>
  );
}

export default App;
