import { Card, Container, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { m } from 'framer-motion';

import MotionViewport from 'src/components/animate/MotionViewport';
import { varFade } from 'src/components/animate/variants/fade';

const TESTIMONIALS = [
  {
    quote: `wento has completely transformed the way I track my concert experiences. I used to rely on a messy notes app, but now everything is organized, and I can see detailed stats that make it way more fun to look back on all the shows I've attended.`,
    name: 'Jamie R.',
  },
  {
    quote: `I love that wento is mobile-friendly and super easy to use. It used to take me ages to keep my concert list up to date, but now it's effortless. Plus, being able to search for venues and artists is a game-changer!`,
    name: 'Taylor S.',
  },
  {
    quote: `wento saves me so much time compared to my old spreadsheet setup. The stats feature is my favorite — I had no idea I'd been to so many concerts until I saw the numbers! It's perfect for anyone who wants an organized way to track their music journey.`,
    name: 'Alex M.',
  },
];

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.default,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(5),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'transform 0.3s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

export default function Testimonials() {
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
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">Testimonials Don&apos;t Lie</Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography sx={{ color: 'text.secondary' }}>
              Hear what our users have to say about wento.
            </Typography>
          </m.div>
        </Stack>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
              <m.div variants={varFade().in} style={{ width: '100%' }}>
                <StyledCard>
                  <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                    &quot;{testimonial.quote}&quot;
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                </StyledCard>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledRoot>
  );
}
