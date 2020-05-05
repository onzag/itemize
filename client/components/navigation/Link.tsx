import React from "react";
import {
  Link as RouterLink,
  LinkProps,
} from "react-router-dom";

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
export default function Link(props: ICustomLinkProps) {
  const currentLocaleFromURL = location.pathname.split("/")[1] || null;
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

  return <RouterLink {...newProps} onClick={linkOnClick.bind(null, newProps)}/>;
}