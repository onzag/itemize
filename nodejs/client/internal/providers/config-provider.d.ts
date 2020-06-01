import React from "react";
import { IConfigRawJSONDataType } from "../../../config";
export declare const ConfigContext: React.Context<IConfigRawJSONDataType>;
export interface IConfigProviderProps {
    children: React.ReactNode;
    value: IConfigRawJSONDataType;
}
export declare function ConfigProvider(props: IConfigProviderProps): JSX.Element;
