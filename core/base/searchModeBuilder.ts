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
  IConditionalRuleSetRawJSONDataComponentType,
} from "./ItemDefinition/ConditionalRuleSet";
import ItemDefinition, { IItemDefinitionRawJSONDataType } from "./ItemDefinition";

export function buildSearchMode(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType {
  return buildSearchModeModule(rawData);
}

function buildSearchModeModule(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType {
  const newModule = {...rawData};
  newModule.name = "QUERY_MOD__" + newModule.name;

  const knownPropExtMap = {};
  if (newModule.propExtensions) {
    newModule.propExtensions.forEach((pe) => {
      knownPropExtMap[pe.id] = pe;
    });
    newModule.propExtensions = newModule.propExtensions
      .map((pe) => buildSearchModePropertyDefinitions(pe, knownPropExtMap))
      .reduce((arr, peArr) => [...arr, ...peArr]);
  }

  if (newModule.children) {
    newModule.children = newModule.children.map((m) => {
      if (m.type === "module") {
        return null;
      } else {
        return buildSearchModeItemDefinition(m, knownPropExtMap, rawData);
      }
    }).filter((s) => !!s);
  }

  return newModule;
}

function buildSearchModeItemDefinition(
  rawData: IItemDefinitionRawJSONDataType,
  modulePropExtensions: {[id: string]: IPropertyDefinitionRawJSONDataType},
  originalModule: IModuleRawJSONDataType,
): IItemDefinitionRawJSONDataType {
  const newItemDef = {...rawData};
  // newItemDef.name = "QUERY_IDEF__" + newItemDef.name;
  const knownPropMap = {...modulePropExtensions};
  delete newItemDef.importedChildDefinitions;

  newItemDef.i18nData = {...newItemDef.i18nData};
  Object.keys(newItemDef.i18nData).forEach((lang) => {
    newItemDef.i18nData[lang] = {...newItemDef.i18nData[lang]};
    newItemDef.i18nData[lang].createFormTitle = newItemDef.i18nData[lang].searchFormTitle;
  });

  if (newItemDef.properties) {
    newItemDef.properties.forEach((p) => {
      knownPropMap[p.id] = p;
    });
    newItemDef.properties = newItemDef.properties
      .map((p) => buildSearchModePropertyDefinitions(p, knownPropMap))
      .reduce((arr, pArr) => [...arr, ...pArr]);
  }

  newItemDef.includes = newItemDef.includes && newItemDef.includes.map((i) => {
    if (i.disableSearch) {
      return null;
    }

    const idef = ItemDefinition.getItemDefinitionRawFor(rawData, originalModule, i.name, false);
    const newInclude = {...i};

    if (newInclude.defaultExcludedIf) {
      newInclude.defaultExcludedIf = buildSearchModeConditionalRuleSet(i.defaultExcludedIf, knownPropMap);
    }
    if (newInclude.canUserExcludeIf) {
      newInclude.canUserExcludeIf = buildSearchModeConditionalRuleSet(i.canUserExcludeIf, knownPropMap);
    }
    if (newInclude.excludedIf) {
      newInclude.excludedIf = buildSearchModeConditionalRuleSet(i.excludedIf, knownPropMap);
    }

    if (newInclude.canUserExclude || newInclude.canUserExcludeIf) {
      newInclude.exclusionIsCallout = false;
      newInclude.ternaryExclusionState = true;
    }

    // newInclude.name = "QUERY_IDEF__" + newInclude.name;
    if (newInclude.sinkIn) {
      newInclude.sinkIn = newInclude.sinkIn.map((sinkInProperty) => {
        const property = ItemDefinition.getPropertyDefinitionRawFor(idef, originalModule, sinkInProperty, false);
        return getConversionIds(property);
      }).flat();
    }
    ["enforcedProperties", "predefinedProperties"].forEach((objectKey) => {
      if (newInclude[objectKey]) {
        const newValueForThat = {};
        Object.keys(newInclude[objectKey]).forEach((key) => {
          const propertyInReferred = ItemDefinition.getPropertyDefinitionRawFor(idef, originalModule, key, false);
          let value = newInclude.enforcedProperties[key];
          if ((value as IPropertyDefinitionAlternativePropertyType).property) {
            value = {
              property: getConversionRulesetId(
                knownPropMap[(value as IPropertyDefinitionAlternativePropertyType).property],
              ),
            };
          }
          newValueForThat[getConversionRulesetId(propertyInReferred)] = value;
        });

        newInclude[objectKey] = newValueForThat;
      }
    });

    return newInclude;
  }).filter((i) => !!i);

  if (newItemDef.childDefinitions) {
    newItemDef.childDefinitions = newItemDef.childDefinitions.map((cd) => {
      return buildSearchModeItemDefinition(cd, modulePropExtensions, originalModule);
    });
  }
  return newItemDef;
}

function buildSearchModePropertyDefinitions(
  rawData: IPropertyDefinitionRawJSONDataType,
  otherKnownProperties: {[id: string]: IPropertyDefinitionRawJSONDataType},
): IPropertyDefinitionRawJSONDataType[] {
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (!propertyDefinitionDescription.searchable || rawData.searchLevel === "disabled") {
    return [];
  }

  const newPropDef = {...rawData};
  newPropDef.nullable = true;
  if (newPropDef.searchLevel === "hidden") {
    newPropDef.hidden = true;
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

  delete newPropDef.autocompleteSupportsPrefills;
  if (newPropDef.defaultIf) {
    newPropDef.defaultIf = newPropDef.defaultIf.map((di) => {
      return {
        value: di.value,
        if: buildSearchModeConditionalRuleSet(di.if, otherKnownProperties),
      };
    }).filter((di) => di.if);
    if (!newPropDef.defaultIf.length) {
      delete newPropDef.defaultIf;
    }
  }
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
  if (newPropDef.hiddenIf) {
    newPropDef.hiddenIf = buildSearchModeConditionalRuleSet(newPropDef.hiddenIf, otherKnownProperties);
    if (!newPropDef.hiddenIf) {
      delete newPropDef.hiddenIf;
    }
  }
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

  let newPropDef2: IPropertyDefinitionRawJSONDataType = null;
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    newPropDef.id = "EXACT__" + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (rawData.disableRangedSearch) {
      newPropDef.id = "EXACT__" + newPropDef.id;
      if (newPropDef.i18nData) {
        newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
      }
    } else {
      newPropDef2 = {...newPropDef};
      delete newPropDef2.default;
      delete newPropDef2.defaultIf;

      newPropDef.id = "FROM__" + newPropDef.id;
      newPropDef2.id = "TO__" + newPropDef2.id;

      const method = rawData.type === "date" || rawData.type === "datetime" || rawData.type === "time" ?
        "datetime" : null;
      const attribute = rawData.type === "currency" ? "value" : null;

      newPropDef.invalidIf = newPropDef.invalidIf || [];
      const newPropDefInvalidIfRule: IConditionalRuleSetRawJSONDataPropertyType = {
        property: "&this",
        comparator: "greater-than",
        value: {
          property: newPropDef2.id,
        },
      };
      if (method) {
        newPropDefInvalidIfRule.method = method;
      }
      if (attribute) {
        newPropDefInvalidIfRule.attribute = attribute;
        newPropDefInvalidIfRule.valueAttribute = attribute;
      }
      newPropDef.invalidIf.push({
        error: PropertyInvalidReason.FROM_LARGER_THAN_TO,
        if: newPropDefInvalidIfRule,
      });

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

      if (newPropDef.i18nData) {
        newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "range", "from"]);
      }

      if (newPropDef2.i18nData) {
        newPropDef2.i18nData = displaceI18NData(newPropDef2.i18nData, ["search", "range", "to"]);
      }
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.FTS
  ) {
    newPropDef.id = "SEARCH__" + newPropDef.id;
    if (newPropDef.i18nData) {
      newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE
  ) {
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
    newPropDef.id = "LOCATION__" + newPropDef.id;
    newPropDef.specialProperties = newPropDef.specialProperties || {};
    newPropDef.specialProperties.prefillToUserLocationIfPossible = true;
  }

  if (newPropDef2) {
    return [newPropDef, newPropDef2];
  }

  return [newPropDef];
}

function buildSearchModeConditionalRuleSet(
  rawData: IConditionalRuleSetRawJSONDataType,
  otherKnownProperties: {[id: string]: IPropertyDefinitionRawJSONDataType},
): IConditionalRuleSetRawJSONDataType {
  const newRule = {...rawData};
  if ((newRule as IConditionalRuleSetRawJSONDataPropertyType).property) {
    const newRuleAsProperty = (newRule as IConditionalRuleSetRawJSONDataPropertyType);
    if (newRuleAsProperty.property !== "&this") {
      const converted = getConversionRulesetId(otherKnownProperties[
        newRuleAsProperty.property
      ]);
      if (converted === null) {
        return null;
      }
      newRuleAsProperty.property = converted;
    }

    const valueAsAlternative = (newRuleAsProperty.value as IPropertyDefinitionAlternativePropertyType);
    if (valueAsAlternative && valueAsAlternative.property) {
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

  if (newRule.condition) {
    const newCondition = buildSearchModeConditionalRuleSet(newRule.condition, otherKnownProperties);
    if (newCondition === null) {
      return null;
    }
    newRule.condition = newCondition;
  }
  return newRule;
}

function getConversionRulesetId(
  rawData: IPropertyDefinitionRawJSONDataType,
): string {
  const ids = getConversionIds(rawData);
  return ids.length ? ids[0] : null;
}

function getConversionIds(
  rawData: IPropertyDefinitionRawJSONDataType,
): string[] {
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (!propertyDefinitionDescription.searchable || rawData.searchLevel === "disabled") {
    return [];
  }

  if (rawData.id === "&this") {
    return ["&this"];
  }

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

function displaceI18NData(i18n: any, path: string[]) {
  const newI18n = {...i18n};
  Object.keys(newI18n).forEach((language) => {
    newI18n[language] = {...newI18n[language]};

    let itemInQuestion = newI18n[language];
    path.forEach((pbit) => {
      itemInQuestion = itemInQuestion[pbit];
    });

    newI18n[language].label = itemInQuestion.label;
    newI18n[language].placeholder = itemInQuestion.placeholder;
    newI18n[language].description = itemInQuestion.description;
  });
  return newI18n;
}
