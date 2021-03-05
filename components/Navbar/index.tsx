import {
  AppBar,
  Backdrop,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from "@material-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import DesktopDark from "../../public/icons/logo/desktop/Dark.svg";
import DesktopLight from "../../public/icons/logo/desktop/Light.svg";
import Mobile from "../../public/icons/logo/Mobile.svg";
import Tablet from "../../public/icons/logo/Tablet.svg";
import CloseIcon from "../../public/icons/small/close.svg";
import MenuIcon from "../../public/icons/small/menu.svg";
import { Button } from "../Button";
import RootContainer from "../RootContainer";
import Menu from "./Menu";
import getStyles from "./styles";

const useStyles = makeStyles(getStyles, { index: 1 });

export const Navbar: React.FC = () => {
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isScrolled = useScrollTrigger({ disableHysteresis: true });

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));

  const router = useRouter();

  const [shownMenus, setShownMenus] = React.useState<boolean>(false);
  const [selectedMenu, changeSelectedMenu] = React.useState<string>("");

  const onBackdropClick = () => {
    changeSelectedMenu("");
    setShownMenus(false);
  };

  return (
    <div>
      <Backdrop
        open={!!selectedMenu || shownMenus || false}
        onClick={onBackdropClick}
        className={classes.backdrop}
      />

      <AppBar
        position="fixed"
        className={`${classes.appBar} ${isScrolled && classes.scrolled}`}
      >
        <RootContainer>
          <Toolbar className={classes.root} component="nav">
            {/* UW Logo */}
            <Link href="https://uw.co.uk/" className={classes.logo}>
              {isDesktop && !isScrolled && <DesktopDark />}
              {isDesktop && isScrolled && <DesktopLight />}
              {!isDesktop && isTablet && <Tablet />}
              {!isDesktop && !isTablet && <Mobile />}
            </Link>

            {/* UW Menu for desktop */}
            {isDesktop && (
              <Menu
                isDesktop={isDesktop}
                isScrolled={isScrolled}
                selectedMenu={selectedMenu}
                changeSelectedMenu={changeSelectedMenu}
              />
            )}

            {isDesktop && router.pathname === "/success" && (
              <div className={classes.buttonContainer}>
                <NextLink href="https://uw.co.uk/login?redirect_back=https://uw.co.uk/clubhouse/myServices">
                  <Button
                    styling="secondary"
                    theme={isScrolled ? "light" : "dark"}
                  >
                    My account
                  </Button>
                </NextLink>
              </div>
            )}

            {!isDesktop && (
              <div className={classes.buttonContainer}>
                {router.pathname === "/success" && (
                  <NextLink href="https://uw.co.uk/login?redirect_back=https://uw.co.uk/clubhouse/myServices">
                    <Button
                      styling="secondary"
                      size="small"
                      theme={isScrolled ? "light" : "dark"}
                    >
                      My account
                    </Button>
                  </NextLink>
                )}

                {/* Mobile Menu Close Icon */}
                {!isDesktop && shownMenus && (
                  <CloseIcon onClick={() => setShownMenus(!shownMenus)} />
                )}

                {/* Mobile Menu Icon */}
                {!isDesktop && !shownMenus && (
                  <MenuIcon onClick={() => setShownMenus(!shownMenus)} />
                )}
              </div>
            )}
          </Toolbar>

          {/* UW Menu for Mobile */}
          {!isDesktop && (
            <Menu
              isScrolled={isScrolled}
              collapsePanelMobile={shownMenus}
              selectedMenu={selectedMenu}
              changeSelectedMenu={changeSelectedMenu}
            />
          )}
        </RootContainer>
      </AppBar>
    </div>
  );
};

export const NAVBAR_HEIGHT = 92;
