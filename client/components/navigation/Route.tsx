import React from "react";
import { Route as RouterRoute, RouteProps } from "react-router-dom";

/**
 * Same as the router from react router but takes care of the language
 * and considers the root to be the language source
 * @param props the RouterProps
 */
export default function Route(props: RouteProps) {
  let urlDefined = props.path;
  if (urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  return <RouterRoute {...props} path={`/:__lang${urlDefined}`}/>;
}