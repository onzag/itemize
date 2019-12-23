import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IItemRawJSONDataType } from "../base/Root/Module/ItemDefinition/Item";
import { IModuleRawJSONDataType, IRawJSONI18NDataType } from "../base/Root/Module";
import {
  IItemDefinitionRawJSONDataType, IPoliciesRawJSONDataType,
} from "../base/Root/Module/ItemDefinition";
import {
  PropertyDefinitionSearchInterfacesType,
} from "../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { IRootRawJSONDataType } from "../base/Root";
import { IAutocompleteRawJSONDataType } from "../base/Autocomplete";
import CheckUpError from "./Error";
import Traceback from "./Traceback";
import {
  getActualFileLocation,
  getActualFileIdentifier,
  checkExists,
} from "./util";
import {
  ajvCheck,
  checkRootSchemaValidate,
  checkModuleSchemaValidate,
  checkPropertyDefinitionArraySchemaValidate,
  checkItemDefinitionSchemaValidate,
} from "./schemaChecks";
import { checkRoot } from "./checkers";
import { processRoot } from "./processer";
import { buildLang, clearLang } from "./lang";
import { buildResources } from "./resources";
import { buildHTML } from "./html";
import { buildConfig } from "./config";

import fs from "fs";
import path from "path";
import PropertiesReader from "properties-reader";
import colors from "colors/safe";

import jsonMap from "json-source-map";
const fsAsync = fs.promises;

// registering source maps, this one is useful for
// debugging and since the builder is a development file
// it's ok this is here
import "source-map-support/register";
import { copyMomentFiles } from "./moment";
import {
  ITEM_OPTIONAL_I18N,
  ITEM_CAN_BE_EXCLUDED_I18N,
  ITEM_CALLOUT_EXCLUDED_I18N,
  POLICY_REQUIRED_I18N,
  MODULE_AND_ITEM_DEF_I18N,
  MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY,
  POLICY_OPTIONAL_I18N,
} from "../constants";
import { buildAutocomplete } from "./autocomplete";

if (process.env.NODE_ENV === "production") {
  throw new Error("This script cannot run in production mode");
}

interface IKeyValuePairNestedType {
  [key: string]: string | IKeyValuePairNestedType;
}
export interface ILocaleLangDataType {
  locales: {
    [locale: string]: IKeyValuePairNestedType;
  };
}

// This is the raw untreated json for the root
interface IFileRootDataRawUntreatedJSONDataType {
  type: "root";
  includes: string[];
  i18n: string;
  autocomplete?: string[];
}

// this is the raw untreated json for the module
interface IFileModuleDataRawUntreatedJSONDataType {
  type: "module";
  includes: string[];
}

// and this is the raw untreated json for an item
export interface IFileItemDefinitionUntreatedRawJSONDataType {
  type: "item";
  imports?: string[];
  includes?: IItemRawJSONDataType[];
  properties?: IPropertyDefinitionRawJSONDataType[];
  createRoleAccess?: string[];
  editRoleAccess?: string[];
  deleteRoleAccess?: string[];
  readRoleAccess?: string[];
  policies?: IPoliciesRawJSONDataType;
  ownerIsObjectId?: boolean;
}

// Now we execute this code asynchronously
(async () => {
  try {
    const rawDataConfigBase = JSON.parse(
      await fsAsync.readFile(path.join("config", "index.json"), "utf8"),
    );
    const sensitiveConfigExtra = JSON.parse(await fsAsync.readFile(
      path.join("config", "index.sensitive.json"),
      "utf8",
    ));
    const rawDataConfig = {
      ...rawDataConfigBase,
      ...sensitiveConfigExtra,
    };
    await Promise.all([
      buildData(rawDataConfig),
      buildConfig(rawDataConfig),
      buildHTML(rawDataConfig),
      buildResources(rawDataConfig),
      copyMomentFiles(rawDataConfig),
    ]);
  } catch (err) {
    if (err instanceof CheckUpError) {
      err.display();
    }
    console.log(err.stack);
  }
})();

