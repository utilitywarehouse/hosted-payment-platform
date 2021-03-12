import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import MenuDesktop from "./MenuDesktop";
import { menuLinks, shortMenuLinks } from "./menuLinks";
import MenuMobile from "./MenuMobile";
import styles from "./styles.module.css";

interface MenuProps {
  isScrolled: boolean;
  isDesktop?: boolean;
  collapsePanelMobile?: boolean;
  selectedMenu: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: React.FC<MenuProps> = ({
  collapsePanelMobile,
  isDesktop = false,
  isScrolled,
  selectedMenu,
  changeSelectedMenu,
}) => {
  const router = useRouter();
  const links = router.pathname === "/success" ? menuLinks : shortMenuLinks;
  const linkClass = classNames(styles.link, { scrolled: isScrolled });

  useEffect(() => {
    if (!collapsePanelMobile) {
      changeSelectedMenu("");
    }
  }, [collapsePanelMobile]);

  return (
    <div className={styles.menuContainer}>
      {isDesktop ? (
        <MenuDesktop
          menuLinks={links}
          changeSelectedMenu={changeSelectedMenu}
          isDesktop={isDesktop}
          selectedMenu={selectedMenu}
          linkClass={linkClass}
        />
      ) : (
        <MenuMobile
          menuLinks={links}
          changeSelectedMenu={changeSelectedMenu}
          isDesktop={isDesktop}
          isScrolled={isScrolled}
          selectedMenu={selectedMenu}
          linkClass={linkClass}
          collapsePanelMobile={collapsePanelMobile}
        />
      )}
    </div>
  );
};

export default Menu;
