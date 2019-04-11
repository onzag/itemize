import { IModuleRawJSONDataType } from "./Module";
import PropertyDefinition, { IPropertyDefinitionRawJSONDataType } from "./ItemDefinition/PropertyDefinition";

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
        return buildSearchModeModule(m);
      } else {
        return null;
      }
    });
  }

  return newModule;
}

function buildSearchModePropertyDefinitions(
  rawData: IPropertyDefinitionRawJSONDataType,
  otherKnownProperties: {[id: string]: IPropertyDefinitionRawJSONDataType},
): IPropertyDefinitionRawJSONDataType[] {
  const propertyDefinition = PropertyDefinition.supportedTypesStandard[rawData.type];
  if (!propertyDefinition.searchable || rawData.searchLevel === "disabled") {
    return [];
  }
  return [null];
}
