import ItemDefinition from '../ItemDefinition';
import PropertiesValueMappingDefiniton, { PropertiesValueMappingDefinitonRawJSONDataType } from './PropertiesValueMappingDefiniton';
import ConditionalRuleSet, { ConditionalRuleSetRawJSONDataType } from './ConditionalRuleSet';

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export interface ItemRawJSONDataType {
  name: string,
  enforcedProperties?: PropertiesValueMappingDefinitonRawJSONDataType,
  predefinedProperties?: PropertiesValueMappingDefinitonRawJSONDataType,
  excludedIf: ConditionalRuleSetRawJSONDataType,
  mightExclude?: boolean,
  mightExcludeIf?: ConditionalRuleSetRawJSONDataType,
  defaultExcluded?: boolean,
  defaultExcludedIf?: ConditionalRuleSetRawJSONDataType,
  rare?: boolean
}

class Item {
  public parentItemDefinition:ItemDefinition;
  public parent:any;

  private itemDefinition: ItemDefinition;
  private enforcedProperties: PropertiesValueMappingDefiniton;
  private predefinedProperties: PropertiesValueMappingDefiniton;
  private excludedIf: ConditionalRuleSet;
  private mightExclude: boolean;
  private mightExcludeIf: ConditionalRuleSet;
  private defaultExcluded: boolean;
  private defaultExcludedIf: ConditionalRuleSet;
  private rare: boolean;

  private initialized:boolean;

  private onStateChange:()=>any;
  private state_isExcluded:boolean;
  private state_hasBeenModified:boolean;

  constructor(
    rawJSON: ItemRawJSONDataType,
    parent: any,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any){

    if (process.env.NODE_ENV !== "production") {
      Item.check(rawJSON, parent, parentItemDefinition);
    }

    this.itemDefinition = parentItemDefinition
      .getItemDefinitionFor(rawJSON.name);

    this.itemDefinition
      .addOnStateChangeListener(this.recalculateExclusionState);

    this.enforcedProperties = rawJSON.enforcedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.enforcedProperties, this,
        parentItemDefinition, this.itemDefinition);

    this.predefinedProperties = rawJSON.predefinedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.predefinedProperties, this,
        parentItemDefinition, this.itemDefinition);

    this.excludedIf = rawJSON.excludedIf &&
      new ConditionalRuleSet(rawJSON.excludedIf, this, parentItemDefinition);

    this.mightExclude = rawJSON.mightExclude;

    this.mightExcludeIf = rawJSON.mightExcludeIf &&
      new ConditionalRuleSet(rawJSON.mightExcludeIf, this, parentItemDefinition);

    this.defaultExcluded = rawJSON.defaultExcluded;

    this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
      new ConditionalRuleSet(rawJSON.defaultExcludedIf, this,
        parentItemDefinition);

    this.rare = rawJSON.rare;

    this.parent = parent;
    this.parentItemDefinition = parentItemDefinition;

    this.onStateChange = onStateChange;
    this.state_hasBeenModified = false;
    this.initialized = false;
  }
  initialize(){
    if (this.initialized){
      throw new Error("Item has already been initialized");
    }

    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();
    let canBeExcluded = this.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());
    let isDefaultExcluded = this.defaultExcluded ||
      (this.defaultExcludedIf && this.defaultExcludedIf.evaluate());

    this.state_isExcluded = isExcludedByForce ||
      (canBeExcluded && isDefaultExcluded) || false;

    this.initialized = true;
  }
  recalculateExclusionState(){
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    }

    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();
    let canBeExcluded = this.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());
    let isDefaultExcluded = this.defaultExcluded ||
      (this.defaultExcludedIf && this.defaultExcludedIf.evaluate());

    if (isExcludedByForce && !this.state_isExcluded){
      this.state_isExcluded = true;
      this.onStateChange();
      return;
    } else if (!canBeExcluded && this.state_isExcluded){
      this.state_isExcluded = false;
      this.onStateChange();
      return;
    }

    if (!this.state_hasBeenModified){
      this.state_isExcluded = isDefaultExcluded || false;
    }
  }
  isCurrentlyExcluded(){
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    }

    return this.state_isExcluded;
  }
  canExclusionBeToggled(){
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    }

    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();
    if (isExcludedByForce){
      return false;
    }

    return this.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());
  }
  toggleExclusionState(){
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    } else if (!this.canExclusionBeToggled()){
      throw new Error("Exclusion cannot be toggled");
    }
    this.state_hasBeenModified = true;
    this.state_isExcluded = !this.state_isExcluded;
    this.onStateChange();
  }
  isRare(){
    return this.rare;
  }
  hasSinkingProperties(){

  }
  getSinkingPropertiesList(){

  }
  setSinkingProperty(name: string, value: boolean | number | string){

  }
  getSinkingProperty(name: string){

  }
  static schema:any;
  static schema_validate:any;
  static check:any;
}