async function buildData(rawData: any) {
  const entryPoint = "data";

  // lets get the actual location of the item, lets assume first
  // it is the given location
  const actualLocation = await getActualFileLocation(
    entryPoint,
    new Traceback("BUILDER"),
  );

  // lets create the traceback for this file
  const traceback = new Traceback(actualLocation);

  // lets read the file, let it fail if it fails
  const fileContent = await fsAsync.readFile(actualLocation, "utf8");

  // lets get the file data
  let fileData: {
    data: IFileRootDataRawUntreatedJSONDataType;
    pointers: any;
  };

  try {
    fileData = jsonMap.parse(fileContent);
  } catch (err) {
    throw new CheckUpError(
      err.message,
      traceback,
    );
  }

  // Setup the pointers for the pointer data
  // to be able to trace to bit
  // ajv checks require pointers for diving in
  // the invalid properties
  traceback.setupPointers(
    fileData.pointers,
    fileContent,
  );

  // it all should start in the root element
  ajvCheck(
    checkRootSchemaValidate,
    fileData.data,
    traceback,
  );

  // lets get the supported languages
  const supportedLanguages: string[] = rawData.supportedLanguages;

  // and make the result JSON
  const resultJSON: IRootRawJSONDataType = {
    type: "root",
    location: actualLocation,
    pointers: fileData.pointers,
    children: fileData.data.includes ?
      (await buildIncludes(
        supportedLanguages,
        path.dirname(actualLocation),
        path.dirname(actualLocation),
        fileData.data.includes,
        false,
        true,
        traceback.newTraceToBit("includes"),
        false,
      )) as IModuleRawJSONDataType[] : [],
  };

  checkRoot(resultJSON);

  if (!await checkExists("dist")) {
    await fsAsync.mkdir("dist");
  }

  if (!await checkExists(path.join("dist", "data"))) {
    await fsAsync.mkdir(path.join("dist", "data"));
  }

  const allLangData = await buildLang(
    supportedLanguages,
    actualLocation,
    path.join(path.dirname(actualLocation), fileData.data.i18n),
    traceback,
  );

  console.log("emiting " + colors.green(path.join("dist", "data", "lang.json")));
  await fsAsync.writeFile(
    path.join("dist", "data", "lang.json"),
    JSON.stringify(clearLang(allLangData)),
  );

  const resultBuilds = supportedLanguages.map((lang) => {
    return processRoot(resultJSON, lang);
  });

  await Promise.all(supportedLanguages.map(async (sl, index) => {
    const resultingBuild = resultBuilds[index];
    const resultData = {
      root: resultingBuild,
      i18n: allLangData.locales[sl],
    };
    const fileName = path.join("dist", "data", `build.${sl}.json`);
    console.log("emiting " + colors.green(fileName));
    await fsAsync.writeFile(
      fileName,
      JSON.stringify(resultData),
    );
  }));

  let autocomplete: IAutocompleteRawJSONDataType[] = [];
  if (fileData.data.autocomplete) {
    const autocompleteTraceback = traceback.newTraceToBit("autocomplete");
    autocomplete = await Promise.all(fileData.data.autocomplete.map((autocompleteSource, index) => {
      return buildAutocomplete(
        path.join(path.dirname(actualLocation), autocompleteSource),
        supportedLanguages,
        autocompleteTraceback.newTraceToBit(index),
      );
    }));
  }

  const autocompleteFileName = path.join("dist", "autocomplete.json");
  console.log("emiting " + colors.green(autocompleteFileName));
  await fsAsync.writeFile(
    autocompleteFileName,
    JSON.stringify(autocomplete),
  );
}

/**
 * this processes all the included files
 * whether modules or items
 * @param  supportedLanguages           an array with things like EN, ES, etc...
 * @param  parentFolder                 the parent folder of whether we got to
 *                                      check for these includes
 * @param  includes                     the includes string name list
 * @param  childrenMustBeItemDefinition throws an error if children are module
 * @param  childrenMustBeModule         throws an error if children is item def
 * @returns                              an array with raw modules and items
 */
