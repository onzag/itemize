import * as React from "react";
import DevTools from "../devtools";
import Root, { IRootRawJSONDataType } from "../../base/Root";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { importScript } from "..";
import Moment from "moment";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { Route } from "react-router";
import { history } from "..";

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

export interface ICountryType {
  name: string;
  native: string;
  phone: string;
  continent: string;
  capital: string;
  currency: string;
  languages: string[];
  emoji: string;
  emojiU: string;
  longitude: number;
  latitude: number;
  code: string;
}

export interface ICurrencyType {
  code: string;
  name: string;
  symbol: string;
  rounding: number;
  decimals: number;
}

export interface ICountryDataType {
  [countryCode: string]: ICountryType;
}

export interface ICurrencyDataType {
  [currencyCode: string]: ICurrencyType;
}

export interface ILocaleType {
  changeLanguageTo: (code: string) => Promise<void>;
  changeCurrencyTo: (code: string) => void;
  changeCountryTo: (code: string) => void;
  language: string;
  currency: string;
  country: string;
  updating: boolean;
  localeData: ILocaleDataType;
  currencyData: ICurrencyDataType;
  countryData: ICountryDataType;
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
  initialData: IBuildData;
  initialCurrency: string;
  initialCountry: string;

  countryData: ICountryDataType;
  currencyData: ICurrencyDataType;
  localeData: ILocaleDataType;
}

interface IAppState {
  specifiedCountry: string;
  specifiedCurrency: string;
  specifiedData: IBuildData;
  specifiedProcessedRoot: Root;
  localeIsUpdating: boolean;
  localeIsUpdatingFrom: string;
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
      specifiedCountry: props.initialCountry,
      specifiedCurrency: props.initialCurrency,
      localeIsUpdating: false,
      localeIsUpdatingFrom: null,
      specifiedData: props.initialData,
      specifiedProcessedRoot: new Root(props.initialData.root),
    };

    this.changeLanguageTo = this.changeLanguageTo.bind(this);
    this.changeCountryTo = this.changeCountryTo.bind(this);
    this.changeCurrencyTo = this.changeCurrencyTo.bind(this);
    this.renderAppWithLocaleContext = this.renderAppWithLocaleContext.bind(this);
  }
  public hasLocaleDataFor(locale: string) {
    return !!this.props.localeData[locale];
  }
  public async changeLanguageTo(locale: string) {
    if (this.state.localeIsUpdating) {
      console.warn("Attempted to update locale to " + locale + " while on update");
    }

    let localeToSet = locale;
    if (!this.props.localeData[localeToSet]) {
      localeToSet = "en";
      console.warn("Attempted to set to unavailable language locale " + locale + ", defaulted to english");
    }

    const pathNameSplitted = window.location.pathname.split("/");
    const urlLanguage = pathNameSplitted[1];
    if (localeToSet === urlLanguage) {
      return;
    }

    this.setState({
      localeIsUpdating: true,
      localeIsUpdatingFrom: urlLanguage,
    });

    const [newData] =
      await Promise.all([
        fetch(`/resource/build.${localeToSet}.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),

        localeToSet !== "en" ?
          importScript(`/resource/${localeToSet}.moment.js?version=${(window as any).BUILD_NUMBER}`) : null,
      ]);

    Moment.locale(localeToSet);
    localStorage.setItem("lang", localeToSet);

    pathNameSplitted[1] = localeToSet;
    const newPathName = pathNameSplitted.join("/");
    history.push(newPathName);

    this.setState({
      specifiedData: newData,
      specifiedProcessedRoot: new Root(newData.root),
      localeIsUpdating: false,
      localeIsUpdatingFrom: null,
    });
  }
  public changeCountryTo(code: string) {
    let codeToSet = code.toUpperCase();
    const countryData = this.props.countryData[codeToSet];
    if (!countryData) {
      codeToSet = "FI";
      console.warn("Attempted to set country to unavailable " + code + ", defaulted to Finland");
    }

    const languageSpokenThere = countryData.languages.length ?
      countryData.languages[0].toLowerCase() || "en" : "en";
    const languageSpokenThereRegionalized = languageSpokenThere + "-" + codeToSet;
    if (this.hasLocaleDataFor(languageSpokenThereRegionalized)) {
      this.changeLanguageTo(languageSpokenThereRegionalized);
    } else {
      this.changeLanguageTo(languageSpokenThere);
    }

    const currencyUsedThere = countryData.currency || "EUR";
    this.changeCurrencyTo(currencyUsedThere);

    localStorage.setItem("country", codeToSet);

    this.setState({
      specifiedCountry: codeToSet,
    });
  }
  public changeCurrencyTo(code: string) {
    let codeToSet = code.toUpperCase();
    if (!this.props.currencyData[codeToSet]) {
      codeToSet = "EUR";
      console.warn("Attempted to set currency to unavailable " + code + ", defaulted to Euros");
    }

    localStorage.setItem("currency", codeToSet);

    this.setState({
      specifiedCurrency: codeToSet,
    });
  }
  public renderAppWithLocaleContext({ match }) {
    const localeContextValue: ILocaleType = {
      changeLanguageTo: this.changeLanguageTo,
      changeCountryTo: this.changeCountryTo,
      changeCurrencyTo: this.changeCurrencyTo,

      language: this.state.localeIsUpdating ? this.state.localeIsUpdatingFrom : match.params.lang,
      country: this.state.specifiedCountry,
      currency: this.state.specifiedCurrency,

      updating: this.state.localeIsUpdating,

      localeData: this.props.localeData,
      countryData: this.props.countryData,
      currencyData: this.props.currencyData,

      i18n: this.state.specifiedData.i18n,
    };

    return (
      <LocaleContext.Provider value={localeContextValue}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={match.lang}
          moment={Moment}
        >
          <h1>It works!</h1>

          {isDevelopment ? <DevTools /> : null}
        </MuiPickersUtilsProvider>
      </LocaleContext.Provider>
    );
  }
  public render() {
    const dataContextValue: IDataType = {
      raw: this.state.specifiedData.root,
      value: this.state.specifiedProcessedRoot,
    };
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <DataContext.Provider value={dataContextValue}>
            <Route
              path="/:lang/"
              component={this.renderAppWithLocaleContext}
            />
          </DataContext.Provider>
        </MuiThemeProvider>
      </JssProvider>
    );
  }
}
