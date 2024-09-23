import { LoadingButton } from '@mui/lab';

import { useAuthContext } from 'src/auth/useAuthContext';

export default function LoginForm() {
  const { login } = useAuthContext();

  const onSubmit = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoadingButton
      fullWidth
      size="large"
      onClick={onSubmit}
      variant="contained"
    >
      Login
    </LoadingButton>
  );
}
