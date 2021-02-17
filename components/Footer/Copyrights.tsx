import { Grid } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React from 'react';

const Copyrights: React.FC<{ classes: ClassNameMap }> = ({ classes }) => (
  <Grid item xs={12}>
    <span className={classes.copyrights}>
      © Utility Warehouse Limited 2020. Registered in England. Company number:
      04594421
      <br />
      Utility Warehouse Limited is authorised and regulated by the Financial
      Conduct Authority
    </span>
  </Grid>
);

export default Copyrights;
