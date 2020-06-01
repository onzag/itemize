import React from "react";
import { IGQLValue, IGQLRequestFields } from "../../../nodejs/gql-querier";

export interface ISSRContextType {
  queries: {
    [key: string]: {
      value: IGQLValue,
      fields: IGQLRequestFields,
    }
  },
  user: {
    role: string;
    id: number;
    token: string;
  },
}

export const SSRContext = React.createContext<ISSRContextType>(null);

export interface ISSRProviderProps {
  children: React.ReactNode;
  value: ISSRContextType;
}

export function SSRProvider(props: ISSRProviderProps) {
  return <SSRContext.Provider value={props.value}>{props.children}</SSRContext.Provider>
}