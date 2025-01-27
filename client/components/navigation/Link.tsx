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

type QsParamsFn = (current: URLSearchParams, next: URLSearchParams) => string | string[];

interface IQueryParamsSpec {
  [key: string]: string | string[] | QsParamsFn;
};

type QsParamsSpecFn = (current: URLSearchParams, next: URLSearchParams) => IQueryParamsSpec;

/**
 * We take the link props from the react router dom and extend them to add
 * these
 */
interface ICustomLinkProps extends LinkProps {
  /**
   * to where we are redirecting to, only a string allowed now
   * 
   * use the shortcut $HERE to specify the current path as it is without query parameters
   */
  to: string;
  /**
   * rather than using a "a" link component, use something else
   */
  as?: "div" | "span" | "a" | "p";
  /**
   * Makes the link open in a new tab rather than the current
   */
  openInNewTab?: boolean;
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
  /**
   * Provide query params either automatically or dynamically
   */
  qsParams?: QsParamsSpecFn | IQueryParamsSpec;
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

function linkCustomOpenNewTab(props: ICustomLinkProps, e: React.MouseEvent<HTMLAnchorElement>) {
  if (!props.propagateClicks) {
    e.stopPropagation();
  }

  if (props.onClick) {
    props.onClick(e);
  }

  window.open(props.to, props.target || "_blank").focus();
}

function linkATypeOpenNewTab(props: ICustomLinkProps, e: React.MouseEvent<HTMLAnchorElement>) {
  if (!props.propagateClicks) {
    e.stopPropagation();
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
  const splitted = locationCur.pathname.split("/");
  splitted.shift();
  const currentLocaleFromURL = splitted.shift() || null;

  // we cannot render if we don't have one
  if (!currentLocaleFromURL) {
    return null;
  }

  const restOfURL = splitted.join("/").split("?")[0];

  // now let's get the url we want to go to
  let urlDefined = props.to;
  urlDefined = urlDefined && urlDefined.replace("$HERE", restOfURL);
  if (urlDefined !== null && typeof urlDefined !== "undefined" && urlDefined[0] !== "/") {
    urlDefined = "/" + urlDefined;
  }
  let urlTo = urlDefined ? `/${currentLocaleFromURL}${urlDefined}` : null;
  // and as such it's calculated

  // keeping the qs values as they are defined
  if ((props.retainQueryParamsFor || props.retainAllQueryParams || props.qsParams) && urlTo) {
    const dummyURL = new URL("http://dummy" + urlTo);

    const nextQsParsed = dummyURL.searchParams;
    const locationQs = new URLSearchParams(locationCur.search);

    let changed = false;
    if (props.retainQueryParamsFor || props.retainAllQueryParams) {
      // we iterate depending on what we are copying from the source
      (props.retainAllQueryParams ? Array.from(locationQs.keys()) : props.retainQueryParamsFor).forEach((bit) => {
        // if we don't have any qs in our target or if that value is not defined there
        if (!nextQsParsed.get(bit)) {
          // then we can add this value
          const locationQsValue = locationQs.get(bit);

          // if we have it of course
          if (locationQsValue) {
            // now we can add the bit and the value
            changed = true;
            nextQsParsed.set(bit, locationQsValue);
          }
        }
      });
    }

    if (props.qsParams) {
      const value = typeof props.qsParams === "function" ? props.qsParams(locationQs, nextQsParsed) : props.qsParams;
      Object.keys(value).forEach((key) => {
        const vKeyRaw = value[key];
        const valueForKey = typeof vKeyRaw === "function" ? vKeyRaw(locationQs, nextQsParsed) : vKeyRaw;
        if (typeof valueForKey !== "undefined" && valueForKey !== null) {
          changed = true;
          nextQsParsed.set(key, valueForKey as any);
        }
      });
    }

    if (changed) {
      const strParams = dummyURL.searchParams.toString();
      urlTo = dummyURL.pathname + (strParams ? "?" + strParams : "")  + dummyURL.hash;
    }
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
  delete newProps["qsParams"];
  delete newProps["openInNewTab"];

  if (props.openInNewTab) {
    let Component: any = "a";
    if (props.as) {
      delete newProps["as"];
      Component = newProps["as"];
    }

    if (Component !== "a") {
      delete newProps["to"];
      return (
        <Component {...newProps} onClick={linkCustomOpenNewTab.bind(null, props)} />
      );
    } else {
      // string not assignable to string
      newProps.href = newProps["to"] as any;
      delete newProps["to"];
      if (!newProps.target) {
        newProps.target = "_blank";
      }
      if (!newProps.rel) {
        newProps.rel = "noopener noreferrer";
      }
      return (
        <Component {...newProps} onClick={linkATypeOpenNewTab.bind(null, props)} />
      );
    }
  }

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