import Module, { ModuleRawJSONDataType } from "./Module";

export interface RootRawJSONDataType {
  type: "root",
  //Avaialble for the builder
  location?: string,
  pointers?: any,
  raw?: string,

  children: Array<ModuleRawJSONDataType>
}

export default class Root {
  public rawData: RootRawJSONDataType;

  constructor(rawJSON: RootRawJSONDataType){
    //If its not production run the checks
    this.rawData = rawJSON;
  }

  listModuleNames(){
    return this.rawData.children.map(m=>m.name);
  }

  getAllModules(onStateChange: ()=>any){
    return this.rawData.children.map(m=>(new Module(m, onStateChange)))
  }

  getModule(name: string, onStateChange:()=>any){
    let rawModuleData = this.rawData.children.find(m=>m.name === name);
    if (!rawModuleData){
      throw new Error("invalid module " + name);
    }
    return new Module(
      rawModuleData,
      onStateChange
    );
  }

  static schema:any;
}

if (process.env.NODE_ENV !== "production") {
  Root.schema = {
    type: "object",
    properties: {
      type: {
        const: "root"
      },
      includes: {
        type: "array",
        items: {
          type: "string"
        },
        minItems: 1
      },
      lang: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
    additionalProperties: false,
    required: ["type"]
  }
}
