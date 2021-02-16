import { Link, Typography } from "@material-ui/core";
import React from "react";
import { ILink } from "./menuLinks";

const MenuLink: React.FC<{
  link: ILink;
  linkClass: string;
  isScrolled?: boolean;
}> = ({ link, linkClass, isScrolled }) => (
  <Typography component="li" className={isScrolled ? "scrolled" : ""}>
    <Link href={link.href} variant={"body1"} className={linkClass}>
      {link.name}
    </Link>
  </Typography>
);

export default MenuLink;
