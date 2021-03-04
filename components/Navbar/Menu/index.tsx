import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MenuDesktop from "./MenuDesktop";
import { menuLinks, shortMenuLinks } from "./menuLinks";
import MenuMobile from "./MenuMobile";
import getStyles from "./styles";

interface MenuProps {
  isScrolled: boolean;
  isDesktop?: boolean;
  collapsePanelMobile?: boolean;
  selectedMenu: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles(getStyles);

const Menu: React.FC<MenuProps> = ({
  collapsePanelMobile,
  isDesktop = false,
  isScrolled,
  selectedMenu,
  changeSelectedMenu,
}) => {
  const classes = useStyles();
  const linkClass = `${classes.link} ${isScrolled && "scrolled"}`;

  const router = useRouter();

  const links = router.pathname === "/success" ? menuLinks : shortMenuLinks;

  useEffect(() => {
    if (!collapsePanelMobile) {
      changeSelectedMenu("");
    }
  }, [collapsePanelMobile]);

  return (
    <div className={classes.menuContainer}>
      {isDesktop ? (
        <MenuDesktop
          menuLinks={links}
          changeSelectedMenu={changeSelectedMenu}
          isDesktop={isDesktop}
          selectedMenu={selectedMenu}
          linkClass={linkClass}
          classes={classes}
        />
      ) : (
        <MenuMobile
          menuLinks={links}
          changeSelectedMenu={changeSelectedMenu}
          isDesktop={isDesktop}
          isScrolled={isScrolled}
          selectedMenu={selectedMenu}
          linkClass={linkClass}
          classes={classes}
          collapsePanelMobile={collapsePanelMobile}
        />
      )}
    </div>
  );
};

export default Menu;
