import { Grid, Theme, useMediaQuery } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import Copyrights from "./Copyrights";
import { desktopLinkSections, mobileLinkSections } from "./footerLinks";
import LinkSections from "./LinkSections";
import Logo from "./Logo";
import SocialMediaIcons from "./SocialMediaIcons";
import styles from "./styles.module.css";

const Footer: React.FC = () => {
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const router = useRouter();

  const linkSections = isDesktop ? desktopLinkSections : mobileLinkSections;

  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <Grid container>
          <LinkSections linkSections={linkSections} />
          {router.pathname === "/success" && <SocialMediaIcons />}
          <Logo />
          <Copyrights />
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
