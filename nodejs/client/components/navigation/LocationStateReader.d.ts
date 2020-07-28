/**
 * This file contains the location state reader which reads a pseudo state
 * obtained via the browser history api or the query string
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props for the location state reader
 */
interface ILocationStateReaderProps<S> {
    /**
     * The default state of the reader
     */
    defaultState: S;
    /**
     * whether the state is in the query string rather than
     * in the history API, note that query string states
     * only support strings as values
     */
    stateIsInQueryString?: boolean;
    /**
     * The consumer children, which passes
     * a state and a setState function
     */
    children: (state: S, setState: (state: Partial<S>, replace?: boolean) => void) => React.ReactNode;
}
declare function FakeLocationStateReader<S>(props: ILocationStateReaderProps<S>): any;
declare const _default: typeof FakeLocationStateReader;
export default _default;
