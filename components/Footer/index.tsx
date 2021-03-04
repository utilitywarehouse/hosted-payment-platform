import { Grid, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import RootContainer from "../RootContainer";
import Copyrights from "./Copyrights";
import { desktopLinkSections, mobileLinkSections } from "./footerLinks";
import LinkSections from "./LinkSections";
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons";
import getStyles from "./styles";

const useStyles = makeStyles(getStyles);

const Footer: React.FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const router = useRouter();

  const linkSections = isDesktop ? desktopLinkSections : mobileLinkSections;

  return (
    <footer className={classes.root}>
      <RootContainer>
        <Grid container>
          <LinkSections linkSections={linkSections} classes={classes} />
          {router.pathname === "/success" && (
            <SocialMediaIcons classes={classes} />
          )}
          <Logo classes={classes} />
          <Copyrights classes={classes} />
        </Grid>
      </RootContainer>
    </footer>
  );
};

export default Footer;
