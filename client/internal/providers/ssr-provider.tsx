/**
 * The ssr provider file
 * @module
 */

import type { ICompoundSearchStateType } from "../../../base/Root/Module/ItemDefinition";
import React from "react";
import type { IRQValue, IRQRequestFields } from "../../../rq-querier";

/**
 * The SSR collected information
 */
export interface ISSRCollectedQueryType {
  /**
   * The item defintion qualified name
   */
  idef: string,
  /**
   * The id
   */
  id: string,
  /**
   * The version or null
   */
  version: string,
  /**
   * The value that is collected
   */
  value: IRQValue,
  /**
   * The fields we collected for
   */
  fields: IRQRequestFields,
}

/**
 * The SSR collected information
 */
 export interface ISSRCollectedSearchType {
  /**
   * The item defintion qualified name
   */
  idef: string,
  /**
   * The id
   */
  id: string,
  /**
   * The version or null
   */
  version: string,
  /**
   * The search state
   */
  state: ICompoundSearchStateType,
}

/**
 * The list of collected resources
 */
export interface ISSRCollectedResourcesType {
  /**
   * The src url tat maps to a value
   */
  [src: string]: string;
}

/**
 * The SSR context itself on all its might
 */
export interface ISSRContextType {
  /**
   * Currency factors as they are used in the SSR mode,
   * this will become the initial currency factors, if 
   * there's no SSR context then it should fetch
   */
  currencyFactors: {
    [code: string]: number,
  };
  /**
   * Collected queries
   */
  queries: ISSRCollectedQueryType[];
  /**
   * Collected resources map
   */
  resources: ISSRCollectedResourcesType;
  /**
   * Collected searches
   */
  searches: ISSRCollectedSearchType[];
  /**
   * The user we refer about
   */
  user: {
    /**
     * Role of the user
     */
    role: string;
    /**
     * id of the user
     */
    id: string;
    /**
     * Token of the user, now due to security considerations
     * and since this is equal to the cookie, the cookie value
     * IN_COOKIE will be used in the client side, different for what
     * is used in the server side, however the output should be equal
     * anyway, as anyone who consumes this should read the cookie value
     */
    token: string;
  },
  /**
   * The title of the page, will be the same as the document.title in the client side
   * but the server has no access to the dom, so to keep things consistent it's here
   */
  title: string;
}

/**
 * The ssr context passes the context value all the way to all the components
 */
export const SSRContext = React.createContext<ISSRContextType>(null);

/**
 * The ssr provider props that creates the context
 */
export interface ISSRProviderProps {
  children: React.ReactNode;
  value: ISSRContextType;
}

/**
 * The SSR provider is a static provider that generates a context that is used
 * primarily for the initial render to access information, mainly about the user
 * for the setup of the token provider, the title and resources, since currency
 * factors become the initial currency factors and the queries become applied
 * values during initialization
 * 
 * This should sit on top of the itemize app
 * 
 * @param props the provider props
 */
export function SSRProvider(props: ISSRProviderProps) {
  return <SSRContext.Provider value={props.value}>{props.children}</SSRContext.Provider>
}
