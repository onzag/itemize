import PropertyDefinition, { PropertyDefinitionRawJSONDataType } from "./PropertyDefinition";
import Item, { ItemRawJSONDataType, ItemGroupHandle } from "./Item";

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export interface ItemDefinitionRawJSONDataType {
  //property gets added during processing and merging
  //preresents the file name
  name: string,
  type: string,
  allowCalloutExcludes?: boolean,
  includes: Array<ItemRawJSONDataType>,
  properties: Array<PropertyDefinitionRawJSONDataType>,

  //property gets added during procesing and merging
  //replacing imports, gotta be there even if empty
  childDefinitions: Array<ItemDefinitionRawJSONDataType>
}

function hasItemOf(name: string, handle: Item | ItemGroupHandle):boolean {
  if (handle instanceof Item){
    return handle.getDefinitionName() === name;
  }
  return handle.items.some(i=>hasItemOf(name, i));
}

export default class ItemDefinition {
  private rawData: ItemDefinitionRawJSONDataType;
  private name: string;
  private childDefinitions: Array<ItemDefinition>;
  private onStateChange: ()=>any;
  private propertyDefinitions: Array<PropertyDefinition>;
  private itemInstances: Array<Item>;

  constructor(
    data: ItemDefinitionRawJSONDataType,
    onStateChange: ()=>any
  ){
    this.rawData = data;
    this.name = data.name;
    this.childDefinitions = data
      .childDefinitions.map(d=>(new ItemDefinition(d, onStateChange)));
    this.propertyDefinitions = data.properties
      .map(p=>(new PropertyDefinition(p, this, this, onStateChange)));
    this.itemInstances = data.includes
      .map(i=>(new Item(i, this, this, onStateChange)))
    this.onStateChange = onStateChange;
  }

  getName():string {
    return this.name;
  }

  hasItemDefinitionFor(name: string):boolean{
    return this.childDefinitions.some(d=>d.getName()===name);
  }

  getItemDefinitionFor(name: string):any{
    let definition = this.childDefinitions.find(d=>d.getName()===name);
    if (!definition){
      throw new Error("Requested invalid definition " + name);
    }
    return definition;
  }

  hasPropertyDefinitionFor(id: string){
    return this.propertyDefinitions.some(d=>d.getId()===id);
  }

  getPropertyDefinitionFor(id: string):PropertyDefinition {
    let definition = this.propertyDefinitions.find(d=>d.getId()===id);
    if (!definition){
      throw new Error("Requested invalid property " + id);
    }
    return definition;
  }

  hasAtLeastOneActiveInstanceOf(name: string):boolean {
    let possibleCandidates = this.itemInstances
      .filter(i=>i.mightCurrentlyContain(name));
    if (!possibleCandidates.length){
      return false;
    }

    possibleCandidates.some(pc=>{
      let usableItems = pc.getCurrentUsableItems();
      if (usableItems === null){
        return false
      } else if (usableItems instanceof Item){
        //now this is a single item because usable
        //items would return a handle or single items
        if (usableItems.getDefinitionName() === name){
          return true
        }
      } else {
        return hasItemOf(name, usableItems);
      }
    });
  }

  getNewInstance(){
    return new ItemDefinition(this.rawData, this.onStateChange);
  }

  getStructure(){
    
  }

  getPrettyStructure(){

  }
}
