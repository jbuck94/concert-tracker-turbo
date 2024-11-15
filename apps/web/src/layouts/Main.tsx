// next
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// @mui
import { Box } from '@mui/material';
//
const Header = dynamic(() => import('src/layouts/compact/Header.tsx'), {
  ssr: false,
});

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header isOffset={false} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 11 },
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
