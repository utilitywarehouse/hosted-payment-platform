import breakpoints from './breakpoints';

const fontFamilyAeonikBold = ['Aeonik Bold', 'Work Sans', 'sans-serif'].join();

const typographyConfig = {
  fontFamily: ['Work Sans', 'sans-serif'].join(),
  h1: {
    fontFamily: fontFamilyAeonikBold,
    fontWeight: 400,
    fontSize: '4rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '3.25rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '2.5rem',
    },
  },
  h2: {
    fontFamily: fontFamilyAeonikBold,
    fontWeight: 400,
    fontSize: '2.5rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '2rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.75rem',
    },
  },
  h3: {
    fontFamily: fontFamilyAeonikBold,
    fontWeight: 400,
    fontSize: '2.0625rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '1.5rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1.125rem',
    },
  },
  h4: {
    fontFamily: fontFamilyAeonikBold,
    fontWeight: 400,
    fontSize: '1.25rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '1rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.875rem',
    },
  },
  h5: {
    fontFamily: fontFamilyAeonikBold,
    fontWeight: 400,
    fontSize: '1rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '0.75rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
  button: {
    fontFamily: ['Work Sans SemiBold', 'sans-serif'].join(),
    fontSize: '1rem',
  },
  body1: {
    fontSize: '1.25rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '1.125rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '1rem',
    },
  },
  body2: {
    fontSize: '1rem',
    lineHeight: '1.618rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '0.9375rem',
      lineHeight: '1.516875rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.875rem',
      lineHeight: '1.516875rem',
    },
  },
  caption: {
    fontSize: '0.8125rem',
    [`@media (min-width:600px) and (max-width: ${breakpoints.values.lg}px)`]: {
      fontSize: '0.75rem',
    },
    '@media (max-width: 600px)': {
      fontSize: '0.75rem',
    },
  },
};

export default typographyConfig;
