import { CssBaseline, styled } from "@material-ui/core";
import React from "react";
// import Footer from './Footer';
import { Navbar } from "./Navbar";
import Theme from "./Theme";

const Layout: React.FC = ({ children }) => (
  <Theme>
    <Container>
      <CssBaseline />
      <Navbar />
      <React.Fragment>{children ?? <></>}</React.Fragment>
      {/* <Footer /> */}
    </Container>
  </Theme>
);

export default Layout;

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));
