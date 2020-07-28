/**
 * This file contains the loader for html resources that lay within
 * the application and are part of its buildnumber (aka static) with caching
 * functionality
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props for the html resource loader
 */
interface IHTMLResourceLoaderProps {
    /**
     * the source as a string, without the /rest/resource/ part
     */
    src: string;
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
export default function HTMLResourceLoader(props: IHTMLResourceLoaderProps): JSX.Element;
export {};
