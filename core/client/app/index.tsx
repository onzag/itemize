import * as React from "react";
import DevTools from "../devtools";
import Root, { IRootRawJSONDataType } from "../../base/Root";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core";

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.info("Starting Development Mode, Have Fun :)");
}

export interface ILocaleDataType {
 locales: {
    [locale: string]: string,
  };
}

export interface ILocaleType {
  changeTo: (locale: string) => Promise<void>;
  state: string;
  updating: boolean;
}

export interface IDataType {
  raw: IRootRawJSONDataType;
  value: Root;
}

interface IAppProps {
  initialLocale: string;
  initialData: IRootRawJSONDataType;
  localeData: ILocaleDataType;
}

interface IAppState {
  specifiedLocale: string;
  specifiedData: IRootRawJSONDataType;
  specifiedProcessedData: Root;
  localeIsUpdating: boolean;
}

export const LocaleContext = React.createContext<ILocaleType>(null);
export const LocaleDataContext = React.createContext<ILocaleDataType>(null);
export const DataContext = React.createContext<IDataType>(null);

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: "'Open Sans', sans-serif",
  },
});

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      specifiedLocale: props.initialLocale,
      localeIsUpdating: false,
      specifiedData: props.initialData,
      specifiedProcessedData: new Root(props.initialData),
    };

    this.changeLocale = this.changeLocale.bind(this);
  }
  public async changeLocale(locale: string) {
    if (this.state.localeIsUpdating) {
      console.warn("Attempted to update locale to " + locale + " while on update");
    }

    this.setState({
      localeIsUpdating: true,
    });

    const newData: IRootRawJSONDataType =
      await fetch(`/resource/build.${locale}.json`)
      .then((r) => r.json());

    localStorage.setItem("locale", locale);

    this.setState({
      specifiedData: newData,
      specifiedProcessedData: new Root(newData),
      specifiedLocale: locale,
      localeIsUpdating: false,
    });
  }
  public render() {
    const localeContextValue: ILocaleType = {
      state: this.state.specifiedLocale,
      changeTo: this.changeLocale,
      updating: this.state.localeIsUpdating,
    };
    const dataContextValue: IDataType = {
      raw: this.state.specifiedData,
      value: this.state.specifiedProcessedData,
    };
    return (
      <MuiThemeProvider theme={theme}>
        <LocaleContext.Provider value={localeContextValue}>
          <DataContext.Provider value={dataContextValue}>
            <LocaleDataContext.Provider value={this.props.localeData}>
              <h1>It works!</h1>

              {isDevelopment ? <DevTools/> : null}
            </LocaleDataContext.Provider>
         </DataContext.Provider>
        </LocaleContext.Provider>
      </MuiThemeProvider>
    );
  }
}
