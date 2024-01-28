import { useTheme } from '@mui/material/styles';
import { Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import useResponsive from '@/hooks/useResponsive';
import Iconify from 'src/components/iconify/Iconify';
import AccountPopover from 'src/layouts/dashboard/header/AccountPopover';

import { HEADER, NAV } from 'src/utils/config-global';
import { bgBlur } from 'src/utils/cssStyles';

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!isDesktop && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
          <Iconify icon='eva:menu-2-fill' />
        </IconButton>
      )}

      <Stack
        flexGrow={1}
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: `calc(100% - ${NAV.W_DASHBOARD + 1}px)`,
          height: HEADER.H_DASHBOARD_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
