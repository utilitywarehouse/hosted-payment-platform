import { Link, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useTracking } from "../../../hooks/useTracking";
import PlayIcon from "../../../public/icons/small/play.svg";
import RightChevronIcon from "../../../public/icons/small/rightChevron.svg";
import { ContactUs } from "../../ContactUs";
import { IMenuLink } from "./menuLinks";
import styles from "./styles.module.css";

interface IMenuHeaderProps {
  menuLinks: IMenuLink[];
  isDesktop: boolean;
  isScrolled?: boolean;
  selectedMenu: string;
  linkClass: string;
  changeSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const MenuHeader: React.FC<IMenuHeaderProps> = ({
  menuLinks,
  isDesktop,
  isScrolled,
  selectedMenu,
  linkClass,
  changeSelectedMenu,
}) => {
  const { trackEvent } = useTracking();

  const [showContactUsModal, setShowContactUsModal] = useState<boolean>(false);

  return (
    <>
      <ul className={styles.menuItem}>
        {menuLinks.map((menu, index) => (
          <Typography
            key={index}
            component="li"
            className={isScrolled ? "scrolled" : ""}
          >
            {menu.isContactLink ? (
              <Link
                variant="body1"
                className={linkClass}
                onClick={() => {
                  setShowContactUsModal(true);
                  trackEvent("payments-contact-us-page-viewed");
                }}
              >
                {menu.name}
              </Link>
            ) : (
              <Link
                variant="body1"
                href={menu.href}
                className={linkClass}
                target={menu.newTab ? "_blank" : "_self"}
                onClick={() => {
                  !menu.isLink &&
                    changeSelectedMenu(
                      selectedMenu === menu.name ? "" : menu.name
                    );
                }}
              >
                {menu.name}

                {/* Desktop Arrow Icon */}
                {!menu.isLink && isDesktop && (
                  <PlayIcon
                    className={`${styles.arrow} ${
                      selectedMenu === menu.name && "selected"
                    }`}
                  />
                )}

                {/* Mobile Arrow Icon */}
                {!menu.isLink && !isDesktop && <RightChevronIcon />}
              </Link>
            )}
          </Typography>
        ))}
      </ul>
      <ContactUs
        show={showContactUsModal}
        onCloseModal={() => {
          setShowContactUsModal(false);
        }}
      />
    </>
  );
};

export default MenuHeader;
