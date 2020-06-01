import React from "react";
import { II18nReadErrorProps } from "./I18nReadError";
import { II18nReadProps } from "./I18nRead";
import { ILocaleContextType, IDataContextType } from "../../internal/app";
import { IModuleContextType } from "../../providers/module";
import { IItemDefinitionContextType } from "../../providers/item-definition";
import { IIncludeContext } from "../../providers/include";
interface Ii18nReadManyProps {
    data: Array<II18nReadProps | II18nReadErrorProps>;
    children: (...results: React.ReactNode[]) => React.ReactNode;
}
export declare function i18nReadManyInternal(localeContext: ILocaleContextType, dataContext: IDataContextType, moduleContextualValue: IModuleContextType, itemDefinitionContextualValue: IItemDefinitionContextType, includeContext: IIncludeContext, props: Ii18nReadManyProps): React.ReactNode;
export default function I18nReadMany(props: Ii18nReadManyProps): any;
export {};
