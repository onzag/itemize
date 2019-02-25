import PropertyDefinition, { PropertyDefinitionRawJSONDataType } from "./PropertyDefinition";
import Item, { ItemRawJSONDataType, ItemGroupHandle } from "./Item";
import Module, { ModuleRawJSONDataType } from "../Module";
import PropertiesValueMappingDefiniton from "./PropertiesValueMappingDefiniton";
import ConditionalRuleSet from "./ConditionalRuleSet";

export interface ItemDefinitionRawJSONDataType {
  //Builder data
  type: "item",

  //Avaialble for the builder
  location?: string,
  pointers?: any,
  raw?: string,

  //Avilable after a build
  name: string,
  i18nName: {
    [locale: string]: string
  },

  //original data
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
  public rawData: ItemDefinitionRawJSONDataType;
  private onStateChange: ()=>any;
  private itemInstances: Array<Item>;
  private childDefinitions: Array<ItemDefinition>;
  private importedChildDefinitions: Array<{
    fullName: string,
    definition: ItemDefinition
  }>;
  private propertyDefinitions: Array<PropertyDefinition>;
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
    this.onStateChange = onStateChange;

    this.childDefinitions = rawJSON.childDefinitions ? rawJSON.childDefinitions
      .map(d=>(new ItemDefinition(d, this.parentModule,
        this, onStateChange))) : [];
    this.importedChildDefinitions = rawJSON.importedChildDefinitions ?
      rawJSON.importedChildDefinitions.map(
        d=>({
          fullName: d.join("/"),
          definition: this.parentModule.getDetachedItemDefinitionInstanceFor(d)
        })) : []
    this.itemInstances = rawJSON.includes ? rawJSON.includes
      .map(i=>(new Item(i, this, onStateChange))) : [];
    this.propertyDefinitions = rawJSON.properties ? rawJSON.properties
      .map(i=>(new PropertyDefinition(i, this, onStateChange))) : [];
  }

  getName():string {
    return this.rawData.name;
  }

  hasItemDefinitionFor(name: string, avoidImports?: boolean):boolean{
    let status = this.rawData.childDefinitions.some(d=>d.name === name);
    if (!status && !avoidImports){
      let importedDefinitionLoc = this.rawData.importedChildDefinitions
        .find(d=>d.join("/") === name || d[d.length - 1] === name);
      if (importedDefinitionLoc){
        status =
          this.parentModule.hasItemDefinitionFor(importedDefinitionLoc);
      }
    }
    return status;
  }

  getItemDefinitionFor(
    name: string,
    avoidImports?: boolean
  ):ItemDefinition {
    let definition = this.childDefinitions
      .find(d=>d.getName()===name);
    if (!definition && !avoidImports){
      let importedDefinitionLoc = this.rawData.importedChildDefinitions
        .find(d=>d.join("/") === name || d[d.length - 1] === name);
      if (importedDefinitionLoc){
        let importedDefinitionName = importedDefinitionLoc.join("/");
        let found = this.importedChildDefinitions
          .find(d=>d.fullName === importedDefinitionName);
        if (found){
          definition = found.definition;
        }
      }
    }

    if (!definition){
      throw new Error("Requested invalid definition " + name);
    }

    return definition;
  }

  getItemDefinitionRawFor(name: string){
    let definition = ItemDefinition.getItemDefinitionRawFor(
      this.rawData,
      this.parentModule.rawData,
      name
    );
    if (!definition){
      throw new Error("Searching for item definition " +
        name + " failed");
    }
    return definition;
  }

  static getItemDefinitionRawFor(
    itemDefinitionRaw: ItemDefinitionRawJSONDataType,
    parentModuleRaw: ModuleRawJSONDataType,
    name: string
  ):ItemDefinitionRawJSONDataType {
    let definition = itemDefinitionRaw.childDefinitions
      .find(d=>d.name===name);
    if (!definition){
      let importedDefinitionLoc = itemDefinitionRaw.importedChildDefinitions
        .find(d=>d.join("/") === name || d[d.length - 1] === name);
      if (importedDefinitionLoc){
        let importedDefinitionName = importedDefinitionLoc.join("/");
        let importedPath = itemDefinitionRaw.importedChildDefinitions
          .find(d=>d.join("/") === importedDefinitionName);
        if (importedPath){
          definition = Module.getItemDefinitionRawFor(
            parentModuleRaw,
            importedPath
          );
        }
      }
    }

    return definition;
  }

  hasPropertyDefinitionFor(id: string){
    return (this.rawData.properties || []).some(p=>p.id === id);
  }

  getPropertyDefinitionFor(id: string):PropertyDefinition {
    let definition = this.propertyDefinitions.find(p=>p.getId() === id);
    if (!definition){
      throw new Error("Requested invalid property " + id);
    }
    return definition;
  }

  static getPropertyDefinitionRawFor(
    itemDefinitionRaw: ItemDefinitionRawJSONDataType,
    parentModuleRaw: ModuleRawJSONDataType,
    id: string
  ):PropertyDefinitionRawJSONDataType {
    let definition = itemDefinitionRaw.properties &&
      itemDefinitionRaw.properties.find(p=>p.id === id);
    if (!definition && parentModuleRaw.propExtensions){
      definition = parentModuleRaw.propExtensions.find(p=>p.id === id);
    }
    return definition || null;
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
    return this.rawData.allowCalloutExcludes;
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
    return this.rawData.i18nName[locale] || null;
  }

  getStructure(){

  }

  getPrettyStructure(){

  }

  //These are here but only truly available in non production
  static schema:any;
  static fileSchema:any;
}

if (process.env.NODE_ENV !== "production") {
  ItemDefinition.schema = {
    $id: "ItemDefinition",
    type: "object",
    properties: {
      type: {
        const: "item"
      },
      allowCalloutExcludes: {
        type: "boolean"
      },
      includes: {
        type: "array",
        items: {
          $ref: Item.schema.$id
        }
      },
      properties: {
        type: "array",
        items: {
          $ref: PropertyDefinition.schema.$id
        }
      },
      imports: {
        type: "array",
        items: {
          type: "string"
        },
        minItems: 1,
        additionalItems: false
      }
    },
    definitions: {
      PropertyDefinition: PropertyDefinition.schema,
      Item: Item.schema,
      PropertiesValueMappingDefiniton: PropertiesValueMappingDefiniton.schema,
      ConditionalRuleSet: ConditionalRuleSet.schema
    },
    required: ["type"],
    additionalProperties: false
  };
}
