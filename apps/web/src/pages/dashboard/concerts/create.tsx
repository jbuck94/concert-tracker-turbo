import Head from 'next/head';

import { Container } from '@mui/material';

import { CreateEditConcertForm } from 'src/components/concerts/CreateEditConcertForm';
// import { CreateEditConcertForm } from 'src/components/concerts/CreateEditConcertForm';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

ConcertCreate.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function ConcertCreate() {
  return (
    <>
      <Head>
        <title>wento</title>
      </Head>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="New Concert"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Concerts',
              href: PATH_DASHBOARD.concert.root,
            },
            { name: 'New' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <CreateEditConcertForm />
      </Container>
    </>
  );
}

export default ConcertCreate;
