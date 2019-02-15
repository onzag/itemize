import PropertyDefinition, { PropertyDefinitionRawJSONDataType } from "./PropertyDefinition";
import Item, { ItemRawJSONDataType, ItemGroupHandle } from "./Item";
import Module from "../Module";

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export interface ItemDefinitionRawJSONDataType {
  type: "item",

  //property gets added during processing and merging
  //preresents the file name
  name: string,
  allowCalloutExcludes?: boolean,
  includes?: Array<ItemRawJSONDataType>,
  properties?: Array<PropertyDefinitionRawJSONDataType>,

  //property gets added during procesing and merging
  //replacing imports, gotta be there even if empty
  childDefinitions?: Array<{
    location?: Array<string>,
    definition?: ItemDefinitionRawJSONDataType
  }>,
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
  private allowCalloutExcludes: boolean;
  private childDefinitions: Array<ItemDefinition>;
  private importedChildDefinitions: Array<Array<string>>
  private onStateChange: ()=>any;
  private propertyDefinitions: Array<PropertyDefinition>;
  private itemInstances: Array<Item>;
  private parentModule: Module;
  private parentItemDefinition: ItemDefinition;

  constructor(
    rawJSON: ItemDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any
  ){
    if (process.env.NODE_ENV !== "production") {
      ItemDefinition.check(rawJSON, parentModule,
        parentItemDefinition, onStateChange);
    }

    this.rawData = rawJSON;
    this.name = rawJSON.name;
    this.allowCalloutExcludes = rawJSON.allowCalloutExcludes || false;

    this.importedChildDefinitions = [];
    this.childDefinitions = rawJSON.childDefinitions ?
      rawJSON.childDefinitions.map(d=>{
        if (!d.definition){
          this.importedChildDefinitions.push(d.location);
          return null;
        }
        return new ItemDefinition(
          d.definition,
          parentModule,
          parentItemDefinition,
          onStateChange
        )
      }).filter(d=>d) : [];
    this.propertyDefinitions = rawJSON.properties ? rawJSON.properties
      .map(p=>(new PropertyDefinition(p, this, this, onStateChange))) : [];
    this.itemInstances = rawJSON.includes ? rawJSON.includes
      .map(i=>(new Item(i, this, this, onStateChange))) : [];
    this.onStateChange = onStateChange;

    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;
  }

  getName():string {
    return this.name;
  }

  hasItemDefinitionFor(name: string, avoidImports?: boolean):boolean{
    let status = this.childDefinitions.some(d=>d.getName()===name);
    if (!status && !avoidImports){
      let importedDefinitionLoc = this.importedChildDefinitions
        .find(d=>d.join("/") === name || d[d.length - 1] === name);
      if (importedDefinitionLoc){
        status =
          this.parentModule.hasItemDefinitionFor(importedDefinitionLoc);
      }
    }
    return status;
  }

  getItemDefinitionFor(name: string, avoidImports?: boolean):any{
    let definition = this.childDefinitions
      .find(d=>d.getName()===name);
    if (!definition && !avoidImports){
      let importedDefinitionLoc = this.importedChildDefinitions
        .find(d=>d.join("/") === name || d[d.length - 1] === name);
      if (importedDefinitionLoc){
        definition =
          this.parentModule.getItemDefinitionFor(importedDefinitionLoc);
      }
    }

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

  getParentModule(){
    return this.parentModule;
  }

  hasParentItemDefinition(){
    return !!this.parentItemDefinition;
  }

  getParentItemDefinition(){
    if (!this.parentItemDefinition){
      throw new
        Error("Attempted to get parent definition while missing");
    }
    return this.parentItemDefinition;
  }

  getChildDefinitions():Array<ItemDefinition> {
    return this.childDefinitions;
  }

  areCalloutExcludesAllowed():boolean {
    return this.allowCalloutExcludes;
  }

  getNewInstance(){
    return new ItemDefinition(this.rawData, this.parentModule,
      this.parentItemDefinition, this.onStateChange);
  }

  getStructure(){

  }

  getPrettyStructure(){

  }

  //These are here but only truly available in non production
  static schema:any;
  static schema_validate:any;
  static check:any;
}

if (process.env.NODE_ENV !== "production") {
  ItemDefinition.schema = {
    type: "object",
    properties: {
      type: {
        const: "item"
      },
      name: {
        type: "string"
      },
      allowCalloutExcludes: {
        type: "boolean"
      },
      includes: {},
      properties: {},
      childDefinitions: {
        type: "array",
        items: {
          type: "object",
          oneOf: [
            {
              properties: {
                location: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  minItems: 1,
                  additionalItems: false
                }
              },
              required: ["location"]
            },
            {
              properties: {
                definition: {}
              },
              required: ["definition"]
            }
          ],
          additionalProperties: false,
        },
        additionalItems: false
      }
    },
    required: ["type", "name"],
    additionalProperties: false
  };

  //the validation function created by ajv
  ItemDefinition.schema_validate =
    ajv.compile(ItemDefinition.schema);

  ItemDefinition.check = function(
    rawJSON: ItemDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any
  ){
    //we check the schema for validity
    let valid = ItemDefinition.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      console.error(ItemDefinition.schema_validate.errors);
      throw new Error("Check Failed");
    };
  }
}
