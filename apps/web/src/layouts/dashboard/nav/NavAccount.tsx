import NextLink from 'next/link';

import { Box, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { useAuthContext } from 'src/auth/useAuthContext';
import CustomAvatar from 'src/components/custom-avatar/CustomAvatar';

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavAccount() {
  const { user } = useAuthContext();

  const userName =
    user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email;

  return (
    <Link component={NextLink} href="" underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar
          // src={user?.photoURL}
          alt={userName}
          name={userName}
        />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {userName}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {user?.email}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
