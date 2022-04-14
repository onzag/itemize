import React from "react";
import {
  useLocation,
} from "react-router-dom";
import { USSDAction } from "./USSDAction";

interface IUSSDOptionProps {
  children: string;
  url: string;
}

export default function USSDOption(props: IUSSDOptionProps) {
  const locationCur = useLocation();
  // and now let's ge thte current locale from our location
  const currentLocaleFromURL = locationCur.pathname.split("/")[1] || null;

  // we cannot render if we don't have one
  if (!currentLocaleFromURL) {
    return null;
  }

  // now let's get the url we want to go to
  let urlDefined = props.url;
  if (urlDefined !== null && typeof urlDefined !== "undefined" && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;

  return (
    <USSDAction
      label={props.children}
      onInput={() => urlTo}
    />
  )
}