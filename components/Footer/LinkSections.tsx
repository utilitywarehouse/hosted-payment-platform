import { Grid, Link } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import {
  desktopLinkSections,
  footerLinks,
  mobileLinkSections,
  shortFooterLinks,
} from "./footerLinks";
import LinkSection from "./LinkSection";
import styles from "./styles.module.css";

interface LinkSectionsProps {
  linkSections: typeof mobileLinkSections | typeof desktopLinkSections;
}

const LinkSections: React.FC<LinkSectionsProps> = ({ linkSections }) => {
  const router = useRouter();
  const showAllFooterLinks = router.pathname === "/success";

  return (
    <Grid
      container
      item
      xs={12}
      lg={showAllFooterLinks ? 9 : 12}
      className={styles.linksContainer}
    >
      {showAllFooterLinks
        ? linkSections.map((sections, index) => (
            <Grid item xs={6} md={4} key={index}>
              {sections.map((section, index) => (
                <LinkSection key={index} section={footerLinks[section]} />
              ))}
            </Grid>
          ))
        : shortFooterLinks.map(({ name, href }) => (
            <Grid key={name} item xs={12} md={4} lg={2}>
              <Link href={href} target="_blank">
                <p className={styles.footerLink}>{name}</p>
              </Link>
            </Grid>
          ))}
    </Grid>
  );
};

export default LinkSections;
