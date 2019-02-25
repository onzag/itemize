import PropertyDefinition, {
  PropertyDefinitionRawJSONDataType,
  PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD,
  PropertyDefinitionRawJSONRuleDataType,
  PropertyDefinitionSupportedType
} from
  './base/ItemDefinition/PropertyDefinition';
import { ItemRawJSONDataType } from './base/ItemDefinition/Item';
import Module, { ModuleRawJSONDataType } from './base/Module';
import ItemDefinition, {
  ItemDefinitionRawJSONDataType
} from './base/ItemDefinition';
import Root, { RootRawJSONDataType } from './base/Root';
import { CheckUpError, Traceback } from './Error';
import {
  ConditionalRuleSetRawJSONDataType,
  ConditionalRuleSetRawJSONDataComponentType,
  ConditionalRuleSetRawJSONDataPropertyType
} from './base/ItemDefinition/ConditionalRuleSet';
import {
  PropertiesValueMappingDefinitonRawJSONDataType,
  PropertiesValueMappingReferredPropertyValue
} from './base/ItemDefinition/PropertiesValueMappingDefiniton';

import * as fs from 'fs';
import * as path from 'path';
import * as PropertiesReader from 'properties-reader';
import * as Ajv from 'ajv';
const jsonMap = require('json-source-map');

const ajv = new Ajv();
const fsAsync = fs.promises;

//registering source maps, this one is useful for
//debugging and since the builder is a development file
//it's ok this is here
import 'source-map-support/register'

if (process.env.NODE_ENV === "production") {
  throw new Error("This script cannot run in production mode");
}

//This is the raw untreated json for the root
interface FileRootDataRawUntreatedJSONDataType {
  type: "root",
  includes: Array<string>,
  lang: Array<string>,
  i18n: string
}

//this is the raw untreated json for the module
interface FileModuleDataRawUntreatedJSONDataType {
  type: "module",
  includes: Array<string>
}

//and this is the raw untreated json for an item
export interface FileItemDefinitionUntreatedRawJSONDataType {
  type: "item",
  allowCalloutExcludes?: boolean,
  imports?: Array<string>,
  includes?: Array<ItemRawJSONDataType>,
  properties?: Array<PropertyDefinitionRawJSONDataType>,
}

/**
 * Checks whether a file exists and throws an error if it doesn't
 * and it's specified to throw an error or otherwise returns false
 * @param  location                        the location
 * @param  locationOfElementBeingProcessed
 * @param  throwErr
 * @return
 */
async function checkExists(
  location: string,
  traceback?: Traceback
) {
  let exists = true;
  try {
    await fsAsync.access(location, fs.constants.F_OK);
  } catch (e){
    exists = false;
  }
  if (traceback && !exists){
    throw new CheckUpError("Required file " +
      location + " does not exist", traceback);
  }
  return exists;
}

async function checkIsDirectory(
  location: string,
  traceback: Traceback
){
  checkExists(location, traceback);
  const stat = await fsAsync.lstat(location);
  return stat.isDirectory();
}

async function getActualFileLocation(
  location: string,
  traceback: Traceback
) {
  let actualFileLocation = location;
  let exists = await checkExists(
    location,
    traceback
  );
  if (exists){
    let isDirectory = await checkIsDirectory(location,
      traceback);
    if (isDirectory){
      actualFileLocation = path.join(location, "index.json");
    } else if (!location.endsWith(".json")){
      actualFileLocation += ".json";
    }
  } else if (!location.endsWith(".json")){
    actualFileLocation += ".json";
  }

  await checkExists(
    actualFileLocation,
    traceback
  );

  return actualFileLocation;
}

async function getActualFileIdentifier(location:string){
  //we split the location in its components
  let locationSplitted = location.replace(".json","").split(path.sep);
  //let's get the name of the file
  let name:string = locationSplitted.pop();
  //and we need the actual real name for the item
  //by default is the name of the file
  //however index isn't an acceptable name, because
  //it means its just a container for the parent folder
  if (name === "index"){
    //so we use the name of the parent folder
    name = locationSplitted.pop();
  }

  return name;
}

const checkRootSchemaValidate =
  ajv.compile(Root.schema);
const checkItemDefinitionSchemaValidate =
  ajv.compile(ItemDefinition.schema);
const checkPropertyDefinitionSchemaValidate =
  ajv.getSchema("PropertyDefinition");
const checkModuleSchemaValidate =
  ajv.compile(Module.schema);
function ajvCheck(
  fn: Ajv.ValidateFunction,
  rawData: any,
  traceback: Traceback
){
  let valid = fn(rawData);

  //if not valid throw the errors
  if (!valid) {
    //TODO add data from the error to the traceback
    let firstError = fn.errors[0];
    let actualTraceback = traceback;
    if (firstError.dataPath){
      let splittedPath = firstError.dataPath
        .replace(/(\.|\])/g, '').split('[');
      let pathLocation:string;
      for (pathLocation of splittedPath){
        if ((/^[a-zA-Z0-9_-]+$/).test(pathLocation)){
          actualTraceback = actualTraceback.newTraceToBit(pathLocation);
        }
      }
    }
    throw new CheckUpError(
      "Schema check fail, " + firstError.message,
      actualTraceback
    );
  };
}

