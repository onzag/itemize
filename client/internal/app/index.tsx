import React from "react";
import Root, { IRootRawJSONDataType, Ii18NType, ILangLocalesType } from "../../../base/Root";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import { importScript } from "../..";
import Moment from "moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router";
import { history } from "../..";
import { countries, currencies } from "../../../imported-resources";
import { TokenProvider, ITokenProviderState, LocationStateContext } from "./internal-providers";
import { buildGqlMutation, gqlQuery } from "../../../gql-querier";
import { RemoteListener } from "./remote-listener";
import "../workers/service";
import CacheWorkerInstance from "../workers/cache";

// Just a message for whether is development
const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.info("Starting Development Mode, Have Fun :)");
}

// This is the locale type, which contains the locale
// information for using in the application
export interface ILocaleContextType {
  changeLanguageTo: (code: string, avoidUpdatingUser?: boolean) => Promise<void>;
  changeCurrencyTo: (code: string, avoidUpdatingUser?: boolean) => void;
  changeCountryTo: (code: string, avoidChangingLanguageAndCurrency?: boolean, avoidUpdatingUser?: boolean) => void;
  language: string;
  currency: string;
  country: string;
  updating: boolean;
  langLocales: ILangLocalesType;
  i18n: Ii18NType;
}

// This is the data we currently work with
// as how the application is defined to be by the
// JSON Itemize definition
export interface IDataContextType {
  value: Root;
  remoteListener: RemoteListener;
}

// The props for the application, this initial information
// must be passed by the initializer and it't available via
// the rest endpoint, for the given languages
// country data, currency data, and locale data are static fields
// and don't really change; whereas the initial information, is
// as said, initial, and takes part of the state
interface IAppProps {
  initialRoot: IRootRawJSONDataType;
  initialCurrency: string;
  initialCountry: string;

  langLocales: ILangLocalesType;

  mainComponent: React.ReactElement;
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
    fontFamily: "'Open Sans', sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

// now we export the App
export default class App extends React.Component<IAppProps, IAppState> {
  private tokenState: ITokenProviderState = null;
  private remoteListener: RemoteListener = null;

  constructor(props: IAppProps) {
    super(props);

    // set the values in the state to the initial
    // we expose the root variable because it makes debugging
    // easy and to allow access to the root registry to web workers
    (window as any).ROOT = new Root(props.initialRoot);
    if (CacheWorkerInstance.isSupported) {
      CacheWorkerInstance.instance.proxyRoot(props.initialRoot);
    }
    this.state = {
      specifiedCountry: props.initialCountry,
      specifiedCurrency: props.initialCurrency,
      localeIsUpdating: false,
      localeIsUpdatingFrom: null,
      specifiedProcessedRoot: (window as any).ROOT,
    };

    // the helper functions that change the state of the whole app
    // to change language, country and currency
    this.changeLanguageTo = this.changeLanguageTo.bind(this);
    this.changeCountryTo = this.changeCountryTo.bind(this);
    this.changeCurrencyTo = this.changeCurrencyTo.bind(this);
    this.renderAppWithLocaleContext = this.renderAppWithLocaleContext.bind(this);
    this.setTokenState = this.setTokenState.bind(this);
    this.updateUserProperty = this.updateUserProperty.bind(this);

    this.remoteListener = new RemoteListener((window as any).ROOT);
  }

  public setTokenState(state: ITokenProviderState) {
    this.tokenState = state;
    this.remoteListener.setToken(state.token);
  }

  public async updateUserProperty(propertyId: string, value: string) {
    // we check that there's an user logged in
    if (this.tokenState && this.tokenState.id) {
      console.log("updating user property", propertyId, value);
      const result = await gqlQuery(
        buildGqlMutation({
          name: "EDIT_MOD_users__IDEF_user",
          args: {
            id: this.tokenState.id,
            token: this.tokenState.token,
            // the language is irrelevant since we are not setting
            // text fields, so en will work just fine, getting
            // the language will be annoying and this will do the job anyway
            language: "en",
            listener_uuid: this.remoteListener.getUUID(),
            [propertyId]: value,
          },
          fields: {
            DATA: {
              [propertyId]: {},
            },
          },
        }),
      );
      // Ignore errors, we just go for success
      if (result && result.data && result.data.DATA) {
        const actualPropertyResult: string = result.data.DATA[propertyId] as string;
        const userItemDefinition = this.state.specifiedProcessedRoot
          .getModuleFor(["users"]).getItemDefinitionFor(["user"]);
        if (userItemDefinition.hasAppliedValueTo(this.tokenState.id, null)) {
          console.log("found an instance, triggering update");
          const property = userItemDefinition.getPropertyDefinitionFor(propertyId, false);
          property.applyValue(this.tokenState.id, null, actualPropertyResult, false, false);
          userItemDefinition.triggerListeners("change", this.tokenState.id, null);
        }
      }
    }
  }

  /**
   * Checks whether there is a locale data for a given language
   * @param locale the two letter or language-region code for the locale
   */
  public hasLocaleDataFor(locale: string) {
    return !!this.props.langLocales[locale];
  }