async function buildIncludes(
  supportedLanguages: string[],
  parentFolder: string,
  lastModuleDirectory: string,
  includes: string[],
  childrenMustBeItemDefinition: boolean,
  childrenMustBeModule: boolean,
  traceback: Traceback,
  avoidTracebackIndex: boolean,
): Promise<Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType>> {
  // this will be the resulting array, either modules or items
  // in the case of items, it can only have items as children
  const result: Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType> = [];

  // to loop
  let include: string;
  let includeIndex = -1;

  // so we loop over the includes
  for (include of includes) {
    includeIndex++;

    let specificIncludeTraceback = traceback;
    if (!avoidTracebackIndex) {
      specificIncludeTraceback = traceback.newTraceToBit(includeIndex);
    }

    // so the actual location is the parent folder and the include name
    const actualLocation = await getActualFileLocation(
      path.join(parentFolder, include),
      specificIncludeTraceback,
    );

    const externalSpecificIncludeTraceback =
      specificIncludeTraceback.newTraceToLocation(actualLocation);

    // now the file content is read
    const fileContent = await fsAsync.readFile(actualLocation, "utf8");
    // and the data parsed
    let fileData: {
      data: IFileModuleDataRawUntreatedJSONDataType |
        IFileItemDefinitionUntreatedRawJSONDataType,
      pointers: any,
    };

    try {
      fileData = jsonMap.parse(fileContent);
    } catch (err) {
      throw new CheckUpError(
        err.message,
        externalSpecificIncludeTraceback,
      );
    }

    externalSpecificIncludeTraceback.setupPointers(
      fileData.pointers,
      fileContent,
    );

    // now we check the type to see whether we got a module or a item
    if (fileData.data.type === "module") {
      if (childrenMustBeItemDefinition) {
        throw new CheckUpError(
          "Module found as children of item definition",
          externalSpecificIncludeTraceback,
        );
      }

      // we would process a module
      result.push(await buildModule(
        supportedLanguages,
        actualLocation,
        fileData.data,
        fileData.pointers,
        fileContent,
        externalSpecificIncludeTraceback,
      ));
    } else if (fileData.data.type === "item") {
      if (childrenMustBeModule) {
        throw new CheckUpError(
          "Item definition as children of root definition",
          externalSpecificIncludeTraceback,
        );
      }
      // we would process an item
      result.push(await buildItemDefinition(
        supportedLanguages,
        actualLocation,
        lastModuleDirectory,
        fileData.data,
        fileData.pointers,
        fileContent,
        externalSpecificIncludeTraceback,
      ));
    } else if ((fileData as any).type === "root") {
      throw new CheckUpError(
        "Root found as children",
        externalSpecificIncludeTraceback,
      );
    }
  }

  // return the result
  return result;
}

/**
 * Processes a module
 * @param supportedLanguages supported languages
 * @param actualLocation the location of the file  we are working on
 * for the module
 * @param fileData the data that file contains
 * @returns a raw module
 */
async function buildModule(
  supportedLanguages: string[],
  actualLocation: string,
  fileData: IFileModuleDataRawUntreatedJSONDataType,
  pointers: any,
  raw: string,
  traceback: Traceback,
) {
  ajvCheck(checkModuleSchemaValidate, fileData, traceback);

  const actualName = await getActualFileIdentifier(
    actualLocation,
    traceback,
  );
  const i18nDataLocation = actualLocation.replace(".json", ".properties");
  const i18nData = await getI18nData(
    i18nDataLocation,
    supportedLanguages,
    null,
    traceback,
  );

  // lets find prop extensions if they are available
  const propExtLocation =
    actualLocation.replace(".json", ".propext.json");

  // let's check if the file exists
  const propExtExists = await checkExists(
    propExtLocation,
  );

  // propextensions is declared
  let propExtensions: IPropertyDefinitionRawJSONDataType[];
  let propExtRaw: string;
  let propExtPointers: any;
  if (propExtExists) {
    // they are set if the file exists
    const propExtTraceback = traceback.newTraceToLocation(propExtLocation);
    let internalFileData: {
      data: IPropertyDefinitionRawJSONDataType[],
      pointers: any,
    };
    propExtRaw = await fsAsync.readFile(propExtLocation, "utf8");
    try {
      internalFileData = jsonMap.parse(propExtRaw);
    } catch (err) {
      throw new CheckUpError(err.message, propExtTraceback);
    }

    propExtTraceback.setupPointers(
      internalFileData.pointers,
      propExtRaw,
    );

    propExtPointers = internalFileData.pointers;

    ajvCheck(checkPropertyDefinitionArraySchemaValidate,
      internalFileData.data, propExtTraceback);

    propExtensions =
      await Promise.all<IPropertyDefinitionRawJSONDataType>(
        internalFileData.data.map((pd, index) => {
          const specificPropertyTraceback =
            propExtTraceback.newTraceToBit(index);
          return getI18nPropertyData(
            supportedLanguages,
            actualLocation,
            pd,
            specificPropertyTraceback,
          );
        }),
      );
  }

  // and the final value is created
  const actualLocationDirectory = path.dirname(actualLocation);
  const finalValue: IModuleRawJSONDataType = {
    type: "module",
    name: actualName,
    i18nData: i18nData as any,
    location: actualLocation,
    i18nDataLocation,
    pointers,
    raw,
    children: fileData.includes ? await buildIncludes(
      supportedLanguages,
      actualLocationDirectory,
      actualLocationDirectory,
      fileData.includes,
      false,
      false,
      traceback.newTraceToBit("includes"),
      false,
    ) : [],
  };

  // we add the propExtensions if necessary
  if (propExtensions) {
    finalValue.propExtensions = propExtensions;
    finalValue.propExtRaw = propExtRaw;
    finalValue.propExtPointers = propExtPointers;
    finalValue.propExtLocation = propExtLocation;
  }

  // and return the final value
  return finalValue;
}