//Now we execute this code asynchronously
(async() => {
  try {
    //lets get the actual location of the item, lets assume first
    //it is the given location
    let actualLocation = await getActualFileLocation(
      process.argv[2],
      new Traceback("BUILDER")
    );

    //lets create the traceback for this file
    let traceback = new Traceback(actualLocation);

    //lets read the file, let it fail if it fails
    let fileContent = await fsAsync.readFile(actualLocation, 'utf8');

    //lets get the file data
    let fileData:{
      data: FileRootDataRawUntreatedJSONDataType,
      pointers: any
    };
    try {
      fileData = jsonMap.parse(fileContent);
    } catch (err){
      throw new CheckUpError(
        err.message,
        traceback
      );
    }

    //Setup the pointers for the pointer data
    //to be able to trace to bit
    //ajv checks require pointers for diving in
    //the invalid properties
    traceback.setupPointers(
      fileData.pointers,
      fileContent
    );

    //it all should start in the root element
    ajvCheck(
      checkRootSchemaValidate,
      fileData.data,
      traceback
    );

    //lets get the supported languages
    let supportedLanguages = fileData.data.lang;

    //and make the result JSON
    let resultJSON:RootRawJSONDataType = {
      type: "root",
      location: actualLocation,
      pointers: fileData.pointers,
      children: <Array<ModuleRawJSONDataType>>(await processIncludes(
        supportedLanguages,
        path.dirname(actualLocation),
        path.dirname(actualLocation),
        fileData.data.includes,
        false,
        true,
        traceback.newTraceToBit("includes")
      ))
    };

    //TODO enable this
    //checkRoot(resultJSON);

    //TODO enable this
    //Do this just in case
    //let rootTest = new Root(resultJSON);
    //rootTest.getAllModules(()=>{});

    console.log(JSON.stringify(resultJSON, null, 2));
  } catch (err){
    if (err instanceof CheckUpError){
      err.display();
    }
    console.log(err.stack);
  }
})();

/**
 * this processes all the included files
 * whether modules or items
 * @param  supportedLanguages           an array with things like EN, ES, etc...
 * @param  parentFolder                 the parent folder of whether we got to
 *                                      check for these includes
 * @param  includes                     the includes string name list
 * @param  childrenMustBeItemDefinition throws an error if children are module
 * @param  childrenMustBeModule         throws an error if children is item def
 * @return                              an array with raw modules and items
 */
async function processIncludes(
  supportedLanguages:string[],
  parentFolder: string,
  lastModuleDirectory: string,
  includes: string[],
  childrenMustBeItemDefinition: boolean,
  childrenMustBeModule: boolean,
  traceback: Traceback
):Promise<Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType>> {
  //this will be the resulting array, either modules or items
  //in the case of items, it can only have items as children
  let result:Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType> = [];

  //to loop
  let include:string;
  let includeIndex = -1;

  //so we loop over the includes
  for (include of includes){
    includeIndex++;

    let specificIncludeTraceback = traceback.newTraceToBit(includeIndex);

    //so the actual location is the parent folder and the include name
    let actualLocation = await getActualFileLocation(
      path.join(parentFolder, include),
      specificIncludeTraceback
    );

    let externalSpecificIncludeTraceback =
      traceback.newTraceToLocation(actualLocation);

    //now the file content is read
    let fileContent = await fsAsync.readFile(actualLocation, 'utf8');
    //and the data parsed
    let fileData:{
      data: FileModuleDataRawUntreatedJSONDataType |
        FileItemDefinitionUntreatedRawJSONDataType,
      pointers: any
    };

    try {
      fileData = jsonMap.parse(fileContent);
    } catch (err){
      throw new CheckUpError(
        err.message,
        externalSpecificIncludeTraceback
      );
    }

    externalSpecificIncludeTraceback.setupPointers(
      fileData.pointers,
      fileContent
    );

    //now we check the type to see whether we got a module or a item
    if (fileData.data.type === "module"){
      if (childrenMustBeItemDefinition){
        throw new CheckUpError(
          "Module found as children of item definition",
          externalSpecificIncludeTraceback
        )
      }

      //we would process a module
      result.push(await processModule(
        supportedLanguages,
        actualLocation,
        fileData.data,
        fileData.pointers,
        fileContent,
        externalSpecificIncludeTraceback
      ));
    } else if (fileData.data.type === "item"){
      if (childrenMustBeModule){
        throw new CheckUpError(
          "Item definition as children of root definition",
          externalSpecificIncludeTraceback
        )
      }
      //we would process an item
      result.push(await processItemDefinition(
        supportedLanguages,
        actualLocation,
        lastModuleDirectory,
        fileData.data,
        fileData.pointers,
        fileContent,
        externalSpecificIncludeTraceback
      ));
    } else if ((fileData as any).type === "root"){
      throw new CheckUpError(
        "Root found as children",
        externalSpecificIncludeTraceback
      )
    }
  }

  //return the result
  return result;
}

