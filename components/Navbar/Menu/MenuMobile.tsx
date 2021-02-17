import { Collapse, Fade } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React from "react";
import PreviousIcon from "../../../public/icons/small/previous.svg";
import MenuHeader from "./MenuHeader";
import MenuLink from "./MenuLink";
import { IMenuLink } from "./menuLinks";

interface IMobileProps {
  menuLinks: IMenuLink[];
  classes: ClassNameMap;
  isDesktop: boolean;
  isScrolled: boolean;
  selectedMenu: string;
  linkClass: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
  collapsePanelMobile?: boolean;
}

const MenuMobile: React.FC<IMobileProps> = ({
  menuLinks,
  classes,
  isDesktop,
  isScrolled,
  selectedMenu,
  linkClass,
  changeSelectedMenu,
  collapsePanelMobile,
}) => (
  <Collapse in={collapsePanelMobile} className={classes.collapsePanel}>
    <div
      className={`${classes.mobileMenuParent} ${selectedMenu && "selected"}`}
    >
      <MenuHeader
        menuLinks={menuLinks}
        changeSelectedMenu={changeSelectedMenu}
        isDesktop={isDesktop}
        isScrolled={isScrolled}
        selectedMenu={selectedMenu}
        linkClass={linkClass}
        classes={classes}
      />

      <div className={classes.menuBodyMobile}>
        {menuLinks.map(
          (menu, index) =>
            !menu.isLink && (
              <Fade
                in={selectedMenu === menu.name}
                timeout={{ enter: 0, exit: 300 }}
                key={index}
                mountOnEnter
                unmountOnExit
              >
                {/* Menu Section */}
                <ul>
                  <PreviousIcon
                    onClick={() =>
                      changeSelectedMenu(
                        selectedMenu === menu.name ? "" : menu.name
                      )
                    }
                  />

                  {/* Menu section links */}
                  {menu.links?.map((link, index) => (
                    <MenuLink
                      isScrolled={isScrolled}
                      key={index}
                      linkClass={linkClass}
                      link={link}
                    />
                  ))}
                </ul>
              </Fade>
            )
        )}
      </div>
    </div>
  </Collapse>
);

export default MenuMobile;
