import { Link, Typography } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { ISection } from './footerLinks';

interface ILinkSectionProps {
  section: ISection;
  classes: ClassNameMap;
}

const LinkSection: React.FC<ILinkSectionProps> = ({ section, classes }) => (
  <ul className={classes.footerSection}>
    <Typography variant="body2" className={classes.sectionHeading}>
      {section.category}
    </Typography>

    {section.links.map((link, index) => (
      <li key={index}>
        <Link href={link.href}>
          <Typography variant="body2">{link.name}</Typography>
        </Link>
      </li>
    ))}
  </ul>
);

export default LinkSection;
