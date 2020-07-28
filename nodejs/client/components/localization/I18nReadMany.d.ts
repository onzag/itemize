/**
 * Allows to read many errors and standard information at the same time (parallel)
 * in an efficient way
 *
 * @packageDocumentation
 */
import React from "react";
import { II18nReadErrorProps } from "./I18nReadError";
import { II18nReadProps } from "./I18nRead";
import { ILocaleContextType, IDataContextType } from "../../internal/app";
import { IModuleContextType } from "../../providers/module";
import { IItemDefinitionContextType } from "../../providers/item-definition";
import { IIncludeContext } from "../../providers/include";
/**
 * The props for the read many
 */
interface Ii18nReadManyProps {
    /**
     * An array of read props or read error
     */
    data: Array<II18nReadProps | II18nReadErrorProps>;
    /**
     * This passes the resulting "NODE" to the children function
     * this will not pass ever a string as a result unlike the children function
     * of the i18nRead or i18nReadError function that are able to pass strings
     *
     * unlike other read functions children is required
     */
    children: (...results: React.ReactNode[]) => React.ReactNode;
}
/**
 * The internal read many functionality, somewhat less refined
 * than the previous because this one doesn't need an optimizer
 * on itself
 *
 * @param localeContext the locale context (always available)
 * @param dataContext data context for root data app access (available for errors)
 * @param moduleContextualValue module context (avaiable for standard display if exists)
 * @param itemDefinitionContextualValue item definition context (avaiable for standard display if exists)
 * @param includeContext include context (avaiable for standard display if exists)
 * @param props the actual read many props
 */
export declare function i18nReadManyInternal(localeContext: ILocaleContextType, dataContext: IDataContextType, moduleContextualValue: IModuleContextType, itemDefinitionContextualValue: IItemDefinitionContextType, includeContext: IIncludeContext, props: Ii18nReadManyProps): React.ReactNode;
/**
 * The read many component which allows to read many i18n data at once
 * @param props the props
 * @returns a react node, it is marked as any because typescript gets buggy
 * when such a function returns a react node
 */
export default function I18nReadMany(props: Ii18nReadManyProps): any;
export {};
