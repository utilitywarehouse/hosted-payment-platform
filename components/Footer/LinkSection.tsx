import { Link } from "@material-ui/core";
import React from "react";
import { ISection } from "./footerLinks";
import styles from "./styles.module.css";

interface ILinkSectionProps {
  section: ISection;
}

const LinkSection: React.FC<ILinkSectionProps> = ({ section }) => (
  <ul className={styles.footerSection}>
    <p className={styles.sectionHeading}>{section.category}</p>
    {section.links.map((link, index) => (
      <li key={index}>
        <Link href={link.href}>
          <p className={styles.footerLink}>{link.name}</p>
        </Link>
      </li>
    ))}
  </ul>
);

export default LinkSection;
