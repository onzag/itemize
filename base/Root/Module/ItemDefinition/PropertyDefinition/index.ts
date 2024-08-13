/**
 * This file contains the property definition that defines all the interactions
 * that occur within a property of an item
 *
 * @module
 */

import ItemDefinition, { ItemDefinitionIOActions } from "..";
import ConditionalRuleSet,
{ IConditionalRuleSetRawJSONDataType } from "../ConditionalRuleSet";
import {
  ANYONE_METAROLE,
  OWNER_METAROLE,
  PREFIX_BUILD,
  POLICY_PREFIXES,
  MAX_FILE_SIZE,
  GUEST_METAROLE,
  UNSPECIFIED_OWNER,
  LAST_RICH_TEXT_CHANGE_LENGTH,
  MAX_RAW_TEXT_LENGTH,
  ANYONE_LOGGED_METAROLE,
  ENDPOINT_ERRORS,
} from "../../../../../constants";
import Module from "../..";
import supportedTypesStandard, { PropertyDefinitionSupportedType, PropertyDefinitionSupportedTypeName } from "./types";
import { EndpointError } from "../../../../errors";
import equals from "deep-equal";
import { IRQFile, IRQRequestFields } from "../../../../../rq-querier";
import Include from "../Include";
import { ICustomRoleManager } from "../../../../Root";
import type { PropertyDefinitionSupportedFilesType } from "./types/files";
import type { PropertyDefinitionSupportedFileType } from "./types/file";
import type { IPropertyDefinitionSupportedTextType } from "./types/text";
import { validateRQShape } from "./rq";
import { DOMWindow } from "@onzag/itemize-text-engine/serializer/dom";

/**
 * These are the main errors a property is able to give
 */
export enum PropertyInvalidReason {
  INVALID_VALUE = "INVALID_VALUE",
  TOO_LARGE = "TOO_LARGE",
  TOO_SMALL = "TOO_SMALL",
  TOO_MANY_DECIMALS = "TOO_MANY_DECIMALS",
  TOO_FEW_DECIMALS = "TOO_FEW_DECIMALS",
  NOT_NULLABLE = "NOT_NULLABLE",
  // some properties have subtypes, eg. string email, this comes with subtypes when they are invalid
  INVALID_SUBTYPE_VALUE = "INVALID_SUBTYPE_VALUE",
  // come mainly in search modes for the from and to ranged search mode
  FROM_LARGER_THAN_TO = "FROM_LARGER_THAN_TO",
  TO_SMALLER_THAN_FROM = "TO_SMALLER_THAN_FROM",
  // comes for values where unique is required
  NOT_UNIQUE = "NOT_UNIQUE",
  // similar to non-nullable, but usually it's tied to a condition
  // used for radius whe a location is specified yet the radius is null
  MUST_BE_SPECIFIED = "MUST_BE_SPECIFIED",
}

type PropertyDefinitionListenerType = (id: string, version: string, newValue: PropertyDefinitionSupportedType) => void;

/**
 * A conditition for conditional values
 */
export interface IPropertyDefinitionRawJSONRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: IConditionalRuleSetRawJSONDataType;
}

/**
 * A condition to give custom errors when the condition holds true
 */
export interface IPropertyDefinitionRawJSONInvalidRuleDataType {
  error: string;
  if: IConditionalRuleSetRawJSONDataType;
}

/**
 * this is what a raw property definition looks like
 */
export interface IPropertyDefinitionRawJSONDataType {
  /**
   * the property identifier
   */
  id: string;
  /**
   * the locale data, we don't know what it is
   * the structure is defined in the constants
   */
  i18nData?: {
    [locale: string]: any,
  };
  /**
   * the type of the property
   */
  type: PropertyDefinitionSupportedTypeName;
  /**
   * An optional subtype
   */
  subtype?: string;
  /**
   * The minimum accepted value (numeric types)
   */
  min?: number;
  /**
   * The maximum accepted value (numeric types)
   */
  max?: number;
  /**
   * The minimum accepted lenght (composed types)
   */
  minLength?: number;
  /**
   * The maximum accepted lenght (composed types)
   */
  maxLength?: number;
  /**
   * The max accepted decimal count (numeric types)
   */
  maxDecimalCount?: number;
  /**
   * The min accepted decimal count (numeric types)
   */
  minDecimalCount?: number;
  /**
   * A pattern to match, only really makes sense
   * on the string, password and text type, must
   * be a valid regex
   */
  pattern?: string;

  /**
   * values for the property set
   */
  values?: PropertyDefinitionSupportedType[];
  /**
   * whether it is unique, this is an external check
   */
  unique?: boolean;
  /**
   * Whether the unique is non sensitive, as in non case sensitive
   * only valid for string types
   */
  nonCaseSensitiveUnique?: boolean;
  /**
   * whether it can be null or not
   */
  nullable?: boolean;
  /**
   * Makes the value be null if hidden
   * does not perform checks so it makes it valid
   */
  nullIfHidden?: boolean;
  /**
   * Makes the field hidden if value is enforced
   */
  hiddenIfEnforced?: boolean;
  /**
   * hidden does not show at all
   */
  hidden?: boolean;
  /**
   * hidden in search mode
   */
  searchHidden?: boolean;
  /**
   * default value
   */
  default?: PropertyDefinitionSupportedType;
  /**
   * default value for search mode
   */
  searchDefault?: PropertyDefinitionSupportedType;
  /**
   * default value if with conditions
   */
  defaultIf?: IPropertyDefinitionRawJSONRuleDataType[];
  /**
   * default value for search mode
   */
  searchDefaultIf?: IPropertyDefinitionRawJSONRuleDataType[];
  /**
   * conditional custom invalid value
   */
  invalidIf?: IPropertyDefinitionRawJSONInvalidRuleDataType[];
  /**
   * conditional custom invalid value in search only
   */
  searchInvalidIf?: IPropertyDefinitionRawJSONInvalidRuleDataType[];
  /**
   * enforced values
   */
  enforcedValues?: IPropertyDefinitionRawJSONRuleDataType[];
  /**
   * enforced values
   */
  searchEnforcedValues?: IPropertyDefinitionRawJSONRuleDataType[];
  /**
   * Single enforced value
   */
  enforcedValue?: PropertyDefinitionSupportedType;
  /**
   * Single enforced value
   */
  searchEnforcedValue?: PropertyDefinitionSupportedType;
  /**
   * hidden if conditional
   */
  hiddenIf?: IConditionalRuleSetRawJSONDataType;
  /**
   * hidden in search mode
   */
  searchHiddenIf?: IConditionalRuleSetRawJSONDataType;
  /**
   * whether it is searchable or not
   */
  searchable?: boolean;
  /**
   * A boost to give in elasticsearch if exists
   */
  searchEngineBoost?: number;
  /**
   * disable ranged search and only allow exact
   */
  disableRangedSearch?: boolean;
  /**
   * disable retrieval, property value is never retrieved
   * it can only be set or updated, good for sensitive data
   * like passwords
   */
  disableRetrieval?: boolean;
  /**
   * Special properties for config that are assigned in the type behaviour
   * description, you set the value here
   */
  config?: {
    [key: string]: any;
  };
  /**
   * whether nulls are coerced into their default value this is useful
   * when creating values where the user is expected to do a partial creation as
   * he is not allowed access to certain property, eg user role, so it is ensured
   * that the null value will be coerced into the default
   */
  coerceNullsIntoDefaultAfterSubmit?: boolean;

  /**
   * Read role permissions
   */
  readRoleAccess?: string[];
  /**
   * Soft Read role permissions
   * make the property null rather than
   * denying the entire access to the resource
   */
  softReadRoleAccess?: string[];
  /**
   * create role permissions
   */
  createRoleAccess?: string[];
  /**
   * Edit role permissions
   */
  editRoleAccess?: string[];
  /**
   * Property is only used for custom
   * searches
   */
  searchOnlyProperty?: boolean;
}

/**
 * this is the rule once compiled, notice that it's not raw json anymore
 */
export interface IPropertyDefinitionRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: ConditionalRuleSet;
}

/**
 * This is the invalid rule once compiled
 */
export interface IPropertyDefinitionInvalidRuleDataType {
  error: string;
  if: ConditionalRuleSet;
}

/**
 * This is the state you receive from a property once you request it
 */
export interface IPropertyDefinitionState<T extends PropertyDefinitionSupportedType> {
  /**
   * whether this value was user set
   */
  userSet: boolean;
  /**
   * whether it represents a default value (it is not user set in this case)
   */
  default: boolean;
  /**
   * whether the value is enforced (by enforcedProperties or other means), not user set as well
   */
  enforced: boolean;
  /**
   * whether the property is mean to be hidden and not interacted by the user
   */
  hidden: boolean;
  /**
   * whether the value is valid
   */
  valid: boolean;
  /**
   * the reason of why it is not valid (it can also be a custom reason)
   */
  invalidReason: PropertyInvalidReason | string;
  /**
   * the value that the property currently has, it can be different from state
   * values because 
   */
  value: T;
  /**
   * an internal value that can be used for state management
   * usually used only by react in order to keep its internal state, internal
   * values are not always guaranteed to come as they are in sync with the value
   * an internal value is null if it considers itself not in sync in which case
   * the app should still be able to display something from the value, internal values
   * are basically only returned if the state value is the current value
   */
  internalValue: any;
  /**
   * the state value, the state value consists on the value that is set up
   * in the state, in most case it is equal to the value; for example in case of
   * a default value, the state value is null, but the actual value is something else
   * usually the internal value is correlated to the state value
   */
  stateValue: any;
  /**
   * the applied value, this is the value that is set up in the state by the applying
   * function and it might differ from the state value as the user modifies it, this is
   * the original value
   */
  stateAppliedValue: T;
  /**
   * whether the state value has been modified by any external force, either programatically
   * or not, this will usually be true for any value other than null, usually becomes true
   * once the field is touched even once
   */
  stateValueModified: boolean;
  /**
   * unlike state value modified, manually set values are considered manually set once the
   * value has been updating using the setCurrentValue function rather than applyValue this means
   * applyValue is used when loading values, whereas setCurrentValue is used for user input
   * this means you can tell appart modifications of the state value from either computer
   * or user input as long as it was used accordingly
   */
  stateValueHasBeenManuallySet: boolean;
  /**
   * the property id in question
   */
  propertyId: string;
}

