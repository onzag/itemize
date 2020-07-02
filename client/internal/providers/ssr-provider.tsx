import React from "react";
import { IGQLValue, IGQLRequestFields } from "../../../gql-querier";

export interface ISSRCollectedQueryType {
  idef: string,
  id: number,
  version: string,
  value: IGQLValue,
  fields: IGQLRequestFields,
}

export interface ISSRContextType {
  currencyFactors: {
    [code: string]: number,
  };
  queries: ISSRCollectedQueryType[],
  user: {
    role: string;
    id: number;
    token: string;
  },
  title: string;
}

export const SSRContext = React.createContext<ISSRContextType>(null);

export interface ISSRProviderProps {
  children: React.ReactNode;
  value: ISSRContextType;
}

export function SSRProvider(props: ISSRProviderProps) {
  return <SSRContext.Provider value={props.value}>{props.children}</SSRContext.Provider>
}