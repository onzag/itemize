/**
 * The token provider component
 * @packageDocumentation
 */
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { ILocaleContextType } from "./locale-provider";
/**
 * State for the actual token provider that actually
 * gets the job done
 */
export interface IActualTokenProviderState {
    /**
     * The token we have got now
     */
    token: string;
    /**
     * The user id
     */
    id: number;
    /**
     * The user role
     */
    role: string;
    /**
     * An error that occured during login
     */
    error: EndpointErrorType;
    /**
     * Whether it's currently logging in
     */
    isLoggingIn: boolean;
    /**
     * Whether it's ready, the main component won't render
     * if is ready is false, because all query execution might mess up
     * say your token is invalid then you'll get a zillion errors and request
     * that will dissapear right away and interface flicker
     *
     * is ready should be true in SSR mode as the server has "checked"
     * the token
     */
    isReady: boolean;
}
/**
 * The provider props that it takes
 */
interface ITokenProviderProps {
    /**
     * the locale context, the locale context allows for updating
     * the current language, country and currency that the app is running in
     * while optimally the rendered value matches the cookie, it's totally possible
     * eg. after a login event that this is not the case, this will happen
     * for both automatic logic and manual login, the language will be switched
     * to the one the user has setup if there's any mismatch
     */
    localeContext: ILocaleContextType;
    /**
     * A function to trigger once the provider state has been set
     * @param state the internal state of the token provider
     * @param logout the function to call when logout is called by the remote listener on
     * a kicked event
     */
    onProviderStateSet: (state: IActualTokenProviderState, logout: () => void) => void;
    /**
     * The children that will render, when the provider is ready
     */
    children: React.ReactNode;
}
/**
 * The token context which actually extends its own internal state
 * but with a couple of functions
 */
export interface ITokenContextType extends IActualTokenProviderState {
    /**
     * the login function
     * @param username the username to login with (can also be an email)
     * @param password the password to login with
     * @param token you can leave username and passwor as null, and provide a token
     * instead, so you are login in by token rather than by anything else, this
     * is used in the initial login
     * @returns a promise with the id, role and a possible error
     */
    login: (username: string, password: string, token: string) => Promise<{
        id: number;
        role: string;
        error: EndpointErrorType;
    }>;
    /**
     * logout function, for the logoutAll functionality check the LogActioner as it's a complex function
     * the token provider only manages simple functionality about the current app state
     */
    logout: () => void;
    /**
     * Dismiss the current login error
     */
    dismissError: () => void;
}
/**
 * The token context contains the current token state as well as several
 * functions, it should sit inside the application and over the main
 * component
 */
export declare const TokenContext: React.Context<ITokenContextType>;
/**
 * The token provider that creates the token context
 * @param props the props for the token provider
 * @returns a react element
 */
export declare function TokenProvider(props: ITokenProviderProps): JSX.Element;
export {};