/**
 * Helper functions returns null if the value is undefined
 * @param value the value, whatever it is
 * @returns null if undefined or the value
 */
function nullIfUndefined<T>(value: T): T {
  if (typeof value === "undefined") {
    return null;
  }
  return value;
}

/**
 * This represents anything that wants to refer to a property value
 * in a way that it is an exact value, it's used in conditions to apply
 * a value to a property
 */
export interface IPropertyDefinitionExactPropertyValue {
  exactValue: PropertyDefinitionSupportedType;
}
/**
 * This is the same as before but the value is instead another property
 * this is also used in conditions
 */
export interface IPropertyDefinitionReferredPropertyValue {
  property: string;
}
/**
 * And this is combined
 */
export type PropertyDefinitionValueType =
  IPropertyDefinitionExactPropertyValue |
  IPropertyDefinitionReferredPropertyValue;

/**
 * Represents the external checkers that are used to
 * check index values
 */
export type PropertyDefinitionCheckerFunctionType =
  (
    itemDefinition: ItemDefinition,
    include: Include,
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    id: string,
    version: string,
  ) => Promise<boolean>;

/**
 * Performs the check of an unique index property against
 * the server side
 * @param itemDefinition the item definition
 * @param include the include for the property
 * @param property the property in question
 * @param value the value of that property currently
 * @param id the slot id
 * @param version the slot version
 * @returns a boolean on whether the index is right
 */
async function clientSideIndexChecker(
  itemDefinition: ItemDefinition,
  include: Include,
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: string,
  version: string,
) {
  const mergedID = id + "." + (version || "");
  // null values automatically pass
  if (value === null || itemDefinition.isInSearchMode()) {
    return true;
  }

  // we are using the cache, the client side has a cache because user input might
  // be changing all the time and we only want to chek changes
  if (
    property.stateLastUniqueCheck[mergedID] &&
    (property.stateLastUniqueCheck[mergedID].value === value ||
      equals(property.stateLastUniqueCheck[mergedID].value, value))
  ) {
    return property.stateLastUniqueCheck[mergedID].valid;
  }

  // now we need the qualified name of the item definition or module
  // where this property is
  const qualifiedParentName = property.isExtension() ?
    property.getParentModule().getQualifiedPathName() :
    property.getParentItemDefinition().getQualifiedPathName();

  // and we call the index check function that should be present on the server side
  // /rest endpoint, this is not a rq endpoint, it's just rest
  try {
    // This should never be cached, indexes might change on the fly
    const result = await fetch("/rest/index-check/" + qualifiedParentName + "/" + property.getId(), {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
        id,
        version,
      }),
    });

    // if we get something and it's a good json, this is a simple boolean
    const output = await result.json();
    // we store it in the property cache
    property.stateLastUniqueCheck[mergedID] = {
      valid: !!output,
      value,
    };
    // and return that value
    return !!output;
  } catch (err) {
    // if we fail to fetch we return true, eg, no internet
    // we cannot check
    return true;
  }
}

const CACHED_REGEXP: {
  [key: string]: RegExp,
} = {};

/**
 * The property definition class that defines how properties
 * are to be defined
 */
export default class PropertyDefinition {
  public static supportedTypesStandard = supportedTypesStandard;

  // this static is required to be set in order to check for indexes
  public static indexChecker: PropertyDefinitionCheckerFunctionType = clientSideIndexChecker;
  private policyType: string;
  private policyName: string;

  public static createFileForProperty(id: string, name: string, metadata: string, src: Blob): PropertyDefinitionSupportedFileType {
    const url = URL.createObjectURL(src);
    return {
      name,
      id,
      metadata,
      size: src.size,
      type: src.type,
      url,
      src,
      cluster: null,
    }
  }

  public static revokeFileForProperty(file: PropertyDefinitionSupportedFileType) {
    URL.revokeObjectURL(file.url);
  }

  /**
   * A static method that provides the policy prefix for a given policy name and type
   * @param policyType the policy type
   * @param policyName the policy name
   * @returns a prefixed string that represents the qualified policy
   */
  public static getQualifiedPolicyPrefix(policyType: string, policyName: string) {
    return PREFIX_BUILD(
      POLICY_PREFIXES[policyType] + policyName,
    );
  }

  /**
   * Performs a check agains the json definition value for a property definition
   * @param properyDefinitionRaw 
   * @param v 
   * @returns 
   */
  public static checkAgainstRQDefinition(properyDefinitionRaw: IPropertyDefinitionRawJSONDataType, v: PropertyDefinitionSupportedType) {
    if (v === null) {
      return true;
    }

    const definition = supportedTypesStandard[properyDefinitionRaw.type];

    return validateRQShape(definition.rq, v);
  }

  /**
   * Checks whether a value is valid or not using
   * the raw data.
   *
   * NOTE!!!! this function is context unaware
   * and hence it cannot execute invalidIf conditional rule
   * set rules
   *
   * NOTE!!!!! this function is external events unaware
   * and hence it cannot check for unique indexes
   *
   * @param propertyDefinitionRaw The raw json property definition data
   * @param value the value to check against
   * @param checkAgainstValues if to check against its own values
   * some properties are enums, and this checks whether to check against
   * these enums, but for example, when checking the information on the enums
   * during the checkers.ts process, we don't want to check that because
   * then it will always be valid
   * @returns a boolean on whether the value is valid
   */
  public static isValidValue(
    propertyDefinitionRaw: IPropertyDefinitionRawJSONDataType,
    value: PropertyDefinitionSupportedType,
    checkAgainstValues: boolean,
  ): PropertyInvalidReason {
    // we get the definition and run basic checks
    const definition = supportedTypesStandard[propertyDefinitionRaw.type];

    // Check for nulls
    if (propertyDefinitionRaw.nullable && (definition.isNull ? definition.isNull(value) : value === null)) {
      return null;
    } else if (!propertyDefinitionRaw.nullable && (definition.isNull ? definition.isNull(value) : value === null)) {
      return PropertyInvalidReason.NOT_NULLABLE;
    }

    if (checkAgainstValues && propertyDefinitionRaw.values) {
      // Check against the values if allowed
      if (
        !definition.rq.array &&
        !propertyDefinitionRaw.values.includes(value)
      ) {
        return PropertyInvalidReason.INVALID_VALUE;
      } else if (
        definition.rq.array &&
        (
          !Array.isArray(value) ||
          !(value as any[]).every((v) => propertyDefinitionRaw.values.includes(v))
        )
      ) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
    }

    // These basic checks are the most important
    if (!PropertyDefinition.checkAgainstRQDefinition(propertyDefinitionRaw, value)) {
      return PropertyInvalidReason.INVALID_VALUE;
    }



    if (propertyDefinitionRaw.pattern && typeof value === "string") {
      const regxp = CACHED_REGEXP[propertyDefinitionRaw.pattern] || new RegExp(propertyDefinitionRaw.pattern);
      if (!CACHED_REGEXP[propertyDefinitionRaw.pattern]) {
        CACHED_REGEXP[propertyDefinitionRaw.pattern] = regxp;
      }
      if (!regxp.test(value)) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
    }

    // if we have a validate function
    if (definition.validate) {
      // run it
      const invalidReason = definition.validate(
        value,
        propertyDefinitionRaw,
      );
      // if it gives an invalid reason
      if (invalidReason) {
        // return it
        return invalidReason;
      }
    }

    // Do the fancy checks this checker will either use
    // the .value property or the whole value itself
    let valueToCheck: string | number = value as any;
    // also the normalized value has priority to the check
    // otherwise on unit checks the user might send 100 MegaMeters
    // and it will get validated as meters if that was the original unit
    if (typeof (value as any).normalizedValue !== "undefined") {
      valueToCheck = (value as any).normalizedValue;
    } else if (typeof (value as any).value !== "undefined") {
      valueToCheck = (value as any).value;
    }

    // TOO_SMALL check
    if (
      typeof propertyDefinitionRaw.min !== "undefined" &&
      (valueToCheck as any) < propertyDefinitionRaw.min
    ) {
      return PropertyInvalidReason.TOO_SMALL;
      // TOO_LARGE check
    } else if (
      typeof propertyDefinitionRaw.max !== "undefined" &&
      (valueToCheck as any) > propertyDefinitionRaw.max
    ) {
      return PropertyInvalidReason.TOO_LARGE;
      // TO_SMALL check again but lenght based
    } else if (
      typeof propertyDefinitionRaw.minLength !== "undefined" &&
      (valueToCheck as any).length < propertyDefinitionRaw.minLength
    ) {
      return PropertyInvalidReason.TOO_SMALL;
      // Now time to count decimals
    } else if (
      typeof propertyDefinitionRaw.maxDecimalCount !== "undefined" ||
      typeof propertyDefinitionRaw.minDecimalCount !== "undefined"
    ) {

      // we split the value to string
      const splittedDecimals =
        valueToCheck
          .toString().split(".");

      // now we count the decimals
      if (
        typeof propertyDefinitionRaw.maxDecimalCount !== "undefined" && splittedDecimals[1] &&
        splittedDecimals[1].length > propertyDefinitionRaw.maxDecimalCount
      ) {
        return PropertyInvalidReason.TOO_MANY_DECIMALS;
      } else if (
        typeof propertyDefinitionRaw.minDecimalCount !== "undefined" &&
        (splittedDecimals[1] || "").length < propertyDefinitionRaw.minDecimalCount
      ) {
        return PropertyInvalidReason.TOO_FEW_DECIMALS;
      }
    }

    // Special length check for text, string and arrays
    if (
      typeof propertyDefinitionRaw.maxLength !== "undefined" ||
      typeof propertyDefinitionRaw.minLength !== "undefined"
    ) {
      // we make the count
      let count: number;
      // and check if its rich text
      const isText = propertyDefinitionRaw.type === "text";
      const isRichText = propertyDefinitionRaw.type === "text" && propertyDefinitionRaw.subtype === "html";
      // if it's an array, we use the array length
      if (Array.isArray(value)) {
        count = value.length;
      } else if (!isRichText) {
        // if it's not rich text we just count the characters
        if (isText) {
          count = (value as IPropertyDefinitionSupportedTextType).value.toString().length;
        } else {
          count = value.toString().length;
        }
      } else {
        // special check for large values in raw mode
        // should be a large enough value to avoid this
        // and avoid being spammed with empty tags
        if ((value as IPropertyDefinitionSupportedTextType).value.toString().length > MAX_RAW_TEXT_LENGTH) {
          return PropertyInvalidReason.TOO_LARGE;
        }

        if (typeof window !== "undefined" && typeof (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] !== "undefined") {
          count = (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH];
        } else {
          // otherwise we need to create a dummy element and count the characters
          const dummyElement = DOMWindow.document.createElement("div");
          dummyElement.innerHTML = (value as IPropertyDefinitionSupportedTextType).value.toString();
          count = dummyElement.textContent.length;

          // Something that happens with quilljs
          if (dummyElement.querySelector(".ql-cursor")) {
            count--;
          }
        }
      }

      // if we have a max length we throw an error if we
      // supass it with the count
      if (
        typeof propertyDefinitionRaw.maxLength !== "undefined" &&
        count > propertyDefinitionRaw.maxLength
      ) {
        return PropertyInvalidReason.TOO_LARGE;
        // also with the minimum
      } else if (
        typeof propertyDefinitionRaw.minLength !== "undefined" &&
        count < propertyDefinitionRaw.minLength
      ) {
        return PropertyInvalidReason.TOO_SMALL;
      }
    }

    // we delete this if it exists, this global exists to speed up
    // the ui and it's not truly necessary
    if (typeof window !== "undefined") {
      delete (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH];
    }

    // return no error
    return null;
  }

