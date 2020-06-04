import React from "react";
import { Location } from "history";
import { withRouter } from "react-router-dom";

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

interface ISecondaryLocationReaderProps extends ILocationReaderProps {
  location: Location;
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

function SecondaryLocationReader(props: ISecondaryLocationReaderProps) {
  return (<ActualLocationReader pathname={props.location.pathname} {...props}/>);
}

// buggy typescript forces me to do it this way
export default withRouter(SecondaryLocationReader as any) as any as React.ComponentType<ILocationReaderProps>;