import Module, { ModuleRawJSONDataType } from "./Module";
import ItemDefinition,
  { ItemDefinitionRawJSONDataType } from "./ItemDefinition";

export interface RootRawJSONDataType {
  type: "root",
  location: string,
  children: Array<ModuleRawJSONDataType>
}

export default class Root {
  private childModulesRaw: Array<ModuleRawJSONDataType>;
  public location: string;

  constructor(rawJSON: RootRawJSONDataType){
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
}
