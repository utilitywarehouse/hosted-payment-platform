import { Collapse, Fade } from "@material-ui/core";
import React from "react";
import MenuHeader from "./MenuHeader";
import MenuLink from "./MenuLink";
import { IMenuLink } from "./menuLinks";
import styles from "./styles.module.css";

interface IDesktopProps {
  menuLinks: IMenuLink[];
  isDesktop: boolean;
  selectedMenu: string;
  linkClass: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const MenuDesktop: React.FC<IDesktopProps> = ({
  menuLinks,
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
    />

    <Collapse in={!!selectedMenu} className={styles.collapsePanel}>
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
