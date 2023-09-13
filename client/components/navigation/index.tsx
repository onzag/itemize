/**
 * Containst function that are usable for handling navigation
 * between the application
 * 
 * @module
 */

import { Location } from "history";
import { history } from "../..";


type QsParamsFn = (current: URLSearchParams, next: URLSearchParams) => string | string[];

interface IQueryParamsSpec {
  [key: string]: string | string[] | QsParamsFn;
};

type QsParamsSpecFn = (current: URLSearchParams, next: URLSearchParams) => IQueryParamsSpec;

/**
 * Allows to set the history state to a new state
 * @param location the location object
 * @param state the new state, partial
 * @param replace and whether it's a replace action rather than a push
 */
export function setHistoryState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  // first we copy the current state
  // due to a bug in typescript this cannot be achieved anymore and has to be set as any
  const newState = { ...(location as any).state };

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
      if (typeof state[key] !== "string" && state[key] !== null) {
        throw new Error("Attempted to set history state in the query string by using a non-string and non-null value in " + key);
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
    history.push(location.pathname + searchPart + location.hash, location.state);
  } else {
    history.replace(location.pathname + searchPart + location.hash, location.state);
  }
}

interface IRedirectOptions {
  state?: any;
  replace?: boolean;
  retainQueryParamsFor?: string[];
  retainAllQueryParams?: boolean;
  /**
   * Provide query params either automatically or dynamically
   */
  qsParams?: QsParamsSpecFn | IQueryParamsSpec;
}

/**
 * A very simple redirect that runs a history push or replace
 * @param newLocation the new location
 * @param state the new state
 * @param replace whether to replace rather than push
 */
export function redirectTo(newLocation: string, options: IRedirectOptions = {}) {
  let finalNewLocation = newLocation;

  // keeping the qs values as they are defined
  if ((options.retainQueryParamsFor || options.retainAllQueryParams || options.qsParams) && finalNewLocation) {
    const isAFullFledgedHttpURL =
      finalNewLocation.startsWith("http") ||
      finalNewLocation.startsWith("ftp");
    const dummyURL = new URL((!isAFullFledgedHttpURL ? "http://dummy" : "") + finalNewLocation);

    const nextQsParsed = dummyURL.searchParams;
    const locationQs = new URLSearchParams(location.search);

    let changed = false;
    if (options.retainQueryParamsFor || options.retainAllQueryParams) {
      // we iterate depending on what we are copying from the source
      (options.retainAllQueryParams ? Array.from(locationQs.keys()) : options.retainQueryParamsFor).forEach((bit) => {
        // if we don't have any qs in our target or if that value is not defined there
        if (!nextQsParsed.get(bit)) {
          // then we can add this value
          const locationQsValue = locationQs.get(bit);

          // if we have it of course
          if (locationQsValue) {
            // now we can add the bit and the value
            changed = true;
            nextQsParsed.set(bit, locationQsValue);
          }
        }
      });
    }

    if (options.qsParams) {
      const value = typeof options.qsParams === "function" ? options.qsParams(locationQs, nextQsParsed) : options.qsParams;
      Object.keys(value).forEach((key) => {
        const vKeyRaw = value[key];
        const valueForKey = typeof vKeyRaw === "function" ? vKeyRaw(locationQs, nextQsParsed) : vKeyRaw;
        if (typeof valueForKey !== "undefined" && valueForKey !== null) {
          changed = true;
          nextQsParsed.set(key, valueForKey as any);
        }
      });
    }

    if (changed) {
      const strParams = dummyURL.searchParams.toString();
      finalNewLocation = (
        isAFullFledgedHttpURL ?
          (dummyURL.protocol + "//" + dummyURL.host) :
          ""
      ) + dummyURL.pathname + (strParams ? "?" + strParams : "") + dummyURL.hash;
    }
  }

  if (options.replace) {
    history.replace(finalNewLocation, options.state);
  } else {
    history.push(finalNewLocation, options.state);
  }
}

/**
 * A very simple redirect as well, but this time ensures that localization
 * is respected in the url
 * @param newLocation the new location without localization, use $HERE to specify the current location without query parameters
 * @param state the new state
 * @param replace whether to replace
 */
export function localizedRedirectTo(newLocation: string, options: IRedirectOptions = {}) {
  // so first we get the current location from our url
  const splitted = location.pathname.split("/");
  splitted.shift();
  const currentLocaleFromURL = splitted.shift() || null;
  // if there's nothing
  if (!currentLocaleFromURL) {
    // we can't do anything
    return;
  }

  const restOfURL = splitted.join("/").split("?")[0];

  // now we get the new url
  let urlDefined = newLocation;
  urlDefined = urlDefined && urlDefined.replace("$HERE", restOfURL);
  // add a trailing / if it isn't there
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  // and then add the locale from there
  const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
  // then call the redirect function
  return redirectTo(urlTo, options);
}

/**
 * Simply go back
 */
export function goBack() {
  history.goBack();
}