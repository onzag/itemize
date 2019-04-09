import ItemDefinition from ".";
import { PropertyDefinitionSupportedType } from "./PropertyDefinition";
import Module from "../Module";

// Types for the conditions
export type ConditionalRuleComparatorType = "equals" | "not-equal" |
  "greater-than" | "less-than" | "greater-or-equal-than" | "less-or-equal-than";
// Types for the gates that are available
export type ConditionalRuleGateType = "or" | "and" | "xor";

// DATA TYPES (only used by the data item)
interface IConditionalRuleSetRawJSONDataBaseType {
  gate?: ConditionalRuleGateType;
  condition?: IConditionalRuleSetRawJSONDataType;
}

export interface IConditionalRuleSetRawJSONDataPropertyType
  extends IConditionalRuleSetRawJSONDataBaseType {
  property: string;
  comparator: ConditionalRuleComparatorType;
  value: PropertyDefinitionSupportedType;
}

export interface IConditionalRuleSetRawJSONDataComponentType
  extends IConditionalRuleSetRawJSONDataBaseType {
  component: string;
  isIncluded: boolean;
}

export type IConditionalRuleSetRawJSONDataType =
  IConditionalRuleSetRawJSONDataPropertyType |
  IConditionalRuleSetRawJSONDataComponentType;

/**
 * This class provides conditional rule sets that are set for
 * an specific situation to take place, it has multiple uses
 * like disabling an item, or making a property a certain value
 * conditional rule sets are chainable and represents rules
 * based on properties or items
 *
 * for example say we have an item vehicle and which one is
 * motorbike and a motorbike might have a belt, chain or shaft
 * lets say we also decided to add a property drive-type to
 * the vehicle class
 *
 * So we make a rule for this
 *
 * {
 *  "name": "belt",
 *  "excludedIf": {
 *    "property": "type",
 *    "comparator": "not-equal",
 *    "value": "motorbike",
 *    "gate": "or",
 *    "condition": {
 *      "property": "drive-type",
 *      "comparator": "not-equal",
 *      "value": "belt-drive"
 *    }
 *  }
 * },
 *
 * Conditional rule sets are chainable and might also include
 * components, components are the same as items, for example
 *
 * {
 *  "name": "belt-keeper",
 *  "excludedIf": {
 *    "component": "belt",
 *    "isIncluded": false
 *  }
 * },
 *
 * This means that the belt-keeper item is not available if there is no such
 * thing as a belt included
 *
 * Rule sets are also available for things like properties, whether they
 * are available or not, default values, might exclusions, etc... they
 * are very practical, but limited on purpose to avoid excessive complexity
 */
export default class ConditionalRuleSet {
  /**
   * Schema only available in development
   */
  public static schema: any;

  public parentModule: Module;
  public parentItemDefinition: ItemDefinition;
  public rawData: IConditionalRuleSetRawJSONDataType;

  private condition: ConditionalRuleSet;

  /**
   * Constructor
   * @param rawJSON the raw data as JSON
   * @param parentModule the module where this node is located
   * @param parentItemDefinition the item definition that this node is
   * located, it might not be available for example for condition
   * in prop extensions
   */
  constructor(
    rawJSON: IConditionalRuleSetRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
  ) {
    this.rawData = rawJSON;
    this.condition = rawJSON.condition &&
      new ConditionalRuleSet(rawJSON.condition, parentModule, parentItemDefinition);

    this.parentItemDefinition = parentItemDefinition;
    this.parentModule = parentModule;
  }

