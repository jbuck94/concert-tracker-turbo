// next
import Head from 'next/head';

import { Box } from '@mui/material';

import ScrollProgress from 'src/components/scrollbar/ScrollProgress';
import MainLayout from 'src/layouts/Main';
import HomeHero from 'src/sections/home/HomeHero';
import HomeMinimal from 'src/sections/home/HomeMinimal';

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout> {page} </MainLayout>
);

export default function HomePage() {
  return (
    <>
      <Head>
        <title> The starting point for your next project | Minimal UI</title>
      </Head>

      <ScrollProgress />

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />
      </Box>
    </>
  );
}
