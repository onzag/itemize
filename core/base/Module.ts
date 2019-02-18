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
  private childModules: Array<Module>;
  private childDefinitions: Array<ItemDefinition>;
  private name: string;
  private i18nName: {
    [locale: string]: string
  };
  public location:string;

  constructor(rawJSON: ModuleRawJSONDataType, onStateChange: ()=>any){
    //If its not production run the checks
    if (process.env.NODE_ENV !== "production") {
      Module.check(rawJSON);
    }

    this.childModules = [];
    this.childDefinitions = [];
    this.name = rawJSON.name;
    this.i18nName = rawJSON.i18nName;
    this.location = rawJSON.location;

    rawJSON.children.forEach(c=>{
      if (c.type === "module"){
        this.childModules.push(new Module(c, onStateChange));
      } else if (c.type === "item"){
        c.properties = (rawJSON.propExtensions || [])
          .map(e=>
            (<PropertyDefinitionRawJSONDataType>{...e, isExtension: true}))
          .concat(c.properties);
        this.childDefinitions.push(new ItemDefinition(c, this,
          null, onStateChange));
      } else {
        throw new Error("Cannot handle type " + (c as any).type);
      }
    });
  }

  hasItemDefinitionFor(name: string | Array<string>):boolean {
    if (name instanceof Array){
      let finalDefinition = this.childDefinitions
        .find(d=>d.getName() === name[0]);

      if (!finalDefinition){
        return false;
      }

      name.forEach((n, index)=>{
        if (index === 0){
          return;
        }
        try {
          finalDefinition = finalDefinition.getItemDefinitionFor(n, true);
        } catch (e){
          return false;
        }
      });

      return !!finalDefinition;
    }
    return this.childDefinitions.some(d=>d.getName() === name);
  }

  getItemDefinitionFor(name: string | Array<string>):ItemDefinition {
    if (name instanceof Array){
      let finalDefinition = this.childDefinitions
        .find(d=>d.getName() === name[0]);
      name.forEach((n, index)=>{
        if (index === 0){
          return;
        }
        finalDefinition = finalDefinition.getItemDefinitionFor(n, true);
      });

      return finalDefinition;
    }

    let item = this.childDefinitions.find(d=>d.getName() === name);
    if (!item){
      throw new Error("Searching for item definition " + name + " failed");
    }
    return item;
  }

  getAllChildItemDefinitions(){
    return this.childDefinitions;
  }

  getAllChildModules(){
    return this.childModules;
  }

  getName(){
    return this.name
  }

  /**
   * Provides the item definition item name
   * @param  locale the locale in iso form
   * @return        a string or null (if locale not valid)
   */
  getI18nNameFor(locale: string){
    return this.i18nName[locale] || null;
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