  /**
   * Evaluates the result of the conditional value as this current point
   * as defined by the item defintion
   */
  public evaluate(): boolean {
    // if this is a property type conditional rule set
    let result: boolean = false;
    const rawDataAsProperty: IConditionalRuleSetRawJSONDataPropertyType =
      this.rawData as IConditionalRuleSetRawJSONDataPropertyType;
    if (rawDataAsProperty.property) {

      // lets get the property value as for now
      const actualPropertyValue = this.parentItemDefinition ?
        this.parentItemDefinition
          .getPropertyDefinitionFor(rawDataAsProperty.property, true)
          .getCurrentValue().value :
        this.parentModule.getPropExtensionFor(rawDataAsProperty.property)
          .getCurrentValue().value;

      // lets fiddle with the comparator
      switch (rawDataAsProperty.comparator) {
        case "equals":
          result = actualPropertyValue === rawDataAsProperty.value;
          break;
        case "not-equal":
          result = actualPropertyValue !== rawDataAsProperty.value;
          break;
        case "greater-than":
          result = actualPropertyValue > rawDataAsProperty.value;
          break;
        case "less-than":
          result = actualPropertyValue < rawDataAsProperty.value;
          break;
        case "greater-or-equal-than":
          result = actualPropertyValue >= rawDataAsProperty.value;
          break;
        case "less-or-equal-than":
          result = actualPropertyValue <= rawDataAsProperty.value;
          break;
      }
    // Otherwise in case it's a component based one
    } else {
      const rawDataAsComponent: IConditionalRuleSetRawJSONDataComponentType =
        this.rawData as IConditionalRuleSetRawJSONDataComponentType;

      // let's check whether there is an item instance for that
      // component that are active (aka not excluded)
      const hasOneOf = this.parentItemDefinition
        .hasAtLeastOneActiveInstanceOf(rawDataAsComponent.component);

      // And compare the result against the isIncluded boolean
      result = (hasOneOf && rawDataAsComponent.isIncluded) ||
        (!hasOneOf && !rawDataAsComponent.isIncluded);
    }

    // now we have a result, but we might have a chain, a children condition
    if (this.condition) {
      // if we do we have to evaluate it
      const conditionResult = this.condition.evaluate();

      // and use the gate to calculate the proper result
      switch (this.rawData.gate) {
        case "and":
          return result && conditionResult;
        case "or":
          return result || conditionResult;
        case "xor":
          return result ? !conditionResult : conditionResult;
      }
    } else {
      return result;
    }
  }
}

// So the setup for the checking for the development
// Version
if (process.env.NODE_ENV !== "production") {

  // The comparators we support
  const comparators = ["equals", "not-equal", "greater-than", "less-than",
    "greater-or-equal-than", "less-or-equal-than"];
  // The gates
  const gates = ["and", "or", "xor"];

  // The schema
  ConditionalRuleSet.schema = {
    $id: "ConditionalRuleSet",
    type: "object",
    // We have two schemas in reality, one for the
    // property based rule set and another one for the
    // component based one
    oneOf: [
      // this is the property based one
      {
        properties: {
          // property
          property: {type: "string"},
          // comparator
          comparator: {
            type: "string",
            enum: comparators,
          },
          // value
          value: {
            // despite of being able to use any of the property
            // definition values we only allow for string numbers
            // and booleans
            type: ["string", "number", "boolean", "null"],
          },
          // gate
          gate: {
            type: "string",
            enum: gates,
          },
          // condition (any allowed conditions are not checked)
          // even when it'd be possible to do it as a recursive
          // reference with the json schema 7.0 definition for #
          // because we can get more comprehensive errors when
          // the condition is instanciated later
          condition: {
            $ref: "ConditionalRuleSet",
          },
        },
        required: ["property", "comparator", "value"],

        // They codepend on each other
        dependencies: {
          gate: ["condition"],
          condition: ["gate"],
        },

        additionalProperties: false,
      },
      {
        properties: {
          component: {type: "string"},
          isIncluded: {type: "boolean"},
          gate: {
            type: "string",
            enum: gates,
          },
          condition: {
            $ref: "ConditionalRuleSet",
          },
        },
        required: ["component", "isIncluded"],
        dependencies: {
          gate: ["condition"],
          condition: ["gate"],
        },

        additionalProperties: false,
      },
    ],
  };
}
