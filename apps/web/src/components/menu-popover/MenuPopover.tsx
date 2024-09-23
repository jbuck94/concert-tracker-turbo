import { Popover, PopoverOrigin } from '@mui/material';

import getPosition from 'src/components/menu-popover/getPosition';
import { StyledArrow } from 'src/components/menu-popover/styles';
import { MenuPopoverProps } from 'src/components/menu-popover/types';

export default function MenuPopover({
  open,
  children,
  arrow = 'top-right',
  disabledArrow,
  sx,
  ...other
}: MenuPopoverProps) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      PaperProps={{
        sx: {
          p: 1,
          width: 'auto',
          overflow: 'inherit',
          ...style,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20, flexShrink: 0 },
          },
          ...sx,
        },
      }}
      {...other}
    >
      {!disabledArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  );
}
