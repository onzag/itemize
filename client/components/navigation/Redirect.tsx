/**
 * Constains the redirect component which basically does a 302 redirect
 * but on the client side and as part of the DOM (kinda)
 *
 * @module
 */

import React from "react";
import { Redirect as RouterRedirect, RedirectProps } from "react-router-dom";

/**
 * The redirect component, localized in order to take advantage
 * of the itemize app context
 * @param props the props
 * @returns a react component
 */
export default function Redirect(props: RedirectProps) {
  // first we extract the locale
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }

  // and then build the url, adding a trailing slash if missing
  let urlDefined = props.to;
  if (urlDefined !== null && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }

  // then creting it
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;

  // and making the new props
  const newProps: RedirectProps = {
    ...props,
    to: urlTo,
  };

  // returning the redirect
  return <RouterRedirect {...newProps}/>;
}
