/**
 * Contains the fast prototyping wrappers for usage
 * with the itemize application in the fast prototyping mode
 * 
 * @module
 */

import React, {useEffect} from "react";
import { ThemeProvider as MuiThemeProvider, MuiPickersUtilsProvider, createTheme, CssBaseline } from "./mui-core";
import { ILocaleContextType } from "../internal/providers/locale-provider";
import Moment from "moment";
import MomentUtils from "@date-io/moment";
import { IConfigRawJSONDataType } from "../../config";

/**
 * Removes the #ssr-sheets component that is injected by the collector if
 * SSR was used
 * @param props the props for the sheet remover
 * @returns a react node
 */
function SSRSheetsRemover(props: {children: React.ReactNode}) {
  useEffect(() => {
    const ssrStyles = document.querySelector('#ssr-sheets');
    if (ssrStyles) {
      ssrStyles.parentElement.removeChild(ssrStyles);
    }
  }, []);

  // buggy typescript
  return props.children as any;
}

/**
 * The appwrapper is the static wrapper that does not really ever change and stays on top
 * of the entire application for this reason, it's expected to render once
 * 
 * For fast prototyping we use material ui, and as such we pass those providers here
 * 
 * @param app the application that react is asking to render
 * @param config the configuration that is being used, this is the same as the config.json
 */
export function appWrapper(app: React.ReactElement, config: IConfigRawJSONDataType) {
  // we create the material ui theme
  const theme = createTheme({
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

/**
 * The main wrapper stays under the app and it's a dynamic component that will be requested
 * to updated if the app locale context changes, which creates a chain effect
 * 
 * for fast prototyping we use the mui pickers utility for material ui pickers, and these
 * need to change according to locale
 * 
 * @param mainComponent the main component that is under the app
 * @param config the config of the app
 * @param localeContext the locale that we are using
 */
export function mainWrapper(
  mainComponent: React.ReactElement,
  config: IConfigRawJSONDataType,
  localeContext: ILocaleContextType,
) {
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
