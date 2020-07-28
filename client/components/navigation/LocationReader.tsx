/**
 * Allows to read the current location so that conditional rendering can be performed
 * performs a job remarkably similar to the <Route> component and Route should be
 * preferred over this file unless you need to access either the pathname or absolute pathname
 * as strings
 * 
 * @packageDocumentation
 */

import React from "react";
import { Location } from "history";
import { withRouter } from "react-router-dom";

/**
 * The argument passed to the location reader
 */
interface ILocationReaderArg {
  /**
   * The current pathname, without language information
   */
  pathname: string;
  /**
   * The absolute pathname which includes language information
   */
  absPathname: string;
  /**
   * The language
   */
  urlLang: string;
}

/**
 * The props for the location reader
 */
interface ILocationReaderProps {
  children: (
    arg: ILocationReaderArg,
  ) => React.ReactNode;
}

/**
 * A secondary location reader props that just pipes from the withRouter function
 * the location to the actual using its pathname only so the component can be pure
 */
interface ISecondaryLocationReaderProps extends ILocationReaderProps {
  location: Location;
}

/**
 * The actual location reader props that does the heavy lifting
 */
interface IActualLocationReaderProps extends ILocationReaderProps {
  pathname: string;
}

/**
 * the component is pure to deny useless updates that way pathname is checked as location
 * might change without changing the pathname
 */
class ActualLocationReader extends React.PureComponent<IActualLocationReaderProps> {
  public render() {
    // so we split the pathname
    const pathnameWithoutLang = this.props.pathname.split("/");
    // and shift it to remove the starting "" empty string
    pathnameWithoutLang.shift();
    // and now we can get the language
    const lang = pathnameWithoutLang.shift() || null;
    // and now this is the final pathname without lang
    const pathNameWithoutLangFinal = "/" + pathnameWithoutLang.join("/");
    // and as such we call the children with the arg data
    return this.props.children({
      pathname: pathNameWithoutLangFinal,
      absPathname: this.props.pathname,
      urlLang: lang,
    });
  }
}

/**
 * The secondary class
 * @param props the props
 * @returns a react component
 */
function SecondaryLocationReader(props: ISecondaryLocationReaderProps) {
  return (<ActualLocationReader pathname={props.location.pathname} {...props}/>);
}

// buggy typescript forces me to do it this way
export default withRouter(SecondaryLocationReader as any) as any as React.ComponentType<ILocationReaderProps>;
