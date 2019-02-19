import * as fs from 'fs';
import * as path from 'path';
import { PropertyDefinitionRawJSONDataType, PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD } from
  './base/ItemDefinition/PropertyDefinition';
import { ItemRawJSONDataType } from './base/ItemDefinition/Item';
import { ModuleRawJSONDataType } from './base/Module';
import { ItemDefinitionRawJSONDataType } from './base/ItemDefinition';
import * as PropertiesReader from 'properties-reader';
import * as colors from 'colors/safe';

const fsAsync = fs.promises;

if (process.env.NODE_ENV === "production") {
  throw new Error("This script cannot run in production mode");
}

//registering source maps, this one is useful for
//debugging and since the builder is a development file
//it's ok this is here
import 'source-map-support/register'
import Root, { RootRawJSONDataType } from './base/Root';
import { CheckUpError } from './base/Error';

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

async function checkExists(
  location: string,
  locationOfElementBeingProcessed: string,
  throwErr?:boolean
) {
  let exists = true;
  try {
    await fsAsync.access(location, fs.constants.F_OK);
  } catch (e){
    exists = false;
  }
  if (throwErr && !exists){
    throw new Error("File " + location +
      " does not exist from " + locationOfElementBeingProcessed);
  }
  return exists;
}

async function checkIsDirectory(
  location: string,
  locationOfElementBeingProcessed: string
){
  checkExists(location, locationOfElementBeingProcessed, true);
  const stat = await fsAsync.lstat(location);
  return stat.isDirectory();
}