/**
 * Processes a module
 * @param  supportedLanguages supported languages
 * @param  actualLocation     the location of the file  we are working on
 *                            for the module
 * @param  fileData           the data that file contains
 * @return                    a raw module
 */
async function processModule(
  supportedLanguages:string[],
  actualLocation: string,
  fileData: FileModuleDataRawUntreatedJSONDataType,
  pointers: any,
  raw: string,
  traceback: Traceback
){
  ajvCheck(checkModuleSchemaValidate, fileData, traceback);

  let actualName = await getActualFileIdentifier(actualLocation);
  let i18nName = await getI18nName(
    supportedLanguages,
    actualLocation,
    traceback
  );

  //lets find prop extensions if they are available
  let propExtLocation =
    actualLocation.replace(".json", ".propext.json");

  //let's check if the file exists
  let propExtExists = await checkExists(
    propExtLocation
  );

  //propextensions is declared
  let propExtensions:Array<PropertyDefinitionRawJSONDataType>;
  let propExtRaw:string;
  let propExtPointers:any;
  if (propExtExists){
    //they are set if the file exists
    let propExtTraceback = traceback.newTraceToLocation(propExtLocation);
    let fileData:{
      data: Array<PropertyDefinitionRawJSONDataType>,
      pointers: any
    };
    propExtRaw = await fsAsync.readFile(propExtLocation, 'utf8');
    try {
      fileData = jsonMap.parse(propExtRaw);
    } catch (err){
      throw new CheckUpError(err.message, propExtTraceback);
    }

    propExtTraceback.setupPointers(
      fileData.pointers,
      propExtRaw
    );

    propExtPointers = fileData.pointers;

    propExtensions =
      await Promise.all<PropertyDefinitionRawJSONDataType>(
        fileData.data.map((pd, index)=>{
          let specificPropertyTraceback =
            propExtTraceback.newTraceToBit(index);
          ajvCheck(checkPropertyDefinitionSchemaValidate,
            pd, specificPropertyTraceback);
          return getI18nData(
            supportedLanguages,
            actualLocation,
            pd,
            specificPropertyTraceback
          );
        })
      );
  }

  //and the final value is created
  let actualLocationDirectory = path.dirname(actualLocation);
  let finalValue:ModuleRawJSONDataType = {
    type: "module",
    name: actualName,
    i18nName,
    location: actualLocation,
    pointers,
    raw,
    children: await processIncludes(
      supportedLanguages,
      actualLocationDirectory,
      actualLocationDirectory,
      fileData.includes,
      false,
      false,
      traceback.newTraceToBit("includes")
    )
  };

  //we add the propExtensions if necessary
  if (propExtensions){
    finalValue.propExtensions = propExtensions;
    finalValue.propExtRaw = propExtRaw;
    finalValue.propExtPointers = propExtPointers;
    finalValue.propExtLocation = propExtLocation;
  }

  //and return the final value
  return finalValue;
}

/**
 * Processes an item
 * @param  supportedLanguages  supported languages
 * @param  actualLocation      the location path for the item
 * @param  lastModuleDirectory the last module directory
 * @param  fileData            the file data raw and untreated
 * @return                     a raw treated item
 */
