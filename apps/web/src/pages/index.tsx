// next
import Head from 'next/head';

import { Box, useTheme } from '@mui/material';

import ScrollProgress from 'src/components/scrollbar/ScrollProgress';
import MainLayout from 'src/layouts/Main';
import HomeHero from 'src/sections/home/HomeHero';
import HomeMinimal from 'src/sections/home/HomeMinimal';
import Testimonials from 'src/sections/home/HomeTestimonials';

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default function HomePage() {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>wento</title>
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
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Testimonials />
      </Box>
    </>
  );
}
