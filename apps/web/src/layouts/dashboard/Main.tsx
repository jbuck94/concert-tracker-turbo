import { Box, BoxProps } from '@mui/material';

import useResponsive from 'src/hooks/useResponsive';
import { HEADER, NAV } from 'src/utils/config-global';

const SPACING = 8;

export default function Main({ children, sx, ...other }: BoxProps) {
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(isDesktop && {
          px: 2,
          py: `${HEADER.H_DASHBOARD_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_DASHBOARD}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
