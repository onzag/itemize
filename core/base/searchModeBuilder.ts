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
import { IItemDefinitionRawJSONDataType } from "./ItemDefinition";

export function buildSearchMode(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType {
  return buildSearchModeModule(rawData);
}

function buildSearchModeModule(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType {
  const newModule = {...rawData};
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
        return buildSearchModeItemDefinition(m, knownPropExtMap);
      }
    }).filter((s) => !!s);
  }

  return newModule;
}

function buildSearchModeItemDefinition(
  rawData: IItemDefinitionRawJSONDataType,
  modulePropExtensions: {[id: string]: IPropertyDefinitionRawJSONDataType},
): IItemDefinitionRawJSONDataType {
  const newItemDef = {...rawData};
  const knownPropMap = {...modulePropExtensions};
  delete newItemDef.includes;
  if (newItemDef.properties) {
    newItemDef.properties.forEach((p) => {
      knownPropMap[p.id] = p;
    });
    newItemDef.properties = newItemDef.properties
      .map((p) => buildSearchModePropertyDefinitions(p, knownPropMap))
      .reduce((arr, pArr) => [...arr, ...pArr]);
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
    // TODO we need either a subtype for number or something like it
    // to properly support search with miles, thanks americans... -_-
    newPropDef.id = "LOCATION__" + newPropDef.id;
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
  } else {
    return null;
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
  const propertyDefinitionDescription = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (!propertyDefinitionDescription.searchable || rawData.searchLevel === "disabled") {
    return null;
  }

  if (rawData.id === "&this") {
    return "&this";
  }

  let id = rawData.id;
  if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT
  ) {
    id = "EXACT__" + id;
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE
  ) {
    if (!rawData.disableRangedSearch) {
      id = "EXACT__" + id;
    } else {
      id = "FROM__" + id;
    }
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.FTS
  ) {
    id = "SEARCH__" + id;
  } else if (
    propertyDefinitionDescription.searchInterface ===
    PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE
  ) {
    id = "LOCATION__" + id;
  }
  return id;
}

function displaceI18NData(i18n: any, path: string[]){
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
