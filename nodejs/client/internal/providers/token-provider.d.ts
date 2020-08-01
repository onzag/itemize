import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { ILocaleContextType } from "./locale-provider";
export interface IActualTokenProviderState {
    token: string;
    id: number;
    role: string;
    error: EndpointErrorType;
    isLoggingIn: boolean;
    isReady: boolean;
}
interface ITokenProviderProps {
    localeContext: ILocaleContextType;
    onProviderStateSet: (state: IActualTokenProviderState, logout: () => void) => void;
    children: React.ReactNode;
}
export interface ITokenContextType extends IActualTokenProviderState {
    login: (username: string, password: string, token: string) => Promise<{
        id: number;
        role: string;
        error: EndpointErrorType;
    }>;
    logout: () => void;
    dismissError: () => void;
}
export declare const TokenContext: React.Context<ITokenContextType>;
export declare function TokenProvider(props: ITokenProviderProps): JSX.Element;
export {};