/**
 * Processes an item
 * @param supportedLanguages supported languages
 * @param actualLocation the location path for the item
 * @param lastModuleDirectory the last module directory
 * @param fileData the file data raw and untreated
 * @returns a raw treated item
 */
async function buildItemDefinition(
  supportedLanguages: string[],
  actualLocation: string,
  lastModuleDirectory: string,
  fileData: IFileItemDefinitionUntreatedRawJSONDataType,
  pointers: any,
  raw: string,
  traceback: Traceback,
) {
  ajvCheck(checkItemDefinitionSchemaValidate, fileData, traceback);

  const actualName = await getActualFileIdentifier(
    actualLocation,
    traceback,
  );

  const i18nDataLocation = actualLocation.replace(".json", ".properties");

  const i18nData = await getI18nData(
    i18nDataLocation,
    supportedLanguages,
    fileData.policies,
    traceback,
  );

  // lets get the file definitions that are imported that exist
  await Promise.all(
    (fileData.imports || []).map((imp, index) => {
      return getActualFileLocation(
         path.join(lastModuleDirectory, imp),
         traceback.newTraceToBit("imports").newTraceToBit(index),
      );
    }),
  );

  // lets get the file definitions that are imported
  // as an array for use by the browser
  const importedChildDefinitions =
    ((fileData as
      IFileItemDefinitionUntreatedRawJSONDataType).imports || [])
      .map((l) => l.split("/"));

  // and now lets build the child definitions that are included within
  let childDefinitions: IItemDefinitionRawJSONDataType[] = [];
  // if the name is index there might be child definitions in the same
  // folder, either files or folders themselves, an item might be made of
  // several smaller sub items
  if (path.basename(actualLocation) === "index.json") {
    childDefinitions =
      (await buildIncludes(
        supportedLanguages,
        path.dirname(actualLocation),
        lastModuleDirectory,
        (await fsAsync.readdir(path.dirname(actualLocation))).filter((i) => {
          return i !== "index.json" && !i.endsWith(".propext.json") &&
            !i.endsWith(".properties");
          }).map((f) => f.replace(".json", "")),
        true,
        false,
        traceback,
        true,
      )) as IItemDefinitionRawJSONDataType[];
  }

  const finalValue: IItemDefinitionRawJSONDataType = {
    i18nData: i18nData as any,
    name: actualName,
    location: actualLocation,
    i18nDataLocation,
    pointers,
    raw,
    includes: fileData.includes,
    properties: fileData.properties,
    type: fileData.type,
    policies: fileData.policies,
  };

  if (fileData.readRoleAccess) {
    finalValue.readRoleAccess = fileData.readRoleAccess;
  }

  if (fileData.createRoleAccess) {
    finalValue.createRoleAccess = fileData.createRoleAccess;
  }

  if (fileData.editRoleAccess) {
    finalValue.editRoleAccess = fileData.editRoleAccess;
  }

  if (fileData.deleteRoleAccess) {
    finalValue.deleteRoleAccess = fileData.deleteRoleAccess;
  }

  if (fileData.ownerIsObjectId) {
    finalValue.ownerIsObjectId = fileData.ownerIsObjectId;
  }

  if (!finalValue.includes ||
    (Array.isArray(finalValue.includes) && !finalValue.includes.length)) {
    delete finalValue.includes;
  }

  if (!finalValue.properties ||
    (Array.isArray(finalValue.properties) && !finalValue.properties.length)) {
    delete finalValue.properties;
  }

  if (importedChildDefinitions.length) {
    finalValue.importedChildDefinitions = importedChildDefinitions;
  }

  if (childDefinitions.length) {
    finalValue.childDefinitions = childDefinitions;
  }

  if (finalValue.properties) {
    const propertiesTraceback = traceback.newTraceToBit("properties");
    finalValue.properties = await Promise.all<IPropertyDefinitionRawJSONDataType>
      (finalValue.properties.map((pd, index) => {
        const specificPropertyTraceback =
          propertiesTraceback.newTraceToBit(index);
        return getI18nPropertyData(
          supportedLanguages,
          actualLocation,
          pd,
          specificPropertyTraceback,
        );
      }));
  }

  if (finalValue.includes) {
    const fnCheckExists = async (
      item: IItemRawJSONDataType,
      iTraceback: Traceback,
    ) => {
      if (importedChildDefinitions) {
        // if we find such imported definition
        if (importedChildDefinitions.find((idef) => {
          const lastName = idef[idef.length - 1];
          return (lastName === item.name ||
            idef.join("/") === item.name);
        })) {
          // we return and assume it is valid
          return;
        }
      }

      // otherwise if we don't find any and we know for sure
      // it is meant to be an imported definition
      if (item.name.indexOf("/") !== -1) {
        throw new CheckUpError(
          "Missing imported item definition for " + item,
          iTraceback.newTraceToBit("name"),
        );
      }
      // Otherwise we try to get the actual location
      // it will throw an error otherwise
      await getActualFileLocation(
        path.join(path.dirname(actualLocation), item.name),
        iTraceback.newTraceToBit("name"),
      );
    };

    const tracebackIncludes = traceback.newTraceToBit("includes");
    await Promise.all(
      finalValue.includes.map((item, index) => {
        return fnCheckExists(item, tracebackIncludes.newTraceToBit(index));
      }),
    );

    finalValue.includes = await Promise.all<IItemRawJSONDataType>
      (finalValue.includes.map((item, index) => {
        return getI18nItemData(
          supportedLanguages,
          actualLocation,
          item,
          tracebackIncludes.newTraceToBit(index),
        );
      }));
  }

  return finalValue;
}

