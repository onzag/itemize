/**
 * Contains the data provider that provides application specific information
 * @module
 */

import React from "react";
import Root from "../../../base/Root";
import { RemoteListener } from "../app/remote-listener";
/**
 * This is the data we currently work with
 * as how the application is defined to be by the
 * JSON Itemize definition
 */
export interface IDataContextType {
  /**
   * The root itself
   */
  value: Root;
  /**
   * The remote listener
   */
  remoteListener: RemoteListener;
  /**
   * whether the app is blocked from an update, happens
   * when an update is triggered but another older version
   * is still running
   */
  updateIsBlocked: boolean;
}

/**
 * The data context provides the root as well as remote listener and whether
 * the update is blocked to any component that demands it under the tree
 */
export const DataContext = React.createContext<IDataContextType>(null);

/**
 * The data provider props
 */
interface IDataProviderProps {
  value: IDataContextType;
  children: React.ReactNode;
}

/**
 * The data provider provides the app data context with information
 * about the current data being executed down the application
 */
export class DataProvider extends React.Component<IDataProviderProps> {
  public shouldComponentUpdate(nextProps: IDataProviderProps) {
    return nextProps.children !== this.props.children ||
      nextProps.value.updateIsBlocked !== this.props.value.updateIsBlocked;
    // root and remote listener are never really going to change, language
    // changes should trigger by the locale context and not by this
  }
  public render() {
    return (
      <DataContext.Provider value={this.props.value}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}
