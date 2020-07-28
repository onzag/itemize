/**
 * Allows to read the current location so that conditional rendering can be performed
 * performs a job remarkably similar to the <Route> component and Route should be
 * preferred over this file unless you need to access either the pathname or absolute pathname
 * as strings
 *
 * @packageDocumentation
 */
import React from "react";
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
    children: (arg: ILocationReaderArg) => React.ReactNode;
}
declare const _default: React.ComponentType<ILocationReaderProps>;
export default _default;
