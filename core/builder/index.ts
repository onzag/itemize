import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "../base/ItemDefinition/PropertyDefinition";
import { IItemRawJSONDataType } from "../base/ItemDefinition/Item";
import { IModuleRawJSONDataType } from "../base/Module";
import {
  IItemDefinitionRawJSONDataType,
} from "../base/ItemDefinition";
import Root, { IRootRawJSONDataType } from "../base/Root";
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
import { buildGraphQLSchema } from "./graphql";
import { LOCALE_I18N } from "../constants";

import * as fs from "fs";
import * as path from "path";
import * as PropertiesReader from "properties-reader";
import * as colors from "colors/safe";
import * as escapeStringRegexp from "escape-string-regexp";

const jsonMap = require("json-source-map");
const fsAsync = fs.promises;

// registering source maps, this one is useful for
// debugging and since the builder is a development file
// it's ok this is here
import "source-map-support/register";

if (process.env.NODE_ENV === "production") {
  throw new Error("This script cannot run in production mode");
}

// This is the raw untreated json for the root
interface IFileRootDataRawUntreatedJSONDataType {
  type: "root";
  includes: string[];
  lang: string[];
  i18n: string;
}

// this is the raw untreated json for the module
interface IFileModuleDataRawUntreatedJSONDataType {
  type: "module";
  includes: string[];
}

// and this is the raw untreated json for an item
export interface IFileItemDefinitionUntreatedRawJSONDataType {
  type: "item";
  allowCalloutExcludes?: boolean;
  imports?: string[];
  includes?: IItemRawJSONDataType[];
  properties?: IPropertyDefinitionRawJSONDataType[];
}

// Now we execute this code asynchronously
(async () => {
  try {
    const rawDataConfig = JSON.parse(
      await fsAsync.readFile("./config.json", "utf8"),
    );
    await buildData(rawDataConfig.entry);
    await buildConfig(rawDataConfig);
    await buildHTML(rawDataConfig);
  } catch (err) {
    if (err instanceof CheckUpError) {
      err.display();
    }
    console.log(err.stack);
  }
})();

async function buildHTML(rawConfig: any) {
  if (!await checkExists("./dist/data")) {
    await fsAsync.mkdir("./dist/data");
  }

  let baseHTML = await fsAsync.readFile("./core/client/index.html", "utf8");
  Object.keys(rawConfig).forEach((key) => {
    baseHTML = baseHTML.replace(
      new RegExp(escapeStringRegexp("%{" + key + "}"), "g"),
      rawConfig[key],
    );
  });

  baseHTML = baseHTML.replace(
    new RegExp(escapeStringRegexp("%{BUILD_NUMBER}"), "g"),
    (new Date()).getTime().toString(),
  );

  const fileName = "./dist/data/index.html";
  console.log("emiting " + colors.green(fileName));
  await fsAsync.writeFile(fileName, baseHTML);
}

async function buildConfig(rawConfig: any) {
  const fileName = "./dist/config.json";
  console.log("emiting " + colors.green(fileName));
  await fsAsync.writeFile(fileName, JSON.stringify(rawConfig));
}

async function buildData(entry: string) {
  const entryPoint = "./data/" + entry;

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
  const supportedLanguages = fileData.data.lang;

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
  const resultBuilds = supportedLanguages.map((lang) => {
    return processRoot(resultJSON, lang);
  });

  if (!await checkExists("./dist")) {
    await fsAsync.mkdir("./dist");
  }

  if (!await checkExists("./dist/data")) {
    await fsAsync.mkdir("./dist/data");
  }

  console.log("emiting " + colors.green("./dist/data/lang.json"));
  await fsAsync.writeFile(
    "./dist/data/lang.json",
    JSON.stringify(await buildLang(
      supportedLanguages,
      actualLocation,
      traceback.newTraceToBit("lang"),
    )),
  );

  const rootTest = new Root(resultJSON);
  rootTest.getAllModules();

  const allFileName = "./dist/data/build.all.json";
  console.log("emiting " + colors.green(allFileName));
  await fsAsync.writeFile(
    allFileName,
    JSON.stringify(processRoot(resultJSON)),
  );

  await Promise.all(resultBuilds.map((rb, index) => {
    const fileName = `./dist/data/build.${supportedLanguages[index]}.json`;
    console.log("emiting " + colors.green(fileName));
    return fsAsync.writeFile(
      fileName,
      JSON.stringify(rb),
    );
  }));

  const graphql: string = buildGraphQLSchema(resultJSON);
  const gqlFileName = "./dist/data/build.gql";
  console.log("emiting " + colors.green(gqlFileName));
  await fsAsync.writeFile(
    gqlFileName,
    graphql,
  );
}

