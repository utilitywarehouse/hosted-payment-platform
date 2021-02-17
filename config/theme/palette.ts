import { darken, lighten } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const colors = {
  midnightBlue: "#1e0a46",
  purple: "#550091",
  grape: "#a66de8",
  cyan: "#75a7fd",
  contrastCyan: "#b9d2fd",
  lightTint: "#f5f0f8",
  maroon: "#ce2261",
  green: "#1b7e48",
  lightGreen: "#62dd99",
  white: "#fff",
  black: "#000",
  blue: "#0861fd",
  pink: "#f495f9",
};

export const lightTheme: PaletteOptions = {
  type: "light",
  common: {
    white: colors.white,
    black: colors.black,
  },
  primary: {
    light: lighten(colors.purple, 0.4),
    main: colors.purple,
    dark: darken(colors.purple, 0.4),
    contrastText: colors.white,
  },
  secondary: {
    light: lighten(colors.cyan, 0.4),
    main: colors.cyan,
    dark: darken(colors.cyan, 0.4),
    contrastText: colors.midnightBlue,
  },
  background: {
    paper: colors.lightTint,
    default: colors.white,
  },
  error: {
    main: colors.maroon,
  },
  success: {
    main: colors.green,
  },
  text: {
    primary: colors.midnightBlue,
    disabled: colors.midnightBlue,
    secondary: colors.white,
  },
  action: {
    focus: colors.blue,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  backdrops: {
    level0: colors.midnightBlue,
    level1: colors.purple,
  },
  line: {
    light: lighten(colors.pink, 0.7),
    main: colors.pink,
    dark: darken(colors.pink, 0.4),
  },
};
