import * as React from "react";
import { LocaleContext, DataContext, ILocaleType } from "../app";
import DevToolRoot from "./dRoot";

const devtoolsStyle: {
  [name: string]: React.CSSProperties,
} = {
  base: {
    width: "100%",
    backgroundColor: "#ccc",
    padding: 10,
    position: "fixed",
    bottom: 0,
    left: 0,
    fontSize: 10,
  },
  openCloseButton: {
    position: "absolute",
    top: 0,
    height: 30,
    padding: 10,
    backgroundColor: "#eee",
    right: 0,
    cursor: "pointer",
  },
  internalContent: {
    position: "absolute",
    bottom: 0,
    top: 30,
    left: 0,
    right: 0,
    padding: 10,
    fontSize: 10,
    backgroundColor: "#283593",
    color: "#ffffff",
    overflow: "auto",
  },
  singleLocaleChanger: {
    textDecoration: "underline",
    cursor: "pointer",
  },
};

interface IDevToolsState {
  opened: boolean;
}

export default class DevTools extends React.Component<{}, IDevToolsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      opened: JSON.parse(localStorage.getItem("__dev__open") || "false"),
    };

    this.toggleOpened = this.toggleOpened.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeCountry = this.changeCountry.bind(this);
  }
  public toggleOpened() {
    localStorage.setItem("__dev__open", JSON.stringify(!this.state.opened));
    this.setState({
      opened: !this.state.opened,
    });
  }
  public changeLanguage(locale: ILocaleType, newLanguageLocale: string) {
    locale.changeLanguageTo(newLanguageLocale);
  }
  public changeCurrency(locale: ILocaleType, e: React.ChangeEvent<HTMLSelectElement>) {
    locale.changeCurrencyTo(e.target.value);
  }
  public changeCountry(locale: ILocaleType, e: React.ChangeEvent<HTMLSelectElement>) {
    locale.changeCountryTo(e.target.value);
  }
  public render() {
    const baseStyle = {
      ...devtoolsStyle.base,
      opacity: this.state.opened ? 1 : 0.5,
      height: this.state.opened ? "75%" : "30px",
    };
    const appName = (window as any).APP_NAME;
    const buildNumber = parseInt((window as any).BUILD_NUMBER, 10);
    const buildDate = new Date(buildNumber).toLocaleString();

    let internalContent = null;
    if (this.state.opened) {
      const internalLocaleContent = (
        <div>
          <LocaleContext.Consumer>
            {(locale) => <div>
              <p>
                Current Locale Language
                <b> {locale.language} - {locale.localeData[locale.language].name} </b>
                {
                  locale.updating ?
                  "Updating..." :
                  <React.Fragment>
                    Supports:
                    {Object.keys(locale.localeData).map((localeName) =>
                      <React.Fragment key={localeName}>
                        &nbsp;
                        <span
                          style={devtoolsStyle.singleLocaleChanger}
                          onClick={this.changeLanguage.bind(this, locale, localeName)}
                        >
                         {localeName} - {locale.localeData[localeName].name}
                        </span>
                      </React.Fragment>)}
                  </React.Fragment>
                }
              </p>
              <p>
                Current Locale Currency
                <b> {locale.currency} - {locale.currencyData[locale.currency].symbol} </b>
                {
                  locale.updating ?
                  "Updating..." :
                  <select value={locale.currency} onChange={this.changeCurrency.bind(this, locale)}>
                    Supports:
                    {Object.keys(locale.currencyData).map((currencyCode) =>
                      <option key={currencyCode} value={currencyCode}>
                        {currencyCode + " - "}
                        {locale.currencyData[currencyCode].name}
                      </option>)}
                  </select>
                }
              </p>
              <p>
                Current Locale Country
                <b> {locale.country} - {locale.countryData[locale.country].native} </b>
                {
                  locale.updating ?
                  "Updating..." :
                  <select value={locale.country} onChange={this.changeCountry.bind(this, locale)}>
                    Supports:
                    {Object.keys(locale.countryData).map((countryCode) =>
                      <option key={countryCode} value={countryCode}>
                        {locale.countryData[countryCode].emoji}
                        {" " + locale.countryData[countryCode].native}
                      </option>)}
                  </select>
                }
              </p>
            </div>}
          </LocaleContext.Consumer>
        </div>
      );

      const moduleExplorer = (
        <div>
          <LocaleContext.Consumer>
            {(locale) =>
              <DataContext.Consumer>
                {(data) =>
                  <DevToolRoot
                   root={data.value}
                   language={locale.language}
                  />
                }
              </DataContext.Consumer>
            }
          </LocaleContext.Consumer>
        </div>
      );

      internalContent = (
        <div style={devtoolsStyle.internalContent}>
          {internalLocaleContent}
          {moduleExplorer}
       </div>
      );
    }
    return (
      <div style={baseStyle}>
        {appName} - Build #{buildNumber} - {buildDate}
        {internalContent}
        <div style={devtoolsStyle.openCloseButton} onClick={this.toggleOpened}>
          {this.state.opened ? "close" : "open"}
        </div>
      </div>
    );
  }
}
