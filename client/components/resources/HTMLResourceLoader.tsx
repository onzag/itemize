/**
 * This file contains the loader for html resources that lay within
 * the application and are part of its buildnumber (aka static) with caching
 * functionality
 *
 * @module
 */

import React from "react";
import type { IResourceLoaderProps } from "./ResourceLoader";
import ResourceLoader from "./ResourceLoader";

/**
 * The props for the html resource loader
 */
interface IHTMLResourceLoaderProps extends IResourceLoaderProps {
  /**
   * an optional wrapper component string, eg, "div", "span", etc...
   */
  wrapper?: string;
  /**
   * an optional wrapper class name
   */
  wrapperClassName?: string;
  /**
   * An optional component to render during the load
   */
  loadingComponent?: React.ReactNode;
  /**
   * An optional component to render if it fails to load
   */
  failedComponent?: React.ReactNode;
}

/**
 * Displays a html resource that is included within the resources that this application
 * is shipped with
 * @param props the resource loader props
 * @returns an react component that wraps this html content
 */
export default function HTMLResourceLoader(props: IHTMLResourceLoaderProps) {
  return (
    <ResourceLoader {...props}>
      {(data, loading, failed) => {
        // if we are loading and we have a loading component
        if (loading && props.loadingComponent) {
          return props.loadingComponent;
          // same for failed
        } else if (failed && props.failedComponent) {
          return props.failedComponent;
        }

        // otherwise we return this, note that even if you have a loading
        // component unless the timer specified in the time of grace has passed
        // the loading state will not display because of this time of grace for the UI
        const WrapperComponent: any = props.wrapper || "div";
        return (
          <WrapperComponent
            className={props.wrapperClassName}
            dangerouslySetInnerHTML={{ __html: data }}
          />
        );
      }}
    </ResourceLoader>
  )
}
