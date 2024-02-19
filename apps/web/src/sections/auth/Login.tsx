import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';

import LoginLayout from 'src/layouts/login/LoginLayout';
import { useAuthContext } from 'src/auth/useAuthContext';
import AuthLoginForm from 'src/sections/auth/AuthLoginForm';
import AuthWithSocial from 'src/sections/auth/AuthWithSocial';

export default function Login() {
  const { method } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant='h4'>Sign in to Minimal</Typography>

        <Stack direction='row' spacing={0.5}>
          <Typography variant='body2'>New user?</Typography>

          <Link variant='subtitle2'>Create an account</Link>
        </Stack>

        <Tooltip title={method} placement='left'>
          <Box
            component='img'
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}