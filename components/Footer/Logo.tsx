import { Grid } from "@material-ui/core";
import React from "react";
import styles from "./styles.module.css";

const Logo = () => (
  <Grid container>
    <img
      className={styles.img}
      src="/icons/logo/footer/footerLogo-fill.svg"
      alt="Logo footer logo fill"
    />
    <img
      className={styles.img}
      src="/icons/logo/footer/footerLogo-logo.svg"
      alt="UW Footer logo"
    />
  </Grid>
);

export default Logo;
