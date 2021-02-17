import { Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";

const Logo: React.FC<{ classes: ClassNameMap }> = ({ classes }) => (
  <Grid container>
    <img
      className={classes.img}
      src="/icons/logo/footer/footerLogo-fill.svg"
      alt="Logo footer logo fill"
    />
    <img
      className={classes.img}
      src="/icons/logo/footer/footerLogo-logo.svg"
      alt="UW Footer logo"
    />
  </Grid>
);

export default Logo;
