import React from "react";
import DevTools from "../devtools";
import Root, { IRootRawJSONDataType, Ii18NType, IRawJSONBuildDataType } from "../../base/Root";
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
import { O_WRONLY } from "constants";

// We need to extract the jss generation because we want to
// inject our custom css anyway, as despite having it
// we are not really using the material ui JSS tools
// we have our own custom SCSS
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: "jss",
});

// Just a message for whether is development
const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.info("Starting Development Mode, Have Fun :)");
}

// The interface for locale data for translation contains
// a locale, for which there is i18n data, eg, en, es, de, etc...
// this interface just has basic data for all the available locales
// usually only containing the name
export interface ILocaleDataType {
  [locale: string]: Ii18NType;
}

// The interface for the country contains all the data there should
// be for a country, code is the country code for the country,
// note how there is a currency, which is the currency code that
// matches the currency
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

// The currency contains all the data we need to know for the currency
// code is the currency code for the currency
export interface ICurrencyType {
  code: string;
  name: string;
  symbol: string;
  rounding: number;
  decimals: number;
}

// This one represents the list of countries as an object,
// given the country code
export interface ICountryDataType {
  [countryCode: string]: ICountryType;
}

// This one is the list of currencies given the currency
// code
export interface ICurrencyDataType {
  [currencyCode: string]: ICurrencyType;
}

// This is the locale type, which contains the locale
// information for using in the application
export interface ILocaleContextType {
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

// This is the data we currently work with
// as how the application is defined to be by the
// JSON Itemize definition
export interface IDataContextType {
  raw: IRootRawJSONDataType;
  value: Root;
}

// The props for the application, this initial information
// must be passed by the initializer and it't available via
// the rest endpoint, for the given languages
// country data, currency data, and locale data are static fields
// and don't really change; whereas the initial information, is
// as said, initial, and takes part of the state
interface IAppProps {
  initialData: IRawJSONBuildDataType;
  initialCurrency: string;
  initialCountry: string;

  countryData: ICountryDataType;
  currencyData: ICurrencyDataType;
  localeData: ILocaleDataType;
}

// so you can see here, the specified country and currency
// are taken from both initials, the specified data is also the
// initial data, the specified processed root, is what comes
// after processing the raw json "root" property
// locale is updating and locale is updating from are
// variables that pop during a change in locale
interface IAppState {
  specifiedCountry: string;
  specifiedCurrency: string;
  specifiedData: IRawJSONBuildDataType;
  specifiedProcessedRoot: Root;
  localeIsUpdating: boolean;
  localeIsUpdatingFrom: string;
}

// we create the contexts that are useful for accessing these, default
// values for both is null
export const LocaleContext = React.createContext<ILocaleContextType>(null);
export const DataContext = React.createContext<IDataContextType>(null);

// we create the material ui theme
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: "'Open Sans', sans-serif",
  },
});

