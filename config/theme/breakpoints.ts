import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

export default {
  ...createBreakpoints({
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1366,
    },
  }),
};