async function processItemDefinition(
  supportedLanguages:string[],
  actualLocation: string,
  lastModuleDirectory: string,
  fileData: FileItemDefinitionUntreatedRawJSONDataType,
  pointers: any,
  raw: string,
  traceback: Traceback
){
  ajvCheck(checkItemDefinitionSchemaValidate, fileData, traceback);

  let actualName = await getActualFileIdentifier(actualLocation);
  let i18nName = await getI18nName(
    supportedLanguages,
    actualLocation,
    traceback
  );

  //lets get the file definitions that are imported that exist
  await Promise.all(
    (fileData.imports || []).map((imp, index)=>{
      return getActualFileLocation(
         path.join(lastModuleDirectory, imp),
         traceback.newTraceToBit("imports").newTraceToBit(index)
      );
    })
  );

  //lets get the file definitions that are imported
  //as an array for use by the browser
  let importedChildDefinitions =
    ((<FileItemDefinitionUntreatedRawJSONDataType>
      fileData).imports || []).map(l=>l.split("/"));

  //and now lets build the child definitions that are included within
  let childDefinitions:Array<ItemDefinitionRawJSONDataType> = [];
  //if the name is index there might be child definitions in the same
  //folder, either files or folders themselves, an item might be made of
  //several smaller sub items
  if (path.basename(actualLocation) === "index.json"){
    childDefinitions = <Array<ItemDefinitionRawJSONDataType>>
      (await processIncludes(
        supportedLanguages,
        path.dirname(actualLocation),
        lastModuleDirectory,
        (await fsAsync.readdir(path.dirname(actualLocation))).filter(i=>{
          return i !== "index.json" && !i.endsWith(".propext.json") &&
            !i.endsWith(".properties")
          }).map((f)=>f.replace(".json","")),
        true,
        false,
        traceback
      ));
  }

  let finalValue:ItemDefinitionRawJSONDataType = {
    i18nName,
    name: actualName,
    location: actualLocation,
    pointers,
    raw,
    ...fileData
  };

  if (!finalValue.allowCalloutExcludes){
    delete finalValue["allowCalloutExcludes"];
  }

  if (!finalValue.includes ||
    (finalValue.includes instanceof Array && !finalValue.includes.length)){
    delete finalValue["includes"];
  }

  if (!finalValue.properties ||
    (finalValue.properties instanceof Array && !finalValue.properties.length)){
    delete finalValue["properties"];
  }

  delete finalValue["imports"];
  if (importedChildDefinitions.length){
    finalValue.importedChildDefinitions = importedChildDefinitions;
  }

  if (childDefinitions.length){
    finalValue.childDefinitions = childDefinitions;
  }

  if (finalValue.properties){
    let propertiesTraceback = traceback.newTraceToBit("properties");
    finalValue.properties = await Promise.all<PropertyDefinitionRawJSONDataType>
      (finalValue.properties.map((pd, index)=>{
        let specificPropertyTraceback =
          propertiesTraceback.newTraceToBit(index);
        return getI18nData(
          supportedLanguages,
          actualLocation,
          pd,
          specificPropertyTraceback
        );
      }));
  }

  if (finalValue.includes){
    let fnCheckExists = async (
      item: ItemRawJSONDataType,
      iTraceback: Traceback
    )=>{
      //so we first check whether the item is a non group type
      if (item.name){
        //let's check in the imported definitions
        if (importedChildDefinitions){
          //if we find such imported definition
          if (importedChildDefinitions.find(idef=>{
            let lastName = idef[idef.length - 1];
            return (lastName === item.name ||
              idef.join("/") === item.name);
          })){
            //we return and assume it is valid
            return;
          }
        }
        //otherwise if we don't find any and we know for sure
        //it is meant to be an imported definition
        if (item.name.indexOf("/") !== -1){
          throw new CheckUpError(
            "Missing imported item definition for " + item,
            iTraceback.newTraceToBit("name")
          );
        }
        //Otherwise we try to get the actual location
        //it will throw an error otherwise
        await getActualFileLocation(
          path.join(path.dirname(actualLocation), item.name),
          iTraceback.newTraceToBit("name")
        );
      } else if (item.items){
        //if it's a group lets create a group traceback for the items
        //property
        let itemGroupTraceback = iTraceback.newTraceToBit("items");
        //and run a promise looping in each item
        await Promise.all(
          item.items.map((item, index)=>{
            return fnCheckExists(item, itemGroupTraceback.newTraceToBit(index));
          })
        )
      }
    }

    let tracebackIncludes = traceback.newTraceToBit("includes");
    await Promise.all(
      finalValue.includes.map((item, index)=>{
        return fnCheckExists(item, tracebackIncludes.newTraceToBit(index));
      })
    )

    finalValue.includes = await Promise.all<ItemRawJSONDataType>
      (finalValue.includes.map(
        processItemI18nName.bind(null, supportedLanguages, actualLocation)
      ));
  }

  return finalValue;
}

/**
 * Provides the i18name as given by the language file
 * @param  supportedLanguages the supported languages we expect
 * @param  actualLocation     the location of the item we are working on
 * @return                    the right structure for a i18nName attribute
 */
async function getI18nName(
  supportedLanguages:Array<string>,
  actualLocation: string,
  traceback: Traceback
){
  let languageFileLocation =
    actualLocation.replace(".json", ".properties");

  await checkExists(
    languageFileLocation,
    traceback
  );

  let properties = PropertiesReader(languageFileLocation).path();
  let i18nName:{
    [locale: string]: string
  } = {};

  let localeFileTraceback =
    traceback.newTraceToLocation(languageFileLocation);

  supportedLanguages.forEach(locale=>{
    if (!properties[locale]){
      throw new CheckUpError(
        "File does not include language data for locale " + locale,
        localeFileTraceback
      );
    } else if (typeof properties[locale].name !== "string"){
      throw new CheckUpError(
        "File does not have a name for " + locale,
        localeFileTraceback
      );
    }
    i18nName[locale] = properties[locale].name.trim();
  });

  return i18nName;
}

/**
 * Process an item group or item specific id to give
 * it specific item name for i18n data, this function is destructive
 * @param  supportedLanguages the array of supported languages
 * @param  actualLocation     the location that the item is being worked on
 * @param  item               the item itself
 * @return                    the item modified
 */
