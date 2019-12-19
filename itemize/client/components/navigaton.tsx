import React from "react";
import { Link as RouterLink, LinkProps, Route as RouterRoute, RouteProps } from "react-router-dom";

/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
export function Link(props: LinkProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  return <RouterLink {...props} to={`/${currentLocaleFromURL}${urlDefined}`}/>;
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
