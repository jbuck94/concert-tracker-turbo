import {
  PaletteOptions,
  ThemeProvider,
  alpha,
  createTheme,
  useTheme,
} from '@mui/material/styles';
import merge from 'lodash/merge';

type Props = {
  children: React.ReactNode;
};

export default function ThemeColorPresets({ children }: Props) {
  const outerTheme = useTheme();

  const palette: PaletteOptions['primary'] = {
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#FFFFFF',
  };

  const themeOptions = {
    palette: {
      primary: palette,
    },
    customShadows: {
      primary: `0 8px 16px 0 ${alpha(palette.main, 0.24)}`,
    },
  };

  const theme = createTheme(merge(outerTheme, themeOptions));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
