import { customShadows } from 'src/theme/custom-shadows';
import { palette } from 'src/theme/palette';
import { shadows } from 'src/theme/shadows';

export function darkMode(mode: 'light' | 'dark') {
  const theme = {
    palette: palette(mode),
    shadows: shadows(mode),
    customShadows: customShadows(mode),
  };

  return theme;
}