// now we export the App
export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    // set the values in the state to the initial
    this.state = {
      specifiedCountry: props.initialCountry,
      specifiedCurrency: props.initialCurrency,
      localeIsUpdating: false,
      localeIsUpdatingFrom: null,
      specifiedData: props.initialData,
      specifiedProcessedRoot: new Root(props.initialData.root),
    };

    // the helper functions that change the state of the whole app
    // to change language, country and currency
    this.changeLanguageTo = this.changeLanguageTo.bind(this);
    this.changeCountryTo = this.changeCountryTo.bind(this);
    this.changeCurrencyTo = this.changeCurrencyTo.bind(this);
    this.renderAppWithLocaleContext = this.renderAppWithLocaleContext.bind(this);
  }

  /**
   * Checks whether there is a locale data for a given language
   * @param locale the two letter or language-region code for the locale
   */
  public hasLocaleDataFor(locale: string) {
    return !!this.props.localeData[locale];
  }

  /**
   * Changes the language for the one specified by that locale
   * @param locale the two letter or language-region code for the locale
   */
  public async changeLanguageTo(locale: string) {
    // if it's updating, this shouldn't have happened
    if (this.state.localeIsUpdating) {
      console.warn("Attempted to update locale to " + locale + " while on update");
    }

    // so we check which locale we are attempting to set
    let localeToSet = locale;
    // if there is no locale data
    if (!this.hasLocaleDataFor(localeToSet)) {
      // we will force it to english, for example if an user picks the language
      // that we don't have, we'll default to english
      // this might happen for example when selecting a country, changing the country attempts to change
      // the language of the country, so we default to english in such case
      localeToSet = "en";
      console.warn("Attempted to set to unavailable language locale " + locale + ", defaulted to english");
    }

    // Like we did in our main file we need to take care of the url in such case
    const pathNameSplitted = window.location.pathname.split("/");
    const urlLanguage = pathNameSplitted[1];

    // if it's the same, then we do not care, the url language is the real language
    if (localeToSet === urlLanguage) {
      return;
    }

    // otherwise we send the state, this state is part of the context
    this.setState({
      localeIsUpdating: true,
      localeIsUpdatingFrom: urlLanguage,
    });

    // and we fetch the new data, as relevant, mostly the build, and the moment to patch
    const [newData] =
      await Promise.all([
        fetch(`/resource/build.${localeToSet}.json?version=${(window as any).BUILD_NUMBER}`).then((r) => r.json()),

        localeToSet !== "en" ?
          importScript(`/resource/${localeToSet}.moment.js?version=${(window as any).BUILD_NUMBER}`) : null,
      ]);

    // Now we patch moment
    Moment.locale(localeToSet);

    // And we set the language via local storage, so it has priority
    localStorage.setItem("lang", localeToSet);

    // We set it to the url
    pathNameSplitted[1] = localeToSet;
    const newPathName = pathNameSplitted.join("/");
    history.push(newPathName);

    // And now we might restore the state, with the new data, new root
    this.setState({
      specifiedData: newData,
      specifiedProcessedRoot: new Root(newData.root),
      localeIsUpdating: false,
      localeIsUpdatingFrom: null,
    });
  }

  /**
   * changes the country given a specific country code
   * changing the country will trigger an automatic change
   * of currency and language
   * @param code the two letter uppercase code for the country
   */
  public changeCountryTo(code: string) {
    // Codes should be uppercase, but well, let's get wiggle room for error
    let codeToSet = code.toUpperCase();

    // We check that it's a valid country in our list of countries
    const countryData = this.props.countryData[codeToSet];

    // This shouldn't really happen, but otherwise we default to Finland
    // because why not
    if (!countryData) {
      codeToSet = "FI";
      console.warn("Attempted to set country to unavailable " + code + ", defaulted to Finland");
    }

    // So now we need to get what is relevant, the languages, we check
    // what languages are spokes in the region, now because we have some places
    // where no official language exist (aka now just Antartica), we check for
    // that we have some, otherwise default to english; also notice how
    // there are many official languages, however, we default to the first one
    // which we assume is the most spoken
    const languageSpokenThere = countryData.languages.length ?
      countryData.languages[0].toLowerCase() || "en" : "en";

    // now the language might be regionalized, we check it is
    const isRegionalizedAlready = languageSpokenThere.includes("-");
    // now we extract the regionalized and non regionalized factors
    const languageSpokenThereNonRegionalized = isRegionalizedAlready ?
      languageSpokenThere.split("-")[0] : languageSpokenThere;
    const languageSpokenThereRegionalized = isRegionalizedAlready ?
      languageSpokenThere : languageSpokenThere + "-" + codeToSet;

    // We check for both, giving the regionalized priority
    // as you can notice, this language might not be available,
    // in that case the app will default to the default language
    if (this.hasLocaleDataFor(languageSpokenThereRegionalized)) {
      this.changeLanguageTo(languageSpokenThereRegionalized);
    } else {
      this.changeLanguageTo(languageSpokenThereNonRegionalized);
    }

    // Now we also change the currency, we default to euros in
    // case there's no currency defined
    const currencyUsedThere = countryData.currency || "EUR";
    this.changeCurrencyTo(currencyUsedThere);

    // Now we set the country in local storage
    localStorage.setItem("country", codeToSet);

    // and update the state
    this.setState({
      specifiedCountry: codeToSet,
    });
  }

  /**
   * Changes the currency to a given currency code
   * given its 3 letter uppercase code
   * @param code the three letter uppercase code of the currency
   */
  public changeCurrencyTo(code: string) {

    // We still uppercase it anyway
    let codeToSet = code.toUpperCase();

    // Now we check if it is a valid currency
    if (!this.props.currencyData[codeToSet]) {
      // Otherwise we go for the default, this is unlikely to happen
      // because all currencies are in the currency list
      codeToSet = "EUR";
      console.warn("Attempted to set currency to unavailable " + code + ", defaulted to Euros");
    }

    // We set the currency in local storage
    localStorage.setItem("currency", codeToSet);

    // and set the state
    this.setState({
      specifiedCurrency: codeToSet,
    });
  }

  /**
   * Renders the application with the locale context data
   * @param param0 the url match from the router, contains the url language
   */
  public renderAppWithLocaleContext({ match }) {
    // Now the match.params.lang is actually a quite unreliable way to check for the current language
    // in use during updates, there's a reason, the url changes triggering a react update before the
    // language data has been loaded, this makes the app feel quite responsive and it's important, but
    // if the rest of the app thinks the new language is the right language
    // before having the new language completely loaded a crash is going to happen, hence, we remain onto
    // the old language until the new language data is truly loaded
    const currentActualLanguage = this.state.localeIsUpdating ? this.state.localeIsUpdatingFrom : match.params.lang;
    const currentActualLanguageDeregionalized = currentActualLanguage.includes("-") ?
      currentActualLanguage.split("-")[0] : currentActualLanguage;

    // now we populate the locale context which is used all over the app
    const localeContextValue: ILocaleContextType = {
      changeLanguageTo: this.changeLanguageTo,
      changeCountryTo: this.changeCountryTo,
      changeCurrencyTo: this.changeCurrencyTo,

      language: currentActualLanguage,
      country: this.state.specifiedCountry,
      currency: this.state.specifiedCurrency,

      updating: this.state.localeIsUpdating,

      localeData: this.props.localeData,
      countryData: this.props.countryData,
      currencyData: this.props.currencyData,

      i18n: this.state.specifiedData.i18n,
    };

    // Now we return the app with its given locale context
    // the Material ui pickers depends on the locale too from
    // the match, so we pass that as well, we use the deregionalized
    // version nevertheless,
    // note how we include the devtools if we are in development mode
    // such a code is stripped if it's production
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={currentActualLanguageDeregionalized}
          moment={Moment}
        >
          <h1>It works!</h1>

          {isDevelopment ? <DevTools /> : null}
        </MuiPickersUtilsProvider>
      </LocaleContext.Provider>
    );
  }

  public render() {
    // The data contet passes the raw root and the value
    // that contains the instance that can store values
    const dataContextValue: IDataContextType = {
      raw: this.state.specifiedData.root,
      value: this.state.specifiedProcessedRoot,
    };

    // Now we return that with the JSS provider, material ui theme provider,
    // our data context, and then pass the react router route, note that the
    // router itself is the parent
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
