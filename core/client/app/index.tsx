import * as React from "react";
import DevTools from "../devtools";
import { IRootRawJSONDataType } from "../../base/Root";

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.info("Starting Development Mode, Have Fun :)");
}

interface ILocaleDataType {
 locales: {
    [locale: string]: string,
  };
}

interface ILocaleType {
  changeTo: (locale: string) => Promise<void>;
  state: string;
  updating: boolean;
}

interface IAppProps {
  initialLocale: string;
  initialData: IRootRawJSONDataType;
  localeData: ILocaleDataType;
}

interface IAppState {
  specifiedLocale: string;
  specifiedData: IRootRawJSONDataType;
  localeIsUpdating: boolean;
}

export const LocaleContext = React.createContext<ILocaleType>(null);
export const LocaleDataContext = React.createContext<ILocaleDataType>(null);
export const DataContext = React.createContext<IRootRawJSONDataType>(null);

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      specifiedLocale: props.initialLocale,
      localeIsUpdating: false,
      specifiedData: props.initialData,
    };

    this.changeLocale = this.changeLocale.bind(this);
  }
  public async changeLocale(locale: string) {
    if (this.state.localeIsUpdating){
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
    return (
      <LocaleContext.Provider value={localeContextValue}>
        <DataContext.Provider value={this.state.specifiedData}>
          <LocaleDataContext.Provider value={this.props.localeData}>
            <h1>It works!</h1>

            {isDevelopment ? <DevTools/> : null}
          </LocaleDataContext.Provider>
        </DataContext.Provider>
      </LocaleContext.Provider>
    );
  }
}