async function getActualFileLocation(
  location: string,
  locationOfElementBeingProcessed: string
) {
  let actualFileLocation = location;
  let exists = await checkExists(location, locationOfElementBeingProcessed);
  if (exists){
    let isDirectory = await checkIsDirectory(location,
      locationOfElementBeingProcessed);
    if (isDirectory){
      actualFileLocation = path.join(location, "index.json");
    } else if (!location.endsWith(".json")){
      actualFileLocation += ".json";
    }
  } else if (!location.endsWith(".json")){
    actualFileLocation += ".json";
  }

  await checkExists(actualFileLocation, locationOfElementBeingProcessed, true);

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

//Now we execute this code asynchronously
(async() => {
  //lets get the actual location of the item, lets assume first
  //it is the given location
  let actualLocation = await getActualFileLocation(
    process.argv[2],
    "BUILDER"
  );

  //lets read the file, let it fail if it fails
  let fileContent = await fsAsync.readFile(actualLocation, 'utf8');
  //lets get the file data
  let fileData:FileRootDataRawUntreatedJSONDataType = JSON.parse(fileContent);

  //it all should start in the root element
  if (fileData.type !== "root"){
    throw new Error("Must be type root");
  }

  //lets get the supported languages
  let supportedLanguages = fileData.lang;

  //and make the result JSON
  let resultJSON:RootRawJSONDataType;

  let failed = false;
  try {
    resultJSON = {
      type: "root",
      location: actualLocation,
      children: <Array<ModuleRawJSONDataType>>(await processIncludes(
        supportedLanguages,
        path.dirname(actualLocation),
        path.dirname(actualLocation),
        fileData.includes,
        false,
        true,
        actualLocation
      ))
    };
  } catch (err){
    failed = true;
    console.log(colors.red(err.message));
  }

  if (!failed){
    //Because this isn't running in production the tests should be able
    //to run nicely
    try {
      let rootTest = new Root(resultJSON);
      rootTest.getAllModules(()=>{});
    } catch (err){
      failed = true;
      if (err instanceof CheckUpError){
        err.display();
      } else {
        throw err;
      }
    }
  }

  if (failed){
    console.error("FAILED");
  } else {
    console.log("SUCCESS");
    console.log(JSON.stringify(resultJSON, null, 2));
  }

  fsAsync.writeFile("./builds/data.all.json", JSON.stringify(resultJSON));
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
  locationOfElementBeingProcessed: string
):Promise<Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType>> {
  //this will be the resulting array, either modules or items
  //in the case of items, it can only have items as children
  let result:Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType> = [];

  //to loop
  let include:string;

  //so we loop over the includes
  for (include of includes){
    //so the actual location is the parent folder and the include name
    let actualLocation = await getActualFileLocation(
      path.join(parentFolder, include),
      locationOfElementBeingProcessed
    );

    //now the file content is read
    let fileContent = await fsAsync.readFile(actualLocation, 'utf8');
    //and the data parsed
    let fileData:FileModuleDataRawUntreatedJSONDataType |
      FileItemDefinitionUntreatedRawJSONDataType = JSON.parse(fileContent);

    //now we check the type to see whether we got a module or a item
    if (fileData.type === "module"){
      if (childrenMustBeItemDefinition){
        throw new Error("Module found as children of item definition at " +
          actualLocation + " from " + locationOfElementBeingProcessed)
      }

      //we would process a module
      result.push(await processModule(
        supportedLanguages,
        actualLocation,
        fileData
      ));
    } else if (fileData.type === "item"){
      if (childrenMustBeModule){
        throw new Error(
          "Item definition found as children of root definition at " +
          actualLocation + " from " + locationOfElementBeingProcessed)
      }
      //we would process an item
      result.push(await processItemDefinition(
        supportedLanguages,
        actualLocation,
        lastModuleDirectory,
        fileData
      ));
    } else if ((fileData as any).type === "root"){
      throw new Error(
        "Children as root in " +
        actualLocation + " from " + locationOfElementBeingProcessed)
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
  fileData: FileModuleDataRawUntreatedJSONDataType
){
  let actualName = await getActualFileIdentifier(actualLocation);
  let i18nName = await getI18nName(supportedLanguages, actualLocation);

  //lets find prop extensions if they are available
  let propExtLocation =
    actualLocation.replace(".json", ".propext.json");

  //let's check if the file exists
  let propExtExists = await checkExists(
    propExtLocation,
    actualLocation
  );

  //propextensions is declared
  let propExtensions:Array<PropertyDefinitionRawJSONDataType>;
  if (propExtExists){
    //they are set if the file exists
    propExtensions =
      await Promise.all<PropertyDefinitionRawJSONDataType>
      (JSON.parse(await fsAsync.readFile(propExtLocation, 'utf8')).map(
        getI18nData.bind(null, supportedLanguages, actualLocation)
      ))
  }

  //and the final value is created
  let actualLocationDirectory = path.dirname(actualLocation);
  let finalValue:ModuleRawJSONDataType = {
    type: "module",
    name: actualName,
    i18nName,
    location: actualLocation,
    children: await processIncludes(
      supportedLanguages,
      actualLocationDirectory,
      actualLocationDirectory,
      fileData.includes,
      false,
      false,
      actualLocation
    )
  };

  //we add the propExtensions if necessary
  if (propExtensions){
    finalValue.propExtensions = propExtensions;
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
  fileData: FileItemDefinitionUntreatedRawJSONDataType
){
  let actualName = await getActualFileIdentifier(actualLocation);
  let i18nName = await getI18nName(supportedLanguages, actualLocation);

  //lets get the file definitions that are imported that exist
  let imp:string;
  for (imp of (<FileItemDefinitionUntreatedRawJSONDataType>
    fileData).imports || []){
      //this throws an error if it fails to get the location
      await getActualFileLocation(
        path.join(lastModuleDirectory, imp),
        actualLocation
      );
  }

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
  if (actualName === "index"){
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
        actualLocation
      ));
  }

  let finalValue:ItemDefinitionRawJSONDataType = {
    ...fileData,
    i18nName,
    name: actualName,
    location: actualLocation
  };

  if (importedChildDefinitions.length){
    finalValue.importedChildDefinitions = importedChildDefinitions;
  }
  if (childDefinitions.length){
    finalValue.childDefinitions = childDefinitions;
  }

  if (finalValue.properties){
    finalValue.properties = await Promise.all<PropertyDefinitionRawJSONDataType>
      (finalValue.properties.map(
        getI18nData.bind(null, supportedLanguages, actualLocation)
      ));
  }

  if (finalValue.includes){
    finalValue.includes = await Promise.all<ItemRawJSONDataType>
      (finalValue.properties.map(
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
  actualLocation: string
){
  let languageFileLocation =
    actualLocation.replace(".json", ".properties");

  await checkExists(
    languageFileLocation,
    actualLocation,
    true
  );

  let properties = PropertiesReader(languageFileLocation).path();
  let i18nName:{
    [locale: string]: string
  } = {};

  supportedLanguages.forEach(locale=>{
    if (!properties[locale]){
      throw new Error("File " + languageFileLocation +
        " does not include language data for " + locale);
    } else if (typeof properties[locale].name !== "string"){
      throw new Error("File " + languageFileLocation +
        " does not have a name for " + locale);
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
  item: ItemRawJSONDataType
){
  //we try to see if there are child items
  if (item.items){
    //we process those too, recursively
    item.items = await Promise.all<ItemRawJSONDataType>
      (item.items.map(
        processItemI18nName.bind(null, supportedLanguages, actualLocation)
      ));
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
    actualLocation,
    true
  );

  //get the properties
  let properties = PropertiesReader(languageFileLocation).path();
  let i18nName:{
    [locale: string]: string
  } = {};

  //use the same technique we used before to get the name
  supportedLanguages.forEach(locale=>{
    if (!properties[locale]){
      throw new Error("File " + languageFileLocation +
        " does not include language data for " + locale);
    } else if (!properties[locale].item){
      throw new Error("File " + languageFileLocation +
        " does not have item data for " + locale);
    } else if (typeof properties[locale].item[item.id] !== "string"){
      throw new Error("File " + languageFileLocation +
        " does not have an item name for " + locale + " in " + item.id);
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
  property: PropertyDefinitionRawJSONDataType
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
  await checkExists(
    languageFileLocation,
    actualLocation,
    true
  );

  //get the properties and the definition
  let properties = PropertiesReader(languageFileLocation).path();
  let definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD[property.type];

  //and start to loop
  supportedLanguages.forEach(locale=>{
    //do some checks
    if (!properties[locale]){
      throw new Error("File " + languageFileLocation +
        " does not include language data for " + locale);
    } else if (!properties[locale].properties){
      throw new Error("File " + languageFileLocation +
        " does not include property data for " + locale);
    } if (!properties[locale].properties[property.id]){
      throw new Error("File " + languageFileLocation +
        " does not include property data for " + property.id);
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
        .map(b=>({key: b, required: true})));

    //start initializing the data in the property itself
    property.i18nData = property.i18nData || {};
    property.i18nData[locale] = {};

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
        throw new Error("File " + languageFileLocation +
          " has missing property data for property id '" + property.id +
          "' in '" + expectedProperty.key + "' required by type '" +
          property.type + "' in locale " + locale);
      } else if (typeof result !== "string"){
        //also throw an error if it's invalid
        throw new Error("File " + languageFileLocation +
          " has invalid property data for property id '" + property.id +
          "' in '" + expectedProperty.key + "' required by type '" +
          property.type + "' in locale " + locale);
      }

      //now we search where the property has to be set
      let whereToSet = property.i18nData[locale];
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

  //return the property
  return property;
}
