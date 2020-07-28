/**
 * Contains the class that allows to generate conditional rendering
 * on whether the user is logged in or not
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The available logged types
 */
declare type logStatusType = "LOGGED_IN" | "LOGGED_OUT" | "LOGGING_IN";
/**
 * The callback that might be expected as children
 */
declare type IfLogStatusCallback = (status: logStatusType) => React.ReactNode;
/**
 * The props for the log status
 */
interface IIfLogStatusProps {
    /**
     * A conditional status, if provided the element children
     * will only render if the status matches the one provided
     */
    status?: logStatusType;
    /**
     * A react node as children to a function, if passed a function
     * the actual log status is going to be passed
     */
    children: React.ReactNode | IfLogStatusCallback;
}
/**
 * The IfLogStatus component allows for conditional rendering of the
 * logged in status of the current user in the application context
 * @param props the log status props
 * @returns a react node
 */
export declare function IfLogStatus(props: IIfLogStatusProps): JSX.Element;
export {};
