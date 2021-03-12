import {
  ButtonClassKey,
  fade,
  SimplePaletteColorOptions,
} from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import {
  CreateCSSProperties,
  CSSProperties,
} from "@material-ui/core/styles/withStyles";
import breakpoints from "../breakpoints";

const getMuiButton = (
  theme: PaletteOptions
  // eslint-disable-next-line @typescript-eslint/ban-types
): Partial<Record<ButtonClassKey, CSSProperties | CreateCSSProperties<{}>>> => {
  const primaryColors = theme.primary as SimplePaletteColorOptions;
  const secondaryColors = theme.secondary as SimplePaletteColorOptions;

  return {
    root: {
      padding: "none",
      textTransform: "none",
      paddingLeft: "1.5rem",
      paddingRight: "1.5rem",
      fontSize: "1.125rem",
      borderRadius: "3.5rem",
      height: "2.5rem",
      whiteSpace: "nowrap",
      [`@media (max-width: ${breakpoints.values.md}px)`]: {
        paddingLeft: "1rem",
        paddingRight: "1rem",
        fontSize: "1rem",
        height: "2rem",
      },
    },
    sizeLarge: {
      padding: "none",
      textTransform: "none",
      paddingLeft: "2rem",
      paddingRight: "2rem",
      fontSize: "1.125rem",
      borderRadius: "3.5rem",
      height: "3.5rem",
      [`@media (max-width: ${breakpoints.values.md}px)`]: {
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        fontSize: "1rem",
        height: "3rem",
      },
    },
    contained: {
      boxShadow: "none",
    },
    containedPrimary: {
      "&:hover": {
        boxShadow: "none",
        backgroundColor: primaryColors.light,
        "&.Mui-disabled": {
          backgroundColor: fade(primaryColors.main, 0.3),
        },
      },
      "&.Mui-disabled": {
        backgroundColor: fade(primaryColors.main, 0.3),
        color: primaryColors.contrastText,
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
    },
    containedSecondary: {
      "&:hover": {
        boxShadow: "none",
        backgroundColor: secondaryColors.light,
        "&.Mui-disabled": {
          backgroundColor: fade(secondaryColors.main, 0.3),
        },
      },
      "&.Mui-disabled": {
        opacity: 0.25,
        backgroundColor: fade(secondaryColors.main, 0.3),
        color: secondaryColors.contrastText,
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
    },
    outlined: {
      border: `2px solid ${secondaryColors.main}`,
      backgroundColor: "transparent",
      padding: "none",
    },
    outlinedPrimary: {
      border: `2px solid ${secondaryColors.main}`,
      backgroundColor: "transparent",
      padding: "none",
      color: primaryColors.contrastText,
      "&:hover": {
        border: `2px solid ${primaryColors.contrastText}`,
        backgroundColor: "transparent",
      },
      "&.Mui-disabled": {
        opacity: 0.25,
        color: primaryColors.contrastText,
        border: `2px solid ${secondaryColors.main}`,
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
      "&.Mui-disabled:hover": {
        backgroundColor: "transparent",
        borderColor: secondaryColors.main,
      },
    },
    outlinedSecondary: {
      border: `2px solid ${secondaryColors.main}`,
      backgroundColor: "transparent",
      padding: "none",
      color: secondaryColors.contrastText,
      "&:hover": {
        border: `2px solid ${secondaryColors.contrastText}`,
        backgroundColor: "transparent",
      },
      "&.Mui-disabled": {
        opacity: 0.25,
        color: secondaryColors.contrastText,
        border: `2px solid ${secondaryColors.main}`,
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
      "&.Mui-disabled:hover": {
        backgroundColor: "transparent",
        borderColor: secondaryColors.main,
      },
    },
    text: {
      borderRadius: 0,
      padding: 0,
      height: "1.8rem",
    },
    textPrimary: {
      backgroundColor: "transparent",
      color: primaryColors.contrastText,
      borderBottom: `2px solid ${secondaryColors.main}`,
      "& a": {
        textDecoration: "none",
        color: primaryColors.contrastText,
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "@media (max-width: 767px)": {
        height: "1.5rem",
      },
      "&.Mui-disabled": {
        opacity: 0.25,
        color: primaryColors.contrastText,
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
    },
    textSecondary: {
      backgroundColor: "transparent",
      color: secondaryColors.contrastText,
      borderBottom: `2px solid ${secondaryColors.main}`,
      "& a": {
        textDecoration: "none",
        color: secondaryColors.contrastText,
      },
      "&:hover": {
        backgroundColor: "transparent",
      },
      "@media (max-width: 767px)": {
        height: "1.5rem",
      },
      "&.Mui-disabled": {
        opacity: 0.25,
        color: theme.text?.primary,
        cursor: "not-allowed",
        pointerEvents: "auto",
      },
    },
  };
};

export default getMuiButton;
