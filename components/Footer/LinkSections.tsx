import { Grid, Link, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import {
  desktopLinkSections,
  mobileLinkSections,
  shortFooterLinks,
} from "./footerLinks";

interface LinkSectionsProps {
  linkSections: typeof mobileLinkSections | typeof desktopLinkSections;
  classes: ClassNameMap;
}

const LinkSections: React.FC<LinkSectionsProps> = ({ classes }) => (
  <Grid container item xs={12} className={classes.linksContainer}>
    {shortFooterLinks.map(({ name, href }) => (
      <Grid item xs={6} md={4} lg={2}>
        <Link href={href}>
          <Typography variant="body2">{name}</Typography>
        </Link>
      </Grid>
    ))}
  </Grid>
);

export default LinkSections;
