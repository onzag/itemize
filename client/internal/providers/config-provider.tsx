import React from "react";
import { IGQLValue, IGQLRequestFields } from "../../../gql-querier";
import { IConfigRawJSONDataType } from "../../../config";

export const ConfigContext = React.createContext<IConfigRawJSONDataType>(null);

export interface IConfigProviderProps {
  children: React.ReactNode;
  value: IConfigRawJSONDataType;
}

export function ConfigProvider(props: IConfigProviderProps) {
  return <ConfigContext.Provider value={props.value}>{props.children}</ConfigContext.Provider>
}