  /**
   * Changes the language for the one specified by that locale
   * @param locale the two letter or language-region code for the locale
   */
  public async changeLanguageTo(locale: string, avoidUpdatingUser?: boolean) {
    console.log("changing language to", locale);
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

    // if the language is currently loaded in memory, just set it as it is
    // we don't need to fetch anything
    if (this.state.specifiedProcessedRoot.getI18nDataFor(localeToSet)) {
      pathNameSplitted[1] = localeToSet;
      history.push(pathNameSplitted.join("/"));
      return;
    }

    // otherwise we send the state, this state is part of the context
    this.setState({
      localeIsUpdating: true,
      localeIsUpdatingFrom: urlLanguage,
    });

    // and we fetch the new data, as relevant, mostly the build, and the moment to patch
    let newData: any;
    try {
      [newData] =
        await Promise.all<any>([
          fetch(`/rest/resource/build.${localeToSet}.json`)
            .then((r) => r.json()),

          localeToSet !== "en" ?
            importScript(`/rest/resource/${localeToSet}.moment.js`) : null,
        ]);
    } catch {
      this.setState({
        localeIsUpdating: false,
        localeIsUpdatingFrom: null,
      });
      return;
    }

    // Now we patch moment
    Moment.locale(localeToSet);

    // And we set the language via local storage, so it has priority
    localStorage.setItem("lang", localeToSet);
    document.body.parentElement.lang = localeToSet;

    // We set it to the url
    pathNameSplitted[1] = localeToSet;
    const newPathName = pathNameSplitted.join("/");
    history.push(newPathName);

    // And now we might restore the state, with the new data
    this.state.specifiedProcessedRoot.mergeWithI18n(newData.root);
    if (!avoidUpdatingUser) {
      this.updateUserProperty("app_language", localeToSet);
    }
    this.setState({
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
  public changeCountryTo(code: string, avoidChangingLanguageAndCurrency?: boolean, avoidUpdatingUser?: boolean) {
    console.log("changing country to", code);
    // Codes should be uppercase, but well, let's get wiggle room for error
    let codeToSet = code.toUpperCase();

    // We check that it's a valid country in our list of countries
    const countryData = countries[codeToSet];

    // This shouldn't really happen, but otherwise we default to Finland
    // because why not
    if (!countryData) {
      codeToSet = (window as any).FALLBACK_COUNTRY_CODE;
      console.warn("Attempted to set country to unavailable " + code + ", defaulted to " + codeToSet);
    }

    if (!avoidChangingLanguageAndCurrency) {
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
        this.changeLanguageTo(languageSpokenThereRegionalized, avoidUpdatingUser);
      } else {
        this.changeLanguageTo(languageSpokenThereNonRegionalized, avoidUpdatingUser);
      }

      // Now we also change the currency, we default to euros in
      // case there's no currency defined
      const currencyUsedThere = countryData.currency || "EUR";
      this.changeCurrencyTo(currencyUsedThere, avoidUpdatingUser);
    }

    // Now we set the country in local storage
    localStorage.setItem("country", codeToSet);
    if (!avoidUpdatingUser) {
      this.updateUserProperty("app_country", codeToSet);
    }

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
  public changeCurrencyTo(code: string, avoidUpdatingUser?: boolean) {
    console.log("changing currency to", code);

    // We still uppercase it anyway
    let codeToSet = code.toUpperCase();

    // Now we check if it is a valid currency
    if (!currencies[codeToSet]) {
      // Otherwise we go for the default, this is unlikely to happen
      // because all currencies are in the currency list
      codeToSet = "EUR";
      console.warn("Attempted to set currency to unavailable " + code + ", defaulted to Euros");
    }

    // We set the currency in local storage
    localStorage.setItem("currency", codeToSet);
    if (!avoidUpdatingUser) {
      this.updateUserProperty("app_currency", codeToSet);
    }

    // and set the state
    this.setState({
      specifiedCurrency: codeToSet,
    });
  }

  /**
   * Renders the application with the locale context data
   * @param param0 the url match from the router, contains the url language
   */
  public renderAppWithLocaleContext({ match, location }) {
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

      langLocales: this.props.langLocales,
      i18n: this.state.specifiedProcessedRoot.getI18nData(),
    };

    // Now we return the app with its given locale context
    // the Material ui pickers depends on the locale too from
    // the match, so we pass that as well, we use the deregionalized
    // version nevertheless,
    // note how we include the devtools if we are in development mode
    // such a code is stripped if it's production
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <TokenProvider localeContext={localeContextValue} onProviderStateSet={this.setTokenState}>
          <MuiPickersUtilsProvider
            utils={MomentUtils}
            locale={currentActualLanguageDeregionalized}
            libInstance={Moment}
          >
            <LocationStateContext.Provider value={location}>
              {this.props.mainComponent}
            </LocationStateContext.Provider>
          </MuiPickersUtilsProvider>
        </TokenProvider>
      </LocaleContext.Provider>
    );
  }

  public render() {
    // The data contet passes the raw root and the value
    // that contains the instance that can store values
    const dataContextValue: IDataContextType = {
      value: this.state.specifiedProcessedRoot,
      remoteListener: this.remoteListener,
    };

    // Now we return that with the JSS provider, material ui theme provider,
    // our data context, and then pass the react router route, note that the
    // router itself is the parent
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <DataContext.Provider value={dataContextValue}>
          <Route
            path="/:lang/"
            component={this.renderAppWithLocaleContext}
          />
        </DataContext.Provider>
      </MuiThemeProvider>
    );
  }
}