async function processItemI18nName(
  supportedLanguages:Array<string>,
  actualLocation: string,
  item: ItemRawJSONDataType,
  traceback: Traceback
){
  //we try to see if there are child items
  if (item.items){
    let itemGroupTraceback = traceback.newTraceToBit("items");
    //we process those too, recursively
    item.items = await Promise.all<ItemRawJSONDataType>
      (item.items.map((item, index)=>{
        return processItemI18nName(
          supportedLanguages,
          actualLocation,
          item,
          itemGroupTraceback.newTraceToBit(index)
        )
      }));
  }
  //if there's no id this is over
  if (!item.id){
    return item;
  }

  //get the language location
  let languageFileLocation =
    actualLocation.replace(".json", ".properties");

  //check that it exists
  await checkExists(
    languageFileLocation,
    traceback
  );

  //get the properties
  let properties = PropertiesReader(languageFileLocation).path();
  let i18nName:{
    [locale: string]: string
  } = {};

  let localeFileTraceback =
    traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);

  //use the same technique we used before to get the name
  supportedLanguages.forEach(locale=>{
    if (!properties[locale]){
      throw new CheckUpError(
        "File does not include language data for " + locale,
        localeFileTraceback
      );
    } else if (!properties[locale].item){
      throw new CheckUpError(
        "File does not have item data for " + locale,
        localeFileTraceback
      );
    } else if (typeof properties[locale].item[item.id] !== "string"){
      throw new CheckUpError(
        "File does not have item data for " + locale + " in " + item.id,
        localeFileTraceback
      );
    }
    i18nName[locale] = properties[locale].item[item.id].trim();
  });

  //set it and return the item itself
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
 * @return                    the property itself
 */
async function getI18nData(
  supportedLanguages:Array<string>,
  actualLocation: string,
  property: PropertyDefinitionRawJSONDataType,
  traceback: Traceback
){
  //if it's hidden and you don't search for it then
  //it is pointless to request the data
  if (property.hidden && property.searchLevel === "disabled"){
    return property;
  }

  //lets get the language location by using the property location
  let languageFileLocation =
    actualLocation.replace(".json", ".properties");

  //check that the file exists
  //throws an error if otherwise
  await checkExists(
    languageFileLocation,
    traceback
  );

  let i18nData:{
    [locale: string]: any
  } = {};

  //get the properties and the definition
  let properties = PropertiesReader(languageFileLocation).path();
  let definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD[property.type];

  let localeFileTraceback =
    traceback.newTraceToBit("id").newTraceToLocation(languageFileLocation);

  //and start to loop
  supportedLanguages.forEach(locale=>{
    //do some checks
    if (!properties[locale]){
      throw new CheckUpError(
        "File does not include language data for " + locale,
        localeFileTraceback
      );
    } else if (!properties[locale].properties){
      throw new CheckUpError(
        "File does not include property data for " + locale,
        localeFileTraceback
      );
    } if (!properties[locale].properties[property.id]){
      throw new CheckUpError(
        "Does not include property data for " + locale + " in " + property.id,
        localeFileTraceback
      );
    }

    //We got to create this list for required and non required data
    let propertyData = properties[locale].properties[property.id];
    let expectedProperties = definition.i18n.base
      .map(b=>({key: b, required: true}))
      .concat((definition.i18n.optional || [])
        .map(b=>({key: b, required: false})))
      .concat((definition.i18n.range || [])
        .map(b=>({key: b, required: true})))
      .concat((definition.i18n.rangeOptional || [])
        .map(b=>({key: b, required: false})))
      .concat((definition.i18n.searchBase || [])
        .map(b=>({key: b, required: true})))
      .concat((definition.i18n.searchOptional || [])
        .map(b=>({key: b, required: false})))
      .concat((definition.i18n.distance || [])
        .map(b=>({key: b, required: true})))
      .concat((property.values|| [])
        .map(b=>({key: "values." + b, required: true})));

    //start initializing the data in the property itself
    i18nData[locale] = {};

    //run the expected properties and start running them
    expectedProperties.forEach(expectedProperty=>{
      //split the names
      let splitted = expectedProperty.key.split(".");
      let result = propertyData;
      let propKey:string;
      //try to find it
      for (propKey of splitted){
        result = result[propKey];
        if (!result){
          break;
        }
      }
      //if we don't find it and it's not required not a big deal
      if (!result && !expectedProperty.required){
        return;
      } else if (!result && expectedProperty.required){
        //otherwise we throw an error
        throw new CheckUpError("File " + languageFileLocation +
          " has missing property data for property id '" + property.id +
          "' in '" + expectedProperty.key + "' required by type '" +
          property.type + "' in locale " + locale, localeFileTraceback);
      } else if (typeof result !== "string"){
        //also throw an error if it's invalid
        throw new CheckUpError("File " + languageFileLocation +
          " has invalid property data for property id '" + property.id +
          "' in '" + expectedProperty.key + "' required by type '" +
          property.type + "' in locale " + locale, localeFileTraceback);
      }

      //now we search where the property has to be set
      let whereToSet = i18nData[locale];
      //by looping on the splitted value
      splitted.forEach((keyValue, index)=>{
        //on the last one we set it as the value
        if (index === splitted.length - 1){
          whereToSet[keyValue] = result;
          return;
        }

        //otherwise we try to get deeper
        whereToSet[keyValue] = whereToSet[keyValue] || {};
        whereToSet = whereToSet[keyValue];
      });
    });
  });

  property.i18nData = i18nData;

  //return the property
  return property;
}

