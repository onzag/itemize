/**
 * Contains the fast prototyping wrappers for usage
 * with the itemize application in the fast prototyping mode
 * 
 * @module
 */

import React, { useEffect } from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { ILocaleContextType } from "../internal/providers/locale-provider";
import Moment from "moment";
import AdapterMoment from '@mui/lab/AdapterMoment';
import { IConfigRawJSONDataType } from "../../config";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

export const ReuseCacheContextEmotionIsAMess = React.createContext(false);

/**
 * Removes the #ssr-sheets component that is injected by the collector if
 * SSR was used
 * @param props the props for the sheet remover
 * @returns a react node
 */
function SSRSheetsRemover(props: { children: React.ReactNode }) {
  useEffect(() => {
    const ssrStyles = document.querySelector('#ssr-sheets');
    if (ssrStyles) {
      ssrStyles.parentElement.removeChild(ssrStyles);
    }
  }, []);

  // buggy typescript
  return props.children as any;
}

let cachedRtlCache: EmotionCache;
let cachedLtrCache: EmotionCache;

export function createEmotionCache(isRtl: boolean, useDoubleCache: boolean) {
  if (useDoubleCache) {
    if (cachedRtlCache && isRtl) {
      return cachedRtlCache;
    } else if (cachedLtrCache && !isRtl) {
      return cachedLtrCache;
    }
  }

  const newCache = isRtl ? createCache({
    key: "cssrtl",
    stylisPlugins: [prefixer, rtlPlugin],
  }) : createCache({
    key: "css",
  });

  if (useDoubleCache) {
    if (isRtl) {
      cachedRtlCache = newCache;
    } else {
      cachedLtrCache = newCache;
    }
  }

  return newCache;
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
  // this is what our base app used to be before
  // very simple and it worked
  const baseApp = (
    <>
      <CssBaseline />
      <SSRSheetsRemover>
        {app}
      </SSRSheetsRemover>
    </>
  );

  return baseApp;
}

let cachedLTRTheme: Theme;
let cachedRTLTheme: Theme;

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

  const isRtl = config.rtlLanguages.includes(localeContext.language);

  let theme: Theme;

  if (isRtl && cachedRTLTheme) {
    theme = cachedRTLTheme;
  } else if (!isRtl && cachedLTRTheme) {
    theme = cachedLTRTheme;
  } else {
    theme = createTheme({
      direction: isRtl ? "rtl" : "ltr",
      typography: {
        fontFamily: "'" + config.fontName + "', sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
      }
    });

    if (isRtl) {
      cachedRTLTheme = theme;
    } else {
      cachedLTRTheme = theme;
    }
  }

  const baseApp = (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        locale={languageDeregionalized}
        libInstance={Moment}
      >{mainComponent}</LocalizationProvider>
    </ThemeProvider>
  );

  // this is what it has to do now with the introduction
  // of a dreaded emotion cache that is a total mess
  return (
    <ReuseCacheContextEmotionIsAMess.Consumer>
      {(shouldReuse: boolean) => {
        // the cache is already defined for the server
        // context in the collector, so it's not necessary
        // to create a new one, because emotion is so smart
        // it doesn't export its context so I can't read it
        // and must deal with a hack
        if (shouldReuse) {
          return baseApp;
        } else {
          const cache = createEmotionCache(isRtl, true);
          // client side basically or when
          // we don't use a styles collector
          return (
            <CacheProvider value={cache}>
              {baseApp}
            </CacheProvider>
          );
        }
      }}
    </ReuseCacheContextEmotionIsAMess.Consumer>
  );
}
