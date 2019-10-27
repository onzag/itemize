import { IModuleRawJSONDataType } from "./Module";
import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
  PropertyDefinitionSearchInterfacesType,
  PropertyInvalidReason,
  IPropertyDefinitionAlternativePropertyType,
} from "./ItemDefinition/PropertyDefinition";
import {
  IConditionalRuleSetRawJSONDataType,
  IConditionalRuleSetRawJSONDataPropertyType,
} from "./ItemDefinition/ConditionalRuleSet";
import ItemDefinition, { IItemDefinitionRawJSONDataType } from "./ItemDefinition";

/**
 * Builds the search mode for a module
 * @param rawData the raw data for the module
 * @returns a module
 */
export function buildSearchMode(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType {
  return buildSearchModeModule(rawData);
}

/**
 * Builds the module based on its raw data
 * @param rawData the raw data for the module
 * @returns a module
 */
function buildSearchModeModule(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType {
  // cloning the module
  const newModule = {...rawData};
  // renaming using our fancy uppercase letters which are not valid
  // module names to ensure non collision
  newModule.name = "QUERY_MOD__" + newModule.name;

  // we fetch all the properties
  const knownPropExtMap = {};
  if (newModule.propExtensions) {
    // gathering the prop extensions as raw to the known prop extension map
    newModule.propExtensions.forEach((pe) => {
      knownPropExtMap[pe.id] = pe;
    });

    // we build them using that prop extension map we have used
    // we need to merge the arrays together and the result can be several
    // property definitions for one in search mode, specifically in range and
    // location
    newModule.propExtensions = newModule.propExtensions
      .map((pe) => buildSearchModePropertyDefinitions(pe, knownPropExtMap))
      .reduce((arr, peArr) => [...arr, ...peArr]);
  }

  // if we have children in this module, which should be the case
  if (newModule.children) {
    // we map them
    newModule.children = newModule.children.map((m) => {
      // we ignore modules, as it's the job of the module class to build the search mode
      // of that specific module
      if (m.type === "module") {
        return null;
      } else {
        // and we do item definitions
        return buildSearchModeItemDefinition(m, knownPropExtMap, rawData);
      }
    }).filter((s) => !!s);
  }

  return newModule;
}

/**
 * This builds item definitions
 * @param rawData the raw data for the item definition
 * @param modulePropExtensions the prop extensions coming from the module
 * @param originalModule and the original module that brought those extensions
 */
function buildSearchModeItemDefinition(
  rawData: IItemDefinitionRawJSONDataType,
  modulePropExtensions: {[id: string]: IPropertyDefinitionRawJSONDataType},
  originalModule: IModuleRawJSONDataType,
): IItemDefinitionRawJSONDataType {
  // copy that
  const newItemDef = {...rawData};
  // create a known property map array using the prop extensions as base
  const knownPropMap = {...modulePropExtensions};
  // delete anything imported
  // TODO check why we do this, I removed it
  // delete newItemDef.importedChildDefinitions;

  // close the i18nData from the item definition
  newItemDef.i18nData = {...newItemDef.i18nData};
  Object.keys(newItemDef.i18nData).forEach((lang) => {
    // now the name to create this object (and because this object will be a search)
    // will be replaced by the search form title
    newItemDef.i18nData[lang] = {...newItemDef.i18nData[lang]};
    newItemDef.i18nData[lang].createFormTitle = newItemDef.i18nData[lang].searchFormTitle;
  });

  // if we have properties
  if (newItemDef.properties) {
    // we loop to them and add them to the known list
    newItemDef.properties.forEach((p) => {
      knownPropMap[p.id] = p;
    });
    // now we build such properties
    newItemDef.properties = newItemDef.properties
      .map((p) => buildSearchModePropertyDefinitions(p, knownPropMap))
      .reduce((arr, pArr) => [...arr, ...pArr]);
  }

  // now we go over the includes, aka the items
  newItemDef.includes = newItemDef.includes && newItemDef.includes.map((i) => {
    // if they are search disabled we ignore them
    if (i.disableSearch) {
      return null;
    }

    // otherwise let's get the item definition using the parent module, this includes imported
    // stuff
    const idef = ItemDefinition.getItemDefinitionRawFor(rawData, originalModule, i.name, false);
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
          if ((value as IPropertyDefinitionAlternativePropertyType).property) {
            // then we need to convert that value too!... from the ruleset
            // which returns a single property value, unlike getConversionIds
            value = {
              property: getConversionRulesetId(
                knownPropMap[(value as IPropertyDefinitionAlternativePropertyType).property],
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

  // if we have child definitions
  if (newItemDef.childDefinitions) {
    // we loop and work on those the same way
    newItemDef.childDefinitions = newItemDef.childDefinitions.map((cd) => {
      return buildSearchModeItemDefinition(cd, modulePropExtensions, originalModule);
    });
  }
  return newItemDef;
}

/**
 * Builds a property definition to its search mode
 * @param rawData the raw property definition source
 * @param otherKnownProperties the object with the other known properties that this one can see
 * @returns an array of property definitions
 */
function buildSearchModePropertyDefinitions(
  rawData: IPropertyDefinitionRawJSONDataType,
  otherKnownProperties: {[id: string]: IPropertyDefinitionRawJSONDataType},
): IPropertyDefinitionRawJSONDataType[] {
  // so we need the description from the standard
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  // if it's not searchable by definition, or the search level is set to disabled, we return an empty array
  if (!propertyDefinitionDescription.searchable || rawData.searchLevel === "disabled") {
    return [];
  }

  // we create the new property definition via copy
  const newPropDef = {...rawData};
  newPropDef.nullable = true;
  // if the search level is set to hidden, we hide
  if (newPropDef.searchLevel === "hidden") {
    newPropDef.hidden = true;
  // if the search level is set to moderate, or rare, we set it as the rarity
  } else if (newPropDef.searchLevel === "moderate") {
    newPropDef.rarity = "moderate";
  } else if (newPropDef.searchLevel === "rare") {
    newPropDef.rarity = "rare";
  } else {
    newPropDef.rarity = "standard";
  }

  // Disable search level for any of its children
  // Just because this is the search level it doesn't make
  // sense to go deeper
  newPropDef.searchLevel = "disabled";

  // we delete the prefill functionality, as it doesn't make sense
  // in search mode
  delete newPropDef.autocompleteSupportsPrefills;

  // the default if condition, we need to process
  if (newPropDef.defaultIf) {
    // so since it has values and conditions (and the value is raw)
    newPropDef.defaultIf = newPropDef.defaultIf.map((di) => {
      return {
        value: di.value,
        if: buildSearchModeConditionalRuleSet(di.if, otherKnownProperties),
      };
    }).filter((di) => di.if);

    // if we end up with nothing, we delete it, some conditions might be dead ends
    // for example if a property is not searchable and the condition uses that property
    // it completely kills the condition
    if (!newPropDef.defaultIf.length) {
      delete newPropDef.defaultIf;
    }
  }

  // we do that too with enforced values, same process
  if (newPropDef.enforcedValues) {
    newPropDef.enforcedValues = newPropDef.enforcedValues.map((ev) => {
      return {
        value: ev.value,
        if: buildSearchModeConditionalRuleSet(ev.if, otherKnownProperties),
      };
    }).filter((ev) => ev.if);
    if (!newPropDef.enforcedValues.length) {
      delete newPropDef.enforcedValues;
    }
  }

  // also with hidden if, kinda, since it's a single condition
  if (newPropDef.hiddenIf) {
    newPropDef.hiddenIf = buildSearchModeConditionalRuleSet(newPropDef.hiddenIf, otherKnownProperties);
    if (!newPropDef.hiddenIf) {
      delete newPropDef.hiddenIf;
    }
  }

  // invalid if gets the same treatment
  if (newPropDef.invalidIf) {
    newPropDef.invalidIf = newPropDef.invalidIf.map((ii) => {
      return {
        error: ii.error,
        if: buildSearchModeConditionalRuleSet(ii.if, otherKnownProperties),
      };
    }).filter((ii) => ii.if);
    if (!newPropDef.invalidIf.length) {
      delete newPropDef.invalidIf;
    }
  }

  // Ok so now we have our main property processed, but that's not enough
  // we need to work out a secondary property if it's necessary, we create it
  // and set it to null to start with
  let newPropDef2: IPropertyDefinitionRawJSONDataType = null;

  // so if our search interface is exact, then we actually don't need 2
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    // we set the original id to EXACT
    newPropDef.id = "EXACT__" + newPropDef.id;
    // and extract and displace the i18ndata from the search (everything in search becomes main)
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }

  // Now here if we have exact and range
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    // with disable ranged search we basically do the same as exact on top
    if (rawData.disableRangedSearch) {
      newPropDef.id = "EXACT__" + newPropDef.id;
      if (newPropDef.i18nData) {
        newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
      }

    // Otherwise we need the secondary, for the range
    } else {
      // we make a copy of the original
      newPropDef2 = {...newPropDef};
      // delete its default, as only the original gets a default
      delete newPropDef2.default;
      delete newPropDef2.defaultIf;

      // set the ids, as FROM and TO
      newPropDef.id = "FROM__" + newPropDef.id;
      newPropDef2.id = "TO__" + newPropDef2.id;

      // set the comparison method as datetime if its one of those kinds
      const method = rawData.type === "date" || rawData.type === "datetime" || rawData.type === "time" ?
        "datetime" : null;
      // and set the attribute to value if we have currency type
      const attribute = rawData.type === "currency" ? "value" : null;

      // the condition goes if the FROM is greater than the TO
      const newPropDefInvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
        property: "&this",
        comparator: "greater-than",
        value: {
          property: newPropDef2.id,
        },
      };
      // we use the method if we got one
      if (method) {
        newPropDefInvalidIfRule.method = method;
      }
      // and we set the attribute if we got one, note it goes for both
      // the property itself and the value result, as they are both of the same type
      if (attribute) {
        newPropDefInvalidIfRule.attribute = attribute;
        newPropDefInvalidIfRule.valueAttribute = attribute;
      }

      // we need some invalid conditions we are adding to the invalid if set
      newPropDef.invalidIf = newPropDef.invalidIf || [];
      newPropDef.invalidIf.push({
        error: PropertyInvalidReason.FROM_LARGER_THAN_TO,
        if: newPropDefInvalidIfRule,
      });

      // now we do the same but in reverse, this time for the second
      newPropDef2.invalidIf = newPropDef2.invalidIf || [];
      const newPropDef2InvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
        property: "&this",
        comparator: "less-than",
        value: {
          property: newPropDef.id,
        },
      };
      if (method) {
        newPropDef2InvalidIfRule.method = method;
      }
      if (attribute) {
        newPropDef2InvalidIfRule.attribute = attribute;
        newPropDef2InvalidIfRule.valueAttribute = attribute;
      }
      newPropDef2.invalidIf.push({
        error: PropertyInvalidReason.TO_SMALLER_THAN_FROM,
        if: newPropDef2InvalidIfRule,
      });

      // now we displace the i18ndata from the search.range.from
      if (newPropDef.i18nData) {
        newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "range", "from"]);
      }

      // and the search.range.to
      if (newPropDef2.i18nData) {
        newPropDef2.i18nData = displaceI18NData(newPropDef2.i18nData, ["search", "range", "to"]);
      }
    }

  // Full text search is similar to the exact mode, except it uses SEARCH as the handle
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.FTS
  ) {
    newPropDef.id = "SEARCH__" + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }

  // location distance is fancy
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE
  ) {
    // our second property definition is totally brand new
    // and it's an unit, of subtype lenght, id DISTANCE handle,
    // the minimum is 1, without decimals, and we set the special
    // properties to set how it would behave, notice how it supports
    // imperials, it initially prefills to 100, so 100km or 100mi
    // it ignores conversion as it's the prefill,
    // it locks units only to mi and km, so you cannot choose some
    // other lenght types
    newPropDef2 = {
      type: "unit",
      subtype: "length",
      id: "DISTANCE__" + newPropDef.id,
      min: 1,
      maxDecimalCount: 0,
      specialProperties: {
        unit: "km",
        imperialUnit: "mi",
        lockUnitsToPrimaries: true,
        initialPrefill: 100,
      },
      i18nData: displaceI18NData(newPropDef.i18nData, ["search", "distance"]),
    };

    // we set the original id
    newPropDef.id = "LOCATION__" + newPropDef.id;
    // and we try to use the special property to prefill to user location
    // so it originally points to whatever the user location is set to
    newPropDef.specialProperties = newPropDef.specialProperties || {};
    newPropDef.specialProperties.prefillToUserLocationIfPossible = true;
  }

  // we return both if we have both
  if (newPropDef2) {
    return [newPropDef, newPropDef2];
  }

  // or only one
  return [newPropDef];
}

