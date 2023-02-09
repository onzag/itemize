/**
 * This file contains the location state reader which reads a pseudo state
 * obtained via the browser history api or the query string
 * 
 * @module
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { setHistoryQSState, setHistoryState } from ".";
import { useLocation } from "react-router-dom";

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
   * updates are delayed, so that they don't quite match and an internal
   * state is kept for the children
   */
  delayedUpdates?: boolean | number;
  /**
   * The consumer children, which passes
   * a state and a setState function
   */
  children: (
    state: S,
    setState: (state: Partial<S>, replace?: boolean) => void,
    isSynced: boolean,
    runWhenSynced: (fn: () => void) => void,
  ) => React.ReactNode;
}

/**
 * The location state reader component
 * @param props the props
 * @returns a react component
 */
export default function LocationStateReader<S>(props: ILocationStateReaderProps<S>) {
  const location = useLocation();

  // keeps the internal state when using delayed updates
  const [internalState, setInternalState] = useState<{
    state: S,
    replace: boolean,
  }>(null);
  // a reference to the timer
  const syncRef = useRef<NodeJS.Timer>();
  // a reference to a callback that waits for the timer
  const syncRefCb = useRef<any>();

  // the function to use when a delay is being used
  const setHistoryStateDelayed = useCallback((state: S, replace?: boolean) => {
    setInternalState({state, replace});
  }, []);

  // a function that is passed to the children
  // to set the callbacks when synced
  const runWhenSynced = useCallback((fn: () => void) => {
    // if it's already synced
    if (!internalState) {
      // call it right away
      fn();
    // otherwise if there's already something in there
    } else if (syncRefCb.current) {
      // set it to both of them
      const oldFn = syncRefCb.current;
      syncRefCb.current = () => {
        oldFn();
        fn();
      }
    } else {
      // otherwise just put it in the ref
      syncRefCb.current = fn;
    }
  }, [syncRefCb, !!internalState])

  // now we use an effect for whenever our internal state changes
  // or any of those dependencies, but we only really care about the state
  useEffect(() => {
    // clear the timeout of a previous attempt
    clearTimeout(syncRef.current);
    // if we have a state
    if (internalState) {
      syncRef.current = setTimeout(() => {
        // if we have a state
        if (internalState) {
          // set it
          if (props.stateIsInQueryString) {
            setHistoryQSState(location, internalState.state, internalState.replace);
          } else {
            setHistoryState(location, internalState.state, internalState.replace);
          }
        }

        // clear it
        setInternalState(null);
        // do the callbacks if any
        syncRefCb.current && syncRefCb.current();
        syncRefCb.current = null;
      }, typeof props.delayedUpdates === "number" ? props.delayedUpdates : 600);
    }
  }, [
    internalState,
  ]);

  // so if we are in our query string
  if (props.stateIsInQueryString) {
    // we need to parse that query string
    const searchParams = new URLSearchParams(location.search);
    // now we can get the value
    const statefulValue = !internalState ? {} : internalState.state;
    // and add the default props if they are missing or otherwise read from the search params
    if (!internalState) {
      Object.keys(props.defaultState).forEach((key) => {
        statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
      });
    }

    // and call from here, note how we use the setHistoryQSState function here
    return props.children(
      statefulValue as S,
      props.delayedUpdates ? setHistoryStateDelayed : setHistoryQSState.bind(null, location),
      !internalState,
      runWhenSynced,
    ) as any; // typescript bugs
  } else {
    // if there's no state
    if (!location.state) {
      // we just return the default state
      return props.children(
        props.defaultState,
        props.delayedUpdates ? setHistoryStateDelayed : setHistoryState.bind(null, location),
        !internalState,
        runWhenSynced,
      ) as any; // typescript bugs
    }

    // otherwise equally we merge the states
    const statefulValue = {};
    Object.keys(props.defaultState).forEach((key) => {
      statefulValue[key] = typeof location.state[key] !== "undefined" ? location.state[key] : props.defaultState[key];
    });

    // and call it
    return props.children(
      statefulValue as S,
      setHistoryState.bind(null, location),
      !internalState,
      runWhenSynced,
    ) as any; // typescript bugs
  }
}
