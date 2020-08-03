/**
 * Provides the configuration files down the line
 * @packageDocumentation
 */
import React from "react";
import { IConfigRawJSONDataType } from "../../../config";
/**
 * The context that provides the configuration
 */
export declare const ConfigContext: React.Context<IConfigRawJSONDataType>;
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
export declare function ConfigProvider(props: IConfigProviderProps): JSX.Element;
