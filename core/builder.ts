import * as fs from 'fs';
import * as path from 'path';
import { PropertyDefinitionRawJSONDataType } from './ItemDefinition/PropertyDefinition';
import { ItemRawJSONDataType } from './ItemDefinition/Item';
import { ModuleRawJSONDataType } from './Module';
import { ItemDefinitionRawJSONDataType } from './ItemDefinition';
const fsAsync = fs.promises;

import 'source-map-support/register'

interface FileRootDataRawUntreatedJSONDataType {
  type: "root",
  includes: Array<string>,
  lang: Array<string>
}

interface FileModuleDataRawUntreatedJSONDataType {
  type: "module",
  includes: Array<string>
}

export interface FileItemDefinitionUntreatedRawJSONDataType {
  type: "item",
  allowCalloutExcludes?: boolean,
  imports?: Array<string>,
  includes?: Array<ItemRawJSONDataType>,
  properties?: Array<PropertyDefinitionRawJSONDataType>,
}

(async() => {
  let actualLocation = process.argv[2];
  const stat = await fsAsync.lstat(actualLocation);
  if (stat.isDirectory()){
    actualLocation = path.join(actualLocation,"/index.json");
  };

  let fileContent = await fsAsync.readFile(actualLocation, 'utf8');
  let fileData:FileRootDataRawUntreatedJSONDataType = JSON.parse(fileContent);

  if (fileData.type !== "root"){
    throw new Error("Must be type root");
  }

  let supportedLanguages = fileData.lang;

  let resultJSON = JSON.stringify({
    type: "root",
    children: await processIncludes(
      supportedLanguages,
      path.dirname(actualLocation),
      fileData.includes
    )
  });

  console.log(resultJSON);
})();

async function processIncludes(
  supportedLanguages:string[],
  parentFolder: string,
  includes: string[],
  childrenMustBeItemDefinition?: boolean
):Promise<Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType>> {
  let include:string;
  let result:Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType> = [];
  for (include of includes){
    let actualLocation = path.join(parentFolder, include);
    let isDirectory:boolean;
    try {
      let stat = await fsAsync.lstat(actualLocation);
      let isDirectory = stat.isDirectory();
      actualLocation = path.join(actualLocation, "/index.json");
    } catch (e){
      actualLocation += ".json";
    }

    let fileContent = await fsAsync.readFile(actualLocation, 'utf8');
    let fileData:any = JSON.parse(fileContent);

    if (fileData.type === "module"){
      if (childrenMustBeItemDefinition){
        throw new Error("Module found as children of item definition at " +
          actualLocation)
      }
      let propExtLocation =
        actualLocation.replace(".json", ".propext.json");

      let exists = true;
      try {
        await fsAsync.access(propExtLocation, fs.constants.F_OK);
      } catch (e){
        exists = false;
      }

      let propExtensions:Array<PropertyDefinitionRawJSONDataType> = [];
      if (exists){
        propExtensions =
          JSON.parse(await fsAsync.readFile(propExtLocation, 'utf8'));
      }

      let finalValue:ModuleRawJSONDataType = {
        type: "module",
        children: await processIncludes(
          supportedLanguages,
          path.dirname(actualLocation),
          fileData.includes
        ),
        propExtensions
      };
      result.push();
    } else if (fileData.type === "item"){
      let locationSplitted = actualLocation.replace(".json","").split("/");
      let name:string = locationSplitted.pop();
      let actualName:string = name;
      if (name === "index"){
        name = locationSplitted.pop();
      }

      let importedChildDefinitions =
        ((<FileItemDefinitionUntreatedRawJSONDataType>
          fileData).imports || []).map(l=>l.split("/"));

      let childDefinitions:Array<ItemDefinitionRawJSONDataType> = [];

      if (actualName === "index"){
        childDefinitions = <Array<ItemDefinitionRawJSONDataType>>
          (await processIncludes(
            supportedLanguages,
            path.dirname(actualLocation),
            (await fsAsync.readdir(path.dirname(actualLocation))).filter(i=>{
              return i !== "index.json" && !i.endsWith(".propext.json") &&
                !i.endsWith(".properties")
              }).map((f)=>f.replace(".json","")),
              true
          ));
      }

      let finalValue:ItemDefinitionRawJSONDataType = {
        ...fileData,
        name,
        importedChildDefinitions,
        childDefinitions
      };

      result.push(finalValue);
    }
  }

  return result;
}
