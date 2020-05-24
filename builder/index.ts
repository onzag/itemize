/**
 * Bundles up and creates all the build files that are used as the schema
 * to generate everything in itemize, from the SQL database, to the endpoints
 * using the raw unprocessed data into some multiple per language files
 *
 * @packageDocumentation
 */

import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IIncludeRawJSONDataType } from "../base/Root/Module/ItemDefinition/Include";
import { IModuleRawJSONDataType, IRawJSONI18NDataType, IRequestLimitersType } from "../base/Root/Module";
import {
  IItemDefinitionRawJSONDataType, IPoliciesRawJSONDataType,
} from "../base/Root/Module/ItemDefinition";
import {
  PropertyDefinitionSearchInterfacesType,
} from "../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";
import { IRootRawJSONDataType } from "../base/Root";
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
} from "./schema-checks";
import { checkRoot } from "./checkers";
import { processRoot } from "./processer";
import { buildLang, clearLang } from "./lang";
import { buildResources } from "./resources";
import { buildHTML } from "./html";
import { extractConfigAndBuildNumber, IBuilderBasicConfigType } from "./config";

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
  MODULE_AND_ITEM_DEF_I18N_SEARCHABLE,
} from "../constants";
import { evalRawJSON } from "./evaler";
import { buildBuildNumber } from "./buildnumber";
import { buildManifest } from "./manifest";

// Refuse to run in production mode
if (process.env.NODE_ENV === "production") {
  throw new Error("This script cannot run in production mode");
}

// This is the raw untreated json for the root
interface IFileRootDataRawUntreatedJSONDataType {
  type: "root";
  children: string[];
  i18n: string;
}

/**
 * this is the raw untreated json for the module
 */
interface IFileModuleDataRawUntreatedJSONDataType {
  type: "module";
  children: string[];
  readRoleAccess?: string[];
  searchable?: boolean;
  maxTraditionalSearchResults?: number;
  maxSearchMatchResults?: number;
  requestLimiters?: IRequestLimitersType;
}

/**
 * and this is the raw untreated json for an item
 */
export interface IFileItemDefinitionUntreatedRawJSONDataType {
  type: "item";
  imports?: string[];
  children?: string[];
  includes?: IIncludeRawJSONDataType[];
  properties?: IPropertyDefinitionRawJSONDataType[];
  createRoleAccess?: string[];
  editRoleAccess?: string[];
  deleteRoleAccess?: string[];
  readRoleAccess?: string[];
  policies?: IPoliciesRawJSONDataType;
  ownerIsObjectId?: boolean;
  searchable?: boolean;
  versioningRoleAccess?: string[];
  enableVersioning?: boolean;
  versionIsLanguageAndCountry?: boolean;
  versionIsLanguage?: boolean;
  versionIsCountry?: boolean;
}

export default async function build() {
  try {
    const rawDataConfig = await extractConfigAndBuildNumber();

    // ensure the dist directory
    if (!await checkExists("dist")) {
      await fsAsync.mkdir("dist");
    }

    if (!await checkExists(path.join("dist", "data"))) {
      await fsAsync.mkdir(path.join("dist", "data"));
    }

    // we run all the build steps
    const [rawRoot] = await Promise.all([
      buildData(rawDataConfig),
      buildHTML(rawDataConfig),
      buildBuildNumber(rawDataConfig),
      buildResources(rawDataConfig),
      copyMomentFiles(rawDataConfig),
    ]);

    await buildManifest(rawDataConfig, rawRoot);
  } catch (err) {
    // display an error if it's part of a checkup error
    if (err instanceof CheckUpError) {
      err.display();
    }
    // log the stack
    console.log(err.stack);
  }
};

/**
 * Builds the base data for the root tree
 * in order to create the build files
 * @param rawDataConfig the configuration
 */
