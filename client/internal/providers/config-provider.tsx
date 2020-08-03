/**
 * Provides the configuration files down the line
 * @packageDocumentation
 */

import React from "react";
import { IConfigRawJSONDataType } from "../../../config";

/**
 * The context that provides the configuration
 */
export const ConfigContext = React.createContext<IConfigRawJSONDataType>(null);

/**
 * Props for the config provider
 */
export interface IConfigProviderProps {
  children: React.ReactNode;
  value: IConfigRawJSONDataType;
}

/**
 * The config provider allows to create a config context
 * should be placed even on top of the app itself
 * as the config is static
 * @param props the config props
 */
export function ConfigProvider(props: IConfigProviderProps) {
  return <ConfigContext.Provider value={props.value}>{props.children}</ConfigContext.Provider>
}
