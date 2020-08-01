/**
 * Contains the data provider that provides application specific information
 * @packageDocumentation
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
export declare const DataContext: React.Context<IDataContextType>;
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
export declare class DataProvider extends React.Component<IDataProviderProps> {
    shouldComponentUpdate(nextProps: IDataProviderProps): boolean;
    render(): JSX.Element;
}
export {};
