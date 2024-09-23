import { Link, Stack, Tooltip, Typography } from '@mui/material';

import { useAuthContext } from 'src/auth/useAuthContext';
import Logo from 'src/components/logo/Logo';
import LoginLayout from 'src/layouts/login/LoginLayout';
import AuthLoginForm from 'src/sections/auth/AuthLoginForm';

export default function Login() {
  const { method, login } = useAuthContext();

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to wento</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link
            onClick={() =>
              login({ authorizationParams: { screen_hint: 'signup' } })
            }
          >
            Create an account
          </Link>
        </Stack>

        <Tooltip title={method} placement="left">
          <Logo
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
