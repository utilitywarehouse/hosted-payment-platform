import { ThemeOptions } from '@material-ui/core/styles';

import breakpoints from './breakpoints';
import getMuiButton from './overrides/MuiButton';
import getMuiIconButton from './overrides/MuiIconButton';
import { lightTheme } from './palette';
import typographyConfig from './typography';

const theme: ThemeOptions = {
  breakpoints,
  palette: lightTheme,
  typography: typographyConfig,
  overrides: {
    MuiButton: getMuiButton(lightTheme),
    MuiIconButton: getMuiIconButton(lightTheme),
    MuiTypography: {
      root: {
        '& h1': typographyConfig.h1,
        '& h2': typographyConfig.h2,
        '& h3': typographyConfig.h3,
        '& h4': typographyConfig.h4,
        '& h5': typographyConfig.h5,
      },
    },
  },
};

export default theme;
