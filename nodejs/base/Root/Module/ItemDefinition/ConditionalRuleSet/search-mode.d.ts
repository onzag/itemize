/**
 * This file builds the search mode for a conditional rule set as when the
 * module tries to convert a module into its search form, this file contains
 * the instructions specific to the conditional rule set conversion
 *
 * @packageDocumentation
 */
import { IPropertyDefinitionRawJSONDataType } from "../PropertyDefinition";
import { IConditionalRuleSetRawJSONDataType } from ".";
/**
 * Gives the id for a property that would be referred to in search mode
 * for a ruleset, just takes the first result, aka FROM and LOCATION, but
 * ignores TO and RADIUS
 * @param rawData the property raw data
 */
export declare function getConversionRulesetId(rawData: IPropertyDefinitionRawJSONDataType): string;
/**
 * Converts a conditional rule set to a search mode, or collapses if it's
 * not able to manage to do so
 * @param rawData the raw data for the conditional rule set
 * @param otherKnownProperties the properties this set has access to
 * @returns a raw conditional rule set that is the search mode form of this ruleset
 */
export declare function buildSearchModeConditionalRuleSet(rawData: IConditionalRuleSetRawJSONDataType, otherKnownProperties: {
    [id: string]: IPropertyDefinitionRawJSONDataType;
}): IConditionalRuleSetRawJSONDataType;
