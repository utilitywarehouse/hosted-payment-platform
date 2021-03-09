import { Link, Typography } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import PlayIcon from "../../../public/icons/small/play.svg";
import RightChevronIcon from "../../../public/icons/small/rightChevron.svg";
import { IMenuLink } from "./menuLinks";

interface IMenuHeaderProps {
  menuLinks: IMenuLink[];
  classes: ClassNameMap;
  isDesktop: boolean;
  isScrolled?: boolean;
  selectedMenu: string;
  linkClass: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const MenuHeader: React.FC<IMenuHeaderProps> = ({
  menuLinks,
  classes,
  isDesktop,
  isScrolled,
  selectedMenu,
  linkClass,
  changeSelectedMenu,
}) => (
  <ul className={classes.menuItem}>
    {menuLinks.map((menu, index) => (
      <Typography
        key={index}
        component="li"
        className={isScrolled ? "scrolled" : ""}
      >
        <Link
          variant={"body1"}
          href={menu.href}
          className={linkClass}
          target={menu.newTab ? "_blank" : "_self"}
          onClick={() =>
            !menu.isLink &&
            changeSelectedMenu(selectedMenu === menu.name ? "" : menu.name)
          }
        >
          {menu.name}

          {/* Desktop Arrow Icon */}
          {!menu.isLink && isDesktop && (
            <PlayIcon
              className={`${classes.arrow} ${
                selectedMenu === menu.name && "selected"
              }`}
            />
          )}

          {/* Mobile Arrow Icon */}
          {!menu.isLink && !isDesktop && <RightChevronIcon />}
        </Link>
      </Typography>
    ))}
  </ul>
);

export default MenuHeader;
