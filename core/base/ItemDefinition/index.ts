import PropertyDefinition, { PropertyDefinitionRawJSONDataType } from "./PropertyDefinition";
import Item, { ItemRawJSONDataType, ItemGroupHandle } from "./Item";
import Module from "../Module";
import { CheckUpError } from "../Error";

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv();
}

export interface ItemDefinitionRawJSONDataType {
  //Builder data
  type: "item",
  location: string,

  //property gets added during processing and merging
  //preresents the file name
  name: string,
  i18nName: {
    [locale: string]: string
  },
  allowCalloutExcludes?: boolean,
  includes?: Array<ItemRawJSONDataType>,
  properties?: Array<PropertyDefinitionRawJSONDataType>,

  //property gets added during procesing and merging
  //replacing imports, gotta be there even if empty
  importedChildDefinitions?: Array<Array<string>>,
  childDefinitions?: Array<ItemDefinitionRawJSONDataType>,
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
  private i18nName: {
    [locale: string]: string
  };
  public location:string;

  private allowCalloutExcludes: boolean;
  private importedChildDefinitions: Array<Array<string>>
  private onStateChange: ()=>any;
  private itemInstances: Array<Item>;
  private parentModule: Module;
  private parentItemDefinition: ItemDefinition;

  constructor(
    rawJSON: ItemDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any
  ){
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;

    if (process.env.NODE_ENV !== "production") {
      ItemDefinition.check(rawJSON);

      (rawJSON.properties || [])
        .forEach(p=>(new PropertyDefinition(p, this, onStateChange)));

      (rawJSON.childDefinitions || []).forEach(d=>{
        if ((d as any).type === "module"){
          throw new Error("module cannot be a child of an item " +
            rawJSON.name + ">" + d.name);
        }
        new ItemDefinition(
          d,
          parentModule,
          parentItemDefinition,
          onStateChange
        )
      })
    }

    this.name = rawJSON.name;
    this.i18nName = rawJSON.i18nName;
    this.location = rawJSON.location;

    this.allowCalloutExcludes = rawJSON.allowCalloutExcludes || false;
    this.importedChildDefinitions = rawJSON.importedChildDefinitions || [];
    this.onStateChange = onStateChange;

    //item instances might request for item definitions during check
    //so we set them later
    this.itemInstances = rawJSON.includes ? rawJSON.includes
      .map(i=>(new Item(i, this, onStateChange))) : [];
  }

  getName():string {
    return this.name;
  }

  hasItemDefinitionFor(name: string, avoidImports?: boolean):boolean{
    let status = this.rawData.childDefinitions.some(d=>d.name === name);
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

  getItemDefinitionRawFor(
    name: string,
    avoidImports?: boolean
  ):ItemDefinitionRawJSONDataType {
    let definition = this.rawData.childDefinitions
      .find(d=>d.name===name);
    if (!definition && !avoidImports){
      let importedDefinitionLoc = this.importedChildDefinitions
        .find(d=>d.join("/") === name || d[d.length - 1] === name);
      if (importedDefinitionLoc){
        return this.parentModule
          .getItemDefinitionRawFor(importedDefinitionLoc);
      }
    }

    if (!definition){
      throw new Error("Requested invalid definition " + name);
    }
    return definition;
  }

  getItemDefinitionInstanceFor(
    name: string,
    avoidImports?: boolean
  ):ItemDefinition {
    return new ItemDefinition(
      this.getItemDefinitionRawFor(name, avoidImports),
      this.parentModule,
      this,
      this.onStateChange
    );
  }

  hasPropertyDefinitionFor(id: string){
    return (this.rawData.properties || []).some(p=>p.id === id);
  }

  getPropertyDefinitionRawFor(id: string):PropertyDefinitionRawJSONDataType {
    let definition = (this.rawData.properties || []).find(p=>p.id === id);
    if (!definition){
      throw new Error("Requested invalid property " + id);
    }
    return definition;
  }

  getPropertyDefinitionInstanceFor(id: string):PropertyDefinition {
    return new PropertyDefinition(
      this.getPropertyDefinitionRawFor(id),
      this,
      this.onStateChange
    );
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
    return this.rawData.childDefinitions.map(d=>{
      return new ItemDefinition(
        d,
        this.parentModule,
        this.parentItemDefinition,
        this.onStateChange
      )
    });
  }

  areCalloutExcludesAllowed():boolean {
    return this.allowCalloutExcludes;
  }

  getNewInstance(){
    return new ItemDefinition(this.rawData, this.parentModule,
      this.parentItemDefinition, this.onStateChange);
  }

  /**
   * Provides the item definition item name
   * @param  locale the locale in iso form
   * @return        a string or null (if locale not valid)
   */
  getI18nNameFor(locale: string){
    return this.i18nName[locale] || null;
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
      allowCalloutExcludes: {
        type: "boolean"
      },
      includes: {},
      properties: {},
      importedChildDefinitions: {
        type: "array",
        items: {
          type: "array",
          items: {
            type: "string"
          }
        },
        minItems: 1,
        additionalItems: false
      },
      childDefinitions: {
        type: "array",
        items: {}
      }
    },
    required: ["type", "name", "location", "i18nName"],
    additionalProperties: false
  };

  //the validation function created by ajv
  ItemDefinition.schema_validate =
    ajv.compile(ItemDefinition.schema);

  ItemDefinition.check = function(
    rawJSON: ItemDefinitionRawJSONDataType
  ){
    //we check the schema for validity
    let valid = ItemDefinition.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      throw new CheckUpError(
        "Schema Check Failed",
        rawJSON.location,
        ItemDefinition.schema_validate.errors,
        rawJSON
      );
    };
  }
}
