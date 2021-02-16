import { Grid } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Image from "next/image";
import React from "react";

const Logo: React.FC<{ classes: ClassNameMap }> = ({ classes }) => (
  <Grid container>
    <Image
      className={classes.img}
      src="/icons/logo/footer/footerLogo-fill.svg"
      alt="Logo footer logo fill"
      // layout="fill"
      width={24}
      height={86}
    />
    <Image
      className={classes.img}
      src="/icons/logo/footer/footerLogo-logo.svg"
      alt="UW Footer logo"
      width={631}
      height={86}
    />
  </Grid>
);

export default Logo;
