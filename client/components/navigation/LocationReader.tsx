import React from "react";
import { LocationStateContext } from "../../internal/app/internal-providers";
import { Location } from "history";

interface ILocationReaderArg {
  pathname: string;
  absPathname: string;
  urlLang: string;
}

interface ILocationReaderProps {
  children: (
    arg: ILocationReaderArg,
  ) => React.ReactNode;
}

interface IActualLocationReaderProps extends ILocationReaderProps {
  pathname: string;
}

// the component is pure to deny useless updates that way pathname is checked as location
// might change without changing the pathname
class ActualLocationReader extends React.PureComponent<IActualLocationReaderProps> {
  public render() {
    const pathnameWithoutLang = this.props.pathname.split("/");
    pathnameWithoutLang.shift();
    const lang = pathnameWithoutLang.shift() || null;
    let pathNameWithoutLangFinal = "/" + (pathnameWithoutLang[0] || "");
    return this.props.children({
      pathname: pathNameWithoutLangFinal,
      absPathname: this.props.pathname,
      urlLang: lang,
    });
  }
}

export default function LocationReader(props: ILocationReaderProps) {
  return (
    <LocationStateContext.Consumer>
      {
        (location: Location) => {
          return <ActualLocationReader pathname={location.pathname} {...props}/>
        }
      }
    </LocationStateContext.Consumer>
  );
}