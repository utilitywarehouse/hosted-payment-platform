import { Container, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
  }),
  { index: 1 }
);

const RootContainer: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Container maxWidth={"xl"} className={classes.root}>
      {children ?? <></>}
    </Container>
  );
};

export default RootContainer;
