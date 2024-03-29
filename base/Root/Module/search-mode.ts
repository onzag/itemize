/**
 * This file contains the critical build for the search mode build of a module
 * given an input of a module to be converted into its search form
 *
 * @module
 */

import { IModuleRawJSONDataType } from ".";
import { buildSearchModeItemDefinition } from "./ItemDefinition/search-mode";
import { buildSearchModePropertyDefinitions } from "./ItemDefinition/PropertyDefinition/search-mode";
import { SEARCH_MODE_MODULE_PREFIX, MAX_SEARCH_FIELD_LENGTH } from "../../../constants";
import { Ii18NType } from "..";

/**
 * Builds the module based on its raw data
 * @param rawData the raw data for the module
 * @param rootI18nData the root i18n data
 * @returns a raw module
 */
export function buildSearchModeModule(
  rawData: IModuleRawJSONDataType,
  rootI18nData: Ii18NType,
): IModuleRawJSONDataType {
  // cloning the module
  const newModule = {...rawData};

  // We need to avoid name collision within modules
  // search mode modules are prefixed and contain no child modules
  newModule.name = SEARCH_MODE_MODULE_PREFIX + newModule.name;

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
      .map((pe) => buildSearchModePropertyDefinitions(pe, knownPropExtMap, rootI18nData))
      .reduce((arr, peArr) => [...arr, ...peArr]);
  }

  // it might not be searchable, search mode modules are always built since
  // their children might have search functionality
  if (typeof newModule.searchable === "undefined" || newModule.searchable) {
    if (!newModule.propExtensions) {
      newModule.propExtensions = [];
    }

    const searchI18nData = {};
    Object.keys(newModule.i18nData).forEach((locale) => {
      searchI18nData[locale] = {};
      searchI18nData[locale].label = newModule.i18nData[locale].search_field_label;
      searchI18nData[locale].placeholder = newModule.i18nData[locale].search_field_placeholder;
      searchI18nData[locale].error = {
        TOO_LARGE: newModule.i18nData[locale].search_value_too_large,
      };
    });
    newModule.propExtensions.push({
      id: "search",
      type: "string",
      nullable: true,
      maxLength: MAX_SEARCH_FIELD_LENGTH,
      i18nData: searchI18nData,
      searchable: false,
    });
    newModule.propExtensions.push({
      id: "created_by",
      type: "string",
      nullable: true,
      maxLength: 255,
      i18nData: null,
      hidden: true,
      searchable: false,
    });
    newModule.propExtensions.push({
      id: "since",
      type: "datetime",
      nullable: true,
      i18nData: null,
      hidden: true,
      searchable: false,
    });
    newModule.propExtensions.push({
      id: "until",
      type: "datetime",
      nullable: true,
      i18nData: null,
      hidden: true,
      searchable: false,
    });
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
        return buildSearchModeItemDefinition(m, knownPropExtMap, rawData, rootI18nData);
      }
    }).filter((s) => !!s);
  }

  return newModule;
}
