import Box from '@mui/material/Box';
import { CardProps } from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { ColorSchema } from 'src/theme/palette';
import { bgGradient } from 'src/utils/cssStyles';

interface Props extends CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: ColorSchema;
}

export default function AnalyticsWidgetSummary({
  title,
  value,
  icon,
  color = 'primary',
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.1),
          endColor: alpha(theme.palette[color].main, 0.5),
        }),
        py: 2,
        borderRadius: 2,
        textAlign: 'center',
        color: `${color}.darker`,
        backgroundColor: 'common.white',

        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 48, height: 48, mb: 1 }}>{icon}</Box>}

      <div
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '80%' }}
      >
        <Typography variant="h4" noWrap>
          {value}
        </Typography>
      </div>

      <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
        {title}
      </Typography>
    </Stack>
  );
}