  /**
   * the raw data for the property definition
   */
  public rawData: IPropertyDefinitionRawJSONDataType;
  /**
   * the parent module of the property
   */
  private parentModule: Module;
  /**
   * The parent item definition, if any, not available to extensions
   */
  private parentItemDefinition: ItemDefinition;
  /**
   * Whether the property is an extension
   */
  private propertyIsExtension: boolean;
  /**
   * when a property is instantiated this is the original property which is
   * directly attached to the tree
   */
  private originatingInstance: PropertyDefinition;

  /**
   * Processed rules for default from the raw data
   */
  private defaultIf?: IPropertyDefinitionRuleDataType[];
  /**
   * Processed rules for invalid if from the raw data
   */
  private invalidIf?: IPropertyDefinitionInvalidRuleDataType[];
  /**
   * Processed enforced values from the raw data
   */
  private enforcedValues?: IPropertyDefinitionRuleDataType[];
  /**
   * Processed hidden conditions from the raw data
   */
  private hiddenIf?: ConditionalRuleSet;
  /**
   * list of listeners
   */
  private listeners: PropertyDefinitionListenerType[];

  /**
   * enforced values and defaulted values, this is usually set manually
   * and it applies to includes usually with enforced property values
   * hence the enforced value is global
   */
  private globalSuperEnforcedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;
  /**
   * this applies for predefined properties basically this is the new
   * default value
   */
  private globalSuperDefaultedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;

  /**
   * representing the state of the class
   */
  private stateValue: {
    [slotId: string]: PropertyDefinitionSupportedType,
  };
  /**
   * representing the original applied state of the class
   */
  private stateAppliedValue: {
    [slotId: string]: PropertyDefinitionSupportedType,
  };
  /**
   * this is less relevant than the single enforced and it
   * is used when the value is applied manually during
   * the user interaction, values are enforced
   */
  private stateSuperEnforcedValue: {
    [slotId: string]: {
      value: PropertyDefinitionSupportedType,
      owners: any[],
    },
  };
  /**
   * refers to whether the value in the state value
   * has been modified by any interaction, either by
   * apply value or set value by user
   */
  private stateValueModified: {
    [slotId: string]: boolean,
  };
  /**
   * this only triggers as true when the value has been modified
   * when it has been set by the set value function which
   * is what is supposed to be used by the user
   */
  private stateValueHasBeenManuallySet: {
    [slotId: string]: boolean,
  };
  /**
   * an internal value
   */
  private stateInternalValue: {
    [slotId: string]: any,
  };

  /**
   * these are caches builtin the property
   * to be used in the client side
   */
  // tslint:disable-next-line: member-ordering
  public stateLastUniqueCheck: {
    [slotId: string]: {
      value: PropertyDefinitionSupportedType,
      valid: boolean,
    },
  };

  private canCacheState: boolean;
  public stateLastCached: {
    [slotId: string]: IPropertyDefinitionState<PropertyDefinitionSupportedType>;
  };
  public stateLastCachedWithExternal: {
    [slotId: string]: IPropertyDefinitionState<PropertyDefinitionSupportedType>;
  }

  /**
   * Builds a property definition
   * @param rawJSON the raw json structure
   * @param parentModule the parent module of the property
   * @param parentItemDefinition the parent item definition
   * @param isExtension whether it represents a prop extension (aka null parentItemDefinition)
   * @param originatingInstance usually null, but when properties are cloned, reinstantiated; this is the original
   * instance that is attached to the root, the reason we need this is for merging functionality as it will
   * keep itself attached to the root original property via this weak link
   */
  constructor(
    rawJSON: IPropertyDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    isExtension: boolean,
    originatingInstance?: PropertyDefinition,
  ) {
    // set these
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;
    this.propertyIsExtension = isExtension;
    this.originatingInstance = originatingInstance || null;

    // set the default value
    this.defaultIf = rawJSON.defaultIf && rawJSON.defaultIf.map((dif) => ({
      value: dif.value,
      if: new ConditionalRuleSet(dif.if, parentModule, parentItemDefinition, this, null),
    }));

    // create the invalid rules
    this.invalidIf = rawJSON.invalidIf && rawJSON.invalidIf.map((ii) => ({
      error: ii.error,
      if: new ConditionalRuleSet(ii.if, parentModule, parentItemDefinition, this, null),
    }));

    // set the enforced values from the conditional rule set
    this.enforcedValues = rawJSON.enforcedValues &&
      rawJSON.enforcedValues.map((ev) => ({
        value: ev.value,
        if: new ConditionalRuleSet(ev.if, parentModule,
          parentItemDefinition, this, null),
      }));

    // set the hidden if rule
    this.hiddenIf = rawJSON.hiddenIf &&
      new ConditionalRuleSet(rawJSON.hiddenIf, parentModule,
        parentItemDefinition, this, null);

    this.canCacheState = true;
    if (
      rawJSON.invalidIf ||
      rawJSON.hiddenIf ||
      rawJSON.defaultIf ||
      rawJSON.enforcedValues
    ) {
      this.canCacheState = false;
    }

    this.listeners = [];
    this.cleanState();
  }

  public cleanState() {
    // initial value for all namespaces is null
    this.stateValue = {};
    this.stateAppliedValue = {};
    this.stateValueModified = {};
    this.stateValueHasBeenManuallySet = {};
    this.stateInternalValue = {};
    this.stateLastUniqueCheck = {};
    this.stateSuperEnforcedValue = {};

    this.stateLastCached = {};
    this.stateLastCachedWithExternal = {};
  }

  /**
   * Provides the current enforced value (if any)
   * to a given slot id
   * @param id the slot id
   * @param version the slot version
   * @returns an object that specifies whether the value is enforced, and the value itself if true
   * the value can be null
   */
  public getEnforcedValue<T extends PropertyDefinitionSupportedType>(id: string, version: string): {
    enforced: boolean;
    value?: T;
  } {
    const mergedID = id + "." + (version || "");
    // first we check if there is any possibility
    // of an enforced value
    if (
      typeof this.globalSuperEnforcedValue !== "undefined" ||
      typeof this.stateSuperEnforcedValue[mergedID] !== "undefined" ||
      // this are the compiled enforced values that are conditional
      this.enforcedValues ||
      typeof this.rawData.enforcedValue !== "undefined"
    ) {

      // let's check if one matches the current situation
      // we first pick the superEnforcedValue or otherwise the enforcedValue
      // or otherwise the first enforcedValue that evaluates to true
      const enforcedValue = typeof this.globalSuperEnforcedValue !== "undefined" ?
        // superenforced might be a property definition so we got to
        // extract the value in such case
        (this.globalSuperEnforcedValue instanceof PropertyDefinition ?
          this.globalSuperEnforcedValue.getCurrentValue(id, version) :
          this.globalSuperEnforcedValue) :

        (
          // if the global super enforced value failed, we check for
          // the slotted value
          typeof this.stateSuperEnforcedValue[mergedID] !== "undefined" ?
            this.stateSuperEnforcedValue[mergedID].value :

            // otherwise in other cases we check the enforced value
            // which has priority
            (typeof this.rawData.enforcedValue !== "undefined" ?
              this.rawData.enforcedValue :
              // otherwise we go to for evaluating the enforced values
              // or give undefined if nothing is found
              (this.enforcedValues.find((ev) => {
                return ev.if.evaluate(id, version);
              }) || { value: undefined }).value)
        );

      // if we get one
      if (typeof enforcedValue !== "undefined") {
        // we return the value that was set to be
        return {
          enforced: true,
          value: enforcedValue as T,
        };
      }
    }

    return {
      enforced: false,
    };
  }

