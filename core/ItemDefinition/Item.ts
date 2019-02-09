import ItemDefinition from '../ItemDefinition';
import PropertiesValueMappingDefiniton, { PropertiesValueMappingDefinitonDataType } from './PropertiesValueMappingDefiniton';
import ConditionalRuleSet, { ConditionalRuleSetDataType } from './ConditionalRuleSet';

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export interface ItemDataType {
  name: string,
  enforcedProperties: PropertiesValueMappingDefinitonDataType,
  predefinedProperties: PropertiesValueMappingDefinitonDataType,
  excludedIf: ConditionalRuleSetDataType,
  mightExclude?: boolean,
  mightExcludeIf?: ConditionalRuleSetDataType,
  defaultExcluded?: boolean,
  defaultExcludedIf?: ConditionalRuleSetDataType,
  rare?: boolean
}

class Item {
  public parentItemDefinition:ItemDefinition;
  public parent:any;
  constructor(data: PropertiesValueMappingDefinitonDataType, parent: any, parentItemDefinition: ItemDefinition, runChecks?: boolean){
    if (process.env.NODE_ENV !== "production") {
      runChecks && Item.check(properties, parent, parentItemDefinition, referredItemDefinition);
    }
    this.properties = properties;
    this.parent = parent;
    this.parentItemDefinition = parentItemDefinition;
    this.referredItemDefinition = referredItemDefinition;
  }
  static schema;
  static schema_validate;
  static check;
}
