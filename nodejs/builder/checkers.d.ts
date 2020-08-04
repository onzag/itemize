/**
 * Contains checker functions that check the structure of the itemize schema
 * regarding things and correlations that might have been missed by the
 * ajv schema checker (because not everything can be setup as a json schema)
 * eg. interactions, imports, etc...
 *
 * @packageDocumentation
 */
import { IRootRawJSONDataType } from "../base/Root";
import Traceback from "./Traceback";
import "source-map-support/register";
import { IConditionalRuleSetRawJSONDataType } from "../base/Root/Module/ItemDefinition/ConditionalRuleSet";
import { IItemDefinitionRawJSONDataType } from "../base/Root/Module/ItemDefinition";
import { IModuleRawJSONDataType, IRawJSONI18NDataType } from "../base/Root/Module";
import { IPropertyDefinitionRawJSONDataType } from "../base/Root/Module/ItemDefinition/PropertyDefinition";
import { IIncludeRawJSONDataType } from "../base/Root/Module/ItemDefinition/Include";
import { IPropertiesValueMappingDefinitonRawJSONDataType } from "../base/Root/Module/ItemDefinition/PropertiesValueMappingDefiniton";
/**
 * Checks a conditional rule set so that it is valid and contains valid
 * includes and rules
 * @param rawData the raw data of the conditional rule set
 * @param parentItemDefinition the parent item definition where the ruleset resides (if any,
 * it is null for prop extensions)
 * @param parentModule the parent module where the ruleset resides
 * @param traceback the traceback object
 */
export declare function checkConditionalRuleSet(rawData: IConditionalRuleSetRawJSONDataType, parentItemDefinition: IItemDefinitionRawJSONDataType, parentModule: IModuleRawJSONDataType, traceback: Traceback): void;
/**
 * Checks an item definition so that all its imports, name, and so on
 * do match the specification as it is required
 * @param rawRootData the root data
 * @param rawData the item definition data
 * @param parentModule the raw parent module
 * @param traceback the traceback object
 */
export declare function checkItemDefinition(rawRootData: IRootRawJSONDataType, rawData: IItemDefinitionRawJSONDataType, parentModule: IModuleRawJSONDataType, traceback: Traceback): void;
/**
 * Checks an include that exist within the item definition, include represents
 * inclusion of properties as an sub item within another item, it's like prop
 * extensions but in reverse
 * @param rawData the raw data of the include
 * @param parentItemDefinition the parent item definition that contains the include
 * @param parentModule the parent module that contains the item definition
 * @param idPool the id pool is a referred array that checks that there are no
 * duplicate includes with the same id
 * @param traceback the traceback already pointing to this include
 */
export declare function checkInclude(rawData: IIncludeRawJSONDataType, parentItemDefinition: IItemDefinitionRawJSONDataType, parentModule: IModuleRawJSONDataType, idPool: string[], traceback: Traceback): void;
/**
 * Checks the properties value mapping definition that is in use
 * by predefined and enforced properties
 * @param rawData the raw data of that value mapping
 * @param parentItemDefinition the parent item definition
 * @param referredItemDefinition the referred item definition it refers to as this
 * is used within includes
 * @param parentModule the parent module of both item definitions
 * @param traceback the traceback already pointing to this mapping
 */
export declare function checkPropertiesValueMappingDefiniton(rawData: IPropertiesValueMappingDefinitonRawJSONDataType, parentItemDefinition: IItemDefinitionRawJSONDataType, referredItemDefinition: IItemDefinitionRawJSONDataType, parentModule: IModuleRawJSONDataType, traceback: Traceback): void;
/**
 * Checks a property definition to ensure consistency
 * @param rawData the raw data of the property
 * @param parentItemDefinition the parent item definition where the property is contained
 * if any, as it could be a prop extension
 * @param parentModule the parent module
 * @param traceback the traceback already pointing to this property
 */
export declare function checkPropertyDefinition(rawData: IPropertyDefinitionRawJSONDataType, parentItemDefinition: IItemDefinitionRawJSONDataType, parentModule: IModuleRawJSONDataType, traceback: Traceback): void;
/**
 * Checks the i18n data consistency of custom keys
 * so that they are present in all languages
 * @param rawData the raw i18n data
 * @param traceback the traceback already pointing to this file
 * the i18n data comes from a .properties file which cannot be pointed
 */
export declare function checkI18nCustomConsistency(rawData: IRawJSONI18NDataType, traceback: Traceback): void;
/**
 * Checks a module for consistency as well as all its prop extensions
 * @param rawRootData the root data where this module is located
 * @param rawData the raw data of the module itself
 * @param traceback the traceback object
 */
export declare function checkModule(rawRootData: IRootRawJSONDataType, rawData: IModuleRawJSONDataType, traceback: Traceback): void;
/**
 * Check the item definition for the user type to what
 * itemize expects and needs from it
 * @param rawData the raw user item definition
 * @param traceback the traceback for it
 */
export declare function checkUserItem(rawData: IItemDefinitionRawJSONDataType, traceback: Traceback): void;
/**
 * Checks the user module for consistance to what the itemize
 * app expects from it
 * @param rawData the raw user module
 * @param traceback traceback for it
 */
export declare function checkUsersModule(rawData: IModuleRawJSONDataType, traceback: Traceback): void;
/**
 * Checks the entire root of the itemize schema
 * @param rawData the root
 */
export declare function checkRoot(rawData: IRootRawJSONDataType): void;