async function buildData(rawDataConfig: IBuilderBasicConfigType): Promise<IRootRawJSONDataType> {
  const entryPoint = rawDataConfig.standard.entry;

  // lets get the actual location of the item, lets assume first
  // it is the given location
  const actualLocation = await getActualFileLocation(
    ["", entryPoint],
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

  // now let's build the i18n supported languages
  // data which contains all the supported languges
  const i18nData = await buildLang(
    rawDataConfig,
    actualLocation,
    fileData.data.i18n,
    traceback,
  );

  // and make the result JSON
  const resultJSON: IRootRawJSONDataType = {
    type: "root",
    location: actualLocation,
    pointers: fileData.pointers,
    i18nData,
    children: fileData.data.children ?
      (await buildChildrenItemDefinitionsOrModules(
        rawDataConfig,
        path.dirname(actualLocation),
        path.dirname(actualLocation),
        fileData.data.children,
        "module",
        traceback.newTraceToBit("children"),
      )) as IModuleRawJSONDataType[] : [],
  };

  // check and run the checkers
  checkRoot(resultJSON);

  // and let's emit such file tht only contains the language name
  console.log("emiting " + colors.green(path.join("dist", "data", "lang.json")));
  await fsAsync.writeFile(
    path.join("dist", "data", "lang.json"),
    JSON.stringify(clearLang(i18nData, rawDataConfig)),
  );

  // now let's produce the build for every language
  const resultBuilds = rawDataConfig.standard.supportedLanguages.map((lang) => {
    return processRoot(resultJSON, lang);
  });

  // let's process the result for the main output so we remove
  // unecessary data for the build
  const mainResultBuild = processRoot(resultJSON);

  // now let's output the build
  const allBuildFileName = path.join("dist", "data", `build.all.json`);
  console.log("emiting " + colors.green(allBuildFileName));
  await fsAsync.writeFile(
    allBuildFileName,
    JSON.stringify(mainResultBuild),
  );

  // and now let's output clean builds for every language that is supported
  await Promise.all(rawDataConfig.standard.supportedLanguages.map(async (sl, index) => {
    // so we get a resulting build for the given language
    const resultingBuild = resultBuilds[index];
    // and let's emit such file
    const fileName = path.join("dist", "data", `build.${sl}.json`);
    console.log("emiting " + colors.green(fileName));
    await fsAsync.writeFile(
      fileName,
      JSON.stringify(resultingBuild),
    );
  }));

  return resultJSON;
}

/**
 * this processes all the included files
 * whether modules or items
 * @param rawDataConfig the raw configuration
 * @param parentFolder the parent folder where this is located
 * @param lastModuleDirectory the module we are currently in in order
 * to be able to perform checks for imported paths (not children)
 * @param children the children to add as string
 * @param childrenMustBeOfType pass null not to specify or a string
 * @param traceback the traceback of the current children
 */
async function buildChildrenItemDefinitionsOrModules(
  rawDataConfig: IBuilderBasicConfigType,
  parentFolder: string,
  lastModuleDirectory: string,
  children: string[],
  childrenMustBeOfType: string,
  traceback: Traceback,
): Promise<Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType>> {
  // this will be the resulting array, either modules or items
  // in the case of items, it can only have items as children
  const result: Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType> = [];

  // to loop
  let child: string;
  let childIndex = -1;

  // so we loop over the includes
  for (child of children) {
    childIndex++;

    const specificIncludeTraceback = traceback.newTraceToBit(childIndex);

    // so the actual location is the parent folder and the include name
    const actualLocation = await getActualFileLocation(
      [parentFolder, child],
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

    // check the type
    if (childrenMustBeOfType && childrenMustBeOfType !== fileData.data.type) {
      throw new CheckUpError(
        "Invalid type to be a children of '" +
          fileData.data.type + "' expected '" + childrenMustBeOfType,
        externalSpecificIncludeTraceback,
      );
    }

    // now we check the type to see whether we got a module or a item
    if (fileData.data.type === "module") {
      // we would process a module
      result.push(await buildModule(
        rawDataConfig,
        actualLocation,
        fileData.data,
        fileData.pointers,
        fileContent,
        externalSpecificIncludeTraceback,
      ));
    } else if (fileData.data.type === "item") {
      // we would process an item
      result.push(await buildItemDefinition(
        rawDataConfig,
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
 * @param rawDataConfig the raw config
 * @param actualLocation the location of the file  we are working on
 * for the module
 * @param fileData the data that file contains
 * @param pointers the file pointers
 * @param raw the raw content of the file
 * @param traceback the traceback object
 * @returns a raw module
 */
async function buildModule(
  rawDataConfig: IBuilderBasicConfigType,
  actualLocation: string,
  fileData: IFileModuleDataRawUntreatedJSONDataType,
  pointers: any,
  raw: string,
  traceback: Traceback,
) {
  const actualEvaledFileData: IFileModuleDataRawUntreatedJSONDataType =
    evalRawJSON(
      rawDataConfig,
      fileData,
    );
  ajvCheck(checkModuleSchemaValidate, actualEvaledFileData, traceback);

  const actualName = await getActualFileIdentifier(
    actualLocation,
    traceback,
  );
  const i18nDataLocation = actualLocation.replace(".json", ".properties");
  const i18nData = await getI18nData(
    rawDataConfig,
    typeof actualEvaledFileData.searchable !== "undefined" ? actualEvaledFileData.searchable : true,
    i18nDataLocation,
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

  // and the final value is created
  const actualLocationDirectory = path.dirname(actualLocation);
  const finalValue: IModuleRawJSONDataType = {
    type: "module",
    name: actualName,
    i18nData: i18nData,
    location: actualLocation,
    i18nDataLocation,
    pointers,
    raw,
    children: actualEvaledFileData.children ? await buildChildrenItemDefinitionsOrModules(
      rawDataConfig,
      actualLocationDirectory,
      actualLocationDirectory,
      actualEvaledFileData.children,
      null,
      traceback.newTraceToBit("children"),
    ) : [],
  };

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

    // modules being searchable and items being searchable can vary and for that reason
    // we must check whether we need the searchable properties for the properties to displace data
    let searchableProperties = typeof actualEvaledFileData.searchable !== "undefined" ? actualEvaledFileData.searchable : true;
    if (!searchableProperties) {
      const checkAtLeastOneIsSearchable = (idef: IItemDefinitionRawJSONDataType) => {
        if (searchableProperties) {
          return;
        } else if (typeof idef.searchable === "undefined" || idef.searchable) {
          searchableProperties = true;
          return;
        } else if (idef.childDefinitions) {
          idef.childDefinitions.forEach((cd) => {
            checkAtLeastOneIsSearchable(idef);
          });
        }
      }
  
      finalValue.children.forEach((c) => {
        if (c.type === "item") {
          checkAtLeastOneIsSearchable(c);
        }
      });
    }

    propExtensions =
      await Promise.all<IPropertyDefinitionRawJSONDataType>(
        internalFileData.data.map((pd, index) => {
          const specificPropertyTraceback =
            propExtTraceback.newTraceToBit(index);
          return getI18nPropertyData(
            rawDataConfig,
            actualLocation,
            pd,
            searchableProperties,
            specificPropertyTraceback,
          );
        }),
      );
  }

  if (typeof actualEvaledFileData.searchable !== "undefined") {
    finalValue.searchable = actualEvaledFileData.searchable;
  }

  // we add the propExtensions if necessary
  if (propExtensions) {
    finalValue.propExtensions = propExtensions;
    finalValue.propExtRaw = propExtRaw;
    finalValue.propExtPointers = propExtPointers;
    finalValue.propExtLocation = propExtLocation;
  }

  if (actualEvaledFileData.readRoleAccess) {
    finalValue.readRoleAccess = actualEvaledFileData.readRoleAccess;
  }

  if (typeof actualEvaledFileData.maxSearchMatchResults !== "undefined") {
    finalValue.maxSearchMatchResults = actualEvaledFileData.maxSearchMatchResults;
  }

  if (typeof actualEvaledFileData.maxTraditionalSearchResults !== "undefined") {
    finalValue.maxTraditionalSearchResults = actualEvaledFileData.maxTraditionalSearchResults;
  }

  if (actualEvaledFileData.requestLimiters) {
    finalValue.requestLimiters = actualEvaledFileData.requestLimiters;
  }

  // and return the final value
  return finalValue;
}

/**
 * Processes an item
 * @param rawDataConfig the raw config
 * @param actualLocation the location path for the item
 * @param lastModuleDirectory the last module directory
 * @param fileData the file data raw and untreated
 * @param pointers the pointers of the file for traceback usage
 * @param raw the raw content of the file
 * @param traceback the traceback
 * @returns a raw treated item definition
 */
async function buildItemDefinition(
  rawDataConfig: IBuilderBasicConfigType,
  actualLocation: string,
  lastModuleDirectory: string,
  fileData: IFileItemDefinitionUntreatedRawJSONDataType,
  pointers: any,
  raw: string,
  traceback: Traceback,
) {
  const actualEvaledFileData: IFileItemDefinitionUntreatedRawJSONDataType =
    evalRawJSON(
      rawDataConfig,
      fileData,
    );
  ajvCheck(checkItemDefinitionSchemaValidate, actualEvaledFileData, traceback);

  const actualName = await getActualFileIdentifier(
    actualLocation,
    traceback,
  );

  const i18nDataLocation = actualLocation.replace(".json", ".properties");

  const i18nData = await getI18nData(
    rawDataConfig,
    typeof actualEvaledFileData.searchable !== "undefined" ? actualEvaledFileData.searchable : true,
    i18nDataLocation,
    actualEvaledFileData.policies,
    traceback,
  );

  // lets get the file definitions that are imported that exist
  await Promise.all(
    (actualEvaledFileData.imports || []).map((imp, index) => {
      return getActualFileLocation(
         [lastModuleDirectory, imp],
         traceback.newTraceToBit("imports").newTraceToBit(index),
      );
    }),
  );

  // lets get the file definitions that are imported
  // as an array for use by the browser
  const importedChildDefinitions =
    ((actualEvaledFileData as
      IFileItemDefinitionUntreatedRawJSONDataType).imports || [])
      .map((l) => l.split("/"));

  // and now lets build the child definitions that are included within
  let childDefinitions: IItemDefinitionRawJSONDataType[] = [];
  // if the name is index there might be child definitions in the same
  // folder, either files or folders themselves, an item might be made of
  // several smaller sub items
  if (path.basename(actualLocation) === "index.json") {
    childDefinitions = actualEvaledFileData.children ?
      (await buildChildrenItemDefinitionsOrModules(
        rawDataConfig,
        path.dirname(actualLocation),
        lastModuleDirectory,
        actualEvaledFileData.children,
        "item",
        traceback.newTraceToBit("children"),
      )) as IItemDefinitionRawJSONDataType[] : [];
  }

  const finalValue: IItemDefinitionRawJSONDataType = {
    i18nData: i18nData as any,
    name: actualName,
    location: actualLocation,
    i18nDataLocation,
    pointers,
    raw,
    includes: actualEvaledFileData.includes,
    properties: actualEvaledFileData.properties,
    type: actualEvaledFileData.type,
    policies: actualEvaledFileData.policies,
  };

  if (typeof actualEvaledFileData.searchable !== "undefined") {
    finalValue.searchable = actualEvaledFileData.searchable;
  }

  if (actualEvaledFileData.readRoleAccess) {
    finalValue.readRoleAccess = actualEvaledFileData.readRoleAccess;
  }

  if (actualEvaledFileData.createRoleAccess) {
    finalValue.createRoleAccess = actualEvaledFileData.createRoleAccess;
  }

  if (actualEvaledFileData.editRoleAccess) {
    finalValue.editRoleAccess = actualEvaledFileData.editRoleAccess;
  }

  if (actualEvaledFileData.deleteRoleAccess) {
    finalValue.deleteRoleAccess = actualEvaledFileData.deleteRoleAccess;
  }

  if (actualEvaledFileData.ownerIsObjectId) {
    finalValue.ownerIsObjectId = actualEvaledFileData.ownerIsObjectId;
  }

  if (actualEvaledFileData.enableVersioning) {
    finalValue.enableVersioning = actualEvaledFileData.enableVersioning;

    if (actualEvaledFileData.versionIsCountry) {
      finalValue.versionIsCountry = actualEvaledFileData.versionIsCountry;
    }

    if (actualEvaledFileData.versionIsLanguage) {
      finalValue.versionIsLanguage = actualEvaledFileData.versionIsLanguage;
    }

    if (actualEvaledFileData.versionIsLanguageAndCountry) {
      finalValue.versionIsLanguageAndCountry = actualEvaledFileData.versionIsLanguageAndCountry;
    }
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
          rawDataConfig,
          actualLocation,
          pd,
          typeof finalValue.searchable === "undefined" ? true : finalValue.searchable,
          specificPropertyTraceback,
        );
      }));
  }

  if (finalValue.includes) {
    const fnCheckExists = async (
      include: IIncludeRawJSONDataType,
      iTraceback: Traceback,
    ) => {
      if (importedChildDefinitions) {
        // if we find such imported definition
        if (importedChildDefinitions.find((idef) => {
          const lastName = idef[idef.length - 1];
          return (lastName === include.definition ||
            idef.join("/") === include.definition);
        })) {
          // we return and assume it is valid
          return;
        }
      }

      // otherwise if we don't find any and we know for sure
      // it is meant to be an imported definition
      if (include.definition.indexOf("/") !== -1) {
        throw new CheckUpError(
          "Missing imported item definition for " + include,
          iTraceback.newTraceToBit("name"),
        );
      }
      // Otherwise we try to get the actual location
      // it will throw an error otherwise
      await getActualFileLocation(
        [path.dirname(actualLocation), include.definition],
        iTraceback.newTraceToBit("name"),
      );
    };

    const tracebackIncludes = traceback.newTraceToBit("includes");
    await Promise.all(
      finalValue.includes.map((include, index) => {
        return fnCheckExists(include, tracebackIncludes.newTraceToBit(index));
      }),
    );

    finalValue.includes = await Promise.all<IIncludeRawJSONDataType>
      (finalValue.includes.map((include, index) => {
        return getI18nIncludeData(
          rawDataConfig,
          actualLocation,
          include,
          tracebackIncludes.newTraceToBit(index),
        );
      }));
  }

  return finalValue;
}

/**
 * Provides the i18name as given by the language file
 * @param rawDataConfig the raw config
 * @param languageFileLocation the location of the properties file
 * @param policies the polcies that are expected to be requested
 * @param traceback the traceback object
 * @returns the right structure for a i18nName attribute
 */
async function getI18nData(
  rawDataConfig: IBuilderBasicConfigType,
  isSearchable: boolean,
  languageFileLocation: string,
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
  rawDataConfig.standard.supportedLanguages.forEach((locale) => {
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
      fts_search_keywords: null,
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

    if (isSearchable) {
      MODULE_AND_ITEM_DEF_I18N_SEARCHABLE.forEach((localeKey: string) => {
        if (!properties[locale][localeKey]) {
          throw new CheckUpError(
            "File does not include language data for searchable key '" + localeKey + "' for locale " + locale,
            localeFileTraceback,
          );
        }
        i18nData[locale][localeKey] = properties[locale][localeKey].trim();
      });
    }

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
      i18nData[locale][MODULE_AND_ITEM_DEF_CUSTOM_I18N_KEY] = {};
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
 * @param rawDataConfig the raw config
 * @param actualLocation the location that the item is being worked on
 * @param include the include itself
 * @param traceback the traceback object
 * @returns the item modified
 */
async function getI18nIncludeData(
  rawDataConfig: IBuilderBasicConfigType,
  actualLocation: string,
  include: IIncludeRawJSONDataType,
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
    .concat((include.canUserExclude || include.canUserExcludeIf ? ITEM_CAN_BE_EXCLUDED_I18N : [])
      .map((b) => ({key: b, required: true})))
    .concat((include.exclusionIsCallout ? ITEM_CALLOUT_EXCLUDED_I18N : [])
      .map((b) => ({key: b, required: true})));

  const localeDataIsRequired = expectedProperties.filter((p) => p.required).length >= 1;

  // use the same technique we used before to get the name
  rawDataConfig.standard.supportedLanguages.forEach((locale) => {
    i18nData[locale] = {};

    if (!properties[locale]) {
      if (localeDataIsRequired) {
        throw new CheckUpError(
          "File does not include language data for '" + locale + "'",
          localeFileTraceback,
        );
      }
      return;
    } else if (!properties[locale].includes) {
      if (localeDataIsRequired) {
        throw new CheckUpError(
          "File does not include 'includes' data for '" + locale + "'",
          localeFileTraceback,
        );
      }
      return;
    } else if (!properties[locale].includes[include.id]) {
      if (localeDataIsRequired) {
        throw new CheckUpError(
          "Does not include 'includes' data for '" + locale + "' in '" +
            include.id + "'",
          localeFileTraceback,
        );
      }
      return;
    }

    expectedProperties.forEach((expectedProperty) => {
      const result = properties[locale].includes[include.id][expectedProperty.key];

      // if we don't find it and it's not required not a big deal
      if (!result && !expectedProperty.required) {
        return;
      } else if (!result && expectedProperty.required) {
        // otherwise we throw an error
        throw new CheckUpError("File " + languageFileLocation +
          " has missing items data for include id '" + include.id +
          "' in '" + expectedProperty.key + "' in locale " + locale, localeFileTraceback);
      } else if (typeof result !== "string") {
        // also throw an error if it's invalid
        throw new CheckUpError("File " + languageFileLocation +
          " has invalid items data for include id '" + include.id +
          "' in '" + expectedProperty.key + "' in locale " + locale, localeFileTraceback);
      }
      i18nData[locale][expectedProperty.key] = result.trim();
    });
  });

  // set it and return the item itself
  include.i18nData = i18nData;
  return include;
}

/**
 * Processes a property to give it the i18n data as
 * defined by the constants for its type
 * this function is destructive
 * @param rawDataConfig the raw config
 * @param actualLocation the location that the item is being worked on
 * @param property the property itself
 * @param traceback the traceback object
 * @returns the property itself
 */
async function getI18nPropertyData(
  rawDataConfig: IBuilderBasicConfigType,
  actualLocation: string,
  property: IPropertyDefinitionRawJSONDataType,
  searchable: boolean,
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

  const searchIsDisabled = !searchable ||
    (typeof property.searchable !== "undefined" && !property.searchable);

  let expectedProperties = definition.i18n.base
    .map((b) => ({key: b, required: true}))
    // concat to optional properties
    .concat((definition.i18n.optional || [])
      .map((b) => ({key: b, required: false})))
    // concat to search range properties only if necessary
    .concat((property.disableRangedSearch || searchIsDisabled ?
        [] : definition.i18n.searchRange || [])
      .map((b) => ({key: b, required: true})))
    .concat((property.disableRangedSearch || searchIsDisabled ?
        [] : definition.i18n.searchRangeOptional || [])
      .map((b) => ({key: b, required: false})))
    // concat to search properties only if necessary
    .concat((searchIsDisabled || (
      definition.searchInterface === PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
      !property.disableRangedSearch
    ) ?
        [] : definition.i18n.searchBase || [])
      .map((b) => ({key: b, required: true})))
    .concat((searchIsDisabled || (
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
    .concat(
      (property.specialProperties && property.specialProperties["mediaProperty"] && !property.hidden) ? [{
        key: "error.MEDIA_PROPERTY_TOO_LARGE",
        required: true,
      }] : []
    )
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
    !property.values
  ) {
    if (Array.isArray(definition.i18n.tooLargeErrorInclude)) {
      const subtype = property.subtype || null;
      if (definition.i18n.tooLargeErrorInclude.includes(subtype)) {
        errorRequiredProperties.push("error.TOO_LARGE");
      }
    } else {
      errorRequiredProperties.push("error.TOO_LARGE");
    }
  }

  if (
    definition.supportedSubtypes &&
    definition.i18n.invalidSubtypeErrorInclude &&
    property.subtype
  ) {
    if (Array.isArray(definition.i18n.invalidSubtypeErrorInclude)) {
      const subtype = property.subtype || null;
      if (definition.i18n.invalidSubtypeErrorInclude.includes(subtype)) {
        errorRequiredProperties.push("error.INVALID_SUBTYPE_VALUE");
      }
    } else {
      errorRequiredProperties.push("error.INVALID_SUBTYPE_VALUE");
    }
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
      property.type === "unit"
    ) && !property.values
  ) {
    errorRequiredProperties.push("error.INVALID_VALUE");
  }

  // if a minlenght is specified in the property it means
  // that a too small value must exist, eg. a min len of 2
  // will trigger with one character, but 0 characters will be
  // null and won't trigger so the error is unecessary,
  // another circumstance where instead we use a too small
  // error regardless is with numbers, for negative numbers
  // they are always necessary
  if (
    (
      typeof property.minLength !== "undefined" ||
      definition.i18n.tooSmallErrorInclude
    ) &&
    !property.values
  ) {
    if (
      typeof property.minLength === "undefined" &&
      Array.isArray(definition.i18n.tooSmallErrorInclude)
    ) {
      const subtype = property.subtype || null;
      if (definition.i18n.tooSmallErrorInclude.includes(subtype)) {
        errorRequiredProperties.push("error.TOO_SMALL");
      }
    } else {
      errorRequiredProperties.push("error.TOO_SMALL");
    }
  }

  if (
    definition.i18n.tooManyDecimalsErrorInclude &&
    !property.values
  ) {
    if (Array.isArray(definition.i18n.tooManyDecimalsErrorInclude)) {
      const subtype = property.subtype || null;
      if (definition.i18n.tooManyDecimalsErrorInclude.includes(subtype)) {
        errorRequiredProperties.push("error.TOO_MANY_DECIMALS");
      }
    } else {
      errorRequiredProperties.push("error.TOO_MANY_DECIMALS");
    }
  }

  if (typeof property.minDecimalCount !== "undefined" && !property.values) {
    errorRequiredProperties.push("error.TOO_FEW_DECIMALS");
  }

  if (
    definition.searchInterface === PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
    !property.disableRangedSearch &&
    (
      typeof property.searchable === "undefined" ||
      property.searchable
    )
  ) {
    errorRequiredProperties.push("error.FROM_LARGER_THAN_TO");
    errorRequiredProperties.push("error.TO_SMALLER_THAN_FROM");
  }

  expectedProperties = expectedProperties.concat(errorRequiredProperties
    .map((b) => ({key: b, required: true})));

  // and start to loop
  rawDataConfig.standard.supportedLanguages.forEach((locale) => {
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
