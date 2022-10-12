/**
 * This file specifies how search mode for item definitions are built
 * given its raw data
 *
 * @module
 */

import ItemDefinition, { IItemDefinitionRawJSONDataType } from ".";
import { IPropertyDefinitionRawJSONDataType, IPropertyDefinitionReferredPropertyValue } from "./PropertyDefinition";
import { IModuleRawJSONDataType } from "..";
import { getConversionRulesetId, buildSearchModeConditionalRuleSet } from "./ConditionalRuleSet/search-mode";
import { getConversionIds, buildSearchModePropertyDefinitions } from "./PropertyDefinition/search-mode";
import { MAX_SEARCH_FIELD_LENGTH } from "../../../../constants";
import { Ii18NType } from "../..";

/**
 * This builds item definitions
 * @param rawData the raw data for the item definition
 * @param modulePropExtensions the prop extensions coming from the module
 * @param originalModule and the original module that brought those extensions
 * @returns a raw json item definition form that represents the search mode
 */
export function buildSearchModeItemDefinition(
  rawData: IItemDefinitionRawJSONDataType,
  modulePropExtensions: {[id: string]: IPropertyDefinitionRawJSONDataType},
  originalModule: IModuleRawJSONDataType,
  rootI18nData: Ii18NType,
): IItemDefinitionRawJSONDataType {
  // copy that
  const newItemDef = {...rawData};
  // remove policies
  delete newItemDef.policies;
  // create a known property map array using the prop extensions as base
  const knownPropMap = {...modulePropExtensions};

  if (typeof newItemDef.searchable === "undefined" || newItemDef.searchable) {
    // if we have properties
    if (newItemDef.properties) {
      // we loop to them and add them to the known list
      newItemDef.properties.forEach((p) => {
        knownPropMap[p.id] = p;
      });
      // now we build such properties
      newItemDef.properties = newItemDef.properties
        .map((p) => buildSearchModePropertyDefinitions(p, knownPropMap, rootI18nData))
        // filter properties that returned nothing because they are not searchable
        // even when by default they return an empty array, but just in case
        .filter((p) => !!p)
        // we need to combine the resulting arrays and flatten them
        .reduce((arr, pArr) => [...arr, ...pArr]);
    }

    if (!newItemDef.properties) {
      newItemDef.properties = [];
    }

    const searchI18nData = {};
    Object.keys(newItemDef.i18nData).forEach((locale) => {
      searchI18nData[locale] = {};
      searchI18nData[locale].label = newItemDef.i18nData[locale].search_field_label;
      searchI18nData[locale].placeholder = newItemDef.i18nData[locale].search_field_placeholder;
      searchI18nData[locale].error = {
        TOO_LARGE: newItemDef.i18nData[locale].search_value_too_large,
      };
    });
    newItemDef.properties.push({
      id: "search",
      type: "string",
      subtype: "search",
      nullable: true,
      maxLength: MAX_SEARCH_FIELD_LENGTH,
      i18nData: searchI18nData,
      searchable: false,
    });
    newItemDef.properties.push({
      id: "created_by",
      type: "string",
      nullable: true,
      maxLength: 255,
      i18nData: null,
      hidden: true,
      searchable: false,
    });
    newItemDef.properties.push({
      id: "since",
      type: "datetime",
      nullable: true,
      i18nData: null,
      hidden: true,
      searchable: false,
    });
    newItemDef.properties.push({
      id: "until",
      type: "datetime",
      nullable: true,
      i18nData: null,
      hidden: true,
      searchable: false,
    });

    // now we go over the includes, aka the items
    newItemDef.includes = newItemDef.includes && newItemDef.includes.map((i) => {
      // if they are search disabled we ignore them
      if (i.disableSearch) {
        return null;
      }

      // otherwise let's get the item definition using the parent module, this includes imported
      // stuff
      const idef = ItemDefinition.getItemDefinitionRawFor(rawData, originalModule, i.definition, false);
      // the new include is the same as that include
      const newInclude = {...i};

      // we need to convert all the conditional rule sets using the known properties
      if (newInclude.defaultExcludedIf) {
        newInclude.defaultExcludedIf = buildSearchModeConditionalRuleSet(i.defaultExcludedIf, knownPropMap);
      }
      if (newInclude.canUserExcludeIf) {
        newInclude.canUserExcludeIf = buildSearchModeConditionalRuleSet(i.canUserExcludeIf, knownPropMap);
      }
      if (newInclude.excludedIf) {
        newInclude.excludedIf = buildSearchModeConditionalRuleSet(i.excludedIf, knownPropMap);
      }

      // if the user can exclude, we need to make sure that exclusion is callout is set to false
      // as this is a search, no need for callouts, and also a ternary exclusion state then exists
      // where we have, excluded, included or any.
      if (newInclude.canUserExclude || newInclude.canUserExcludeIf) {
        newInclude.exclusionIsCallout = false;
        newInclude.ternaryExclusionState = true;
      }

      // now we dive into sinking properties if they are there
      if (newInclude.sinkIn) {
        // we basically need to get the conversion ids for each property
        newInclude.sinkIn = newInclude.sinkIn.map((sinkInProperty) => {
          // we need to get the property that the sink in is about, since we have the item definition
          // we already searched, we can use the helper function and the module to get it, note how we do not
          // ignore imports
          const property = ItemDefinition.getPropertyDefinitionRawFor(idef, originalModule, sinkInProperty, false);
          // we get the conversion ids
          return getConversionIds(property);
        }).flat();
      }

      // now we go onto enforced and predefined properties
      ["enforcedProperties", "predefinedProperties"].forEach((objectKey) => {
        // if we have such thingy
        if (newInclude[objectKey]) {
          // we need the new value, so we need to check how they are defined
          const newValueForThat = {};
          // we are going to loop for each predefined or enforced property to get a key which
          // represents the property name
          Object.keys(newInclude[objectKey]).forEach((key) => {
            // now we need to get the property definition that it is about from the idef, including imports
            const propertyInReferred = ItemDefinition.getPropertyDefinitionRawFor(idef, originalModule, key, false);
            // we get the value that was given by the new include
            let value = newInclude[objectKey][key];
            // if the value is of type property, the alternative which doesn't represent a value
            if ((value as IPropertyDefinitionReferredPropertyValue).property) {
              // then we need to convert that value too!... from the ruleset
              // which returns a single property value, unlike getConversionIds
              value = {
                property: getConversionRulesetId(
                  knownPropMap[(value as IPropertyDefinitionReferredPropertyValue).property],
                ),
              };
            }
            // we set the value
            newValueForThat[getConversionRulesetId(propertyInReferred)] = value;
          });

          // and we set it in the new include
          newInclude[objectKey] = newValueForThat;
        }
      });

      // return it
      return newInclude;
    }).filter((i) => !!i);
  }

  // if we have child definitions
  if (newItemDef.childDefinitions) {
    // we loop and work on those the same way
    newItemDef.childDefinitions = newItemDef.childDefinitions.map((cd) => {
      return buildSearchModeItemDefinition(cd, modulePropExtensions, originalModule, rootI18nData);
    });
  }
  return newItemDef;
}
