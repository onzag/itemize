import * as React from "react";
import { LocaleContext } from "../app";
import { LocaleDataContext } from "../app";

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
    color: "#ffffff"
  },
  singeLocaleChanger: {
    textDecoration: "underline",
    cursor: "pointer"
  }
};

interface IDevToolsState {
  opened: boolean;
}

export default class DevTools extends React.Component<{}, IDevToolsState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      opened: false,
    };

    this.toggleOpened = this.toggleOpened.bind(this);
  }
  public toggleOpened() {
    this.setState({
      opened: !this.state.opened,
    });
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
          <LocaleDataContext.Consumer>
            {(localeData) =>
              <LocaleContext.Consumer>
                {(locale) => <div>
                  <p>
                    Current Locale
                    <b> {locale.state} - {localeData.locales[locale.state]} </b>
                    {
                      locale.updating ? 
                      "Updating..." :
                      <React.Fragment>
                        Supports:
                        {Object.keys(localeData.locales).map(localeName =>
                          <React.Fragment key={localeName}>
                            &nbsp;
                            <span
                             style={devtoolsStyle.singeLocaleChanger}
                             onClick={()=>locale.changeTo(localeName)}>
                             {localeName} - {localeData.locales[localeName]}
                            </span>
                          </React.Fragment>)}
                      </React.Fragment>
                    }
                  </p>
                </div>}
              </LocaleContext.Consumer>
            }
         </LocaleDataContext.Consumer>
        </div>
      );

      internalContent = <div style={devtoolsStyle.internalContent}>
        {internalLocaleContent}
      </div>
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
