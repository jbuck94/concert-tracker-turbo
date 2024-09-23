import dynamic from 'next/dynamic';

import { Container, Stack } from '@mui/material';

import useOffSetTop from 'src/hooks/useOffsetTop';
import { HEADER } from 'src/utils/config-global';

const Header = dynamic(() => import('src/layouts/compact/Header'), {
  ssr: false,
});

type Props = {
  children?: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />
      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
