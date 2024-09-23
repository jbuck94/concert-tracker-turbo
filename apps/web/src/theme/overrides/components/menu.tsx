import { Theme } from '@mui/material/styles';

import { menuItem } from 'src/theme/css';

export default function Menu(theme: Theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  };
}