/**
 * Build the core language data that holds information
 * about the language itself and other localizables
 * @param supportedLanguages the array of supported languages
 * @param actualRootLocation the root location that sets these languages
 * @param traceback the traceback in the location
 */
async function buildLang(
  supportedLanguages: string[],
  actualRootLocation: string,
  traceback: Traceback,
) {
  const languageFileLocation = actualRootLocation
    .replace(".json", ".properties");

  await checkExists(
    languageFileLocation,
    traceback,
  );

  const properties = PropertiesReader(languageFileLocation).path();
  const result: {
    locales: {
      [key: string]: {
        [data: string]: string,
      },
    },
  } = {
    locales: {},
  };

  // and start to loop
  supportedLanguages.forEach((locale, index) => {
    const internalTraceback = traceback.newTraceToBit(index);

    if (!properties[locale]) {
      throw new CheckUpError(
        "File does not include language data for '" + locale + "'",
        internalTraceback,
      );
    }

    result.locales[locale] = {};

    LOCALE_I18N.forEach((property) => {
      if (!properties[locale][property]) {
        throw new CheckUpError(
          "File does not include data for '" + locale + "' in '" + property + "'",
          internalTraceback,
        );
      }

      result.locales[locale][property] = properties[locale][property];
    });
  });

  return result;
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
  const i18nName = await getI18nName(
    supportedLanguages,
    actualLocation,
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
          return getI18nData(
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
    i18nName,
    location: actualLocation,
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

  const i18nName = await getI18nName(
    supportedLanguages,
    actualLocation,
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
    i18nName,
    name: actualName,
    location: actualLocation,
    pointers,
    raw,
    includes: fileData.includes,
    properties: fileData.properties,
    type: fileData.type,
    allowCalloutExcludes: fileData.allowCalloutExcludes,
  };

  if (!finalValue.allowCalloutExcludes) {
    delete finalValue.allowCalloutExcludes;
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
        return getI18nData(
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
      // so we first check whether the item is a non group type
      if (item.name) {
        // let's check in the imported definitions
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

      } else if (item.items) {
        // if it's a group lets create a group traceback for the items
        // property
        const itemGroupTraceback = iTraceback.newTraceToBit("items");
        // and run a promise looping in each item
        await Promise.all(
          item.items.map((internalItem, index) => {
            return fnCheckExists(
              internalItem,
              itemGroupTraceback.newTraceToBit(index),
            );
          }),
        );
      }
    };

    const tracebackIncludes = traceback.newTraceToBit("includes");
    await Promise.all(
      finalValue.includes.map((item, index) => {
        return fnCheckExists(item, tracebackIncludes.newTraceToBit(index));
      }),
    );

    finalValue.includes = await Promise.all<IItemRawJSONDataType>
      (finalValue.includes.map((item, index) => {
        return buildItemI18nName(
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
 * @param actualLocation the location of the item we are working on
 * @returns the right structure for a i18nName attribute
 */
async function getI18nName(
  supportedLanguages: string[],
  actualLocation: string,
  traceback: Traceback,
) {
  const languageFileLocation =
    actualLocation.replace(".json", ".properties");

  await checkExists(
    languageFileLocation,
    traceback,
  );

  const properties = PropertiesReader(languageFileLocation).path();
  const i18nName: {
    [locale: string]: string,
  } = {};

  const localeFileTraceback =
    traceback.newTraceToLocation(languageFileLocation);

  supportedLanguages.forEach((locale) => {
    if (!properties[locale]) {
      throw new CheckUpError(
        "File does not include language data for locale " + locale,
        localeFileTraceback,
      );
    } else if (typeof properties[locale].name !== "string") {
      throw new CheckUpError(
        "File does not have a name for " + locale,
        localeFileTraceback,
      );
    }
    i18nName[locale] = properties[locale].name.trim();
  });

  return i18nName;
}

/**
 * Process an item group or item specific id to give
 * it specific item name for i18n data, this function is destructive
 * @param supportedLanguages the array of supported languages
 * @param actualLocation the location that the item is being worked on
 * @param item the item itself
 * @returns the item modified
 */
async function buildItemI18nName(
  supportedLanguages: string[],
  actualLocation: string,
  item: IItemRawJSONDataType,
  traceback: Traceback,
) {
  // we try to see if there are child items
  if (item.items) {
    const itemGroupTraceback = traceback.newTraceToBit("items");
    // we process those too, recursively
    item.items = await Promise.all<IItemRawJSONDataType>
      (item.items.map((internalItem, index) => {
        return buildItemI18nName(
          supportedLanguages,
          actualLocation,
          internalItem,
          itemGroupTraceback.newTraceToBit(index),
        );
      }));
  }

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
  const i18nName: {
    [locale: string]: string,
  } = {};

  const localeFileTraceback =
    traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);

  const isGroup = !!item.items;

  // Whether we found the language data for a locale
  let foundLanguageData = false;

  // use the same technique we used before to get the name
  supportedLanguages.forEach((locale) => {
    if (!properties[locale]) {
      // Groups are required to have language data
      // also if we found language data for another locale
      if (isGroup || foundLanguageData) {
        throw new CheckUpError(
          "File does not include language data for " + locale,
          localeFileTraceback,
        );
      }
      return;
    } else if (!properties[locale].item) {
      if (isGroup || foundLanguageData) {
        throw new CheckUpError(
          "File does not have item data for " + locale,
          localeFileTraceback,
        );
      }
      return;
    } else if (typeof properties[locale].item[item.id] !== "string") {
      if (isGroup || foundLanguageData) {
        throw new CheckUpError(
          "File does not have item data for " + locale + " in " + item.id,
          localeFileTraceback,
        );
      }
      return;
    }
    foundLanguageData = true;
    i18nName[locale] = properties[locale].item[item.id].trim();
  });

  // set it and return the item itself
  item.i18nName = i18nName;
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
async function getI18nData(
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

  const localeFileTraceback =
    traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);

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

    // We got to create this list for required and non required data
    const propertyData = properties[locale].properties[property.id];
    let expectedProperties = definition.i18n.base
      .map((b) => ({key: b, required: true}))
      // concat to optional properties
      .concat((definition.i18n.optional || [])
        .map((b) => ({key: b, required: false})))
      // concat to search range properties only if necessary
      .concat((property.disableRangedSearch || property.searchLevel === "disabled" ?
          [] : definition.i18n.searchRange || [])
        .map((b) => ({key: b, required: true})))
      .concat((property.disableRangedSearch || property.searchLevel === "disabled" ?
          [] : definition.i18n.searchRangeOptional || [])
        .map((b) => ({key: b, required: false})))
      // concat to search properties only if necessary
      .concat((property.searchLevel === "disabled" ?
          [] : definition.i18n.searchBase || [])
        .map((b) => ({key: b, required: true})))
      .concat((property.searchLevel === "disabled" ?
          [] : definition.i18n.searchOptional || [])
        .map((b) => ({key: b, required: false})))
      // while we could make a rule for LOCATION_DISTANCE here
      // there's a check at startup that guarantees that distance
      // is only required if the type supports distance
      .concat((definition.i18n.distance || [])
        .map((b) => ({key: b, required: true})))
      // request for the values if supported
      .concat((property.values || [])
        .map((b) => ({key: "values." + b.toString().replace(/\./g, "_dot_").replace("/\s/g", "_"), required: true})))
      .concat((property.values && property.nullable ? ["null_value"] : [])
        .map((b) => ({key: b, required: true})));

    const errorRequiredProperties = [];
    if (!property.nullable && property.type !== "boolean") {
      errorRequiredProperties.push("error.NOT_NULLABLE");
    }

    if ((definition.max || definition.maxLength) &&
      !property.values && !property.autocompleteIsEnforced) {
      errorRequiredProperties.push("error.TOO_LARGE");
    }

    if (typeof property.minLength !== "undefined" &&
      !property.values && !property.autocompleteIsEnforced) {
      errorRequiredProperties.push("error.TOO_SMALL");
    }

    if (definition.maxDecimalCount &&
      !property.values && !property.autocompleteIsEnforced) {
      errorRequiredProperties.push("error.TOO_MANY_DECIMALS");
    }

    expectedProperties = expectedProperties.concat(errorRequiredProperties
      .map((b) => ({key: b, required: true})));

    // start initializing the data in the property itself
    i18nData[locale] = {};

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
          whereToSet[keyValue] = result;
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