  /**
   * checks if it's currently hidden (not phantom)
   * @param id the id
   * @param version the version
   * @returns a boolean
   */
  public isCurrentlyHidden(id: string, version: string) {
    return this.rawData.hidden ||
      (this.rawData.hiddenIfEnforced ? this.getEnforcedValue(id, version).enforced : false) ||
      (this.hiddenIf && this.hiddenIf.evaluate(id, version)) || false;
  }

  /**
   * gives the id of this property defintion
   * @returns the id
   */
  public getId() {
    return this.rawData.id;
  }

  /**
   * gives the type of this property defintion
   * @returns the type
   */
  public getType() {
    return this.rawData.type;
  }

  /**
   * Adds a change listener to the listener for changes
   * note that these listeners only listens for user changes
   * not to applied changes of the sorts
   * @param listener the listener to add
   */
  public addChangeListener(listener: PropertyDefinitionListenerType) {
    this.listeners.push(listener);
  }

  /**
   * Removes an added listener
   * @param listener the listener to remove
   */
  public removeChangeListener(listener: PropertyDefinitionListenerType) {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  /**
   * Provides the request fields that are necessary
   * and contained within this property in order to be
   * rq requested, these come from the property description
   * @returns the requested fields that are necessary
   */
  public getRequestFields(): IRQRequestFields {
    let requestFields = {};
    // now we get the description for this field
    const propertyDescription = this.getPropertyDefinitionDescription();
    // if there are rq fields defined
    if (propertyDescription.rq) {
      // we add each one of them
      propertyDescription.rq.ownFields && Object.keys(propertyDescription.rq.ownFields).forEach((field) => {
        if (propertyDescription.rq.ownFields[field].type !== "binary") {
          requestFields[field] = {};
        }
      });
      // we add each one of them
      propertyDescription.rq.stdFields && Object.keys(propertyDescription.rq.stdFields).forEach((field) => {
        if (propertyDescription.rq.stdFields[field].type !== "binary") {
          requestFields[field] = {};
        }
      });
    }

    return requestFields;
  }

  /**
   * Provides the current value of a property (as it is)
   * for a given slot id
   * @param id the slot id
   * @param verson the slot version
   * @returns the current value
   */
  public getCurrentValue<T extends PropertyDefinitionSupportedType>(id: string, version: string): T {
    // first we check for a possible enforced value
    const possibleEnforcedValue = this.getEnforcedValue<T>(id, version);

    // if we have one
    if (possibleEnforcedValue.enforced) {
      // return it
      return possibleEnforcedValue.value;
    }

    // if it's null if hidden and it's hidden
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden(id, version)) {
      return null;
    }

    const mergedID = id + "." + (version || "");

    // if it has not been modified, we might return a default value
    if (!this.stateValueModified[mergedID]) {
      // lets find the default value, first the super default
      // and we of course extract it in case of property definition
      // or otherwise use the default, which might be undefined
      let defaultValue = typeof this.globalSuperDefaultedValue !== "undefined" ?
        (this.globalSuperDefaultedValue instanceof PropertyDefinition ?
          this.globalSuperDefaultedValue.getCurrentValue(id, version) :
          this.globalSuperDefaultedValue) : this.rawData.default;

      // Also by condition
      if (this.defaultIf && typeof this.globalSuperDefaultedValue === "undefined") {
        // find a rule that passes
        const rulePasses = this.defaultIf.find((difRule) => difRule.if.evaluate(id, version));
        if (rulePasses) {
          // and set the default value to such
          defaultValue = rulePasses.value;
        }
      }

      return (typeof defaultValue === "undefined" ? null : defaultValue) as T;
    }

    // if nothing apply we return the state value or null
    return nullIfUndefined(this.stateValue[mergedID] as T);
  }

  /**
   * Provides the applied value for a property
   * @param id the id
   * @param version the version
   * @returns the applied value
   */
  public getAppliedValue<T extends PropertyDefinitionSupportedType>(
    id: string,
    version: string,
  ): T {
    const mergedID = id + "." + (version || "");
    return nullIfUndefined<T>(this.stateAppliedValue[mergedID] as T);
  }

  /**
   * provides the current useful value for the property defintion without doing
   * any external checking, pass the id still as a cache of previously external
   * checked results might apply
   * @param id the id of the current item definition as stored, pass null if not stored
   * @param version the slot version
   * @returns the current value state
   */
  public getStateNoExternalChecking<T extends PropertyDefinitionSupportedType>(
    id: string,
    version: string,
    emulateExternalChecking?: boolean,
  ): IPropertyDefinitionState<T> {
    const mergedID = id + "." + (version || "");
    const mergedIDWithoutExternal = id + "." + (version || "") + "." + (emulateExternalChecking ? "t" : "f");
    if (
      this.canCacheState &&
      this.stateLastCached[mergedIDWithoutExternal]
    ) {
      return this.stateLastCached[mergedIDWithoutExternal] as IPropertyDefinitionState<T>;
    }

    const possibleEnforcedValue = this.getEnforcedValue<T>(id, version);

    if (possibleEnforcedValue.enforced) {
      const possibleInvalidEnforcedReason = this.isValidValueNoExternalChecking(
        id, version, possibleEnforcedValue.value, emulateExternalChecking,
      );
      // we return the value that was set to be
      const stateValue: IPropertyDefinitionState<T> = {
        userSet: false,
        enforced: true,
        default: false,
        valid: !possibleInvalidEnforcedReason,
        invalidReason: possibleInvalidEnforcedReason,
        value: possibleEnforcedValue.value,
        hidden: this.rawData.hiddenIfEnforced ? true : this.isCurrentlyHidden(id, version),
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[mergedID]),
        stateAppliedValue: this.getAppliedValue(id, version),
        stateValueModified: this.stateValueModified[mergedID] || false,
        stateValueHasBeenManuallySet: this.stateValueHasBeenManuallySet[mergedID] || false,
        propertyId: this.getId(),
      };
      if (this.canCacheState) {
        this.stateLastCached[mergedIDWithoutExternal] = stateValue;
      }
      return stateValue;
    }

