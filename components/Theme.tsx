import {
  createGenerateClassName,
  createMuiTheme,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from "react";
import theme from "../config/theme";

const generateClassName = createGenerateClassName({ disableGlobal: true });

const Theme: React.FC = (props) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={createMuiTheme(theme)}>
      {props.children}
    </ThemeProvider>
  </StylesProvider>
);

export default Theme;