function checkConditionalRuleSet(
  rawData: ConditionalRuleSetRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType,
){
  //Let's try to search for the item definition for that given component
  //should be there at least to be valid, even if item instances are never
  //created
  let component =
    (<ConditionalRuleSetRawJSONDataComponentType>rawData).component;
  if (component &&
    !ItemDefinition.getItemDefinitionRawFor(
      parentItemDefinition,
      parentModule,
      component
    )){
    throw new CheckUpError(
      "Conditional rule set item definition not available",
      parentItemDefinition.location,
      {component},
      rawData
    );
  }

  //Let's check the property
  let rawDataAsProperty =
    (<ConditionalRuleSetRawJSONDataPropertyType>rawData);
  if (rawDataAsProperty.property){
    let propDef = ItemDefinition.getPropertyDefinitionRawFor(
      parentItemDefinition,
      parentModule,
      rawDataAsProperty.property
    );
    if (!propDef){
      throw new CheckUpError(
        "Conditional rule set property not available",
        parentItemDefinition.location,
        {property: rawDataAsProperty.property},
        rawData
      );
    } else if (!PropertyDefinition.isValidValue(
      propDef,
      rawDataAsProperty.value,
      true
    )) {
      throw new CheckUpError(
        "Conditional rule set value invalid",
        parentItemDefinition.location,
        {value: rawDataAsProperty.value},
        rawData
      );
    }
  }
}

function checkItemDefinition(
  rawData: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){
  rawData.childDefinitions && rawData
    .childDefinitions.forEach(cd=>checkItemDefinition(cd, parentModule));

  rawData.includes &&
    rawData.includes.forEach(itm=>checkItem(itm, rawData, parentModule));

  rawData.properties &&
    rawData.properties
      .forEach(p=>checkPropertyDefinition(p, rawData, parentModule))
}

function checkItem(
  rawData: ItemRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){
  let isGroup = !!rawData.items;

  //check whether the item definition exists for this item
  //it must exist to be an item
  if (!isGroup && !ItemDefinition.getItemDefinitionRawFor(
    parentItemDefinition, parentModule, rawData.name)){
    throw new CheckUpError(
      "Missing item definition",
      parentItemDefinition.location,
      {name: rawData.name},
      rawData
    );
  }

  if (isGroup){
    rawData.items.forEach(itm=>
      checkItem(itm, parentItemDefinition, parentModule))
  }

  if (isGroup && rawData.predefinedProperties){
    throw new CheckUpError(
      "Cannot set predefinedProperties and be a group",
      parentItemDefinition.location,
      {predefinedProperties: rawData.predefinedProperties},
      rawData
    );
  }

  if (isGroup && rawData.enforcedProperties){
    throw new CheckUpError(
      "Cannot set enforcedProperties and be a group",
      parentItemDefinition.location,
      {enforcedProperties: rawData.enforcedProperties},
      rawData
    );
  }

  if (isGroup && rawData.sinkIn){
    throw new CheckUpError(
      "Cannot set sinkIn and be a group",
      parentItemDefinition.location,
      {sinkIn: rawData.sinkIn},
      rawData
    );
  }

  //get all the predefined properties or an empty array
  let predefinedPropertiesKeys = rawData.predefinedProperties ?
    Object.keys(rawData.predefinedProperties) : [];

  //The same for the enforced
  let enforcedPropertiesKeys = rawData.enforcedProperties ?
    Object.keys(rawData.enforcedProperties) : [];

  //we don't need to check whether this properties exist in
  //the item definition because PropertiesValueMappingDefiniton does that

  //see if there are shared between both arrays
  let sharedItems = predefinedPropertiesKeys
    .filter(value => -1 !== enforcedPropertiesKeys.indexOf(value));

  //predefined properties and enforced properties must not be shared
  //for the simple reason that enforced properties are set in stone
  if (sharedItems.length){
    throw new CheckUpError(
      "predefined and enforced properties collision",
      parentItemDefinition.location,
      sharedItems,
      rawData
    );
  }

  //Now we check again this time against the sinkIn properties
  let sharedItems2 = (rawData.sinkIn || [])
    .filter(value => -1 !== enforcedPropertiesKeys.indexOf(value));

  //equally there might not be a collision here, enforced properties
  //need not to sink in
  if (sharedItems2.length){
    throw new CheckUpError(
      "sink in properties and enforced properties collision",
      parentItemDefinition.location,
      sharedItems2,
      rawData
    );
  }

  let referredItemDefinitionRaw = ItemDefinition.getItemDefinitionRawFor(
    parentItemDefinition, parentModule, rawData.name);

  //Now we check whether this properties exist for sinkin
  if (rawData.sinkIn){
    let propertyToSinkIn:string;
    for (propertyToSinkIn of rawData.sinkIn){
      if (!ItemDefinition
        .getPropertyDefinitionRawFor(
          referredItemDefinitionRaw,
          parentModule,
          propertyToSinkIn
        )
      ){
        throw new CheckUpError(
          "Missing property in item definition",
          parentItemDefinition.location,
          propertyToSinkIn,
          rawData.sinkIn,
          {sinkIn: rawData.sinkIn},
          rawData
        );
      }
    }
  }

  //enforced and predefined properties aren't check here they are check
  //on the value mapper
  ["enforcedProperties", "predefinedProperties"].forEach(p=>{
    if (rawData[p]){
      checkPropertiesValueMappingDefiniton(
        rawData[p],
        rawData,
        parentItemDefinition,
        referredItemDefinitionRaw,
        parentModule
      );
    }
  });

  //Check Conflicting defaultExcluded and defaultExcludedIf
  if (typeof rawData.defaultExcluded !== "undefined" &&
    typeof rawData.defaultExcludedIf !== "undefined"){
    throw new CheckUpError(
      "Conflicting properties defaultExcluded and defaultExcludedIf",
      parentItemDefinition.location,
      rawData
    );
  } else if (rawData.defaultExcludedIf){
    checkConditionalRuleSet(
      rawData.defaultExcludedIf,
      parentItemDefinition,
      parentModule
    );
  }

  //also Conflicting mightExclude and mightExcludeIf
  if (typeof rawData.mightExclude !== "undefined" &&
    typeof rawData.mightExcludeIf !== "undefined"){
    throw new CheckUpError(
      "Conflicting properties mightExclude and mightExcludeIf",
      parentItemDefinition.location,
      rawData
    );
  } else if (rawData.mightExcludeIf){
    checkConditionalRuleSet(
      rawData.mightExcludeIf,
      parentItemDefinition,
      parentModule
    );
  }

  if (rawData.excludedIf){
    checkConditionalRuleSet(
      rawData.excludedIf,
      parentItemDefinition,
      parentModule
    );
  }
}

