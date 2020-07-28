/**
 * This file contains the location state reader which reads a pseudo state
 * obtained via the browser history api or the query string
 * 
 * @packageDocumentation
 */

import React from "react";
import { setHistoryQSState, setHistoryState } from ".";
import { Location } from "history";
import { withRouter } from "react-router-dom";

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
  children: (
    state: S,
    setState: (state: Partial<S>, replace?: boolean) => void,
  ) => React.ReactNode;
}

/**
 * The props with the location
 */
interface ILocationStateReaderPropsWithLocation<S> extends ILocationStateReaderProps<S> {
  location: Location;
}

/**
 * The location state reader component
 * @param props the props
 * @returns a react component
 */
function LocationStateReader<S>(props: ILocationStateReaderPropsWithLocation<S>) {
  // so if we are in our query string
  if (props.stateIsInQueryString) {
    // we need to parse that query string
    const searchParams = new URLSearchParams(props.location.search);
    // now we can get the value
    const statefulValue = {};
    // and add the default props if they are missing or otherwise read from the search params
    Object.keys(props.defaultState).forEach((key) => {
      statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
    });

    // and call from here, note how we use the setHistoryQSState function here
    return props.children(statefulValue as S, setHistoryQSState.bind(null, props.location))
  } else {
    // if there's no state
    if (!props.location.state) {
      // we just return the default state
      return props.children(props.defaultState, setHistoryState.bind(null, props.location));
    }

    // otherwise equally we merge the states
    const statefulValue = {};
    Object.keys(props.defaultState).forEach((key) => {
      statefulValue[key] = typeof props.location.state[key] !== "undefined" ? props.location.state[key] : props.defaultState[key];
    });

    // and call it
    return props.children(statefulValue as S, setHistoryState.bind(null, props.location));
  }
}

// buggy typescript forces me to do it this way
function FakeLocationStateReader<S>(props: ILocationStateReaderProps<S>) {
  return null as any;
}
export default withRouter(LocationStateReader as any) as any as typeof FakeLocationStateReader;
