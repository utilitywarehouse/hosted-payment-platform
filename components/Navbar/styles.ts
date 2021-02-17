import { createStyles, StyleRules, Theme } from "@material-ui/core";

const getStyles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      alignItems: "start",
      paddingLeft: 0,
      paddingRight: 0,
      zIndex: 700,
      [theme.breakpoints.down("md")]: {
        height: "5rem",
      },
    },
    appBar: {
      transition: "300ms all ease-in-out",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: theme.palette.common.white,
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      "& svg": {
        transition: "all .3s ease-in",
        marginLeft: theme.spacing(2),
        cursor: "pointer",
        fill: theme.palette.secondary.main,
      },
    },
    backdrop: {
      zIndex: 500,
    },
  });

export default getStyles;
