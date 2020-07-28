/**
 * Provides the route which is able to create routes that will work
 * under any language
 *
 * @packageDocumentation
 */

import React from "react";
import { Route as RouterRoute, RouteProps } from "react-router-dom";

/**
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
export default function Route(props: RouteProps) {
  // first we check and add the trailing slash if missing
  let urlDefined = props.path;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }

  // and then we build the route on it, note the path
  // we use __lang as the param, unlikely to use
  // in any circumstance, the lang is diresgarded, as well
  // use the AppLanguageRetriever instead to get the language
  // there might be delays and the url is not always accurate
  return <RouterRoute {...props} path={`/:__lang${urlDefined}`}/>;
}
