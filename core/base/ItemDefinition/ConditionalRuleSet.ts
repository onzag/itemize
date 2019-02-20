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
 *    "comparator": "not-equals",
 *    "value": "motorbike",
 *    "gate": "or",
 *    "condition": {
 *      "property": "drive-type",
 *      "comparator": "not-equals",
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

import ItemDefinition from '.';
import { CheckUpError } from '../Error';
import PropertyDefinition, { PropertyDefinitionSupportedType } from './PropertyDefinition';

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv();
}

//Types for the conditions
export type ConditionalRuleComparatorType = "equals" | "not-equals" |
  "greater-than" | "less-than" | "greater-or-equal-than" | "less-or-equal-than"
//Types for the gates that are available
export type ConditionalRuleGateType = "or" | "and" | "xor";

//DATA TYPES (only used by the data item)
interface ConditionalRuleSetRawJSONDataBaseType {
  gate?: ConditionalRuleGateType,
  condition?: ConditionalRuleSetRawJSONDataType
}

interface ConditionalRuleSetRawJSONDataPropertyType
  extends ConditionalRuleSetRawJSONDataBaseType {
  property: string,
  comparator: ConditionalRuleComparatorType,
  value: PropertyDefinitionSupportedType
}

interface ConditionalRuleSetRawJSONDataComponentType
  extends ConditionalRuleSetRawJSONDataBaseType {
  component: string,
  isIncluded: boolean
}

export type ConditionalRuleSetRawJSONDataType =
  ConditionalRuleSetRawJSONDataPropertyType |
  ConditionalRuleSetRawJSONDataComponentType;

//Class begins
export default class ConditionalRuleSet {
  //For property based conditionals
  //The property in question (might be null)
  private property?: string;
  //the comparator > < >= <= etc... in string form
  private comparator?: ConditionalRuleComparatorType;
  //the value is compared against
  private value?: PropertyDefinitionSupportedType;

  //for component based conditionals
  //the component in question
  private component?: string;
  //whether is included or not
  private isIncluded?: boolean;

  //the gate, and, or, xor
  private gate?: ConditionalRuleGateType;
  private condition?: ConditionalRuleSet;

  //default values
  public parentItemDefinition:ItemDefinition;

  /**
   * Constructor
   * @param rawJSON                the raw data as JSON
   * @param parentItemDefinition   the item definition that this node is
   *                               located, its root; for the example above that
   *                               would be the vehicle item definition
   */
  constructor(
    rawJSON: ConditionalRuleSetRawJSONDataType,
    parentItemDefinition: ItemDefinition
  ){

    if (process.env.NODE_ENV !== "production") {
      ConditionalRuleSet.check(rawJSON, parentItemDefinition);
    }

    this.property =
      (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).property;
    this.comparator =
      (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).comparator;
    this.value =
      (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).value;

    this.component =
      (<ConditionalRuleSetRawJSONDataComponentType>rawJSON).component;
    this.isIncluded =
      (<ConditionalRuleSetRawJSONDataComponentType>rawJSON).isIncluded;

    this.gate = rawJSON.gate;
    this.condition = rawJSON.condition &&
      new ConditionalRuleSet(rawJSON.condition, parentItemDefinition);

    this.parentItemDefinition = parentItemDefinition;
  }

  //These are here but only truly available in non production
  static schema:any;
  static schema_validate:any;
  static check:any;

