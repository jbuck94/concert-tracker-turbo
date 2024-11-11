import { Group, MusicNote, RateReview } from '@mui/icons-material';
import { Box, Card, Chip, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';

import MotionViewport from 'src/components/animate/MotionViewport';
import { varFade } from 'src/components/animate/variants/fade';

const CARDS = [
  {
    icon: <Group fontSize="large" color="primary" />,
    title: 'Connect with Fans',
    comingSoon: true,
    description: 'Find and follow other music enthusiasts.',
  },
  {
    icon: <MusicNote fontSize="large" color="primary" />,
    title: 'Track Concerts',
    comingSoon: false,
    description:
      'Keep a detailed record of all the concerts you have attended.',
  },
  {
    icon: <RateReview fontSize="large" color="primary" />,
    title: 'Rate Performances',
    comingSoon: true,
    description: 'Share your thoughts and read reviews from others.',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
}));

export default function HomeMinimal() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography
              component="div"
              variant="overline"
              sx={{ color: 'text.disabled' }}
            >
              wento
            </Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography variant="h2">Features</Typography>
          </m.div>
        </Stack>

        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <StyledCard elevation={index === 1 ? 24 : 0}>
                {card.comingSoon && (
                  <Chip
                    label="Coming Soon"
                    color="primary"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1,
                    }}
                  />
                )}
                {card.icon}

                <Typography variant="h5" sx={{ my: 2 }}>
                  {card.title}
                </Typography>

                <Typography sx={{ color: 'text.secondary' }}>
                  {card.description}
                </Typography>
              </StyledCard>
            </m.div>
          ))}
        </Box>
      </Container>
    </StyledRoot>
  );
}
