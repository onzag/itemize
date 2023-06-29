/**
 * Provides the Link class which allows for linking in the
 * application and doing redirects
 * 
 * @module
 */

import React, { ForwardedRef } from "react";
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
  /**
   * Retains the current query params if found for the given values
   */
  retainQueryParamsFor?: string[];
  /**
   * Retains all the query params of the current
   */
  retainAllQueryParams?: boolean;
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
  return <Tag {...rest} onClick={navigate} />;
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
const Link = React.forwardRef((props: ICustomLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
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
  if (urlDefined !== null && typeof urlDefined !== "undefined" && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  let urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  // and as such it's calculated

  // keeping the qs values as they are defined
  if (props.retainQueryParamsFor || props.retainAllQueryParams) {
    const currentQs = urlTo.split("?")[1];
    const urlToParsed = currentQs ? new URLSearchParams("?" + currentQs) : null;
    const locationQs = new URLSearchParams(locationCur.search);

    // we iterate depending on what we are copying from the source
    (props.retainAllQueryParams ? Array.from(locationQs.keys()) : props.retainQueryParamsFor).forEach((bit) => {
      // if we don't have any qs in our target or if that value is not defined there
      if (!urlToParsed || !urlToParsed.get(bit)) {
        // then we can add this value
        const locationQsValue = locationQs.get(bit);

        // if we have it of course
        if (locationQsValue) {
          // if the url ends with ? or & we are ready to append, if not...
          if (!urlTo.endsWith("?") && !urlTo.endsWith("&")) {
            // if we don't have a querystring at all we must start with that
            if (!currentQs) {
              urlTo += "?";
            } else {
              // otherwise we are adding to that querystring
              urlTo += "&";
            }
          }

          // now we can add the bit and the value
          urlTo += bit + "=" + encodeURIComponent(locationQsValue);
        }
      }
    });
  }

  // and these are the new props for the link
  const newProps: LinkProps = {
    ...props,
    to: urlTo,
  };

  // an we delete the propagation of clicks
  delete newProps["propagateClicks"];
  delete newProps["retainQueryParamsFor"];
  delete newProps["retainAllQueryParams"];

  // if we have an as
  if (props.as) {
    // we elete it and
    delete newProps["as"];
    // set the custom component
    newProps.component = customComponents[props.as];
  }

  // call the link with the new props and the on click event
  return <RouterLink {...newProps} onClick={linkOnClick.bind(null, props)} ref={ref} />;
})

export default Link;