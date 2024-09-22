import { Container } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { CreateEditArtistForm } from 'src/components/artists/CreateEditArtistForm';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

ArtistCreate.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function ArtistCreate() {
  const [search, setSearch] = useState('');

  const onChange = async (state: string) => {
    setSearch(state);
  };

  return (
    <>
      <Head>
        <title>wento</title>
      </Head>
      <Container maxWidth='xl'>
        <CustomBreadcrumbs
          heading='New Artist'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Artists',
              href: PATH_DASHBOARD.artist.root,
            },
            { name: 'New' },
          ]}
          // action={
          //   <Button
          //     component={NextLink}
          //     href={PATH_DASHBOARD.artist.create}
          //     variant='contained'
          //     startIcon={<Iconify icon='mingcute:add-line' />}
          //   >
          //     New Artist
          //   </Button>
          // }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <CreateEditArtistForm />
      </Container>
    </>
  );
}

export default ArtistCreate;
