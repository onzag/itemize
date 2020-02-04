/**
 * This file contains the critical code that runs the evaluation of the conditions
 * that are contained within an itemize schema
 *
 * Related files are schema.ts and checkers.ts for the build process
 *
 * @packageDocumentation
 */

import { PropertyDefinitionSupportedType } from "../PropertyDefinition/types";
import PropertyDefinition, {
  PropertyDefinitionValueType,
  IPropertyDefinitionExactPropertyValue,
  IPropertyDefinitionReferredPropertyValue,
} from "../PropertyDefinition";
import ItemDefinition from "..";
import Include from "../Include";
import Module from "../../../Module";

/**
 * Types for the conditions
 */
export type ConditionalRuleComparatorType = "equals" | "not-equal" |
  "greater-than" | "less-than" | "greater-or-equal-than" | "less-or-equal-than";
/**
 * Types for the gates that are available
 */
export type ConditionalRuleGateType = "or" | "and" | "xor";

/**
 * DATA TYPES (only used by the data item)
 */
interface IConditionalRuleSetRawJSONDataBaseType {
  gate?: ConditionalRuleGateType;
  condition?: IConditionalRuleSetRawJSONDataType;
}

/**
 * this is the raw json of a conditional rule set
 */
export interface IConditionalRuleSetRawJSONDataPropertyType
  extends IConditionalRuleSetRawJSONDataBaseType {
  /**
   * the property to be compared
   */
  property: string;
  /**
   * the attribute of that property, as some properties are objects
   */
  attribute?: string;
  /**
   * the method, default, string or datetime (uses Date)
   */
  method?: "default" | "string" | "datetime";
  /**
   * the comparator, equal, greater than, etc...
   */
  comparator: ConditionalRuleComparatorType;
  /**
   * the value to be compared against, either a value itself, or alternatively, a property
   */
  value: PropertyDefinitionValueType;
  /**
   * the attribute of the value, if any
   */
  valueAttribute?: string;
}

/**
 * this represents rules that are built for includes
 */
export interface IConditionalRuleSetRawJSONDataIncludeType
  extends IConditionalRuleSetRawJSONDataBaseType {
  /**
   * includes can either by matched by id or by name
   * the id of an include is unique, and is matched by using #identifier
   * and the name just doesn't include the numeral
   */
  include: string;
  /**
   * the inclusion state expected for the conditional rule to apply
   */
  isIncluded: boolean;
}

/**
 * both types of conditions combined
 */
