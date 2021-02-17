import { Collapse, Fade } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import MenuHeader from "./MenuHeader";
import MenuLink from "./MenuLink";
import { IMenuLink } from "./menuLinks";

interface IDesktopProps {
  menuLinks: IMenuLink[];
  classes: ClassNameMap;
  isDesktop: boolean;
  selectedMenu: string;
  linkClass: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const MenuDesktop: React.FC<IDesktopProps> = ({
  menuLinks,
  classes,
  isDesktop,
  selectedMenu,
  linkClass,
  changeSelectedMenu,
}) => (
  <>
    <MenuHeader
      menuLinks={menuLinks}
      changeSelectedMenu={changeSelectedMenu}
      isDesktop={isDesktop}
      selectedMenu={selectedMenu}
      linkClass={linkClass}
      classes={classes}
    />

    <Collapse in={!!selectedMenu} className={classes.collapsePanel}>
      {menuLinks.map((menu, index) => (
        <ul key={index}>
          {/* Menu section */}
          {menu.links?.map((link, index) => (
            <Fade
              in={selectedMenu === menu.name}
              key={index}
              timeout={{
                enter: index * 300,
                exit: ((menu.links || []).length - index) * 300,
              }}
            >
              {/* Menu section links */}
              <div>
                <MenuLink key={index} linkClass={linkClass} link={link} />
              </div>
            </Fade>
          ))}
        </ul>
      ))}
    </Collapse>
  </>
);

export default MenuDesktop;
