import { PropertyDefinitionSupportedType } from "../PropertyDefinition/types";
import PropertyDefinition, { IPropertyDefinitionAlternativePropertyType } from "../PropertyDefinition";
import ItemDefinition from "..";
import Item from "../Item";
import Module from "../../../Module";

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
  attribute?: string;
  method?: "default" | "string" | "datetime";
  comparator: ConditionalRuleComparatorType;
  value: PropertyDefinitionSupportedType | IPropertyDefinitionAlternativePropertyType;
  valueAttribute?: string;
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

  public parentModule: Module;
  public parentItemDefinition: ItemDefinition;
  public parentPropertyDefinition: PropertyDefinition;
  public parentItem: Item;
  public rawData: IConditionalRuleSetRawJSONDataType;

  private condition: ConditionalRuleSet;

  /**
   * Constructor
   * @param rawJSON the raw data as JSON
   * @param parentModule the module where this node is located
   * @param parentItemDefinition the item definition that this node is
   * @param parentPropertyDefinition the property definition that contains the rule
   * located, it might not be available for example for condition
   * in prop extensions
   */
  constructor(
    rawJSON: IConditionalRuleSetRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    parentPropertyDefinition: PropertyDefinition,
    parentItem: Item,
  ) {
    this.rawData = rawJSON;
    this.condition = rawJSON.condition &&
      new ConditionalRuleSet(rawJSON.condition, parentModule,
        parentItemDefinition, parentPropertyDefinition, parentItem);

    this.parentItemDefinition = parentItemDefinition;
    this.parentModule = parentModule;
    this.parentPropertyDefinition = parentPropertyDefinition;
    this.parentItem = parentItem;
  }

  /**
   * Evaluates the result of the conditional value as this current point
   * as defined by the item defintion
   */
  public evaluate(id: number): boolean {
    // if this is a property type conditional rule set
    let result: boolean = false;
    const rawDataAsProperty: IConditionalRuleSetRawJSONDataPropertyType =
      this.rawData as IConditionalRuleSetRawJSONDataPropertyType;
    if (rawDataAsProperty.property) {

      // lets get the property value as for now
      let actualPropertyValue = null;
      if (rawDataAsProperty.property === "&this") {
        actualPropertyValue = this.parentPropertyDefinition.getCurrentValueClean(id);
      } else {
        actualPropertyValue = (this.parentItemDefinition ?
          this.parentItemDefinition
            .getPropertyDefinitionFor(rawDataAsProperty.property, true)
            .getCurrentValueClean(id) :
          this.parentModule.getPropExtensionFor(rawDataAsProperty.property)
            .getCurrentValueClean(id));
      }

      if (rawDataAsProperty.attribute && actualPropertyValue !== null) {
        actualPropertyValue = actualPropertyValue[rawDataAsProperty.attribute];
      }

      let actualComparedValue = rawDataAsProperty.value;
      if (actualComparedValue && (actualComparedValue as IPropertyDefinitionAlternativePropertyType).property) {
        const propertyInQuestion = (actualComparedValue as IPropertyDefinitionAlternativePropertyType).property;
        actualComparedValue = this.parentItemDefinition ?
          this.parentItemDefinition
            .getPropertyDefinitionFor(propertyInQuestion, true)
            .getCurrentValueClean(id) :
          this.parentModule.getPropExtensionFor(propertyInQuestion)
            .getCurrentValueClean(id);
      }

      if (rawDataAsProperty.valueAttribute && actualComparedValue !== null) {
        actualComparedValue = actualComparedValue[rawDataAsProperty.valueAttribute];
      }

      // This method swallows the nulls so it's allowed here
      if (rawDataAsProperty.method === "string") {
        actualPropertyValue = ((actualPropertyValue || "").toString()).toLocaleLowerCase();
        actualComparedValue = ((actualComparedValue || "").toString()).toLocaleLowerCase();
      }

      const invalidNullComparators = [
        "greater-than",
        "less-than",
        "greater-or-equal-than",
        "less-or-equal-than",
      ];

      const isAnInvalidNullComparator = invalidNullComparators.includes(rawDataAsProperty.comparator);
      if (
        (actualPropertyValue === null || actualComparedValue === null) &&
        isAnInvalidNullComparator
      ) {
        result = false;
      } else if (
        rawDataAsProperty.method === "datetime" &&
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
      const rawDataAsComponent: IConditionalRuleSetRawJSONDataComponentType =
        this.rawData as IConditionalRuleSetRawJSONDataComponentType;

      // let's check whether there is an item instance for that
      // component that are active (aka not excluded)
      const hasOneOf = rawDataAsComponent.component[0] === "#" ?
        this.parentItemDefinition.hasAnActiveInstanceOfId(id, rawDataAsComponent.component[0].substr(1)) :
        this.parentItemDefinition.hasAtLeastOneActiveInstanceOf(id, rawDataAsComponent.component);

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
      const conditionResult = this.condition.evaluate(id);

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
