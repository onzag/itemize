import React from "react";
import { IGQLValue, IGQLRequestFields } from "../../../gql-querier";
export interface ISSRCollectedQueryType {
    idef: string;
    id: number;
    version: string;
    value: IGQLValue;
    fields: IGQLRequestFields;
}
export interface ISSRCollectedResourcesType {
    [src: string]: string;
}
export interface ISSRContextType {
    currencyFactors: {
        [code: string]: number;
    };
    queries: ISSRCollectedQueryType[];
    resources: ISSRCollectedResourcesType;
    user: {
        role: string;
        id: number;
        token: string;
    };
    title: string;
}
export declare const SSRContext: React.Context<ISSRContextType>;
export interface ISSRProviderProps {
    children: React.ReactNode;
    value: ISSRContextType;
}
export declare function SSRProvider(props: ISSRProviderProps): JSX.Element;
