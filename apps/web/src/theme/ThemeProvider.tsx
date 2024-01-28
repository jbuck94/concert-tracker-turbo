import { CssBaseline } from '@mui/material';
import {
  ThemeProvider as MUIThemeProvider,
  ThemeOptions,
  createTheme,
} from '@mui/material/styles';

import customShadows from 'src/theme/customShadows';
import GlobalStyles from 'src/theme/globalStyles';
import ComponentsOverride from 'src/theme/overrides';
import palette from 'src/theme/palette';
import shadows from 'src/theme/shadows';
import typography from 'src/theme/typography';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const themeOptions: ThemeOptions = {
    palette: palette('dark'),
    typography,
    shape: { borderRadius: 8 },
    direction: 'rtl',
    shadows: shadows('dark'),
    customShadows: customShadows('dark'),
  };

  const theme = createTheme(themeOptions);

  theme.components = ComponentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
