import React from "react";
import { Redirect as RouterRedirect, RedirectProps } from "react-router-dom";

export default function Redirect(props: RedirectProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined !== null && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  const newProps: RedirectProps = {
    ...props,
    to: urlTo,
  };

  return <RouterRedirect {...newProps}/>;
}