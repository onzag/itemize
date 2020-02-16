import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ILocaleContextType } from "../internal/app";
import Moment from "moment";
import MomentUtils from "@date-io/moment";

// we create the material ui theme
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export function appWrapper(app: React.ReactElement) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      {app}
    </MuiThemeProvider>
  );
}

export function mainWrapper(mainComponent: React.ReactElement, localeContext: ILocaleContextType) {
  const languageDeregionalized = localeContext.language.includes("-") ?
    localeContext.language.split("-")[0] : localeContext.language;
  return (
    <MuiPickersUtilsProvider
      utils={MomentUtils}
      locale={languageDeregionalized}
      libInstance={Moment}
    >{mainComponent}</MuiPickersUtilsProvider>
  )
}