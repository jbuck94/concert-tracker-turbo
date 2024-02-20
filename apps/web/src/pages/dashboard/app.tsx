import { Box, Container, Button, Typography } from '@mui/material';
import { useEventsQuery } from 'apollo-hooks';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import ConcertCard from 'src/components/concerts/ConcertCard';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

App.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function App() {
  const { replace } = useRouter();

  useEffect(() => {
    replace(PATH_DASHBOARD.artist.root);
  }, []);
}

export default App;
