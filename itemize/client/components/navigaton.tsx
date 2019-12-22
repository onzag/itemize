import React from "react";
import { Link as RouterLink, LinkProps, Route as RouterRoute, RouteProps } from "react-router-dom";
import { LocationStateContext } from "../app/internal-providers";
import { Location } from "history";
import { history } from "..";

interface IHistorySetStatePartial {
  [key: string]: any;
}

export function setHistoryState(location: Location, state: IHistorySetStatePartial, replace?: boolean) {
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

export function redirectTo(newLocation: string, state?: any) {
  history.push(newLocation, state);
}

interface ICustomLinkProps extends LinkProps {
  to: string;
}

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

interface ILocationStateReaderProps {
  children: (location: Location, setState: (state: IHistorySetStatePartial, replace?: boolean) => void) => any;
}

export function LocationStateReader(props: ILocationStateReaderProps) {
  return (
    <LocationStateContext.Consumer>
      {
        (value: Location) => {
          if (!value.state) {
            const valueWithState = {
              ...value,
              state: {},
            };
            return props.children(valueWithState, setHistoryState.bind(null, valueWithState));
          }
          return props.children(value, setHistoryState.bind(null, value));
        }
      }
    </LocationStateContext.Consumer>
  );
}
