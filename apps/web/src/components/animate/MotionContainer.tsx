import { Box, BoxProps } from '@mui/material';
import { MotionProps, m } from 'framer-motion';

import { varContainer } from 'src/components/animate/variants/container';

type IProps = BoxProps & MotionProps;

export interface Props extends IProps {
  animate?: boolean;
  action?: boolean;
}

export default function MotionContainer({
  animate,
  action = false,
  children,
  ...other
}: Props) {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
