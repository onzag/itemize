import React, {useEffect} from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ILocaleContextType } from "../internal/app";
import Moment from "moment";
import MomentUtils from "@date-io/moment";
import { IConfigRawJSONDataType } from "../../config";

export function SSRSheetsRemover(props: {children: React.ReactNode}) {
  useEffect(() => {
    const ssrStyles = document.querySelector('#ssr-sheets');
    if (ssrStyles) {
      ssrStyles.parentElement.removeChild(ssrStyles);
    }
  }, []);

  // buggy typescript
  return props.children as any;
}

export function appWrapper(app: React.ReactElement, config: IConfigRawJSONDataType) {
  // we create the material ui theme
  const theme = createMuiTheme({
    typography: {
      fontFamily: "'" + config.fontName + "', sans-serif",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <SSRSheetsRemover>
        {app}
      </SSRSheetsRemover>
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