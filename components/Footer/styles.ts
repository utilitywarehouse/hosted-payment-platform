import { createStyles, darken, StyleRules, Theme } from "@material-ui/core";

const getStyles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(16),
      backgroundColor: theme.palette.text.primary,
      [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
        paddingTop: theme.spacing(7),
        paddingBottom: theme.spacing(7),
      },
      "& p": {
        transition: "all .3s ease",
        color: theme.palette.common.white,
        [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
          lineHeight: "1.82025rem",
        },
      },
    },
    img: {
      flex: 1,
      height: "2.1875rem",
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(8),
      [`@media (min-width: ${theme.breakpoints.values.md}px)`]: {
        height: "4.0625rem",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(7),
      },
      [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
        height: "5.3125rem",
      },
    },
    iconContainer: {
      [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: theme.spacing(2),
      },
      [`@media (max-width: ${theme.breakpoints.values.lg}px)`]: {
        display: "flex",
        marginTop: theme.spacing(4),
      },
      "& a:not(:last-child)": {
        marginRight: theme.spacing(2),
      },
    },
    footerSection: {
      display: "flex",
      flexDirection: "column",
      marginBottom: theme.spacing(4),
      padding: 0,
      "& li": {
        display: "block",
      },
      "@media (max-width: 500px)": {
        paddingRight: theme.spacing(2),
      },
      "& a": {
        lineHeight: "1.82025rem",
        "&:hover": {
          textDecoration: "none",
        },
        "& p:hover": {
          color: darken(theme.palette.common.white, 0.4),
        },
      },
    },
    linksContainer: {
      "& a": {
        lineHeight: "1.82025rem",
        "&:hover": {
          textDecoration: "none",
        },
        "& p:hover": {
          color: darken(theme.palette.common.white, 0.4),
        },
      },
    },
    sectionHeading: {
      fontFamily: "Work Sans SemiBold,sans-serif",
      marginBottom: theme.spacing(1),
      fontWeight: 600,
    },
    copyrights: {
      fontSize: ".875rem",
      lineHeight: " 1.375rem",
      color: theme.palette.common.white,
      opacity: 0.5,
      [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
        fontSize: "1rem",
      },
    },
  });

export default getStyles;