function checkPropertiesValueMappingDefiniton(
  rawData: PropertiesValueMappingDefinitonRawJSONDataType,
  item: ItemRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  referredItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){
  //We need to loop over the properties that were given
  let propertyList = Object.keys(rawData);
  let propertyId;
  for (propertyId of propertyList){

    //get the value for them
    let propertyValue = rawData[propertyId];

    //and lets check that they actually have such properties
    let propDef =
      ItemDefinition.getPropertyDefinitionRawFor(
        referredItemDefinition,
        parentModule,
        propertyId
      );
    if (!propDef){
      let obj:any = {};
      obj[propertyId] = propertyValue;
      throw new CheckUpError(
        "Property not available in referred itemDefinition",
        parentItemDefinition.location,
        {
          referred: referredItemDefinition,
          message: "Property " + propertyId +
            " not available in referred itemDefinition"
        },
        obj,
        rawData,
        item
      );
    };

    let obj:any = {};
    obj[propertyId] = propertyValue;

    let referredProperty =
      (<PropertiesValueMappingReferredPropertyValue>propertyValue);
    //we must ensure it's not a referred property to do the check
    if (!referredProperty.property){
      //And check whether the value is even valid
      if (!PropertyDefinition.isValidValue(propDef,
        <PropertyDefinitionSupportedType>propertyValue, true)){
        throw new CheckUpError(
          "Property value is invalid in referred itemDefinition",
          parentItemDefinition.location,
          {
            referredProperty: propDef,
            referred: referredItemDefinition,
            message: "Property value " + propertyValue +
              " is invalid in referred itemDefinition"
          },
          propertyValue,
          obj,
          rawData,
          item
        );
      };
    } else {
      //let's get the referred definition this property is about
      let propertyAsValue =
        ItemDefinition.getPropertyDefinitionRawFor(parentItemDefinition,
          parentModule, referredProperty.property);

      //if we don't get any throw an error
      if (!propertyAsValue){
        throw new CheckUpError(
          "Unavailable property as value in mapper",
          parentItemDefinition.location,
          propertyValue,
          obj,
          rawData,
          item
        );
      }

      //If the types don't match throw an error
      if (propertyAsValue.type !== propDef.type){
        throw new CheckUpError(
          "Property definitions in mapper don't match types",
          parentItemDefinition.location,
          {
            referredProperty: propDef,
            propertyAsValue,
            message: "type " + propertyAsValue.type +
              " and " + propDef.type + " don't match"
          },
          propertyValue,
          obj,
          rawData,
          item
        );
      }
    }
  }
}