/**
 * Provides the i18name as given by the language file
 * @param supportedLanguages the supported languages we expect
 * @returns the right structure for a i18nName attribute
 */
async function getI18nData(
  languageFileLocation: string,
  supportedLanguages: string[],
  policies: IPoliciesRawJSONDataType,
  traceback: Traceback,
) {
  // we check whether it exists
  await checkExists(
    languageFileLocation,
    traceback,
  );

  // and then we use the properties reader on it
  const properties: any = PropertiesReader(languageFileLocation).path();
  const i18nData: IRawJSONI18NDataType = {};

  // the traceback for such file
  const localeFileTraceback =
    traceback.newTraceToLocation(languageFileLocation);

  // now we loop over each lanaguage we support
  supportedLanguages.forEach((locale) => {
    // if we find nothing we throw an error
    if (!properties[locale]) {
      throw new CheckUpError(
        "File does not include language data for locale " + locale,
        localeFileTraceback,
      );
    }
    // otherwise set the locale data to empty
    i18nData[locale] = {
      name: null,
      fts_search_field_label: null,
      fts_search_field_placeholder: null,
    };

    // for every locale key we have that we need either for item definition
    // or module as defined by the constants
    MODULE_AND_ITEM_DEF_I18N.forEach((localeKey: string) => {
      if (!properties[locale][localeKey]) {
        throw new CheckUpError(
          "File does not include language data for key '" + localeKey + "' for locale " + locale,
          localeFileTraceback,
        );
      }
      i18nData[locale][localeKey] = properties[locale][localeKey].trim();
    });

    // if we have policies defined
    if (policies) {
      // we check if we have it setup in the properties
      if (!properties[locale].policies) {
        throw new CheckUpError(
          "File does not include language data for policies in " + locale,
          localeFileTraceback,
        );
      }
      // add it to the i18n data for that locale
      i18nData[locale].policies = {};

      // now we check which policies we have available, per key
      Object.keys(policies).forEach((policyType) => {
        // and we check that we have language data for such policy type, either read or delete
        if (!properties[locale].policies[policyType]) {
          throw new CheckUpError(
            "File does not include language data for policy '" + policyType + "' in " + locale,
            localeFileTraceback,
          );
        }

        // now we add such policy in the policy list as empty
        i18nData[locale].policies[policyType] = {};

        // then we start adding up the policy rules, these are the policy names
        // eg. REQUIRES_PASSWORD_CONFIRMATION and whatnot
        Object.keys(policies[policyType]).forEach((policyName) => {
          if (!properties[locale].policies[policyType][policyName]) {
            throw new CheckUpError(
              "File does not include language data for policy '" + policyType + "' in " +
              locale + " for rule '" + policyName + "'",
              localeFileTraceback,
            );
          }
          i18nData[locale].policies[policyType][policyName] = {};
          POLICY_REQUIRED_I18N.forEach((policyReqiredI18nKey) => {
            if (!properties[locale].policies[policyType][policyName][policyReqiredI18nKey]) {
              throw new CheckUpError(
                "File does not include language data for policy '" + policyType + "' in " +
                locale + " for rule '" + policyName + "' in '" + policyReqiredI18nKey + "'",
                localeFileTraceback,
              );
            }
            i18nData[locale].policies[policyType][policyName][policyReqiredI18nKey] =
              properties[locale].policies[policyType][policyName][policyReqiredI18nKey].trim();
          });
          POLICY_OPTIONAL_I18N.forEach((policyOptionalI18nKey) => {
            if (!properties[locale].policies[policyType][policyName][policyOptionalI18nKey]) {
              return;
            }
            i18nData[locale].policies[policyType][policyName][policyOptionalI18nKey] =
              properties[locale].policies[policyType][policyName][policyOptionalI18nKey].trim();
          });
        });
      });
    }

    if (properties[locale][MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY]) {
      i18nData[locale].custom = {};
      Object.keys(properties[locale][MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY]).forEach((customPropertyInCustomKey) => {
        if (typeof properties[locale][MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY][customPropertyInCustomKey] !== "string") {
          throw new CheckUpError(
            "Custom key '" + customPropertyInCustomKey + "' in locale " + locale + " is not a string",
            localeFileTraceback,
          );
        }
        i18nData[locale].custom[customPropertyInCustomKey] =
          properties[locale][MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY][customPropertyInCustomKey];
      });
    }
  });

  return i18nData;
}

