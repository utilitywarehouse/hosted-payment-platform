import { Grid, Link, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { useRouter } from "next/router";
import React from "react";
import {
  desktopLinkSections,
  footerLinks,
  mobileLinkSections,
  shortFooterLinks,
} from "./footerLinks";
import LinkSection from "./LinkSection";

interface LinkSectionsProps {
  linkSections: typeof mobileLinkSections | typeof desktopLinkSections;
  classes: ClassNameMap;
}

const LinkSections: React.FC<LinkSectionsProps> = ({
  classes,
  linkSections,
}) => {
  const router = useRouter();
  const showAllFooterLinks = router.pathname === "/success";

  return (
    <Grid
      container
      item
      xs={12}
      lg={showAllFooterLinks ? 9 : 12}
      className={classes.linksContainer}
    >
      {showAllFooterLinks
        ? linkSections.map((sections, index) => (
            <Grid item xs={6} md={4} key={index}>
              {sections.map((section, index) => (
                <LinkSection
                  key={index}
                  section={footerLinks[section]}
                  classes={classes}
                />
              ))}
            </Grid>
          ))
        : shortFooterLinks.map(({ name, href }) => (
            <Grid key={name} item xs={6} md={4} lg={2}>
              <Link href={href}>
                <Typography variant="body2">{name}</Typography>
              </Link>
            </Grid>
          ))}
    </Grid>
  );
};

export default LinkSections;
