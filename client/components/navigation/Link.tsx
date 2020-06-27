import React from "react";
import {
  Link as RouterLink,
  LinkProps,
  useLocation,
} from "react-router-dom";

interface ICustomLinkProps extends LinkProps {
  to: string;
  as?: "div" | "span" | "a" | "p";
  propagateClicks?: boolean;
}

// TODO add analytics
function linkOnClick(props: ICustomLinkProps, e: React.MouseEvent<HTMLAnchorElement>) {
  if (!props.propagateClicks) {
    e.stopPropagation();
  }
  if (props.to === location.pathname + location.search) {
    e.preventDefault();
  }

  if (props.onClick) {
    props.onClick(e);
  }
}

function LinkCustomComponent(Tag: string, props: any) {
  const { navigate, ...rest } = props;
  return <Tag {...rest} onClick={navigate}/>;
}

const customComponents = {
  "div": LinkCustomComponent.bind(null, "div"),
  "p": LinkCustomComponent.bind(null, "p"),
  "span": LinkCustomComponent.bind(null, "span"),
  "a": LinkCustomComponent.bind(null, "a"),
}

/**
 * Same as the router link but actually takes
 * care of the current language set and uses such
 * language if the location is absolute
 * @param props the LinkProps
 */
export default function Link(props: ICustomLinkProps) {
  const locationCur = useLocation();
  const currentLocaleFromURL = locationCur.pathname.split("/")[1] || null;
  if (!currentLocaleFromURL) {
    return null;
  }
  let urlDefined = props.to;
  if (urlDefined !== null && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  const newProps: LinkProps = {
    ...props,
    to: urlTo,
  };

  delete newProps["propagateClicks"];

  if (props.as) {
    delete newProps["as"];
    newProps.component = customComponents[props.as];
  }

  return <RouterLink {...newProps} onClick={linkOnClick.bind(null, props)}/>;
}