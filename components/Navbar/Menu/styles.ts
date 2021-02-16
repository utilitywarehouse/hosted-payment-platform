import { createStyles, fade, StyleRules, Theme } from "@material-ui/core";

const getStyles = (theme: Theme): StyleRules =>
  createStyles({
    menuContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        paddingTop: theme.spacing(1),
      },
      "& ul": {
        margin: 0,
        padding: 0,
        "& li": {
          listStyle: "none",
        },
      },
    },
    menuItem: {
      [theme.breakpoints.up("lg")]: {
        display: "flex",
      },
      [theme.breakpoints.down("md")]: {
        width: "100vw",
        paddingRight: "8rem !important",
        [theme.breakpoints.down("sm")]: {
          paddingRight: "4rem !important",
        },
      },
    },
    link: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      color: theme.palette.common.white,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      transition: "300ms all ease-in-out",
      fontFamily: "Work Sans SemiBold,sans-serif",

      "@media (min-width: 1150px)": {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem",
      },
      fontWeight: 600,
      "&.scrolled": {
        color: theme.palette.text.primary,
      },
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.secondary.main,
      },
      "&.selected": {
        color: theme.palette.secondary.main,
      },
    },
    collapsePanel: {
      width: "100%",
      "& .MuiCollapse-wrapper": {
        width: "100%",
      },
      "& .MuiCollapse-wrapperInner": {
        display: "flex",
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        [theme.breakpoints.up("lg")]: {
          "& ul:nth-child(1)": {
            position: "relative",
            left: theme.spacing(4),
          },
          "& ul:nth-child(2)": {
            position: "relative",
            // left: theme.spacing(4),
          },
          "& ul:nth-child(3)": {
            position: "relative",
            left: theme.spacing(0.5),
          },
          "@media (max-width: 1150px)": {
            "& ul:nth-child(1)": {
              position: "relative",
              left: "50px",
            },
            "& ul:nth-child(2)": {
              position: "relative",
              left: "-14px",
            },
            "& ul:nth-child(3)": {
              position: "relative",
              left: "-40px",
            },
          },
        },
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          overflow: "hidden",
        },
      },
      "& a": {
        display: "flex",
        justifyContent: "space-between",
        margin: 0,
        height: "3.5rem",
        whiteSpace: "nowrap",
        "&:hover": {
          textDecoration: "none",
          color: theme.palette.secondary.main,
        },
      },
      "& li": {
        [theme.breakpoints.down("md")]: {
          "&:not(:first-of-type)": {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            borderTop: `2px solid  ${fade(theme.palette.line.main, 0.3)}`,
          },
          "&.scrolled": {
            "&:not(:first-of-type)": {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              borderTop: `2px solid ${theme.palette.line.light}`,
            },
          },
        },
      },
    },
    arrow: {
      marginLeft: theme.spacing(0.5),
      transition: "300ms all ease-in-out",
      "&.selected": {
        transform: "rotate(180deg)",
      },
    },
    mobileMenuParent: {
      width: "1000vw",
      display: "flex",
      flexDirection: "row",
      zIndex: 500,
      transition: "300ms all ease-in-out",
      transitionDelay: "0ms",
      "&.selected": {
        transform: "translateX(-110vw)",
      },
    },
    menuBodyMobile: {
      display: "flex",
      width: "100vw",
      flexDirection: "row",
      overflow: "hidden",
      position: "relative",
      justifyContent: "flex-end",
      "& > ul": {
        width: "90vw",
      },
      "& svg": {
        cursor: "pointer",
      },
    },
  });

export default getStyles;
