import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  createTheme,
} from '@mui/material/styles';
import merge from 'lodash/merge';

// system
import { customShadows } from 'src/theme/custom-shadows';
import { NextAppDirEmotionCacheProvider } from 'src/theme/next-emotion-cache';
import { contrast } from 'src/theme/options/contrast';
import { darkMode } from 'src/theme/options/dark-mode';
import { presets } from 'src/theme/options/presets';
import { componentsOverrides } from 'src/theme/overrides';
import { palette } from 'src/theme/palette';
import { shadows } from 'src/theme/shadows';
import { typography } from 'src/theme/typography';

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const darkModeOption = darkMode('dark');
  const presetsOption = presets('blue');
  const contrastOption = contrast(false, 'dark');

  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Dark mode: remove if not in use
        darkModeOption,
        // Presets: remove if not in use
        presetsOption,
        // Contrast: remove if not in use
        contrastOption.theme
      ),
    [baseOption, darkModeOption, presetsOption, contrastOption.theme]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(
    componentsOverrides(theme),
    contrastOption.components
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
