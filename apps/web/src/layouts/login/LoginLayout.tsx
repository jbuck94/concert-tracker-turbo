import { Stack } from '@mui/material';

import Logo from 'src/components/logo/Logo';
import { StyledContent, StyledRoot } from 'src/layouts/login/styles';

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      {/* NOTE (jim) - this is cramping us on tracking links page... */}
      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
