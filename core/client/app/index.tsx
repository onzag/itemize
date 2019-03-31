import * as React from "react";
import DevTools from "../devtools";
import Root, { IRootRawJSONDataType } from "../../base/Root";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: "jss",
});

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.info("Starting Development Mode, Have Fun :)");
}

export interface Ii18NType {
  [key: string]: string;
}

export interface ILocaleDataType {
  [locale: string]: Ii18NType;
}

export interface ILocaleType {
  changeTo: (locale: string) => Promise<void>;
  state: string;
  updating: boolean;
  locales: ILocaleDataType;
  i18n: Ii18NType;
}

export interface IDataType {
  raw: IRootRawJSONDataType;
  value: Root;
}

export interface IBuildData {
  root: IRootRawJSONDataType;
  i18n: Ii18NType;
}

interface IAppProps {
  initialLocale: string;
  initialData: IBuildData;
  localeData: ILocaleDataType;
}

interface IAppState {
  specifiedLocale: string;
  specifiedData: IBuildData;
  specifiedProcessedRoot: Root;
  localeIsUpdating: boolean;
}

export const LocaleContext = React.createContext<ILocaleType>(null);
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
      specifiedProcessedRoot: new Root(props.initialData.root),
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

    const newData: IBuildData =
      await fetch(`/resource/build.${locale}.json`)
      .then((r) => r.json());

    localStorage.setItem("locale", locale);

    this.setState({
      specifiedData: newData,
      specifiedProcessedRoot: new Root(newData.root),
      specifiedLocale: locale,
      localeIsUpdating: false,
    });
  }
  public render() {
    const localeContextValue: ILocaleType = {
      state: this.state.specifiedLocale,
      changeTo: this.changeLocale,
      updating: this.state.localeIsUpdating,
      locales: this.props.localeData,
      i18n: this.state.specifiedData.i18n,
    };
    const dataContextValue: IDataType = {
      raw: this.state.specifiedData.root,
      value: this.state.specifiedProcessedRoot,
    };
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <LocaleContext.Provider value={localeContextValue}>
            <DataContext.Provider value={dataContextValue}>
              <h1>It works!</h1>

              {isDevelopment ? <DevTools/> : null}
            </DataContext.Provider>
          </LocaleContext.Provider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
