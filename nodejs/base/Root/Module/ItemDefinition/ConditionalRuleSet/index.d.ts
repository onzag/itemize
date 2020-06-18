/**
 * This file contains the critical code that runs the evaluation of the conditions
 * that are contained within an itemize schema
 *
 * Related files are schema.ts and checkers.ts for the build process
 *
 * @packageDocumentation
 */
import PropertyDefinition, { PropertyDefinitionValueType } from "../PropertyDefinition";
import ItemDefinition from "..";
import Include from "../Include";
import Module from "../../../Module";
/**
 * Types for the conditions
 */
export declare type ConditionalRuleComparatorType = "equals" | "not-equal" | "greater-than" | "less-than" | "greater-or-equal-than" | "less-or-equal-than";
/**
 * Types for the gates that are available
 */
export declare type ConditionalRuleGateType = "or" | "and" | "xor";
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
export interface IConditionalRuleSetRawJSONDataPropertyType extends IConditionalRuleSetRawJSONDataBaseType {
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
    method?: "default" | "string" | "date" | "datetime" | "time";
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
export interface IConditionalRuleSetRawJSONDataIncludeType extends IConditionalRuleSetRawJSONDataBaseType {
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
export declare type IConditionalRuleSetRawJSONDataType = IConditionalRuleSetRawJSONDataPropertyType | IConditionalRuleSetRawJSONDataIncludeType;
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
 *      "value": {
 *        "exactValue": "belt-drive"
 *      }
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
    parentModule: Module;
    /**
     * the item definition where it is contained
     */
    parentItemDefinition: ItemDefinition;
    /**
     * the property that it is contained within, might be null for prop extensions
     */
    parentPropertyDefinition: PropertyDefinition;
    /**
     * a parent include, if available, might be null
     */
    parentInclude: Include;
    /**
     * the raw data that was used to generate this conditional rule set
     */
    rawData: IConditionalRuleSetRawJSONDataType;
    /**
     * an internal condition for nested conditions
     */
    private condition;
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
    constructor(rawJSON: IConditionalRuleSetRawJSONDataType, parentModule: Module, parentItemDefinition: ItemDefinition, parentPropertyDefinition: PropertyDefinition, parentInclude: Include);
    /**
     * Evaluates the result of the conditional value as this current point
     * as defined by the item defintion
     * @param id the id to be used to retrieve values for properties during evaluation
     * @param version the version used to retrieve values as well
     * @returns a boolean on whether the conditional rule set passes or not
     */
    evaluate(id: number, version: string): boolean;
}
export {};
