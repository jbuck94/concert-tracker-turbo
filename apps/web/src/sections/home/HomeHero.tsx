import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { m, useScroll } from 'framer-motion';

import MotionContainer from 'src/components/animate/MotionContainer';
import { varFade } from 'src/components/animate/variants/fade';
import Iconify from 'src/components/iconify/Iconify';
import useResponsive from 'src/hooks/useResponsive';
import { PATH_AUTH } from 'src/routes/paths';
import { secondaryFont } from 'src/theme/typography';
import { bgGradient, textGradient } from 'src/utils/cssStyles';

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === 'light' ? 0.9 : 0.94
    ),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  // maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: secondaryFont.style.fontFamily,
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledRoot sx={{ ...(hide && { opacity: 0 }) }}>
        <Container component={MotionContainer} sx={{ height: 1 }}>
          <Grid container spacing={2} sx={{ height: 1 }}>
            <Grid item xs={12} sx={{ height: 1 }}>
              <Description />
            </Grid>
          </Grid>
        </Container>
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

function Description() {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Track your concerts with
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          wento
        </StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack
          spacing={1.5}
          direction={{ xs: 'column-reverse', sm: 'row' }}
          sx={{ my: 3 }}
        >
          <Stack alignItems="center" spacing={2}>
            <Button
              component={NextLink}
              href={PATH_AUTH.login}
              color="inherit"
              size="large"
              variant="contained"
              startIcon={<Iconify icon="eva:music-fill" width={24} />}
              sx={{
                bgcolor: 'text.primary',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              Get Started For Free
            </Button>
          </Stack>
        </Stack>
      </m.div>
    </StyledDescription>
  );
}
