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
    login: (cleanWhenSuccesful?: boolean) => Promise<{
        id: number;
        role: string;
        error: EndpointErrorType;
    }>;
    signup: (cleanWhenSuccesful?: boolean) => Promise<{
        id: number;
        role: string;
        error: EndpointErrorType;
    }>;
    logout: () => void;
    logoutAll: () => void;
    isLoggingIn: boolean;
    error: EndpointErrorType;
    dismissError: () => void;
    cleanUnsafeFields: (addDelay?: boolean) => void;
}) => React.ReactNode;
interface ILogActionerProps {
    children: ActionerFn;
}
export declare function LogActioner(props: ILogActionerProps): JSX.Element;
export {};
