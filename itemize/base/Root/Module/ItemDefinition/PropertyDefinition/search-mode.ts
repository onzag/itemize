import PropertyDefinition, { IPropertyDefinitionRawJSONDataType, PropertyInvalidReason } from ".";
import {
  PropertyDefinitionSearchInterfacesType,
  PropertyDefinitionSearchInterfacesPrefixes,
} from "./search-interfaces";
import { buildSearchModeConditionalRuleSet } from "../ConditionalRuleSet/search-mode";
import { IConditionalRuleSetRawJSONDataPropertyType } from "../ConditionalRuleSet";

/**
 * Provides all the ids that a property would be referred to in search mode
 * @param rawData the raw property
 */
export function getConversionIds(
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
    ids = [PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (rawData.disableRangedSearch) {
      ids = [PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id];
    } else {
      ids = [
        PropertyDefinitionSearchInterfacesPrefixes.FROM + rawData.id,
        PropertyDefinitionSearchInterfacesPrefixes.TO + rawData.id,
      ];
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.FTS
  ) {
    ids = [PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id];
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS
  ) {
    ids = [
      PropertyDefinitionSearchInterfacesPrefixes.LOCATION + rawData.id,
      PropertyDefinitionSearchInterfacesPrefixes.RADIUS + rawData.id,
    ];
  }
  return ids;
}

/**
 * Builds a property definition to its search mode
 * @param rawData the raw property definition source
 * @param otherKnownProperties the object with the other known properties that this one can see
 * @returns an array of property definitions
 */
export function buildSearchModePropertyDefinitions(
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

  if (newPropDef.type === "text") {
    newPropDef.type = "string";
  }

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
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
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
      newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
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
      newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.FROM + newPropDef.id;
      newPropDef2.id = PropertyDefinitionSearchInterfacesPrefixes.TO + newPropDef2.id;

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
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.SEARCH + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }

  // location radius is fancy
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS
  ) {
    // our second property definition is totally brand new
    // and it's an unit, of subtype lenght, id RADIUS handle,
    // the minimum is 1, without decimals, and we set the special
    // properties to set how it would behave, notice how it supports
    // imperials, it initially prefills to 100, so 100km or 100mi
    // it ignores conversion as it's the prefill,
    // it locks units only to mi and km, so you cannot choose some
    // other lenght types
    newPropDef2 = {
      type: "unit",
      subtype: "length",
      id: PropertyDefinitionSearchInterfacesPrefixes.RADIUS + newPropDef.id,
      min: 1,
      maxDecimalCount: 0,
      specialProperties: {
        unit: "km",
        imperialUnit: "mi",
        lockUnitsToPrimaries: true,
        initialPrefill: 100,
      },
      i18nData: displaceI18NData(newPropDef.i18nData, ["search", "radius"]),
    };

    // decorate the default property
    newPropDef.id = PropertyDefinitionSearchInterfacesPrefixes.LOCATION + newPropDef.id;

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
