/**
 * Containst function that are usable for handling navigation
 * between the application
 * 
 * @packageDocumentation
 */

import { Location } from "history";
import { history } from "../..";

/**
 * Allows to set the history state to a new state
 * @param location the location object
 * @param state the new state, partial
 * @param replace and whether it's a replace action rather than a push
 */
export function setHistoryState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  // first we copy the current state
  const newState = {...location.state};

  // and if we have a new partial state
  if (state) {
    // we replace the keys
    Object.keys(state).forEach((key) => {
      newState[key] = state[key];
    });
  }

  // now we check if they are not equal
  if (Object.is(newState, location.state)) {
    return;
  }

  // if we are going to push or replace
  if (!replace) {
    history.push(location.pathname + location.search + location.hash, newState);
  } else {
    history.replace(location.pathname + location.search + location.hash, newState);
  }
}

/**
 * Sets the history state to a new state, but uses the query string
 * instead rather than the internal history state
 * @param location the location object
 * @param state the state to use, partial
 * @param replace whether to replace rather than push
 */
export function setHistoryQSState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  // first we need to parse from the location
  const searchParams = new URLSearchParams(location.search);
  // and we have this boolean to check for equality
  let differs: boolean = false;

  // now if we have a new partial state
  if (state) {
    // we will loop into it
    Object.keys(state).forEach((key) => {
      if (typeof state[key] !== "string") {
        throw new Error("Attempted to set history state in the query string by using a non-string value in " + key);
      }

      // if our differ flag hasn't been trued
      // and the value differs from what we have now
      if (
        !differs &&
        state[key] !== searchParams.get(key) 
      ) {
        // differs is true
        differs = true;
      }

      // and now we update the search params
      if (state[key] === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, state[key]);
      }
    });
  }

  // if nothing differs we return
  if (!differs) {
    return;
  }

  // otherwise we are ready to change the search params
  const searchParamsStr = searchParams.toString();
  let searchPart = "";
  if (searchParamsStr.length) {
    searchPart = "?" + searchParamsStr;
  }

  // and we do a push or replace accordingly
  if (!replace) {
    history.push(location.pathname + searchPart  + location.hash, location.state);
  } else {
    history.replace(location.pathname + searchPart + searchParams.toString() + location.hash, location.state);
  }
}

/**
 * A very simple redirect that runs a history push or replace
 * @param newLocation the new location
 * @param state the new state
 * @param replace whether to replace rather than push
 */
export function redirectTo(newLocation: string, state?: any, replace?: boolean) {
  if (replace) {
    history.replace(newLocation, state);
  } else {
    history.push(newLocation, state);
  }
}

/**
 * A very simple redirect as well, but this time ensures that localization
 * is respected in the url
 * @param newLocation the new location without localization
 * @param state the new state
 * @param replace whether to replace
 */
export function localizedRedirectTo(newLocation: string, state?: any, replace?: boolean) {
  // so first we get the current location from our url
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  // if there's nothing
  if (!currentLocaleFromURL) {
    // we can't do anything
    return;
  }

  // now we get the new url
  let urlDefined = newLocation;
  // add a trailing / if it isn't there
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  // and then add the locale from there
  const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
  // then call the redirect function
  return redirectTo(urlTo, state, replace);
}

/**
 * Simply go back
 */
export function goBack() {
  history.goBack();
}