/**
 * Converts a conditional rule set to a search mode, or collapses if it's
 * not able to manage to do so
 * @param rawData the raw data for the conditional rule set
 * @param otherKnownProperties the properties this set has access to
 */
function buildSearchModeConditionalRuleSet(
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
    const valueAsAlternative = (newRuleAsProperty.value as IPropertyDefinitionAlternativePropertyType);
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

/**
 * Gives the id for a property that would be referred to in search mode
 * for a ruleset, just takes the first result, aka FROM and LOCATION, but
 * ignores TO and DISTANCE
 * @param rawData the property raw data
 */
function getConversionRulesetId(
  rawData: IPropertyDefinitionRawJSONDataType,
): string {
  // we get all the possible ids
  const ids = getConversionIds(rawData);
  // and return such, or null if we got an empty array
  // (this happens when search mode is disabled for that property)
  return ids.length ? ids[0] : null;
}

/**
 * Provides all the ids that a property would be referred to in search mode
 * @param rawData the raw property
 */
function getConversionIds(
  rawData: IPropertyDefinitionRawJSONDataType,
): string[] {
  // we need the description
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (!propertyDefinitionDescription.searchable || rawData.searchLevel === "disabled") {
    // return empty array if it's not searchable or search level is disabled
    return [];
  }

  // we get the ids, check out how `buildSearchModePropertyDefinitions` does
  // this literally reflects that
  let ids = [rawData.id];
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    ids = ["EXACT__" + rawData.id];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (!rawData.disableRangedSearch) {
      ids = ["EXACT__" + rawData.id];
    } else {
      ids = ["FROM__" + rawData.id, "TO__" + rawData.id];
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.FTS
  ) {
    ids = ["SEARCH__" + rawData.id];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE
  ) {
    ids = ["LOCATION__" + rawData.id, "DISTANCE__" + rawData.id];
  }
  return ids;
}

/**
 * An utility to displace data from the i18n object, any
 * @param i18n the i18n object
 * @param path the path we want to displace data from
 * @returns the new i18n object with data overwritten
 */
function displaceI18NData(i18n: any, path: string[]) {
  // make a copy
  const newI18n = {...i18n};
  // for each language we are supporting there
  Object.keys(newI18n).forEach((language) => {
    // we make a copy
    newI18n[language] = {...newI18n[language]};

    // now we loop inside the path
    let itemInQuestion = newI18n[language];
    path.forEach((pbit) => {
      itemInQuestion = itemInQuestion[pbit];
    });

    // we take the label, placeholder and description from our loop result
    newI18n[language].label = itemInQuestion.label;
    newI18n[language].placeholder = itemInQuestion.placeholder;
    newI18n[language].description = itemInQuestion.description;
  });

  // return that
  return newI18n;
}
