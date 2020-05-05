import { Location } from "history";
import { history } from "../..";

export function setHistoryState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  const newState = {...location.state};
  if (state) {
    Object.keys(state).forEach((key) => {
      newState[key] = state[key];
    });
  }
  if (Object.is(newState, location.state)) {
    return;
  }
  if (!replace) {
    history.push(location.pathname + location.search + location.hash, newState);
  } else {
    history.replace(location.pathname + location.search + location.hash, newState);
  }
}

export function setHistoryQSState<S>(location: Location, state: Partial<S>, replace?: boolean) {
  const searchParams = new URLSearchParams(location.search);
  let differs: boolean = false;
  if (state) {
    Object.keys(state).forEach((key) => {
      if (
        !differs &&
        state[key] !== searchParams.get(key) 
      ) {
        differs = true;
      }
      if (state[key] === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, state[key]);
      }
    });
  }
  if (!differs) {
    return;
  }
  if (!replace) {
    history.push(location.pathname + "?" + searchParams.toString() + location.hash, location.state);
  } else {
    history.replace(location.pathname + "?" + searchParams.toString() + location.hash, location.state);
  }
}

export function redirectTo(newLocation: string, state?: any, replace?: boolean) {
  if (replace) {
    history.replace(newLocation, state);
  } else {
    history.push(newLocation, state);
  }
}

export function localizedRedirectTo(newLocation: string, state?: any, replace?: boolean) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = newLocation;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
  return redirectTo(urlTo, state);
}

export function goBack() {
  history.goBack();
}