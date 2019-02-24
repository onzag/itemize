import * as fs from 'fs';
import * as path from 'path';
import PropertyDefinition, {
  PropertyDefinitionRawJSONDataType,
  PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD,
  PropertyDefinitionRawJSONRuleDataType,
  PropertyDefinitionSupportedType
} from
  './base/ItemDefinition/PropertyDefinition';
import Item, { ItemRawJSONDataType } from './base/ItemDefinition/Item';
import Module, { ModuleRawJSONDataType } from './base/Module';
import ItemDefinition, {
  ItemDefinitionRawJSONDataType
} from './base/ItemDefinition';
import * as PropertiesReader from 'properties-reader';
import * as colors from 'colors/safe';
import * as Ajv from 'ajv';
import Root, { RootRawJSONDataType } from './base/Root';
import { CheckUpError } from './base/Error';
import ConditionalRuleSet, {
  ConditionalRuleSetRawJSONDataType,
  ConditionalRuleSetRawJSONDataComponentType,
  ConditionalRuleSetRawJSONDataPropertyType
} from './base/ItemDefinition/ConditionalRuleSet';
import PropertiesValueMappingDefiniton, {
  PropertiesValueMappingDefinitonRawJSONDataType, PropertiesValueMappingReferredPropertyValue
} from './base/ItemDefinition/PropertiesValueMappingDefiniton';

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
  let exists = await checkExists(
    location,
    locationOfElementBeingProcessed
  );
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

  await checkExists(
    actualFileLocation,
    locationOfElementBeingProcessed,
    true
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
  let fileData:FileRootDataRawUntreatedJSONDataType;
  try {
    fileData = JSON.parse(fileContent);
  } catch (err){
    throw new Error("Invalid JSON at " + actualLocation);
  }

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
    console.log(err.stack);
  }

  if (!failed){
    try {
      checkRoot(resultJSON);
    } catch (err){
      failed = true;
      err.display && err.display();
      console.log(err.stack);
    }
  }

  if (!failed){
    //Do this just in case
    //let rootTest = new Root(resultJSON);
    //rootTest.getAllModules(()=>{});
  }

  if (failed){
    console.error("FAILED");
  } else {
    console.log("SUCCESS");
    console.log(JSON.stringify(resultJSON, null, 2));
    fsAsync.writeFile("./builds/data.all.json", JSON.stringify(resultJSON));
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
      FileItemDefinitionUntreatedRawJSONDataType;

    try {
      fileData = JSON.parse(fileContent);
    } catch (err){
      throw new Error("Invalid JSON at " + actualLocation);
    }

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
    let fileData:Array<PropertyDefinitionRawJSONDataType>;
    try {
      fileData = JSON.parse(await fsAsync.readFile(propExtLocation, 'utf8'));
    } catch (err){
      throw new Error("Invalid json at " + propExtLocation)
    }
    propExtensions =
      await Promise.all<PropertyDefinitionRawJSONDataType>(fileData.map(
        getI18nData.bind(null, supportedLanguages, actualLocation)
      ));
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
        actualLocation
      ));
  }

  let finalValue:ItemDefinitionRawJSONDataType = {
    type: fileData.type,
    i18nName,
    name: actualName,
    location: actualLocation
  };
  if (fileData.allowCalloutExcludes){
    finalValue.allowCalloutExcludes = fileData.allowCalloutExcludes;
  }
  if (fileData.includes && fileData.includes.length){
    finalValue.includes = fileData.includes;
  }
  if (fileData.properties && fileData.properties.length){
    finalValue.properties = fileData.properties;
  }

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
    let fnCheckExists = async (item: ItemRawJSONDataType)=>{
      if (item.name){
        if (importedChildDefinitions){
          if (importedChildDefinitions.find(idef=>{
            let lastName = idef[idef.length - 1];
            return (lastName === item.name ||
              idef.join("/") === item.name);
          })){
            return;
          }
        }
        if (item.name.indexOf("/") !== -1){
          throw new Error("Missing imported item definition for " + item +
            " in " + actualLocation);
        }
        await getActualFileLocation(
          path.join(path.dirname(actualLocation), item.name),
          actualLocation
        );
      }
      if (item.items){
        await Promise.all(item.items.map(item=>fnCheckExists(item)))
      }
    }

    finalValue.includes = await Promise.all<ItemRawJSONDataType>
      (finalValue.includes.map(
        processItemI18nName.bind(null, supportedLanguages, actualLocation)
      ));

    await Promise.all(finalValue.includes.map(item=>fnCheckExists(item)))
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

  let i18nData:{
    [locale: string]: any
  } = {};

  //get the properties and the definition
  let properties = PropertiesReader(languageFileLocation).path();
  let definition = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD[property.type];

  //and start to loop
  supportedLanguages.forEach(locale=>{
    //do some checks
    if (!properties[locale]){
      throw new Error("File " + languageFileLocation +
        " does not include language data for '" + locale + "'");
    } else if (!properties[locale].properties){
      throw new Error("File " + languageFileLocation +
        " does not include property 'properties' for '" + locale + "'");
    } if (!properties[locale].properties[property.id]){
      throw new Error("File " + languageFileLocation +
        " does not include property data for 'property' in '" +
        property.id + "'");
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

const checkConditionalRuleSetSchemaValidate =
  ajv.compile(ConditionalRuleSet.schema);
function checkConditionalRuleSet(
  rawData: ConditionalRuleSetRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType,
){

  //Let's validate the raw json
  let valid = checkConditionalRuleSetSchemaValidate(rawData);
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      checkConditionalRuleSetSchemaValidate.errors,
      rawData
    );
  };

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

const checkItemDefinitionSchemaValidate =
  ajv.compile(ItemDefinition.schema);
function checkItemDefinition(
  rawData: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){
  //we check the schema for validity
  let valid = checkItemDefinitionSchemaValidate(rawData);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      rawData.location,
      checkConditionalRuleSetSchemaValidate.errors,
      rawData
    );
  };

  rawData.childDefinitions && rawData
    .childDefinitions.forEach(cd=>checkItemDefinition(cd, parentModule));

  rawData.includes &&
    rawData.includes.forEach(itm=>checkItem(itm, rawData, parentModule));

  rawData.properties &&
    rawData.properties
      .forEach(p=>checkPropertyDefinition(p, rawData, parentModule))
}