  /**
   * Evaluates the result of the conditional value as this current point
   * as defined by the item defintion
   * @return a boolean with the result of the condition evaluation
   */
  evaluate():boolean {
    //if this is a property type conditional rule set
    if (this.property){

      //lets get the property value as for now
      let actualPropertyValue =
        this.parentItemDefinition.getPropertyDefinitionFor(this.property)
        .getCurrentValue().value;

      //the result by default is false
      let result = false;

      //lets fiddle with the comparator
      switch (this.comparator){
        case "equals":
          result = actualPropertyValue === this.value;
          break;
        case "not-equals":
          result = actualPropertyValue !== this.value;
          break;
        case "greater-than":
          result = actualPropertyValue > this.value;
          break;
        case "less-than":
          result = actualPropertyValue < this.value;
          break;
        case "greater-or-equal-than":
          result = actualPropertyValue >= this.value;
          break;
        case "less-or-equal-than":
          result = actualPropertyValue <= this.value;
          break;
      }

      //now we have a result, but we might have a chain, a children condition
      if (this.condition){
        //if we do we have to evaluate it
        let conditionResult = this.condition.evaluate();

        //and use the gate to calculate the proper result
        switch (this.gate){
          case "and":
            return result && conditionResult;
            break;
          case "or":
            return result || conditionResult;
            break;
          case "xor":
            return result ? !conditionResult : conditionResult;
            break;
        }
      }

      //Otherwise we just return the result
      return result;

    //Otherwise in case it's a component based one
    } else {
      //let's check whether there is an item instance for that
      //component that are active (aka not excluded)
      let hasOneOf = this.parentItemDefinition
        .hasAtLeastOneActiveInstanceOf(this.component);

      //And compare the result against the isIncluded boolean
      return (hasOneOf && this.isIncluded) ||
        (!hasOneOf && !this.isIncluded);
    }
  }
}

//So the setup for the checking for the development
//Version
if (process.env.NODE_ENV !== "production") {

  //The comparators we support
  let comparators = ["equals", "not-equals", "greater-than", "less-than",
    "greater-or-equal-than", "less-or-equal-than"];
  //The gates
  let gates = ["and", "or", "xor"];

  //The schema
  ConditionalRuleSet.schema = {
    type: "object",
    //We have two schemas in reality, one for the
    //property based rule set and another one for the
    //component based one
    oneOf: [
      //this is the property based one
      {
        properties: {
          //property
          property: {type: "string"},
          //comparator
          comparator: {
            type: "string",
            enum: comparators
          },
          //value
          value: {
            //despite of being able to use any of the property
            //definition values we only allow for string numbers
            //and booleans
            type: ["string", "number", "boolean", "null"]
          },
          //gate
          gate: {
            type: "string",
            enum: gates
          },
          //condition (any allowed conditions are not checked)
          //even when it'd be possible to do it as a recursive
          //reference with the json schema 7.0 definition for #
          //because we can get more comprehensive errors when
          //the condition is instanciated later
          condition: {}
        },
        required: ["property", "comparator", "value"],

        //They codepend on each other
        dependencies: {
          gate: ["condition"],
          condition: ["gate"]
        },

        additionalProperties: false
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
        },

        additionalProperties: false
      }
    ]
  };

  //the validate function
  ConditionalRuleSet.schema_validate = ajv.compile(ConditionalRuleSet.schema);

  //And the function that does the actual checking
  ConditionalRuleSet.check = function(
    rawJSON: ConditionalRuleSetRawJSONDataType,
    parentItemDefinition: ItemDefinition){

    //Let's validate the raw json
    let valid = ConditionalRuleSet.schema_validate(rawJSON);
    if (!valid) {
      throw new CheckUpError(
        "Schema Check Failed",
        parentItemDefinition.location,
        ConditionalRuleSet.schema_validate.errors,
        rawJSON
      );
    };

    //Let's try to search for the item definition for that given component
    //should be there at least to be valid, even if item instances are never
    //created
    let component =
      (<ConditionalRuleSetRawJSONDataComponentType>rawJSON).component;
    if (component &&
      !parentItemDefinition.hasItemDefinitionFor(component)){
      throw new CheckUpError(
        "Conditional rule set item definition not avaibale",
        parentItemDefinition.location,
        {component},
        rawJSON
      );
    }

    //Let's try to find the property that is specified and check
    //whether the value type is valid
    let property =
      (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).property;
    let value =
      (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).value;

    if (property &&
      !parentItemDefinition.hasPropertyDefinitionFor(property)){
      let obj:any = {};
      obj[property] = value;
      throw new CheckUpError(
        "Conditional rule set property invalid at",
        parentItemDefinition.location,
        obj,
        rawJSON
      );
    }
  }
}