/**
 * Process an item group or item specific id to give
 * it specific item name for i18n data, this function is destructive
 * @param supportedLanguages the array of supported languages
 * @param actualLocation the location that the item is being worked on
 * @param item the item itself
 * @returns the item modified
 */
async function getI18nItemData(
  supportedLanguages: string[],
  actualLocation: string,
  item: IItemRawJSONDataType,
  traceback: Traceback,
) {
  // get the language location
  const languageFileLocation =
    actualLocation.replace(".json", ".properties");

  // check that it exists
  await checkExists(
    languageFileLocation,
    traceback,
  );

  // get the properties
  const properties = PropertiesReader(languageFileLocation).path();
  const i18nData: {
    [locale: string]: {
      [key: string]: string,
    },
  } = {};

  const localeFileTraceback =
    traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);

  const expectedProperties = ITEM_OPTIONAL_I18N
    .map((b) => ({key: b, required: false}))
    .concat((item.canUserExclude || item.canUserExcludeIf ? ITEM_CAN_BE_EXCLUDED_I18N : [])
      .map((b) => ({key: b, required: true})))
    .concat((item.exclusionIsCallout ? ITEM_CALLOUT_EXCLUDED_I18N : [])
      .map((b) => ({key: b, required: true})));

  const localeDataIsRequired = expectedProperties.filter((p) => p.required).length >= 1;

  // use the same technique we used before to get the name
  supportedLanguages.forEach((locale) => {
    i18nData[locale] = {};

    if (!properties[locale]) {
      if (localeDataIsRequired) {
        throw new CheckUpError(
          "File does not include language data for '" + locale + "'",
          localeFileTraceback,
        );
      }
      return;
    } else if (!properties[locale].items) {
      if (localeDataIsRequired) {
        throw new CheckUpError(
          "File does not include 'items' data for '" + locale + "'",
          localeFileTraceback,
        );
      }
      return;
    } else if (!properties[locale].items[item.id]) {
      if (localeDataIsRequired) {
        throw new CheckUpError(
          "Does not include 'items' data for '" + locale + "' in '" +
            item.id + "'",
          localeFileTraceback,
        );
      }
      return;
    }

    expectedProperties.forEach((expectedProperty) => {
      const result = properties[locale].items[item.id][expectedProperty.key];

      // if we don't find it and it's not required not a big deal
      if (!result && !expectedProperty.required) {
        return;
      } else if (!result && expectedProperty.required) {
        // otherwise we throw an error
        throw new CheckUpError("File " + languageFileLocation +
          " has missing items data for item id '" + item.id +
          "' in '" + expectedProperty.key + "' in locale " + locale, localeFileTraceback);
      } else if (typeof result !== "string") {
        // also throw an error if it's invalid
        throw new CheckUpError("File " + languageFileLocation +
          " has invalid items data for item id '" + item.id +
          "' in '" + expectedProperty.key + "' in locale " + locale, localeFileTraceback);
      }
      i18nData[locale][expectedProperty.key] = result.trim();
    });
  });

  // set it and return the item itself
  item.i18nData = i18nData;
  return item;
}