const checkItemSchemaValidate =
  ajv.compile(Item.schema);
function checkItem(
  rawData: ItemRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){

  //we check the schema for validity
  let valid = checkItemSchemaValidate(rawData);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      checkItemSchemaValidate.errors,
      rawData
    );
  };

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

const checkPropertiesValueMappingDefinitonSchemaValidate =
  ajv.compile(PropertiesValueMappingDefiniton.schema);
function checkPropertiesValueMappingDefiniton(
  rawData: PropertiesValueMappingDefinitonRawJSONDataType,
  item: ItemRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  referredItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){

  //we check the schema for validity
  let valid = checkPropertiesValueMappingDefinitonSchemaValidate(rawData);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      checkPropertiesValueMappingDefinitonSchemaValidate.errors,
      rawData,
      item
    );
  };

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

const checkPropertyDefinitionSchemaValidate =
  ajv.compile(PropertyDefinition.schema);
function checkPropertyDefinition(
  rawData: PropertyDefinitionRawJSONDataType,
  parentItemDefinition: ItemDefinitionRawJSONDataType,
  parentModule: ModuleRawJSONDataType
){

  //we check the schema for validity
  let valid = checkPropertyDefinitionSchemaValidate(rawData);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      checkPropertyDefinitionSchemaValidate.errors,
      rawData
    );
  };

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

const checkModuleSchemaValidate =
  ajv.compile(Module.schema);
function checkModule(
  rawData: ModuleRawJSONDataType
){
  //we check the schema for validity
  let valid = checkModuleSchemaValidate(rawData);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      rawData.location,
      checkModuleSchemaValidate.errors,
      rawData
    );
  };

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

const checkRootSchemaValidate =
  ajv.compile(Root.schema);
function checkRoot(
  rawData: RootRawJSONDataType
){
  //we check the schema for validity
  let valid = checkRootSchemaValidate(rawData);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      rawData.location,
      checkRootSchemaValidate.errors,
      rawData
    );
  };

  rawData.children && rawData.children.forEach(checkModule);
}
