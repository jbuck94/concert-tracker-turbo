import { Theme } from '@mui/material/styles';

import { InputSelectIcon } from 'src/theme/overrides/CustomIcons';

export default function Select(theme: Theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  };
}
