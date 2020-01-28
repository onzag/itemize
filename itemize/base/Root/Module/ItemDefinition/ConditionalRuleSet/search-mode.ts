/**
 * This file builds the search mode for a conditional rule set as when the
 * module tries to convert a module into its search form, this file contains
 * the instructions specific to the conditional rule set conversion
 *
 * @packageDocumentation
 */

import { IPropertyDefinitionRawJSONDataType, IPropertyDefinitionReferredPropertyValue } from "../PropertyDefinition";
import { getConversionIds } from "../PropertyDefinition/search-mode";
import { IConditionalRuleSetRawJSONDataType, IConditionalRuleSetRawJSONDataPropertyType } from ".";

/**
 * Gives the id for a property that would be referred to in search mode
 * for a ruleset, just takes the first result, aka FROM and LOCATION, but
 * ignores TO and RADIUS
 * @param rawData the property raw data
 */
export function getConversionRulesetId(
  rawData: IPropertyDefinitionRawJSONDataType,
): string {
  // we get all the possible ids
  const ids = getConversionIds(rawData);
  // and return such, or null if we got an empty array
  // (this happens when search mode is disabled for that property)
  return ids.length ? ids[0] : null;
}

/**
 * Converts a conditional rule set to a search mode, or collapses if it's
 * not able to manage to do so
 * @param rawData the raw data for the conditional rule set
 * @param otherKnownProperties the properties this set has access to
 * @returns a raw conditional rule set that is the search mode form of this ruleset
 */
export function buildSearchModeConditionalRuleSet(
  rawData: IConditionalRuleSetRawJSONDataType,
  otherKnownProperties: {[id: string]: IPropertyDefinitionRawJSONDataType},
): IConditionalRuleSetRawJSONDataType {
  // we make a copy
  const newRule = {...rawData};

  // if it's a property based rule
  if ((newRule as IConditionalRuleSetRawJSONDataPropertyType).property) {
    // we get the rule as a property
    const newRuleAsProperty = (newRule as IConditionalRuleSetRawJSONDataPropertyType);
    // if the property in question is not &this, which is the shorthand for the current property
    if (newRuleAsProperty.property !== "&this") {
      // we ge the converted rule set id from the given property
      const converted = getConversionRulesetId(otherKnownProperties[
        newRuleAsProperty.property
      ]);
      // if it collapses (like if it was search mode and it's disabled which means it is not
      // accessible anymore)
      if (converted === null) {
        // we return null, the condition has collapsed
        return null;
      }
      // we set the property to the converted result
      newRuleAsProperty.property = converted;
    }

    // we check the value if it uses an alternative value set as property
    const valueAsAlternative = (newRuleAsProperty.value as IPropertyDefinitionReferredPropertyValue);
    // if that's the case
    if (valueAsAlternative && valueAsAlternative.property) {
      // we need to convert that one too!
      newRuleAsProperty.value = {
        property: getConversionRulesetId(otherKnownProperties[
          valueAsAlternative.property
        ]),
      };

      if (newRuleAsProperty.value.property === null) {
        return null;
      }
    }
  }

  // if we have a secondary condition
  if (newRule.condition) {
    // we need to recurse in
    const newCondition = buildSearchModeConditionalRuleSet(newRule.condition, otherKnownProperties);
    // if that collapsed
    if (newCondition === null) {
      // then this one collapsed too
      return null;
    }
    // otherwise we just set the condition
    newRule.condition = newCondition;
  }
  // and return
  return newRule;
}
