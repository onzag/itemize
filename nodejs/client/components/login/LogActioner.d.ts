/**
 * This file contents functionality that is used as a component in order to perform
 * login and logout actions, they must be placed inside the provider of an item definition
 * of type user
 *
 * @packageDocumentation
 */
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
/**
 * This is the type we expect as the actioner for login and logout, the children
 * as it takes a function that returns a react node
 */
declare type ActionerFn = (actioner: {
    /**
     * Performs a login action, username and password field in the user item definition context
     * should be filled for this; username can be an email for this
     */
    login: (cleanWhenSuccessful?: boolean) => Promise<{
        id: number;
        role: string;
        error: EndpointErrorType;
    }>;
    /**
     * Performs a signup action, username and password field in the user item definition context
     * should be filled as well; username cannot be an email for signup, validation should apply
     */
    signup: (cleanWhenSuccessful?: boolean) => Promise<{
        id: number;
        role: string;
        error: EndpointErrorType;
    }>;
    /**
     * Performs a logout action
     */
    logout: () => void;
    /**
     * Logouts from all devices
     */
    logoutAll: () => void;
    /**
     * Whether it is currently logging in
     */
    isLoggingIn: boolean;
    /**
     * The last error from the last action
     */
    error: EndpointErrorType;
    /**
     * Dismiss such error
     */
    dismissError: () => void;
    /**
     * Clean all unsafe fields, that is basically password
     * it will hook to the context of the item definition
     */
    cleanUnsafeFields: (addDelay?: boolean) => void;
}) => React.ReactNode;
/**
 * The props for the log actioner, basically only takes the children
 */
interface ILogActionerProps {
    children: ActionerFn;
}
/**
 * The log actioner class allows for actions regarding login/signup
 * and retrieval of the login state in order to implement
 * such functionality in react components
 * @param props the log actioner props
 * @returns a react component
 */
export declare function LogActioner(props: ILogActionerProps): JSX.Element;
export {};
