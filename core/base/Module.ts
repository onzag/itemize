import ItemDefinition, { ItemDefinitionRawJSONDataType } from
  "./ItemDefinition";
import { PropertyDefinitionRawJSONDataType } from
  "./ItemDefinition/PropertyDefinition";

export interface ModuleRawJSONDataType {
  //Builder data
  type: "module",
  location: string,
  name: string,

  //module data
  children: Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType>,
  propExtensions?: Array<PropertyDefinitionRawJSONDataType>
}

export default class Module {
  private childModules: Array<Module>;
  private childDefinitions: Array<ItemDefinition>;
  private name: string;
  public location:string;

  constructor(rawJSON: ModuleRawJSONDataType, onStateChange: ()=>any){
    this.childModules = [];
    this.childDefinitions = [];
    this.name = rawJSON.name;
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
}

if (process.env.NODE_ENV !== "production") {

}
