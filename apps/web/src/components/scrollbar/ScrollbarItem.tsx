import { Stack, Typography } from '@mui/material';

type Props = {
  title: string;
  value: number | string;
  color?: string;
};

export default function ScrollbarItem({ title, value, color }: Props) {
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 1,
        minWidth: 200,
      }}
      component={'div'}
    >
      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography
          variant={'subtitle2'}
          sx={{ color: color || 'text.primary' }}
        >
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}
