import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import theme from "../config/theme";

const Theme: React.FC = (props) => (
  <ThemeProvider theme={createMuiTheme(theme)}>{props.children}</ThemeProvider>
);

export default Theme;
