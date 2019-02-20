import ItemDefinition, { ItemDefinitionRawJSONDataType } from
  "./ItemDefinition";
import { PropertyDefinitionRawJSONDataType } from
  "./ItemDefinition/PropertyDefinition";
import { CheckUpError } from "./Error";

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv();
}

export interface ModuleRawJSONDataType {
  //Builder data
  type: "module",
  location: string,
  name: string,
  i18nName: {
    [locale: string]: string
  },

  //module data
  children: Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType>,
  propExtensions?: Array<PropertyDefinitionRawJSONDataType>
}

export default class Module {
  private rawData: ModuleRawJSONDataType;
  private childModules: Array<Module>;
  private onStateChange:()=>any;

  constructor(rawJSON: ModuleRawJSONDataType, onStateChange: ()=>any){
    //If its not production run the checks
    if (process.env.NODE_ENV !== "production") {
      Module.check(rawJSON);
    }

    this.rawData = rawJSON;
    this.childModules = [];
    this.onStateChange = onStateChange;

    rawJSON.children.forEach(c=>{
      if (c.type === "module"){
        this.childModules.push(new Module(c, onStateChange));
      } else if (c.type === "item"){
        if (process.env.NODE_ENV !== "production"){
          let newChildren = {...c, properties: (
              rawJSON.propExtensions || []
            ).map(e=>
              (<PropertyDefinitionRawJSONDataType>{...e, isExtension: true}))
            .concat(c.properties || [])
          };
          new ItemDefinition(newChildren, this,
            null, onStateChange);
        }
      } else {
        throw new Error("Cannot handle type " + (c as any).type);
      }
    });
  }

  hasItemDefinitionFor(name: Array<string>):boolean {
    let finalDefinition = <ItemDefinitionRawJSONDataType>this.rawData.children
      .find(d=>d.type === "item" && d.name === name[0]);

    if (!finalDefinition){
      return false;
    }

    let nNameConsumable = [...name];
    nNameConsumable.shift();
    let currentName:string;
    do {
      currentName = nNameConsumable.shift();
      finalDefinition.childDefinitions.find(d=>d.name === currentName);
      if (!finalDefinition){
        return false;
      }
    } while (currentName);

    return true;
  }

  getItemDefinitionInstanceFor(name: Array<string>):ItemDefinition {
    let finalDefinition = <ItemDefinitionRawJSONDataType>this.rawData.children
      .find(d=>d.type === "item" && d.name === name[0]);

    if (!finalDefinition){
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }

    let nNameConsumable = [...name];
    nNameConsumable.shift();
    let currentName:string;
    do {
      currentName = nNameConsumable.shift();
      finalDefinition.childDefinitions.find(d=>d.name === currentName);
      if (!finalDefinition){
        throw new Error("Searching for item definition " +
          name.join("/") + " failed");
      }
    } while (currentName);

    return new ItemDefinition(
      finalDefinition,
      this,
      null,
      this.onStateChange
    );
  }

  getAllChildItemDefinitions(){

  }

  getAllChildModules(){
    return this.childModules;
  }

  getName(){
    return this.rawData.name
  }

  /**
   * Provides the item definition item name
   * @param  locale the locale in iso form
   * @return        a string or null (if locale not valid)
   */
  getI18nNameFor(locale: string){
    return this.rawData.i18nName[locale] || null;
  }

  static schema:any;
  static schema_validate:any;
  static check:any;
}

if (process.env.NODE_ENV !== "production") {
  Module.schema = {
    type: "object",
    properties: {
      type: {
        const: "module"
      },
      location: {
        type: "string"
      },
      name: {
        type: "string"
      },
      i18nName: {
        type: "object",
        additionalProperties: {
          type: "string"
        }
      },
      children: {
        type: "array",
        items: {},
        minItems: 1
      },
      propExtensions: {
        type: "array",
        items: {},
        minItems: 1
      }
    },
    required: ["type", "location", "name", "i18nName"]
  }

  //the validation function created by ajv
  Module.schema_validate =
    ajv.compile(Module.schema);

  Module.check = function(
    rawJSON: ModuleRawJSONDataType
  ){
    //we check the schema for validity
    let valid = Module.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      throw new CheckUpError(
        "Schema Check Failed",
        rawJSON.location,
        Module.schema_validate.errors,
        rawJSON
      );
    };
  }
}