function checkPropertyDefinition(
  rawData: PropertyDefinitionRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){
  if (rawData.type !== "integer" && rawData.type !== "number" &&
    rawData.type !== "currency" && typeof rawData.min !== "undefined"){
    throw new CheckUpError(
      "Cannot set a min value if type not integer or number",
      parentItemDefinition.location,
      {min: rawData.min},
      rawData
    );
  } else if (rawData.type !== "integer" && rawData.type !== "number" &&
    rawData.type !== "currency" && typeof rawData.max !== "undefined"){
    throw new CheckUpError(
      "Cannot set a max value if type not integer or number",
      parentItemDefinition.location,
      {max: rawData.max},
      rawData
    );
  } else if (rawData.type !== "number" && rawData.type !== "currency" &&
    typeof rawData.maxDecimalCount !== "undefined"){
    throw new CheckUpError(
      "Cannot set a maxDecimalCount value if type not number",
      parentItemDefinition.location,
      {maxDecimalCount: rawData.maxDecimalCount},
      rawData
    );
  } else if (rawData.type !== "string" && rawData.type !== "text" &&
    typeof rawData.minLength !== "undefined"){
    throw new CheckUpError(
      "Cannot set a minLength value if type not text or string",
      parentItemDefinition.location,
      {minLength: rawData.minLength},
      rawData
    );
  } else if (rawData.type !== "string" && rawData.type !== "text" &&
    typeof rawData.maxLength !== "undefined"){
    throw new CheckUpError(
      "Cannot set a maxLength value if type not text or string",
      parentItemDefinition.location,
      {maxLength: rawData.maxLength},
      rawData
    );
  }

  //lets check that all the ones in values are valid
  if (rawData.values){
    let value;
    for (value of rawData.values){
      if (!PropertyDefinition.isValidValue(
        rawData,
        value,
        false
      )){
        throw new CheckUpError(
          "Invalid value for item",
          parentItemDefinition.location,
          value,
          {values: rawData.values},
          rawData
        );
      };
    }
  }

  //Let's check whether the default value is valid too
  if (rawData.default){
    if (!PropertyDefinition.isValidValue(
      rawData,
      rawData.default,
      true
    )){
      throw new CheckUpError(
        "Invalid type for default",
        parentItemDefinition.location,
        {default: rawData.default},
        rawData
      );
    };
  }

  //Let's check whether the autocomplete properties are there
  if (rawData.autocompleteSetFromProperty){
    let propertyId:string;
    for (propertyId of rawData.autocompleteSetFromProperty){
      if (!ItemDefinition.getPropertyDefinitionRawFor(
        parentItemDefinition,
        parentModule,
        propertyId
      )){
        throw new CheckUpError(
          "Invalid autocomplete property to funnel",
          parentItemDefinition.location,
          propertyId,
          {autocompleteSetFromProperty: rawData.autocompleteSetFromProperty},
          rawData
        );
      };
    }
  }

  //And the default if values are valid
  if (rawData.defaultIf){
    let rule:PropertyDefinitionRawJSONRuleDataType;
    for (rule of rawData.defaultIf){
      checkConditionalRuleSet(
        rule.if,
        parentItemDefinition,
        parentModule
      );

      if (!PropertyDefinition.isValidValue(
        rawData,
        rule.value,
        true
      )){
        throw new CheckUpError(
          "Invalid type for default if definition",
          parentItemDefinition.location,
          rule,
          rawData.defaultIf,
          rawData
        );
      };
    }
  }

  if (rawData.enforcedValue){
    if (!PropertyDefinition.isValidValue(
      rawData,
      rawData.enforcedValue,
      true
    )){
      throw new CheckUpError(
        "Invalid type for enforcedValue definition",
        parentItemDefinition.location,
        {enforcedValue: rawData.enforcedValue},
        rawData
      );
    };
  }

  if (rawData.enforcedValues){
    rawData.enforcedValues.forEach(ev=>{
      checkConditionalRuleSet(ev.if, parentItemDefinition, parentModule);

      if (!PropertyDefinition.isValidValue(
        rawData,
        ev.value,
        true
      )){
        throw new CheckUpError(
          "Invalid type for enforcedValues enforced value",
          parentItemDefinition.location,
          {value: ev.value},
          ev,
          rawData.enforcedValues,
          {enforcedValues: rawData.enforcedValues},
          rawData
        );
      };
    });
  }

  if (rawData.hiddenIf){
    checkConditionalRuleSet(
      rawData.hiddenIf,
      parentItemDefinition,
      parentModule
    );
  }
}

function checkModule(
  rawData: ModuleRawJSONDataType
){
  rawData.propExtensions && rawData.propExtensions.forEach(propDef=>{
    //let's create a pseudo item that acts as the module holder
    //this will allow for checking that only matches the prop extensions
    //say if they have conditionals and whatnot
    checkPropertyDefinition(propDef, {
      type: "item",
      name: rawData.name,
      location: rawData.location.replace(".json", ".propext.json"),
      i18nName: {},
      properties: rawData.propExtensions
    }, rawData);
  });

  rawData.children && rawData.children.forEach(moduleOrItemDef=>{
    if (moduleOrItemDef.type === "module"){
      checkModule(rawData);
    } else {
      checkItemDefinition(moduleOrItemDef, rawData);
    }
  });
}

function checkRoot(
  rawData: RootRawJSONDataType
){
  rawData.children && rawData.children.forEach(checkModule);
}
