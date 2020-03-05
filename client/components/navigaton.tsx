import React from "react";
import { Link as RouterLink, LinkProps, Route as RouterRoute, RouteProps } from "react-router-dom";
import { LocationStateContext } from "../internal/app/internal-providers";
import { Location } from "history";
import { history } from "..";

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

export function redirectTo(newLocation: string, state?: any) {
  history.push(newLocation, state);
}

export function localizedRedirectTo(newLocation: string, state?: any) {
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

interface ICustomLinkProps extends LinkProps {
  to: string;
}

// TODO add analytics
function linkOnClick(props: ICustomLinkProps, e: React.MouseEvent<HTMLAnchorElement>) {
  if (props.to === location.pathname + location.search) {
    e.preventDefault();
  }

  if (props.onClick) {
    props.onClick(e);
  }
}

/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
export function Link(props: ICustomLinkProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = `/${currentLocaleFromURL}${urlDefined}`;
  const newProps: LinkProps = {
    ...props,
    to: urlTo,
  };

  return <RouterLink {...newProps} onClick={linkOnClick.bind(null, newProps)}/>;
}

/**
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
export function Route(props: RouteProps) {
  let urlDefined = props.path;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  return <RouterRoute {...props} path={`/:__lang${urlDefined}`}/>;
}

interface ILocationStateReaderProps<S> {
  defaultState: S;
  stateIsInQueryString?: boolean;
  children: (
    state: S,
    setState: (state: Partial<S>, replace?: boolean) => void,
  ) => React.ReactNode;
}

export function LocationStateReader<S>(props: ILocationStateReaderProps<S>) {
  return (
    <LocationStateContext.Consumer>
      {
        (location: Location<S>) => {
          if (props.stateIsInQueryString) {
            const searchParams = new URLSearchParams(location.search);
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
              statefulValue[key] = searchParams.has(key) ? searchParams.get(key) : props.defaultState[key];
            });
            return props.children(statefulValue as S, setHistoryQSState.bind(null, location))
          } else {
            if (!location.state) {
              return props.children(props.defaultState, setHistoryState.bind(null, location));
            }
            const statefulValue = {};
            Object.keys(props.defaultState).forEach((key) => {
              statefulValue[key] = typeof location.state[key] !== "undefined" ? location.state[key] : props.defaultState[key];
            });
            return props.children(statefulValue as S, setHistoryState.bind(null, location));
          }
        }
      }
    </LocationStateContext.Consumer>
  );
}
