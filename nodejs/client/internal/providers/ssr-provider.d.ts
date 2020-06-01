import React from "react";
import { IGQLValue, IGQLRequestFields } from "../../../gql-querier";
export interface ISSRContextType {
    queries: {
        [key: string]: {
            value: IGQLValue;
            fields: IGQLRequestFields;
        };
    };
    user: {
        role: string;
        id: number;
        token: string;
    };
}
export declare const SSRContext: React.Context<ISSRContextType>;
export interface ISSRProviderProps {
    children: React.ReactNode;
    value: ISSRContextType;
}
export declare function SSRProvider(props: ISSRProviderProps): JSX.Element;
