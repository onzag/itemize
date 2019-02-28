import { RootRawJSONDataType } from "../base/Root";
import { ModuleRawJSONDataType } from "../base/Module";
import { PropertyDefinitionRawJSONDataType } from
  "../base/ItemDefinition/PropertyDefinition";
import { ItemDefinitionRawJSONDataType } from
  "../base/ItemDefinition";
import { ItemRawJSONDataType } from "../base/ItemDefinition/Item";

/**
 * Cleans up build data from
 * and builds a new json
 * @param  rawData the raw data
 * @param  locale  the locale
 * @return         the new json
 */
export function processItemDefinition(
  rawData: ItemDefinitionRawJSONDataType,
  locale: string
){
  let nRawData = {...rawData};
  delete nRawData.location;
  delete nRawData.pointers;
  delete nRawData.raw;
  nRawData.i18nName = {...nRawData.i18nName};
  Object.keys(nRawData.i18nName).forEach((key)=>{
    if (key !== locale){
      delete nRawData.i18nName[key];
    }
  });

  nRawData.childDefinitions = nRawData.childDefinitions && nRawData
    .childDefinitions.map(cd=>
      processItemDefinition(cd, locale));

  nRawData.includes = nRawData.includes &&
    nRawData.includes.map(itm=>
      processItem(itm, locale));

  nRawData.properties = nRawData.properties &&
    nRawData.properties
      .map(p=>
        processPropertyDefinition(p, locale));

  return nRawData;
}

/**
 * Cleans up build data from
 * and builds a new json
 * @param  rawData the raw data
 * @param  locale  the locale
 * @return         the new json
 */
export function processItem(
  rawData: ItemRawJSONDataType,
  locale: string
){
  let nRawData = {...rawData};
  nRawData.i18nName = {...nRawData.i18nName};
  Object.keys(nRawData.i18nName).forEach((key)=>{
    if (key !== locale){
      delete nRawData.i18nName[key];
    }
  });

  nRawData.items = nRawData.items &&
    nRawData.items.map(itm=>
      processItem(itm, locale));

  return nRawData;
}

export function processPropertyDefinition(
  rawData: PropertyDefinitionRawJSONDataType,
  locale: string
){
  let nRawData = {...rawData};
  nRawData.i18nData = {...nRawData.i18nData};
  Object.keys(nRawData.i18nData).forEach((key)=>{
    if (key !== locale){
      delete nRawData.i18nData[key];
    }
  });

  return nRawData;
}

/**
 * Cleans up build data from
 * and builds a new json
 * @param  rawData the raw data
 * @param  locale  the locale
 * @return         the new json
 */
export function processModule(
  rawData: ModuleRawJSONDataType,
  locale: string
){
  let nRawData = {...rawData};
  delete nRawData.location;
  delete nRawData.pointers;
  delete nRawData.raw;
  delete nRawData.propExtLocation;
  delete nRawData.propExtPointers;
  delete nRawData.propExtRaw;
  nRawData.i18nName = {...nRawData.i18nName};
  Object.keys(nRawData.i18nName).forEach((key)=>{
    if (key !== locale){
      delete nRawData.i18nName[key];
    }
  });

  nRawData.propExtensions = nRawData.propExtensions &&
    nRawData.propExtensions.map((propDef)=>{
      return processPropertyDefinition(
        propDef,
        locale
      )
  });

  nRawData.children = nRawData.children &&
    nRawData.children.map(moduleOrItemDef=>{
      if (moduleOrItemDef.type === "module"){
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
 * @param  rawData the raw data
 * @param  locale  the locale
 * @return         the new json
 */
export function processRoot(
  rawData: RootRawJSONDataType,
  locale: string
){
  let nRawData = {...rawData};
  delete nRawData.location;
  delete nRawData.pointers;
  delete nRawData.raw;

  nRawData.children =
    nRawData.children && nRawData.children.map((mod)=>{
      return processModule(
        mod,
        locale
      );
    });

  return nRawData;
}
