import { Grid, Link, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import { desktopLinkSections, mobileLinkSections } from "./footerLinks";

interface LinkSectionsProps {
  linkSections: typeof mobileLinkSections | typeof desktopLinkSections;
  classes: ClassNameMap;
}

const LinkSections: React.FC<LinkSectionsProps> = ({
  linkSections,
  classes,
}) => (
  <Grid container item xs={12}>
    <Grid item xs={2}>
      <Link href="#">
        <Typography variant="body2">dawfawdwa dwadaw</Typography>
      </Link>
    </Grid>
    {/* {linkSections.map((sections, index) => (
      <Grid item xs={6} md={4} key={index}>
        {sections.map((section, index) => (
          <LinkSection
            key={index}
            section={footerLinks[section]}
            classes={classes}
          />
        ))}
      </Grid>
    ))} */}
  </Grid>
);

export default LinkSections;
