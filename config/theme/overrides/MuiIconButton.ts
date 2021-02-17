import { ButtonClassKey, SimplePaletteColorOptions } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import {
  CreateCSSProperties,
  CSSProperties,
} from '@material-ui/core/styles/withStyles';
import breakpoints from '../breakpoints';

const getMuiIconButton = (
  theme: PaletteOptions,
  // eslint-disable-next-line @typescript-eslint/ban-types
): Partial<Record<ButtonClassKey, CSSProperties | CreateCSSProperties<{}>>> => {
  const secondaryColors = theme.secondary as SimplePaletteColorOptions;

  return {
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid ${secondaryColors.main}`,
      width: '3rem',
      height: '3rem',
      padding: 0,
      backgroundColor: 'transparent',
      transition: 'all .3s ease',
      '& span': {
        height: '100%',
      },
      '& img': {
        width: '50%',
        height: '50%',
      },
      [`@media (min-width: ${breakpoints.values.lg}px)`]: {
        width: '3.5rem',
        height: '3.5rem',
      },
      '&:hover,&:focus': {
        backgroundColor: 'transparent',
        border: `2px solid ${theme.common?.white}`,
        '& img': {
          filter: 'brightness(4)',
        },
      },
    },
  };
};

export default getMuiIconButton;
