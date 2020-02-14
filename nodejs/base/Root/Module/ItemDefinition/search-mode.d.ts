/**
 * This file specifies how search mode for item definitions are built
 * given its raw data
 *
 * @packageDocumentation
 */
import { IItemDefinitionRawJSONDataType } from ".";
import { IPropertyDefinitionRawJSONDataType } from "./PropertyDefinition";
import { IModuleRawJSONDataType } from "..";
/**
 * This builds item definitions
 * @param rawData the raw data for the item definition
 * @param modulePropExtensions the prop extensions coming from the module
 * @param originalModule and the original module that brought those extensions
 * @returns a raw json item definition form that represents the search mode
 */
export declare function buildSearchModeItemDefinition(rawData: IItemDefinitionRawJSONDataType, modulePropExtensions: {
    [id: string]: IPropertyDefinitionRawJSONDataType;
}, originalModule: IModuleRawJSONDataType): IItemDefinitionRawJSONDataType;
