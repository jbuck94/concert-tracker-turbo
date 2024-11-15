import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { m, useScroll } from 'framer-motion';

import MotionContainer from 'src/components/animate/MotionContainer';
import { varFade } from 'src/components/animate/variants/fade';
import useResponsive from 'src/hooks/useResponsive';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { bgBlur, bgGradient, textGradient } from 'src/theme/css';
import { secondaryFont } from 'src/theme/typography';
import { HEADER } from 'src/utils/config-global';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(
      theme.palette.background.default,
      theme.palette.mode === 'light' ? 0.9 : 0.94
    ),
    imgUrl: '/card-grid.png',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
  },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1,
  marginBottom: 24,
  letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${64 / 16}rem`,
  fontFamily: secondaryFont.style.fontFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  top: -80,
  width: 480,
  right: -80,
  height: 480,
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

type StyledPolygonProps = {
  opacity?: number;
  anchor?: 'left' | 'right';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(
  ({ opacity = 1, anchor = 'left', theme }) => ({
    ...bgBlur({
      opacity,
      color: theme.palette.background.default,
    }),
    zIndex: 9,
    bottom: 0,
    height: 80,
    width: '50%',
    position: 'absolute',
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    ...(anchor === 'left' && {
      left: 0,
    }),
    ...(anchor === 'right' && {
      right: 0,
      transform: 'scaleX(-1)',
    }),
  })
);

// ----------------------------------------------------------------------

export default function HomeHero() {
  const mdUp = useResponsive('up', 'md');
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        opacity: opacity > 0 ? opacity : 0,
        mt: {
          md: `-${HEADER.H_DASHBOARD_DESKTOP_OFFSET + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          Track your concerts with
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          wento
        </StyledTextGradient>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack
          spacing={1.5}
          direction={{ xs: 'column-reverse', sm: 'row' }}
          sx={{ mb: 5 }}
        >
          <Stack alignItems="center" spacing={2}>
            <Button
              component={Link}
              href={PATH_DASHBOARD.root}
              color="inherit"
              size="large"
              variant="contained"
            >
              Get Started Free
            </Button>
          </Stack>
        </Stack>
      </m.div>
    </Stack>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={8}>
                {renderDescription}
              </Grid>
            </Grid>
          </Container>

          {mdUp && <StyledEllipseTop />}
          <StyledEllipseBottom />
        </StyledWrapper>
      </StyledRoot>

      {mdUp && (
        <>
          <StyledPolygon />
          <StyledPolygon anchor="right" opacity={0.48} />
          <StyledPolygon
            anchor="right"
            opacity={0.48}
            sx={{ height: 48, zIndex: 10 }}
          />
          <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
        </>
      )}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}