export type IConditionalRuleSetRawJSONDataType =
  IConditionalRuleSetRawJSONDataPropertyType |
  IConditionalRuleSetRawJSONDataIncludeType;

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
 * ```
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
 * }
 * ```
 *
 * Conditional rule sets are chainable and might also include
 * components, components are the same as items, for example
 *
 * ```
 * {
 *  "name": "belt-keeper",
 *  "excludedIf": {
 *    "component": "belt",
 *    "isIncluded": false
 *  }
 * }
 * ```
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
   * the parent module of this condition
   */
  public parentModule: Module;
  /**
   * the item definition where it is contained
   */
  public parentItemDefinition: ItemDefinition;
  /**
   * the property that it is contained within, might be null for prop extensions
   */
  public parentPropertyDefinition: PropertyDefinition;
  /**
   * a parent include, if available, might be null
   */
  public parentInclude: Include;
  /**
   * the raw data that was used to generate this conditional rule set
   */
  public rawData: IConditionalRuleSetRawJSONDataType;

  /**
   * an internal condition for nested conditions
   */
  private condition: ConditionalRuleSet;

  /**
   * Constructor
   * @param rawJSON the raw data as JSON
   * @param parentModule the module where this node is located
   * @param parentItemDefinition the item definition that this node is
   * @param parentPropertyDefinition the property definition that contains the rule
   * located, it might not be available for example for condition
   * in prop extensions
   * @param parentInclude the item that contains this condition, such as in
   * exclusion rules, it might not be available as well
   */
  constructor(
    rawJSON: IConditionalRuleSetRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    parentPropertyDefinition: PropertyDefinition,
    parentInclude: Include,
  ) {
    // so we setup the initial properties
    this.rawData = rawJSON;
    this.condition = rawJSON.condition &&
      new ConditionalRuleSet(rawJSON.condition, parentModule,
        parentItemDefinition, parentPropertyDefinition, parentInclude);

    this.parentItemDefinition = parentItemDefinition;
    this.parentModule = parentModule;
    this.parentPropertyDefinition = parentPropertyDefinition;
    this.parentInclude = parentInclude;
  }

  /**
   * Evaluates the result of the conditional value as this current point
   * as defined by the item defintion
   * @param id the id to be used to retrieve values for properties during evaluation
   * @param version the version used to retrieve values as well
   * @returns a boolean on whether the conditional rule set passes or not
   */
  public evaluate(id: number, version: string): boolean {
    // if this is a property type conditional rule set
    let result: boolean = false;

    // so now let's check as a property
    const rawDataAsProperty: IConditionalRuleSetRawJSONDataPropertyType =
      this.rawData as IConditionalRuleSetRawJSONDataPropertyType;

    // if it's in fact a property type
    if (rawDataAsProperty.property) {

      // lets get the property value as for now
      let actualPropertyValue = null;
      // if the property is this current property
      if (rawDataAsProperty.property === "&this") {
        // then the value is from it
        actualPropertyValue = this.parentPropertyDefinition.getCurrentValue(id, version);
      } else {
        // otherwise we need to find that property, either from main or extensions
        actualPropertyValue = (this.parentItemDefinition ?
          this.parentItemDefinition
            .getPropertyDefinitionFor(rawDataAsProperty.property, true)
            .getCurrentValue(id, version) :
          this.parentModule.getPropExtensionFor(rawDataAsProperty.property)
            .getCurrentValue(id, version));
      }

      // if there is an attribute, then we use that attribute
      if (rawDataAsProperty.attribute && actualPropertyValue !== null) {
        actualPropertyValue = actualPropertyValue[rawDataAsProperty.attribute];
      }

      // now let's check what we are comparing against
      let actualComparedValue: PropertyDefinitionSupportedType;
      // so if we are talking about a property type
      if (actualComparedValue && (rawDataAsProperty.value as IPropertyDefinitionReferredPropertyValue).property) {
        // we get the property in question
        const propertyInQuestion = (rawDataAsProperty.value as IPropertyDefinitionReferredPropertyValue).property;
        // and that would represent what we actually comparing against
        actualComparedValue = this.parentItemDefinition ?
          this.parentItemDefinition
            .getPropertyDefinitionFor(propertyInQuestion, true)
            .getCurrentValue(id, version) :
          this.parentModule.getPropExtensionFor(propertyInQuestion)
            .getCurrentValue(id, version);
      } else {
        // otherwise it's the exact value we have provided
        actualComparedValue = (rawDataAsProperty.value as IPropertyDefinitionExactPropertyValue).exactValue;
      }

      // we also extract the attribute if necessary
      if (rawDataAsProperty.valueAttribute && actualComparedValue !== null) {
        actualComparedValue = actualComparedValue[rawDataAsProperty.valueAttribute];
      }

      // This method swallows the nulls so it's allowed here
      if (rawDataAsProperty.method === "string") {
        actualPropertyValue = ((actualPropertyValue || "").toString()).toLocaleLowerCase();
        actualComparedValue = ((actualComparedValue || "").toString()).toLocaleLowerCase();
      }

      // nulls cannot be compared via these methods so it gives false
      // any comparison involving null and these comparators gives false
      const invalidNullComparators = [
        "greater-than",
        "less-than",
        "greater-or-equal-than",
        "less-or-equal-than",
      ];

      // so we check if we have one of those
      const isAnInvalidNullComparator = invalidNullComparators.includes(rawDataAsProperty.comparator);
      // and if one of them is null
      if (
        (actualPropertyValue === null || actualComparedValue === null) &&
        isAnInvalidNullComparator
      ) {
        result = false;

      // otherwise using the datetime method
      } else if (
        rawDataAsProperty.method === "datetime" &&
        // and we have invalid dates, that's also impossible to compare
        (actualPropertyValue === "Invalid Date" || actualComparedValue === "Invalid Date") &&
        isAnInvalidNullComparator
      ) {
        result = false;
      } else {

        // null datetimes should be considered so the null check has to be in place
        if (rawDataAsProperty.method === "datetime") {
          actualPropertyValue = (new Date(actualPropertyValue as string)).getTime();
          actualComparedValue = (new Date(actualComparedValue as string)).getTime();
        }

        // lets fiddle with the comparator
        switch (rawDataAsProperty.comparator) {
          case "equals":
            result = actualPropertyValue === actualComparedValue;
            break;
          case "not-equal":
            result = actualPropertyValue !== actualComparedValue;
            break;
          case "greater-than":
            result = actualPropertyValue > actualComparedValue;
            break;
          case "less-than":
            result = actualPropertyValue < actualComparedValue;
            break;
          case "greater-or-equal-than":
            result = actualPropertyValue >= actualComparedValue;
            break;
          case "less-or-equal-than":
            result = actualPropertyValue <= actualComparedValue;
            break;
        }
      }
    // Otherwise in case it's a component based one
    } else {
      const rawDataAsComponent: IConditionalRuleSetRawJSONDataIncludeType =
        this.rawData as IConditionalRuleSetRawJSONDataIncludeType;

      // let's check whether there is an item instance for that
      // component that are active (aka not excluded)
      const hasOneOf = rawDataAsComponent.include[0] === "#" ?
        this.parentItemDefinition.hasAnActiveIncludeInstanceOfId(id, version, rawDataAsComponent.include.substr(1)) :
        this.parentItemDefinition.hasAtLeastOneActiveInstanceOf(id, version, rawDataAsComponent.include);

      // And compare the result against the isIncluded boolean
      result = (hasOneOf && rawDataAsComponent.isIncluded) ||
        (!hasOneOf && !rawDataAsComponent.isIncluded);
    }

    // now we have a result, but we might have a chain, a children condition
    if (this.condition) {
      if (this.rawData.gate === "and" && !result) {
        return false;
      } else if (this.rawData.gate === "or" && result) {
        return true;
      }

      // if we do we have to evaluate it
      const conditionResult = this.condition.evaluate(id, version);

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
