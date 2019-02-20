import Module, { ModuleRawJSONDataType } from "./Module";

export interface RootRawJSONDataType {
  type: "root",
  location: string,
  children: Array<ModuleRawJSONDataType>
}

export default class Root {
  private rawData: RootRawJSONDataType;

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
}