/**
 * Processes a property to give it the i18n data as
 * defined by the constants for its type
 * this function is destructive
 * @param  supportedLanguages the array of supported languages
 * @param  actualLocation     the location that the item is being worked on
 * @param  property           the property itself
 * @returns                    the property itself
 */
async function getI18nPropertyData(
  supportedLanguages: string[],
  actualLocation: string,
  property: IPropertyDefinitionRawJSONDataType,
  traceback: Traceback,
) {
  // if it's always hidden
  // it is pointless to request the data
  if (property.hidden) {
    return property;
  }

  // lets get the language location by using the property location
  const languageFileLocation =
    actualLocation.replace(".json", ".properties");

  // check that the file exists
  // throws an error if otherwise
  await checkExists(
    languageFileLocation,
    traceback,
  );

  const i18nData: {
    [locale: string]: any,
  } = {};

  // get the properties and the definition
  const properties = PropertiesReader(languageFileLocation).path();
  const definition = PropertyDefinition.supportedTypesStandard[property.type];

  if (!definition) {
    throw new CheckUpError(
      `Unknown type '${property.type}'`,
      traceback.newTraceToBit("type"),
    );
  }

  const localeFileTraceback =
    traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);

  const searchLevelIsDisabledOrHidden =
    property.searchLevel === "disabled" || property.searchLevel === "hidden";

  let expectedProperties = definition.i18n.base
    .map((b) => ({key: b, required: true}))
    // concat to optional properties
    .concat((definition.i18n.optional || [])
      .map((b) => ({key: b, required: false})))
    // concat to search range properties only if necessary
    .concat((property.disableRangedSearch || searchLevelIsDisabledOrHidden ?
        [] : definition.i18n.searchRange || [])
      .map((b) => ({key: b, required: true})))
    .concat((property.disableRangedSearch || searchLevelIsDisabledOrHidden ?
        [] : definition.i18n.searchRangeOptional || [])
      .map((b) => ({key: b, required: false})))
    // concat to search properties only if necessary
    .concat((searchLevelIsDisabledOrHidden || (
      definition.searchInterface === PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
      !property.disableRangedSearch
    ) ?
        [] : definition.i18n.searchBase || [])
      .map((b) => ({key: b, required: true})))
    .concat((searchLevelIsDisabledOrHidden || (
      definition.searchInterface === PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
      !property.disableRangedSearch
    ) ?
        [] : definition.i18n.searchOptional || [])
      .map((b) => ({key: b, required: false})))
    // request for the values if supported
    .concat((property.values || [])
      .map((b) => ({
        key: "values." + b.toString().replace(/\./g, "_dot_").replace("/\s/g", "_"),
        required: true,
        actualFinalKeyValue: b.toString(),
      })))
    .concat((property.values ? ["null_value"] : [])
      .map((b) => ({key: b, required: true})))
    .concat((property.invalidIf && !property.hidden ? property.invalidIf.map((ii) => ii.error) : [])
      .map((b) => ({key: "error." + b, required: true})));

  const errorRequiredProperties = [];
  if (!property.nullable && property.type !== "boolean") {
    errorRequiredProperties.push("error.NOT_NULLABLE");
  }

  if (property.unique) {
    errorRequiredProperties.push("error.NOT_UNIQUE");
  }

  if (
    definition.i18n.tooLargeErrorInclude &&
    !property.values && !property.autocompleteIsEnforced
  ) {
    errorRequiredProperties.push("error.TOO_LARGE");
  }

  if (definition.supportedSubtypes && property.subtype && property.type === "string") {
    errorRequiredProperties.push("error.INVALID_SUBTYPE_VALUE");
  }

  if (
    (
      property.type === "date" ||
      property.type === "datetime" ||
      property.type === "time" ||
      property.type === "number" ||
      property.type === "currency" ||
      property.type === "integer" ||
      property.type === "year" ||
      property.type === "unit" ||
      property.autocompleteIsEnforced
    ) && !property.values
  ) {
    errorRequiredProperties.push("error.INVALID_VALUE");
  }

  if ((typeof property.minLength !== "undefined" || definition.i18n.tooSmallErrorInclude) &&
    !property.values && !property.autocompleteIsEnforced) {
    errorRequiredProperties.push("error.TOO_SMALL");
  }

  if (definition.i18n.tooManyDecimalsErrorInclude &&
    !property.values && !property.autocompleteIsEnforced) {
    errorRequiredProperties.push("error.TOO_MANY_DECIMALS");
  }

  if (typeof property.minDecimalCount !== "undefined" &&
    !property.values && !property.autocompleteIsEnforced) {
    errorRequiredProperties.push("error.TOO_FEW_DECIMALS");
  }

  if (
    definition.searchInterface === PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
    !property.disableRangedSearch && property.searchLevel !== "disabled"
  ) {
    errorRequiredProperties.push("error.FROM_LARGER_THAN_TO");
    errorRequiredProperties.push("error.TO_SMALLER_THAN_FROM");
  }

  expectedProperties = expectedProperties.concat(errorRequiredProperties
    .map((b) => ({key: b, required: true})));

  // and start to loop
  supportedLanguages.forEach((locale) => {
    // do some checks
    if (!properties[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        localeFileTraceback,
      );
    } else if (!properties[locale].properties) {
      throw new CheckUpError(
        "File does not include 'properties' data for '" + locale + "'",
        localeFileTraceback,
      );
    } else if (!properties[locale].properties[property.id]) {
      throw new CheckUpError(
        "Does not include 'properties' data for '" + locale + "' in '" +
          property.id + "'",
        localeFileTraceback,
      );
    }

    // start initializing the data in the property itself
    i18nData[locale] = {};

    const propertyData = properties[locale].properties[property.id];

    // run the expected properties and start running them
    expectedProperties.forEach((expectedProperty) => {
      // split the names
      const splitted = expectedProperty.key.split(".");
      let result = propertyData;
      let propKey: string;
      // try to find it
      for (propKey of splitted) {
        result = result[propKey];
        if (!result) {
          break;
        }
      }
      // if we don't find it and it's not required not a big deal
      if (!result && !expectedProperty.required) {
        return;
      } else if (!result && expectedProperty.required) {
        // otherwise we throw an error
        throw new CheckUpError("File " + languageFileLocation +
          " has missing property data for property id '" + property.id +
          "' in '" + expectedProperty.key + "' required by type '" +
          property.type + "' in locale " + locale, localeFileTraceback);
      } else if (typeof result !== "string") {
        // also throw an error if it's invalid
        throw new CheckUpError("File " + languageFileLocation +
          " has invalid property data for property id '" + property.id +
          "' in '" + expectedProperty.key + "' required by type '" +
          property.type + "' in locale " + locale, localeFileTraceback);
      }

      // Trim the result
      result = result.trim();

      // now we search where the property has to be set
      let whereToSet = i18nData[locale];
      // by looping on the splitted value
      splitted.forEach((keyValue, index) => {
        // on the last one we set it as the value
        if (index === splitted.length - 1) {
          whereToSet[(expectedProperty as any).actualFinalKeyValue || keyValue] = result;
          return;
        }

        // otherwise we try to get deeper
        whereToSet[keyValue] = whereToSet[keyValue] || {};
        whereToSet = whereToSet[keyValue];
      });
    });
  });

  property.i18nData = i18nData;

  // return the property
  return property;
}
