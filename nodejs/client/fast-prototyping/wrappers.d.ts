import React from "react";
import { ILocaleContextType } from "../internal/app";
import { IConfigRawJSONDataType } from "../../config";
export declare function appWrapper(app: React.ReactElement, config: IConfigRawJSONDataType): JSX.Element;
export declare function mainWrapper(mainComponent: React.ReactElement, localeContext: ILocaleContextType): JSX.Element;
