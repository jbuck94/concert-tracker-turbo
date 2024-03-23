import { useState } from 'react';

import { Box } from '@mui/material';
import Main from 'src/layouts/dashboard/Main';

import NavVertical from 'src/layouts/dashboard/nav/NavVertical';
import AuthGuard from 'src/auth/AuthGuard';
import Header from 'src/layouts/dashboard/header/Header';

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          <NavVertical openNav={open} onCloseNav={handleClose} />

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return <AuthGuard> {renderContent()} </AuthGuard>;
}
