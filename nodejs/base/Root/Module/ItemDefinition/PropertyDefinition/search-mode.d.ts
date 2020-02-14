/**
 * Builds the search mode of a property definition that is used within
 * the search module for used within searches, basically this is an alternative
 * item definition and alternative property that is used during searches
 *
 * @packageDocumentation
 */
import { IPropertyDefinitionRawJSONDataType } from ".";
/**
 * Provides all the ids that a property would be referred to in search mode
 * @param rawData the raw property
 * @returns an array of string for the ids in search mode for the property
 */
export declare function getConversionIds(rawData: IPropertyDefinitionRawJSONDataType): string[];
/**
 * Builds a property definition to its search mode
 * @param rawData the raw property definition source
 * @param otherKnownProperties the object with the other known properties that this one can see
 * @returns an array of property definitions
 */
export declare function buildSearchModePropertyDefinitions(rawData: IPropertyDefinitionRawJSONDataType, otherKnownProperties: {
    [id: string]: IPropertyDefinitionRawJSONDataType;
}): IPropertyDefinitionRawJSONDataType[];
