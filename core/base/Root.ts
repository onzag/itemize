import Module, { ModuleRawJSONDataType } from "./Module";
import { CheckUpError } from "./Error";

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv();
}

export interface RootRawJSONDataType {
  type: "root",
  location: string,
  children: Array<ModuleRawJSONDataType>
}

export default class Root {
  private childModulesRaw: Array<ModuleRawJSONDataType>;
  public location: string;

  constructor(rawJSON: RootRawJSONDataType){
    //If its not production run the checks
    if (process.env.NODE_ENV !== "production") {
      Root.check(rawJSON);
    }

    this.childModulesRaw = rawJSON.children;
    this.location = rawJSON.location;
  }

  listModuleNames(){
    return this.childModulesRaw.map(m=>m.name);
  }

  getAllModules(onStateChange: ()=>any){
    return this.childModulesRaw.map(m=>(new Module(m, onStateChange)))
  }

  getModule(name: string, onStateChange:()=>any){
    let rawData = this.childModulesRaw.find(m=>m.name === name);
    if (!rawData){
      throw new Error("invalid module " + name);
    }
    return new Module(
      rawData,
      onStateChange
    );
  }

  static schema:any;
  static schema_validate:any;
  static check:any;
}

if (process.env.NODE_ENV !== "production") {
  Root.schema = {
    type: "object",
    properties: {
      type: {
        const: "root"
      },
      location: {
        type: "string"
      },
      children: {
        type: "array",
        items: {},
        minItems: 1
      }
    },
    required: ["type", "location"]
  }

  //the validation function created by ajv
  Root.schema_validate =
    ajv.compile(Root.schema);

  Root.check = function(
    rawJSON: RootRawJSONDataType
  ){
    //we check the schema for validity
    let valid = Root.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      throw new CheckUpError(
        "Schema Check Failed",
        rawJSON.location,
        Root.schema_validate.errors,
        rawJSON
      );
    };
  }
}
