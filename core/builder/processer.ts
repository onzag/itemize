import { IRootRawJSONDataType } from "../base/Root";
import { IModuleRawJSONDataType } from "../base/Module";
import {
  IPropertyDefinitionRawJSONDataType,
} from "../base/ItemDefinition/PropertyDefinition";
import {
  IItemDefinitionRawJSONDataType,
} from "../base/ItemDefinition";
import {
  IItemRawJSONDataType,
} from "../base/ItemDefinition/Item";
import "source-map-support/register";
import { ILocaleLangDataType } from ".";

/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export function processItemDefinition(
  rawData: IItemDefinitionRawJSONDataType,
  locale?: string,
) {
  const nRawData = {...rawData};
  delete nRawData.location;
  delete nRawData.pointers;
  delete nRawData.raw;

  if (locale) {
    nRawData.i18nData = {...nRawData.i18nData};
    Object.keys(nRawData.i18nData).forEach((key) => {
      if (key !== locale) {
        delete nRawData.i18nData[key];
      }
    });
  }

  nRawData.childDefinitions = nRawData.childDefinitions && nRawData
    .childDefinitions.map((cd) =>
      processItemDefinition(cd, locale));

  nRawData.includes = nRawData.includes &&
    nRawData.includes.map((itm) =>
      processItem(itm, locale));

  nRawData.properties = nRawData.properties &&
    nRawData.properties
      .map((p) =>
        processPropertyDefinition(p, locale));

  return nRawData;
}

/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export function processItem(
  rawData: IItemRawJSONDataType,
  locale?: string,
) {
  if (!locale) {
    return rawData;
  }

  const nRawData = {...rawData};
  nRawData.i18nName = {...nRawData.i18nName};
  Object.keys(nRawData.i18nName).forEach((key) => {
    if (key !== locale) {
      delete nRawData.i18nName[key];
    }
  });

  nRawData.items = nRawData.items &&
    nRawData.items.map((itm) =>
      processItem(itm, locale));

  return nRawData;
}

export function processPropertyDefinition(
  rawData: IPropertyDefinitionRawJSONDataType,
  locale?: string,
) {
  if (!locale) {
    return rawData;
  }
  const nRawData = {...rawData};
  nRawData.i18nData = {...nRawData.i18nData};
  Object.keys(nRawData.i18nData).forEach((key) => {
    if (key !== locale) {
      delete nRawData.i18nData[key];
    }
  });

  return nRawData;
}

/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export function processModule(
  rawData: IModuleRawJSONDataType,
  locale?: string,
) {
  const nRawData = {...rawData};
  delete nRawData.location;
  delete nRawData.pointers;
  delete nRawData.raw;
  delete nRawData.propExtLocation;
  delete nRawData.propExtPointers;
  delete nRawData.propExtRaw;

  if (locale) {
    nRawData.i18nData = {...nRawData.i18nData};
    Object.keys(nRawData.i18nData).forEach((key) => {
      if (key !== locale) {
        delete nRawData.i18nData[key];
      }
    });
  }

  nRawData.propExtensions = nRawData.propExtensions &&
    nRawData.propExtensions.map((propDef) => {
      return processPropertyDefinition(
        propDef,
        locale,
      );
  });

  nRawData.children = nRawData.children &&
    nRawData.children.map((moduleOrItemDef) => {
      if (moduleOrItemDef.type === "module") {
        return processModule(moduleOrItemDef, locale);
      } else {
        return processItemDefinition(moduleOrItemDef, locale);
      }
    });

  return nRawData;
}

/**
 * Cleans up build data from
 * and builds a new json
 * @param rawData the raw data
 * @param locale the locale
 * @returns the new json
 */
export function processRoot(
  rawData: IRootRawJSONDataType,
  locale?: string,
) {
  const nRawData = {...rawData};
  delete nRawData.location;
  delete nRawData.pointers;
  delete nRawData.raw;

  nRawData.children =
    nRawData.children && nRawData.children.map((mod) => {
      return processModule(
        mod,
        locale,
      );
    });

  return nRawData;
}
