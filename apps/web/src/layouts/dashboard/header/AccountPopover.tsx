import { useState } from 'react';

import { useRouter } from 'next/router';

import { alpha } from '@mui/material/styles';
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import { PATH_AUTH, PATH_DASHBOARD } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import MenuPopover from 'src/components/menu-popover/MenuPopover';
import CustomAvatar from 'src/components/custom-avatar/CustomAvatar';
import { IconButtonAnimate } from 'src/components/animate/IconButtonAnimate';

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
];

export default function AccountPopover() {
  const { replace, push } = useRouter();

  const { user, logout } = useAuthContext();

  const userName =
    user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email;

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    push(path);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={''} alt={userName} name={userName} />
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {userName}
          </Typography>

          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
