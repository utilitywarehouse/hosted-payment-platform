import { Grid } from "@material-ui/core";
import React from "react";
import styles from "./styles.module.css";

const Copyrights = () => (
  <Grid item xs={12}>
    <span className={styles.copyrights}>
      © Utility Warehouse Limited 2020. Registered in England. Company number:
      04594421
      <br />
      Utility Warehouse Limited is authorised and regulated by the Financial
      Conduct Authority
    </span>
  </Grid>
);

export default Copyrights;
