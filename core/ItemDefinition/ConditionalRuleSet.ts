import ItemDefinition from '../ItemDefinition';

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

//USEFUL TYPES
export type ConditionalRuleComparatorType = "equals" | "not-equals" | "greater-than" | "less-than" | "greater-or-equal-than" | "less-or-equal-than"
export type ConditionalRuleGateType = "or" | "and" | "xor";

//DATA TYPES (only used by the data item)
interface ConditionalRuleSetDataBaseType {
  gate?: ConditionalRuleGateType,
  condition?: ConditionalRuleSetDataType
}

interface ConditionalRuleSetDataPropertyType extends ConditionalRuleSetDataBaseType {
  property: string,
  comparator: ConditionalRuleComparatorType,
  value: boolean | string | number
}

interface ConditionalRuleSetDataComponentType extends ConditionalRuleSetDataBaseType {
  component: string,
  isIncluded: boolean
}

export type ConditionalRuleSetDataType = ConditionalRuleSetDataPropertyType | ConditionalRuleSetDataComponentType;

export default class ConditionalRuleSet {
  private property: string;
  private comparator: ConditionalRuleComparatorType;
  private value: boolean | string | number;
  private component: string;
  private isIncluded: boolean;
  private gate: ConditionalRuleGateType;
  private condition: ConditionalRuleSet;
  public parentItemDefinition:ItemDefinition;
  public parent:any;

  constructor(condition: ConditionalRuleSetDataType, parent: any, parentItemDefinition: ItemDefinition, runChecks: boolean){
    if (process.env.NODE_ENV !== "production") {
      runChecks && ConditionalRuleSet.check(condition, parent, parentItemDefinition);
    }

    this.property = (<ConditionalRuleSetDataPropertyType>condition).property;
    this.comparator = (<ConditionalRuleSetDataPropertyType>condition).comparator;
    this.value = (<ConditionalRuleSetDataPropertyType>condition).value;

    this.component = (<ConditionalRuleSetDataComponentType>condition).component;
    this.isIncluded = (<ConditionalRuleSetDataComponentType>condition).isIncluded;

    this.gate = condition.gate;
    this.condition = condition.condition && new ConditionalRuleSet(condition.condition, this, parentItemDefinition, runChecks);

    this.parent = parent;
    this.parentItemDefinition = parentItemDefinition;
  }
  static schema;
  static schema_validate;
  static check;

  evaluate(){
    if (this.property){
      let actualPropertyValue = this.parentItemDefinition.getPropertyValue(this.property);

      switch (this.comparator){
        case "equals":
          return actualPropertyValue === this.value;
          break;
        case "not-equals":
          return actualPropertyValue !== this.value;
          break;
        case "greater-than":
          return actualPropertyValue > this.value;
          break;
        case "less-than":
          return actualPropertyValue < this.value;
          break;
        case "greater-or-equal-than":
          return actualPropertyValue >= this.value;
          break;
        case "less-or-equal-than":
          return actualPropertyValue <= this.value;
          break;
      }

      return false;

    } else {
      let items = this.parentItemDefinition.getItemInstances(this.component);
      return (items.length && this.isIncluded) ||
        (!items.length && !this.isIncluded);
    }
  }
}

if (process.env.NODE_ENV !== "production") {
  let comparators = ["equals", "not-equals", "greater-than", "less-than",
    "greater-or-equal-than", "less-or-equal-than"];
  let gates = ["and", "or", "xor"];

  ConditionalRuleSet.schema = {
    type: "object",
    additionalProperties: false,
    oneOf: [
      {
        properties: {
          property: {type: "string"},
          comparator: {
            type: "string",
            enum: comparators
          },
          value: {
            type: ["string", "number", "boolean"]
          },
          gate: {
            type: "string",
            enum: gates
          },
          condition: {}
        },
        required: ["property", "comparator", "value"],
        dependencies: {
          gate: ["condition"],
          condition: ["gate"]
        }
      },
      {
        properties: {
          component: {type: "string"},
          isIncluded: {type: "boolean"},
          gate: {
            type: "string",
            enum: gates
          },
          condition: {}
        },
        required: ["property", "comparator", "value"],
        dependencies: {
          gate: ["condition"],
          condition: ["gate"]
        }
      },
    ]
  };
  ConditionalRuleSet.schema_validate = ajv.compile(ConditionalRuleSet.schema);
  ConditionalRuleSet.check = function(condition: ConditionalRuleSetDataType, parent: any, parentItemDefinition: ItemDefinition){
    let valid = ConditionalRuleSet.schema_validate(condition);
    if (!valid) {
      console.log(ConditionalRuleSet.schema_validate.errors);
      throw new Error();
    };

    if ((<ConditionalRuleSetDataComponentType>condition).component &&
      !parentItemDefinition.hasItemDefinitionFor((<ConditionalRuleSetDataComponentType>condition).component)){
      console.error("Conditional rule set itemDefinition not avaibale at", condition, "named", (<ConditionalRuleSetDataComponentType>condition).component);
      return;
    }

    if ((<ConditionalRuleSetDataPropertyType>condition).property &&
      !parentItemDefinition.hasProperty((<ConditionalRuleSetDataPropertyType>condition).property)){
      console.error("Conditional rule set property not avaibale at", condition, "named", (<ConditionalRuleSetDataPropertyType>condition).property);
      return;
    }

    return false;
  }
}
