/**
 * Provides the Link class which allows for linking in the
 * application and doing redirects
 * 
 * @module
 */

import React from "react";
import {
  Link as RouterLink,
  LinkProps,
  useLocation,
} from "react-router-dom";

/**
 * We take the link props from the react router dom and extend them to add
 * these
 */
interface ICustomLinkProps extends LinkProps {
  /**
   * to where we are redirecting to, only a string allowed now
   */
  to: string;
  /**
   * rather than using a "a" link component, use something else
   */
  as?: "div" | "span" | "a" | "p";
  /**
   * Whether to prevent propagation
   */
  propagateClicks?: boolean;
}

/**
 * This is what is executed once the link is clicked or touched
 * @param props the custom link props
 * @param e the event itself
 */
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

/**
 * This is the custom component to allow to use a different tag
 * @param Tag the tag to use
 * @param props the props to use on it
 */
function LinkCustomComponent(Tag: string, props: any) {
  const { navigate, ...rest } = props;
  return <Tag {...rest} onClick={navigate}/>;
}

/**
 * And this is how we specify the custom components by creating it
 */
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
  // first we need to use the location
  const locationCur = useLocation();
  // and now let's ge thte current locale from our location
  const currentLocaleFromURL = locationCur.pathname.split("/")[1] || null;

  // we cannot render if we don't have one
  if (!currentLocaleFromURL) {
    return null;
  }

  // now let's get the url we want to go to
  let urlDefined = props.to;
  if (urlDefined !== null && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  const urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  // and as such it's calculated

  // and these are the new props for the link
  const newProps: LinkProps = {
    ...props,
    to: urlTo,
  };

  // an we delete the propagation of clicks
  delete newProps["propagateClicks"];

  // if we have an as
  if (props.as) {
    // we elete it and
    delete newProps["as"];
    // set the custom component
    newProps.component = customComponents[props.as];
  }

  // call the link with the new props and the on click event
  return <RouterLink {...newProps} onClick={linkOnClick.bind(null, props)}/>;
}