    // make if hidden if null if hidden is set to true
    // note nulls set this way are always valid
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden(id, version)) {
      const stateValue: IPropertyDefinitionState<T> = {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        invalidReason: null,
        value: null,
        hidden: true,
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[mergedID]),
        stateAppliedValue: this.getAppliedValue(id, version),
        stateValueModified: this.stateValueModified[mergedID] || false,
        stateValueHasBeenManuallySet: this.stateValueHasBeenManuallySet[mergedID] || false,
        propertyId: this.getId(),
      };
      if (this.canCacheState) {
        this.stateLastCached[mergedIDWithoutExternal] = stateValue;
      }
      return stateValue;
    }

    const value = this.getCurrentValue<T>(id, version);
    const invalidReason = this.isValidValueNoExternalChecking(id, version, value, emulateExternalChecking);
    const stateValue: IPropertyDefinitionState<T> = {
      userSet: this.stateValueModified[mergedID] || false,
      enforced: false,
      default: !this.stateValueModified[mergedID],
      valid: !invalidReason,
      invalidReason,
      value,
      hidden: this.isCurrentlyHidden(id, version),
      internalValue: this.stateValueModified[mergedID] ? this.stateInternalValue[mergedID] : null,
      stateValue: nullIfUndefined(this.stateValue[mergedID]),
      stateAppliedValue: this.getAppliedValue(id, version),
      stateValueModified: this.stateValueModified[mergedID] || false,
      stateValueHasBeenManuallySet: this.stateValueHasBeenManuallySet[mergedID] || false,
      propertyId: this.getId(),
    };
    if (this.canCacheState) {
      this.stateLastCached[mergedIDWithoutExternal] = stateValue;
    }
    return stateValue;
  }

  /**
   * provides the current useful value for the property defintion
   * @param id the id of the current item definition as stored, pass null if not stored
   * this also represents the slot
   * @param version the version
   * @returns a promise for the current value state
   */
  public async getState<T extends PropertyDefinitionSupportedType>(id: string, version: string): Promise<IPropertyDefinitionState<T>> {

    const mergedID = id + "." + (version || "");
    if (this.canCacheState && this.stateLastCachedWithExternal[mergedID]) {
      return this.stateLastCachedWithExternal[mergedID] as any;
    }

    // containsAnExternallyCheckedProperty
    // some smart shenanigans
    if (
      !this.isUnique() &&
      this.canCacheState &&
      (this.stateLastCached[mergedID + ".f"] || this.stateLastCached[mergedID + ".t"])
    ) {
      return (this.stateLastCached[mergedID + ".f"] || this.stateLastCached[mergedID + ".t"]) as any;
    }

    // noticed how it is possible that the enforced value changes
    // during the isValidValue check which causes the wrong output
    // of this getState action to be cached, causing issues
    // so now we ensure that what we check against didn't change during our check
    let possibleInvalidEnforcedReason: string = null;

    // so this will be for our current we are working with enforced
    // value that we checked by the is valid value function
    let possibleEnforcedValue: {
      enforced: boolean,
      value?: T,
    } = null;
    // and here we will store what comes later
    let nextPossibleEnforcedValue: {
      enforced: boolean,
      value?: T,
    } = null;

    // and we enter a loop here
    do {
      // we pick either what was our next or we get a new value for our current
      possibleEnforcedValue = nextPossibleEnforcedValue || this.getEnforcedValue<T>(id, version);
      // and if it's enforced
      if (possibleEnforcedValue.enforced) {
        // we do the async check
        possibleInvalidEnforcedReason = await this.isValidValue(id, version, possibleEnforcedValue.value);
        // and then we get our next value
        nextPossibleEnforcedValue = this.getEnforcedValue<T>(id, version);
      }

      // we will loop if there's a next value as in, it was enforced as well
      // and if something changed during the event
    } while (
      nextPossibleEnforcedValue &&
      nextPossibleEnforcedValue.enforced &&
      possibleEnforcedValue.value !== nextPossibleEnforcedValue.value
    );

    if (possibleEnforcedValue.enforced) {
      // we return the value that was set to be
      const stateValue: IPropertyDefinitionState<T> = {
        userSet: false,
        enforced: true,
        default: false,
        valid: !possibleInvalidEnforcedReason,
        invalidReason: possibleInvalidEnforcedReason,
        value: possibleEnforcedValue.value,
        hidden: this.rawData.hiddenIfEnforced ? true : this.isCurrentlyHidden(id, version),
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[mergedID]),
        stateAppliedValue: this.getAppliedValue(id, version),
        stateValueModified: this.stateValueModified[mergedID] || false,
        stateValueHasBeenManuallySet: this.stateValueHasBeenManuallySet[mergedID] || false,
        propertyId: this.getId(),
      };
      if (this.canCacheState) {
        this.stateLastCachedWithExternal[mergedID] = stateValue;
      }
      return stateValue;
    }

    // make if hidden if null if hidden is set to true
    // note nulls set this way are always valid
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden(id, version)) {
      const stateValue: IPropertyDefinitionState<T> = {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        invalidReason: null,
        value: null,
        hidden: true,
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[mergedID]),
        stateAppliedValue: this.getAppliedValue(id, version),
        stateValueModified: this.stateValueModified[mergedID] || false,
        stateValueHasBeenManuallySet: this.stateValueHasBeenManuallySet[mergedID] || false,
        propertyId: this.getId(),
      };
      if (this.canCacheState) {
        this.stateLastCachedWithExternal[mergedID] = stateValue;
      }
      return stateValue;
    }

    let invalidReason: string = null;

    // we do the same as in our enforced
    let currentValue: T;
    // and here we will store what comes later
    let nextValue: T;

    do {
      currentValue = typeof nextValue === "undefined" ? this.getCurrentValue<T>(id, version) : nextValue;
      invalidReason = await this.isValidValue(id, version, currentValue);
      nextValue = this.getCurrentValue<T>(id, version);
      // we will loop if there's a next value as in, it was enforced as well
      // and if something changed during the event
    } while (
      nextValue !== currentValue
    );

    const stateValue: IPropertyDefinitionState<T> = {
      userSet: this.stateValueModified[mergedID] || false,
      enforced: false,
      default: !this.stateValueModified[mergedID],
      valid: !invalidReason,
      invalidReason,
      value: currentValue,
      hidden: this.isCurrentlyHidden(id, version),
      internalValue: this.stateValueModified[mergedID] ? this.stateInternalValue[mergedID] : null,
      stateValue: nullIfUndefined(this.stateValue[mergedID]),
      stateAppliedValue: this.getAppliedValue(id, version),
      stateValueModified: this.stateValueModified[mergedID] || false,
      stateValueHasBeenManuallySet: this.stateValueHasBeenManuallySet[mergedID] || false,
      propertyId: this.getId(),
    };
    if (this.canCacheState) {
      this.stateLastCachedWithExternal[mergedID] = stateValue;
    }

    return stateValue;
  }

  public checkAgainstRQDefinition(v: PropertyDefinitionSupportedType) {
    return PropertyDefinition.checkAgainstRQDefinition(this.rawData, v);
  }

  /**
   * Sets a super enforced value that superseeds any enforced value or
   * values and makes the field enforced, the value might
   * be another property definition to extract the value from
   * @throws an error if the value is invalid
   * @param value the value to enforce it can be a property
   */
  public setGlobalSuperEnforced(
    value: PropertyDefinitionSupportedType | PropertyDefinition,
  ) {
    // let's get the definition
    const definition = supportedTypesStandard[this.rawData.type];
    // find whether there is a nullable value and if it matches
    const actualValue = !(value instanceof PropertyDefinition) ? (definition.isNull && definition.isNull(value) ?
      ((definition.getNullValue && definition.getNullValue(value)) || null) : value) : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (!this.checkAgainstRQDefinition(actualValue)) {
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue) + " on " + this.getId());
      }
    }

    // clean cached values
    this.stateLastCached = {};
    this.stateLastCachedWithExternal = {};

    this.globalSuperEnforcedValue = actualValue;
  }

  /**
   * Sets a super enforced value to a given property in a given
   * slot id, note a super enforced value won't override the global
   * @param id the slot id
   * @param version the slot version
   * @param value the value that has tobe super enforced
   * @param owner an owner parameter, if specified it can only be removed by
   * the same owner
   */
  public setSuperEnforced(
    id: string,
    version: string,
    value: PropertyDefinitionSupportedType,
    owner?: any,
  ) {
    // let's get the definition
    const definition = supportedTypesStandard[this.rawData.type];
    // find whether there is a nullable value and if it matches
    const actualValue = definition.isNull && definition.isNull(value) ?
      ((definition.getNullValue && definition.getNullValue(value)) || null) : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (!this.checkAgainstRQDefinition(actualValue)) {
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue) + " on " + this.getId());
      }
    }

    const mergedID = id + "." + (version || "");
    const actualOwner = owner || null;

    if (
      this.stateSuperEnforcedValue[mergedID]
    ) {
      // setting super enforceds with the same value as one established
      // it is okay and acceptable now
      if (equals(this.stateSuperEnforcedValue[mergedID].value, value, { strict: true })) {
        this.stateSuperEnforcedValue[mergedID].owners.push(actualOwner);
        return;
      }

      // updating a value that has a single specific owner
      // so it can be overriden safely
      if (
        this.stateSuperEnforcedValue[mergedID].owners.length === 1 &&
        this.stateSuperEnforcedValue[mergedID].owners[0] === owner
      ) {
        // it's fine, the value will be overriden but it will be
        // safe
      } else {
        // otherwise the value is not the same and we are overriding
        // on top of another that has who knows whose owners
        console.warn(
          "Setting super enforced value at " +
          JSON.stringify(value) +
          " on top of another " +
          JSON.stringify(this.stateSuperEnforcedValue[mergedID].value) +
          " at " + this.getId() + " on slot " + mergedID
        );
      }
    }

    this.stateSuperEnforcedValue[mergedID] = {
      value,
      owners: [actualOwner],
    }

    // clean cached values
    const mergedIDWithoutExternal1 = mergedID + ".t";
    const mergedIDWithoutExternal2 = mergedID + ".f";
    delete this.stateLastCachedWithExternal[mergedID];
    delete this.stateLastCached[mergedIDWithoutExternal1];
    delete this.stateLastCached[mergedIDWithoutExternal2];

    if (this.stateValue[mergedID] !== actualValue) {
      this.listeners.forEach((listener) => {
        listener(id || null, version || null, actualValue);
      });
    }
  }

  /**
   * Clears a super enforced value set in a slot id
   * @param id the slot id
   * @param version the slot version
   * @param owner an optional owner parameter it can only be removed
   * if the owner is the same as the original
   */
  public clearSuperEnforced(
    id: string,
    version: string,
    owner?: any,
  ) {
    const mergedID = id + "." + (version || "");
    const deletedValue = this.stateSuperEnforcedValue[mergedID];

    if (
      !deletedValue
    ) {
      console.warn("Attempting to clean super enforced value where it has already been cleaned at " + this.getId() + " on slot " + mergedID);
      return;
    }

    // owner is specified and it's not equal so
    // it is not removed
    const actualOwner = owner || null;
    const ownerExistsInxex = deletedValue.owners.findIndex((o) => o === actualOwner);
    if (ownerExistsInxex !== -1) {
      deletedValue.owners.splice(ownerExistsInxex, 1);
    } else {
      return;
    }

    // it still has owners assigned to this
    // super enforced value so we do not update
    if (deletedValue.owners.length !== 0) {
      return;
    }

    delete this.stateSuperEnforcedValue[mergedID];

    // clean cached values
    const mergedIDWithoutExternal1 = mergedID + ".t";
    const mergedIDWithoutExternal2 = mergedID + ".f";
    delete this.stateLastCachedWithExternal[mergedID];
    delete this.stateLastCached[mergedIDWithoutExternal1];
    delete this.stateLastCached[mergedIDWithoutExternal2];

    if (deletedValue && this.stateValue[mergedID] !== deletedValue.value) {
      this.listeners.forEach((listener) => {
        listener(id || null, version || null, this.stateValue[mergedID]);
      });
    }
  }

  /**
   * Sets a super default value that superseeds any default value or
   * values, the value might be another property definition to extract
   * the value from
   * @param value the value to default to it can be a property
   */
  public setGlobalSuperDefault(
    value: PropertyDefinitionSupportedType | PropertyDefinition,
  ) {
    // let's get the definition
    const definition = supportedTypesStandard[this.rawData.type];
    // find whether there is a nullable value and if it matches
    const actualValue = !(value instanceof PropertyDefinition) ? (definition.isNull && definition.isNull(value) ?
      ((definition.getNullValue && definition.getNullValue(value)) || null) : value) : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (!this.checkAgainstRQDefinition(actualValue)) {
        throw new Error("Invalid super default " + JSON.stringify(actualValue) + " on " + this.getId());
      }
    }

    this.globalSuperDefaultedValue = actualValue;

    this.stateLastCached = {};
    this.stateLastCachedWithExternal = {};
  }

  /**
   * Sets the current value for the item, null is a valid value
   * Specially if the item is nullable
   *
   * The resulting value set might not be the same, if the item
   * has a default null value, that is, if the value is set to that
   * value it will be converted to null
   *
   * @throws an error if the value is invalid by definition
   * @param id the slot d
   * @param version the slot version
   * @param newValue the new value
   * @param internalValue the internal value
   */
  public setCurrentValue(
    id: string,
    version: string,
    newValue: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    // let's get the definition
    const definition = supportedTypesStandard[this.rawData.type];
    // find whether there is a nullable value and if it matches
    const newActualValue = definition.isNull && definition.isNull(newValue) ?
      ((definition.getNullValue && definition.getNullValue(newValue)) || null) : newValue;

    if (newActualValue !== null) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (!this.checkAgainstRQDefinition(newActualValue)) {
        throw new Error("Invalid value " + JSON.stringify(newActualValue) + " on " + this.getId());
      }
    }

    const mergedID = id + "." + (version || "");
    const valueDiffers = this.listeners.length && !equals(this.stateValue[mergedID], newValue, { strict: true });

    // note that the value is set and never check
    this.stateValue[mergedID] = newActualValue;
    this.stateValueModified[mergedID] = true;
    this.stateValueHasBeenManuallySet[mergedID] = true;
    this.stateInternalValue[mergedID] = internalValue;

    // clean cached values
    const mergedIDWithoutExternal1 = mergedID + ".t";
    const mergedIDWithoutExternal2 = mergedID + ".f";
    delete this.stateLastCachedWithExternal[mergedID];
    delete this.stateLastCached[mergedIDWithoutExternal1];
    delete this.stateLastCached[mergedIDWithoutExternal2];

    if (valueDiffers) {
      this.listeners.forEach((listener) => {
        listener(id || null, version || null, newActualValue);
      });
    }
  }

  /**
   * Applies the value to the property
   * this is intended to be used for when values are loaded
   * into this, and not meant for user input
   * @param id the id of the slot
   * @param version the slot version
   * @param value the value
   * @param modifiedState a modified state to use
   * @param doNotApplyValueInPropertyIfPropertyHasBeenManuallySet to avoid hot updating
   * values when the user is modifying them and an apply value has been called because
   * it has been updated somewhere else, we use this to avoid overriding, note that the value must also
   * not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back
   * to false as it's been used applyValue on it, it's been set now by the computer
   * @param rejectStateAppliedValue does not make the value as a state applied, this is used
   * by the item definition apply state function to apply a new state
   */
  public applyValue(
    id: string,
    version: string,
    value: PropertyDefinitionSupportedType,
    modifiedState: boolean,
    doNotApplyValueInPropertyIfPropertyHasBeenManuallySet: boolean,
    rejectStateAppliedValue?: boolean,
  ) {
    if (modifiedState === false && value !== null) {
      console.warn("You have set the modified state of a property as false, which means this" +
        " property (" + this.rawData.id + ") has never been touched by the user/computer, yet the value specified (" +
        JSON.stringify(value) + ")" +
        " was not null, this means that the property is in a null state that defaults to the property default yet it is not null");
    }
    // if doNotApplyValueInPropertyIfPropertyHasBeenManuallySet
    // is false, then we don't care and apply the value
    // however if it's true, we need to check the manually set variable
    // in order to know where the value comes from
    const mergedID = id + "." + (version || "");

    let currentValue = this.stateValue[mergedID] || null;
    // two conditions apply, now we need to check if it differs
    if (
      doNotApplyValueInPropertyIfPropertyHasBeenManuallySet &&
      this.stateValueHasBeenManuallySet[mergedID] &&

      // the type file always gets replaced, otherwise the blob
      // will be submitted each time, an exception done for the sake
      // of performance
      this.getType() !== "file" &&
      this.getType() !== "files"
    ) {
      const newValue = value;

      // The two of them are equal which means the internal value
      // is most likely just the same thing so we won't mess with it
      // as it's not necessary to modify it, even when this is technically a
      // new value
      if (equals(newValue, currentValue, { strict: true })) {
        this.stateValueModified[mergedID] = modifiedState;
        this.stateValueHasBeenManuallySet[mergedID] = false;
      }

      // if the values are non-equal then we can just keep our current state
      // without doing anything about it note that the stateAppliedValue
      // will always change regardless of the outcome of this function
    } else {
      let newValue = value;

      // this is the hacky exception for the files type, in the non differ mode
      // while for the file type the whole thing is replaced, as it is, just one
      // file, this will merge the results, keeping the server values as
      // priority
      if (
        (this.getType() === "files" || this.getType() === "file") &&
        doNotApplyValueInPropertyIfPropertyHasBeenManuallySet &&
        currentValue &&
        newValue
      ) {
        if (this.getType() === "files") {
          newValue = (currentValue as IRQFile[]).map((v) => {
            const serverProvidedValue = (value as IRQFile[]).find((v2) => v2.id === v.id);
            if (serverProvidedValue) {
              return {
                ...serverProvidedValue,

                // we keep our current url as it may be a blob type
                // and we prefer blob types because they are local
                // if we don't keep these blob types they will not be found and
                // be revoked, we rather want these urls not to change at all
                // for the new ones, this fixes a bug where text which stay
                // at the current value using blob urls when they are written
                // and then try to save would have the urls revoked because
                // the file field had saved, but now the url doesn't change
                // for the same given file, which means the url doesn't change
                // as long as the file lives
                url: v.url,
              };
            }

            return v;
          });
        } else {
          if ((newValue as IRQFile).id === (currentValue as IRQFile).id) {
            // we keep our current url as it may be a blob type
            // and we prefer blob types because they are local
            (newValue as IRQFile).url = (currentValue as IRQFile).url;
          }
        }
      }

      this.stateValue[mergedID] = newValue;
      this.stateValueModified[mergedID] = modifiedState;
      this.stateInternalValue[mergedID] = null;
      this.stateValueHasBeenManuallySet[mergedID] = false;
    }

    const oldAppliedValue = this.stateAppliedValue[mergedID];

    // this value does not come from the server
    // it's just applied to change its state
    if (!rejectStateAppliedValue) {
      // the new applied value gets applied
      this.stateAppliedValue[mergedID] = value;
    }

    // clean cached values
    const mergedIDWithoutExternal1 = mergedID + ".t";
    const mergedIDWithoutExternal2 = mergedID + ".f";
    delete this.stateLastCachedWithExternal[mergedID];
    delete this.stateLastCached[mergedIDWithoutExternal1];
    delete this.stateLastCached[mergedIDWithoutExternal2];

    // let's clean up object urls that are in memory
    // only truly happens client side
    if ((this.getType() === "files" || this.getType() === "file") && URL.revokeObjectURL) {
      const actualValue = this.stateValue[mergedID];
      const actualAppliedValue = this.stateAppliedValue[mergedID];
      const previousValue = currentValue;
      const previousAppliedValue = oldAppliedValue;

      // we will revoke anything of the urls that are in memory for files
      for (let previousValueToWorkWith of [previousValue, previousAppliedValue]) {
        if (previousValueToWorkWith) {
          if (this.getType() === "file") {
            if (
              (previousValueToWorkWith as IRQFile).url.startsWith("blob:") &&
              (!actualValue || (actualValue as IRQFile).url !== (previousValueToWorkWith as IRQFile).url) &&
              (!actualAppliedValue || (actualAppliedValue as IRQFile).url !== (actualAppliedValue as IRQFile).url)
            ) {
              PropertyDefinition.revokeFileForProperty(previousValueToWorkWith as IRQFile);
            }
          } else {
            let actualValueArr: IRQFile[] = [];
            if (actualValue) {
              actualValueArr = actualValueArr.concat(actualValue as IRQFile[]);
            }
            if (actualAppliedValue) {
              actualValueArr = actualValueArr.concat(actualAppliedValue as IRQFile[]);
            }
            (previousValueToWorkWith as IRQFile[]).forEach((p) => {
              if (!p.url.startsWith("blob:")) {
                return;
              }
              const shouldRevoke = !(actualValueArr as IRQFile[]).find((v) => v.url === p.url);
              if (shouldRevoke) {
                PropertyDefinition.revokeFileForProperty(p);
              }
            });
          }
        }
      }
    }

    if (this.listeners.length) {
      const valueDiffers = !equals(this.stateValue[mergedID] || null, currentValue, { strict: true });
      if (valueDiffers) {
        this.listeners.forEach((listener) => {
          listener(id || null, version || null, this.stateValue[mergedID] || null);
        });
      }
    }
  }

  /**
   * Frees the memory of stored values in a given slot id however
   * it will not clear enforced values
   * @param id the slot id
   * @param version the slot version
   */
  public cleanValueFor(
    id: string,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");

    // let's clean up object urls that are in memory
    // only truly happens client side
    if ((this.getType() === "files" || this.getType() === "file") && URL.revokeObjectURL) {
      const actualValue = this.stateValue[mergedID];

      // we will revoke anything of the urls that are in memory for files
      if (actualValue) {
        if (this.getType() === "file") {
          if ((actualValue as IRQFile).url.startsWith("blob:")) {
            PropertyDefinition.revokeFileForProperty(actualValue as IRQFile);
          }
        } else {
          (actualValue as IRQFile[]).forEach((p) => {
            p.url.startsWith("blob:") && PropertyDefinition.revokeFileForProperty(p)
          });
        }
      }
    }

    delete this.stateValue[mergedID];
    delete this.stateValueModified[mergedID];
    delete this.stateInternalValue[mergedID];
    delete this.stateValueHasBeenManuallySet[mergedID];
    // delete this.stateSuperEnforcedValue[mergedID];

    // clean cached values
    const mergedIDWithoutExternal1 = mergedID + ".t";
    const mergedIDWithoutExternal2 = mergedID + ".f";
    delete this.stateLastCachedWithExternal[mergedID];
    delete this.stateLastCached[mergedIDWithoutExternal1];
    delete this.stateLastCached[mergedIDWithoutExternal2];
  }

  /**
   * Restores the value of the given slot id to the original
   * applied value
   * @param id the slot id
   * @param version the version
   */
  public restoreValueFor(
    id: string,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");

    // if we have a state applied value we can restore for it
    if (typeof this.stateAppliedValue[mergedID] !== "undefined") {
      this.applyValue(
        id,
        version,
        this.stateAppliedValue[mergedID],
        true,
        false,
      );
      // otherwise restoring is literally clearing
    } else {
      this.cleanValueFor(id, version);
    }
  }

  /**
   * Checks the valid value but ignores external checking
   * pass the value still because cache might apply of previous
   * external checking
   *
   * @param value the value to check
   * @param id the id of the item as stored (pass null if new)
   * @param version the slot version
   * @returns the invalid reason as a string
   */
  public isValidValueNoExternalChecking(
    id: string,
    version: string,
    value: PropertyDefinitionSupportedType,
    emulateExternalChecking?: boolean,
  ): PropertyInvalidReason | string {
    // first we check for a standard invalid reason
    const standardInvalidReason = PropertyDefinition.isValidValue(
      this.rawData,
      value,
      true,
    );
    // if we get one of those we return it
    if (standardInvalidReason) {
      return standardInvalidReason;
    }

    // Cache check from the emulation of external checks
    if (emulateExternalChecking) {
      const mergedID = id + "." + (version || "");
      // check if it has an index
      const hasIndex = this.isUnique();
      // checking the cache for that index
      if (hasIndex) {
        if (
          this.stateLastUniqueCheck[mergedID] &&
          (this.stateLastUniqueCheck[mergedID].value === value ||
            equals(this.stateLastUniqueCheck[mergedID].value, value, { strict: true })) &&
          !this.stateLastUniqueCheck[mergedID].valid
        ) {
          // if the cache specifies that it's invalid
          return PropertyInvalidReason.NOT_UNIQUE;
        }
      }

      // We do not actually make the external check
    }

    // if we have invalid if conditions
    if (this.invalidIf) {
      // we run all of them
      const invalidMatch = this.invalidIf.find((ii) => ii.if.evaluate(id, version));
      // if one matches we give an error
      if (invalidMatch) {
        return invalidMatch.error;
      }
    }

    // it passed all the checks
    return null;
  }

  /**
   * Externally checks a valid value for this input using all
   * its guns, this function is context aware
   *
   * @param value the value to check
   * @param id the id of the item as stored (pass null if new)
   * @param version the slot version
   * @returns the invalid reason as a string
   */
  public async isValidValue(
    id: string,
    version: string,
    value: PropertyDefinitionSupportedType,
  ): Promise<PropertyInvalidReason | string> {
    // first we just run the standard without external checking, note how we are
    // avoiding external checking emulation, the static index checker functions
    // also access the cache so it is unecessary, even when it wouldn't hurt
    // to add the emulation as well, it's just wasted memory processing
    const standardErrOutput = this.isValidValueNoExternalChecking(id, version, value);

    // if we get an error
    if (standardErrOutput) {
      // we return it
      return standardErrOutput;
    }

    // if we have an index
    const hasIndex = this.isUnique();
    if (hasIndex) {
      const isValidIndex = await PropertyDefinition.indexChecker(this.parentItemDefinition, null, this, value, id, version);
      if (!isValidIndex) {
        return PropertyInvalidReason.NOT_UNIQUE;
      }
    }

    // if it passes everything we return null
    return null;
  }

  /**
   * Uses the raw data to instantiate a new instance of
   * the item definition, uses the same on state change
   * function for state changes so it remains linked to the
   * module
   * @returns a new instance
   */
  public getNewInstance() {
    return new PropertyDefinition(this.rawData, this.parentModule,
      this.parentItemDefinition, this.propertyIsExtension, this);
  }

  /**
   * Marks a property definition as a policy type
   * @param policyType edit, delete, create
   * @param policyName the policy name
   */
  public markAsPolicy(policyType: string, policyName: string) {
    this.policyType = policyType;
    this.policyName = policyName;

    return this;
  }

  /**
   * if this is a property definition that belongs to a policy
   * this will return the policy type
   * @returns the policy type
   */
  public getPolicyType() {
    return this.policyType || null;
  }

  /**
   * if this is a property definition that belongs to a policy
   * this will return the policy name
   * @returns the policy name
   */
  public getPolicyName() {
    return this.policyName || null;
  }

  /**
   * Specifies whether the property definition belongs to a policy
   * @returns a boolean
   */
  public isPolicyPropertyDefinition() {
    return !!this.policyType;
  }

  /**
   * Provides an unique identifier for a given id version combo
   * for this given property
   * @returns a string
   */
  public getUniqueIdentifier(id: string, version: string) {
    return (
      (this.isExtension() ? this.parentModule.getQualifiedPathName() : this.parentItemDefinition.getQualifiedPathName()) + "_" +
      this.getId() + "_" +
      (this.isPolicyPropertyDefinition() ? (this.policyType + "_" + this.policyName + "_") : "") +
      id + "_" +
      version
    )
  }

  /**
   * Provides the property definition description from the
   * supported standards
   * @returns the property definition description for its type
   */
  public getPropertyDefinitionDescription() {
    return PropertyDefinition.supportedTypesStandard[this.getType()];
  }

  /**
   * Tells whether the current property is nullable
   * @returns a boolean
   */
  public isNullable() {
    return this.rawData.nullable;
  }

  /**
   * Tells whether there's an unique index on it
   * @returns a boolean
   */
  public isUnique() {
    return !!(this.rawData.unique || this.rawData.nonCaseSensitiveUnique);
  }

  /**
   * Whether the unique is not case sensitive
   * @returns a boolean
   */
  public isNonCaseSensitiveUnique() {
    return !!this.rawData.nonCaseSensitiveUnique;
  }

  /**
   * Tells whether the current property is defined as being hidden
   * @returns a boolean
   */
  public isHidden() {
    return this.rawData.hidden;
  }

  /**
   * Checks whether the property can be retrieved
   * @returns a boolean
   */
  public isRetrievalDisabled() {
    return this.rawData.disableRetrieval || false;
  }

  /**
   * Checks whether the property can be range searched
   * @returns a boolean
   */
  public isRangedSearchDisabled() {
    return this.rawData.disableRangedSearch || false;
  }

  /**
   * Tells if it's searchable, either by default or because
   * of a search level
   * @returns a boolean
   */
  public isSearchable(): boolean {
    if (this.getPropertyDefinitionDescription().searchable) {
      if (typeof this.rawData.searchable === "undefined") {
        return true;
      }
      return this.rawData.searchable;
    }
    return false;
  }

  public getSearchBoost() {
    return this.rawData.searchEngineBoost || null;
  }

  /**
   * Checks whether the property has specific defined valid values
   * @returns a boolean
   */
  public hasSpecificValidValues() {
    return !!this.rawData.values;
  }

  /**
   * Specifies whether it represents a list form
   * @returns a boolean
   */
  public isList() {
    return !!this.getPropertyDefinitionDescription().rq.array;
  }

  /**
   * Provides the specific valid values of the given property
   * @returns a boolean
   */
  public getSpecificValidValues() {
    return this.rawData.values;
  }

  /**
   * Provides the subtype of the property, if available
   * @returns the subtype string or null
   */
  public getSubtype() {
    return this.rawData.subtype || null;
  }

  /**
   * Check whether the type is text, and if it's a rich text type
   * @returns a boolean
   */
  public isRichText() {
    return this.rawData.type === "text" && this.rawData.subtype === "html";
  }

  public isText() {
    return this.rawData.type === "text";
  }

  public isTracked() {
    return this.rawData.type === "string" && this.rawData.subtype && this.rawData.subtype.endsWith("-tracked");
  }

  public isPointer() {
    return this.rawData.type === "string" && this.rawData.subtype && this.rawData.subtype.startsWith("pointer");
  }

  public isPointerList() {
    return this.rawData.type === "taglist" && this.rawData.subtype && this.rawData.subtype.startsWith("pointer");
  }

  public getPointerTargetItem(): ItemDefinition {
    const item = this.parentModule.getParentRoot().registry[this.rawData.config.targetItem] as ItemDefinition;
    if (!item || item instanceof Module) {
      return null;
    }
    return item;
  }

  public getPointerSynchronizationProperty(): PropertyDefinition {
    const item = this.getPointerTargetItem();
    if (!item) {
      return null;
    }
    if (!item.hasPropertyDefinitionFor(this.rawData.config.synchronizeProperty, true)) {
      return null;
    }
    return item.getPropertyDefinitionFor(this.rawData.config.synchronizeProperty, true);
  }

  /**
   * Provides the max length as defined, or null if not available
   * @returns a number or null
   */
  public getMaxLength() {
    return typeof this.rawData.maxLength !== "undefined" ?
      this.rawData.maxLength : null;
  }

  /**
   * Provides the min length as defined or null if not available
   * @returns a number or null
   */
  public getMinLength() {
    return typeof this.rawData.minLength !== "undefined" ?
      this.rawData.minLength : null;
  }

  /**
   * Provides the max decimal count as defined, does not provide
   * the limits as they are defined in the constant, returns null
   * simply if it's not defined
   * @returns a number or null
   */
  public getMaxDecimalCount() {
    return this.rawData.maxDecimalCount || null;
  }

  /**
   * Provides the min decimal count as defined, does not provide
   * the limits as they are defined in the constant, returns null
   * simply if it's not defined
   * @returns a number or null
   */
  public getMinDecimalCount() {
    if (this.getType() === "currency") {
      return null;
    }
    return this.rawData.minDecimalCount || 0;
  }

  /**
   * Provides the value of a special property if it's available
   * they can only be of type, boolean, string, or number
   * @param name the name of that specifial property
   * @returns the special property value, either a boolean, number or string, or null
   */
  public getConfigValue(name: string) {
    if (!this.rawData.config) {
      return null;
    }

    return typeof this.rawData.config[name] !== "undefined" ? this.rawData.config[name] : null;
  }

  /**
   * Just gives the parent module
   * @returns a Module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Just gives the parent item definition
   * @returns a item definition that holds this property if any
   */
  public getParentItemDefinition() {
    return this.parentItemDefinition;
  }

  /**
   * Tells if the property is an extension
   * from the propext list, they usually have priority
   * @returns a boolean
   */
  public isExtension(): boolean {
    return this.propertyIsExtension;
  }

  /**
   * Tells whether the value is coerced into default when null
   * @returns a booean
   */
  public isCoercedIntoDefaultWhenNullAfterSubmit(): boolean {
    return !!this.rawData.coerceNullsIntoDefaultAfterSubmit;
  }

  /**
   * Specifies if a property is used for custom searches
   * @returns a boolean
   */
  public isSearchOnly(): boolean {
    return !!this.rawData.searchOnlyProperty;
  }

  /**
   * Gives the default set value
   * @returns a property definition value, or null
   */
  public getDefaultValue(): PropertyDefinitionSupportedType {
    return typeof this.rawData.default !== "undefined" ? this.rawData.default : null;
  }

  /**
   * Returns the locale data definition, or null
   * @param  locale the locale
   * @returns the locale data
   */
  public getI18nDataFor(locale: string): any {
    // this is where the originating instance matters, when we merge i18nData we use the
    // actual children and we have no clue of reinstantiated properties
    // so we actually get this info from the originating instance
    if (this.originatingInstance) {
      return this.originatingInstance.getI18nDataFor(locale);
    }
    if (!this.rawData.i18nData) {
      return null;
    }
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * Provides the specified roles with the access to perform an IO
   * action to the property
   * @param action the action in question, DELETE is not an allowed
   * action because properties cannot be deleted, only the item definition
   * as a whole is deleted so it makes no sense, and while the same can
   * be said about creation, creation can be done with incomplete values
   * partial creation is a thing in itemize, and a property can be protected
   * from an arbitrary value during creation, this comes in handy for example
   * for the role in the user item, where an user cannot assign itself an arbitrary
   * role during the IO action of creation
   * @returns an array of string for the roles
   */
  public getRolesWithAccessTo(action: ItemDefinitionIOActions) {
    if (action === ItemDefinitionIOActions.READ) {
      return this.rawData.readRoleAccess || [ANYONE_METAROLE];
    } else if (action === ItemDefinitionIOActions.CREATE) {
      return this.rawData.createRoleAccess || [ANYONE_METAROLE];
    } else if (action === ItemDefinitionIOActions.EDIT) {
      // you might wonder why edit is not OWNER_METAROLE
      // this is because the item definition role access actually uses
      // OWNER_METAROLE this would mean that you cannot edit anyway
      // because the item definition prevents it, having ANYONE_METAROLE
      // here means that it would inherit whatever the item definition
      // decides, it's cheap inheritance
      return this.rawData.editRoleAccess || [ANYONE_METAROLE];
    }
    return [];
  }

  /**
   * Builds the fields for a given role and a given action and
   * a given property
   * @param action the action that the user wants to execute
   * @param role the role that is executing this action
   * @param userId the user id
   * @param ownerUserId the owner of the item definition for this property
   */
  public async buildFieldsForRoleAccess(
    action: ItemDefinitionIOActions,
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
  ) {
    // for delete, you shouldn't really be getting anything
    if (action === ItemDefinitionIOActions.DELETE) {
      return null;
    }

    // if the owner is null
    if (ownerUserId === null) {
      // we can't accept it as the onwer should be something
      // otherwise it's adding something
      throw new Error("ownerUserId cannot be null");
    }

    // now let's get the roles that have access to the action
    // first we get all the roles that have the access
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    // so if ANYONE_METAROLE is included we have access
    const hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) ||
      (rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE) ||
      (
        // or if OWNER_METAROLE is included and our user matches our owner user
        // note that this is why it's important to pass UNSPECIFIED_OWNER rather than null
        // because null === null in the case of eg. GUEST_METAROLE
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role) || (await rolesManager.checkRoleAccessFor(rolesWithAccess)).granted;

    // if no access then null
    if (!hasAccess) {
      return null;
    }

    // otherwise we get the request fields
    return this.getRequestFields();
  }

  /**
   * Checks the soft read role access to a given
   * property
   * @param role 
   * @param userId 
   * @param ownerUserId 
   * @param rolesManager 
   * @returns 
   */
  public async checkSoftReadRoleAccessFor(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
  ) {
    const rolesWithAccess = this.rawData.softReadRoleAccess || [ANYONE_METAROLE];

    const hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) || (
      rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
    ) || (
        // or if OWNER_METAROLE is included and our user matches our owner user
        // note that this is why it's important to pass UNSPECIFIED_OWNER rather than null
        // because null === null in the case of eg. GUEST_METAROLE
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role) || (await rolesManager.checkRoleAccessFor(rolesWithAccess)).granted;

    return hasAccess;
  }

  /**
   * Checks the role access for a specific IO action to a specific role
   * basically just returns a boolean
   * @param action the action that wants to be performed
   * @param role the role that wants to perform that action
   * @param userId the user id that wants to perform the action (null is allowed for eg. GUEST_METAROLE)
   * @param ownerUserId the owner of the item definition (provide UNSPECFIED_OWNER when no owner is known)
   * @param throwError whether to throw an EndpointError during failure rather than returning a boolean
   * @returns a boolean on whether it has been granted access
   */
  public async checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    // first we get all the roles that have the access
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    // so if ANYONE_METAROLE is included we have access
    let hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) || (
      rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
    ) || (
        // or if OWNER_METAROLE is included and our user matches our owner user
        // note that this is why it's important to pass UNSPECIFIED_OWNER rather than null
        // because null === null in the case of eg. GUEST_METAROLE
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role);

    let code: string = null;
    let message: string = null;
    if (!hasAccess) {
      const managerStatus = await rolesManager.checkRoleAccessFor(rolesWithAccess);
      hasAccess = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    // if we don't have access and we are requested to throw an error
    if (!hasAccess && throwError) {
      // so let's check if we are a guest, if we are a guest, chances are we are required
      // to log in if there's an alternative role we could have been, and it's not fully blocked
      const notLoggedInWhenShould = role === GUEST_METAROLE && rolesWithAccess.length;
      // sometimes also for example when doing searches an error might have been avoided if an owner
      // of all the searches elements had been specified, like when searching within messages of an user
      // that only that user has access, this is a client side programming issue, but it's nice
      // to give a specific error
      const errorMightHaveBeenAvoidedIfOwnerSpecified = ownerUserId === UNSPECIFIED_OWNER &&
        rolesWithAccess.includes(OWNER_METAROLE);

      // this is the error message
      if (!message) {
        message = `Forbidden, user ${userId} with role ${role} has no ${action} access to property ${this.getId()}` +
          ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
        if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
          // this is the bit we add
          message += ", this error might have been avoided if an owner had" +
            " been specified which matched yourself as there's a self rule, if performing a search" +
            " you might have wanted to add the created_by filter in order to ensure this rule is followed";
        }
      }


      // and we throw the error
      throw new EndpointError({
        message,
        code: notLoggedInWhenShould ? ENDPOINT_ERRORS.MUST_BE_LOGGED_IN : (code || ENDPOINT_ERRORS.FORBIDDEN),
      });
    }

    // otherwise we return the boolean as it is
    return hasAccess;
  }

  /**
   * Gets the raw data of the property
   * @returns the json form
   */
  public toJSON() {
    return this.rawData;
  }

  /**
   * Provides the qualified property identifier for this specific property
   * @param policyType the policy type
   * @param policyName the policy name
   * @returns a string for the qualified policy prefix for this specific property id
   */
  public getQualifiedPolicyIdentifier(policyType: string, policyName: string) {
    return PropertyDefinition.getQualifiedPolicyPrefix(policyType, policyName) + this.getId();
  }

  /**
   * Merges the raw json data locale information of this property with another
   * of the same kind (only its language data)
   * @param pdef the property definition raw form
   */
  public mergeWithI18n(
    pdef: IPropertyDefinitionRawJSONDataType,
  ) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...pdef.i18nData,
    };
  }
}
