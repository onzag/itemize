/**
 * This file contains the property definition that defines all the interactions
 * that occur within a property of an item
 *
 * @packageDocumentation
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
} from "../../../../../constants";
import Module from "../..";
import supportedTypesStandard, { PropertyDefinitionSupportedType, PropertyDefinitionSupportedTypeName } from "./types";
import { EndpointError } from "../../../../errors";
import { DOMWindow } from "../../../../../util";
import equals from "deep-equal";
import { IGQLFile } from "../../../../../gql-querier";
import Include from "../Include";
import { ICustomRoleManager } from "../../../../Root";

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
   * html style autocomplete, mainly used for browser level
   * autocompletition
   */
  htmlAutocomplete?: string;
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
   * Single enforced value
   */
  enforcedValue?: PropertyDefinitionSupportedType;
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
   * Special properties that are assigned in the type behaviour
   * description, you set the value here
   */
  specialProperties?: {
    [key: string]: any;
  };
  /**
   * whether nulls are coerced into their default value this is useful
   * when creating values where the user is expected to do a partial creation as
   * he is not allowed access to certain property, eg user role, so it is ensured
   * that the null value will be coerced into the default
   */
  coerceNullsIntoDefault?: boolean;

  /**
   * Read role permissions
   */
  readRoleAccess?: string[];
  /**
   * create role permissions
   */
  createRoleAccess?: string[];
  /**
   * Edit role permissions
   */
  editRoleAccess?: string[];
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
export interface IPropertyDefinitionState {
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
  value: PropertyDefinitionSupportedType;
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
  stateAppliedValue: PropertyDefinitionSupportedType;
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
  // /rest endpoint, this is not a graphql endpoint, it's just rest
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
    // Check for nulls
    if (propertyDefinitionRaw.nullable && value === null) {
      return null;
    } else if (!propertyDefinitionRaw.nullable && value === null) {
      return PropertyInvalidReason.NOT_NULLABLE;
    }
    // Check against the values if allowed
    if (
      propertyDefinitionRaw.values &&
      checkAgainstValues &&
      !propertyDefinitionRaw.values.includes(value)
    ) {
      return PropertyInvalidReason.INVALID_VALUE;
    }
    // we get the definition and run basic checks
    const definition = supportedTypesStandard[propertyDefinitionRaw.type];
    // These basic checks are the most important
    if (definition.json && typeof value !== definition.json) {
      return PropertyInvalidReason.INVALID_VALUE;
    }

    // if this is a graphql list
    if (definition.gqlList) {
      // then we check if it's an array
      if (!Array.isArray(value)) {
        // if it's not is invalid
        return PropertyInvalidReason.INVALID_VALUE;
      }

      // if this is specified as a file content array data
      if (definition.gqlAddFileToFields) {
        // we have to do this madness for every file
        if (!value.every((v: IGQLFile) => {
          // check that all the types match
          return typeof v.id === "string" &&
            typeof v.name === "string" &&
            typeof v.type === "string" &&
            typeof v.url === "string" &&
            typeof v.size === "number" &&
            // metadata must be string and less than equal 128 characters, or otherwise null
            ((typeof v.metadata === "string" && v.metadata.length <= 128) || v.metadata === null) &&
            // check that the file size isn't too large
            v.size <= MAX_FILE_SIZE &&
            (
              // check that the source is either a promise (aka a readable stream)
              v.src === null ||
              typeof v.src === "undefined" ||
              (v.src as Promise<any>).then ||
              // or check that the source is a file
              (
                typeof File !== "undefined" &&
                v.src instanceof File
              )
            );
        })) {
          // if any of those checks fail then it's invalid
          return PropertyInvalidReason.INVALID_VALUE;
        }
      }

      // Otherwise if we are adding the file info, but it's not an array
    } else if (definition.gqlAddFileToFields) {
      // we get is casted as a file
      const valueAsIGQLFile: IGQLFile = value as unknown as IGQLFile;

      // and now we got to check if any of these, does not match
      // we are doing the opposite we did before with .every
      if (
        // if any type does not match
        typeof valueAsIGQLFile.id !== "string" ||
        typeof valueAsIGQLFile.name !== "string" ||
        typeof valueAsIGQLFile.type !== "string" ||
        typeof valueAsIGQLFile.url !== "string" ||
        typeof valueAsIGQLFile.size !== "number" ||
        // metadata is not string, or metadata is longer than 128 characters an metadata is not null as well, invalid
        ((typeof valueAsIGQLFile.metadata !== "string" || valueAsIGQLFile.metadata.length > 128) && valueAsIGQLFile !== null) ||
        // or file is too large
        valueAsIGQLFile.size > MAX_FILE_SIZE ||
        // or the source is not null and not undefined
        // and it's not a promise and it's not a file
        (
          valueAsIGQLFile.src !== null &&
          typeof valueAsIGQLFile.src !== "undefined" &&
          !(valueAsIGQLFile.src as Promise<any>).then && (
            typeof File === "undefined" ||
            !(valueAsIGQLFile.src instanceof File)
          )
        )
      ) {
        // This means it's an invalid IGQL file structure
        return PropertyInvalidReason.INVALID_VALUE;
      }
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
      valueToCheck < propertyDefinitionRaw.min
    ) {
      return PropertyInvalidReason.TOO_SMALL;
      // TOO_LARGE check
    } else if (
      typeof propertyDefinitionRaw.max !== "undefined" &&
      valueToCheck > propertyDefinitionRaw.max
    ) {
      return PropertyInvalidReason.TOO_LARGE;
      // TO_SMALL check again but lenght based
    } else if (
      typeof propertyDefinitionRaw.minLength !== "undefined" &&
      (valueToCheck as string).length < propertyDefinitionRaw.minLength
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
      const isRichText = propertyDefinitionRaw.type === "text" && propertyDefinitionRaw.subtype === "html";
      // if it's an array, we use the array length
      if (Array.isArray(value)) {
        count = value.length;
      } else if (!isRichText) {
        // if it's not rich text we just count the characters
        count = value.toString().length;
      } else {
        // special check for large values in raw mode
        // should be a large enough value to avoid this
        // and avoid being spammed with empty tags
        if (value.toString().length > MAX_RAW_TEXT_LENGTH) {
          return PropertyInvalidReason.TOO_LARGE;
        }

        if (typeof window !== "undefined" && typeof (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH] !== "undefined") {
          count = (window as any)[LAST_RICH_TEXT_CHANGE_LENGTH];
        } else {
          // otherwise we need to create a dummy element and count the characters
          const dummyElement = DOMWindow.document.createElement("div");
          dummyElement.innerHTML = value.toString();
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
    [slotId: string]: PropertyDefinitionSupportedType,
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
    [slotId: string]: IPropertyDefinitionState;
  };
  public stateLastCachedWithExternal: {
    [slotId: string]: IPropertyDefinitionState;
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
      rawJSON.defaultIf
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
  public getEnforcedValue(id: string, version: string): {
    enforced: boolean;
    value?: PropertyDefinitionSupportedType;
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
            this.stateSuperEnforcedValue[mergedID] :

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
          value: enforcedValue,
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
   * graphql requested, these come from the property description
   * @returns the requested fields that are necessary
   */
  public getRequestFields() {
    let requestFields = {};
    // now we get the description for this field
    const propertyDescription = this.getPropertyDefinitionDescription();
    // if there are graphql fields defined
    if (propertyDescription.gqlFields) {
      // we add each one of them
      Object.keys(propertyDescription.gqlFields).forEach((field) => {
        requestFields[field] = {};
      });
    }

    if (propertyDescription.gqlAddFileToFields) {
      requestFields = {
        ...requestFields,
        name: {},
        url: {},
        id: {},
        size: {},
        type: {},
        metadata: {},
      };
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
  public getCurrentValue(id: string, version: string): PropertyDefinitionSupportedType {
    // first we check for a possible enforced value
    const possibleEnforcedValue = this.getEnforcedValue(id, version);

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

      return typeof defaultValue === "undefined" ? null : defaultValue;
    }

    // if nothing apply we return the state value or null
    return nullIfUndefined(this.stateValue[mergedID]);
  }

  /**
   * Provides the applied value for a property
   * @param id the id
   * @param version the version
   * @returns the applied value
   */
  public getAppliedValue(
    id: string,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");
    return nullIfUndefined(this.stateAppliedValue[mergedID]);
  }

  /**
   * provides the current useful value for the property defintion without doing
   * any external checking, pass the id still as a cache of previously external
   * checked results might apply
   * @param id the id of the current item definition as stored, pass null if not stored
   * @param version the slot version
   * @returns the current value state
   */
  public getStateNoExternalChecking(
    id: string,
    version: string,
    emulateExternalChecking?: boolean,
  ): IPropertyDefinitionState {
    const mergedID = id + "." + (version || "");
    const mergedIDWithoutExternal = id + "." + (version || "") + "." + (emulateExternalChecking ? "t" : "f");
    if (
      this.canCacheState &&
      this.stateLastCached[mergedIDWithoutExternal]
    ) {
      return this.stateLastCached[mergedIDWithoutExternal];
    }

    const possibleEnforcedValue = this.getEnforcedValue(id, version);

    if (possibleEnforcedValue.enforced) {
      const possibleInvalidEnforcedReason = this.isValidValueNoExternalChecking(
        id, version, possibleEnforcedValue.value, emulateExternalChecking,
      );
      // we return the value that was set to be
      const stateValue: IPropertyDefinitionState = {
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
      const stateValue: IPropertyDefinitionState = {
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

    const value = this.getCurrentValue(id, version);
    const invalidReason = this.isValidValueNoExternalChecking(id, version, value, emulateExternalChecking);
    const stateValue: IPropertyDefinitionState = {
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
  public async getState(id: string, version: string): Promise<IPropertyDefinitionState> {

    const mergedID = id + "." + (version || "");
    if (this.canCacheState && this.stateLastCachedWithExternal[mergedID]) {
      return this.stateLastCachedWithExternal[mergedID];
    }

    // containsAnExternallyCheckedProperty
    // some smart shenanigans
    if (
      !this.isUnique() &&
      this.canCacheState &&
      (this.stateLastCached[mergedID + ".f"] || this.stateLastCached[mergedID + ".t"])
    ) {
      return (this.stateLastCached[mergedID + ".f"] || this.stateLastCached[mergedID + ".t"]);
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
      value?: PropertyDefinitionSupportedType,
    } = null;
    // and here we will store what comes later
    let nextPossibleEnforcedValue: {
      enforced: boolean,
      value?: PropertyDefinitionSupportedType,
    } = null;

    // and we enter a loop here
    do {
      // we pick either what was our next or we get a new value for our current
      possibleEnforcedValue = nextPossibleEnforcedValue || this.getEnforcedValue(id, version);
      // and if it's enforced
      if (possibleEnforcedValue.enforced) {
        // we do the async check
        possibleInvalidEnforcedReason = await this.isValidValue(id, version, possibleEnforcedValue.value);
        // and then we get our next value
        nextPossibleEnforcedValue = this.getEnforcedValue(id, version);
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
      const stateValue: IPropertyDefinitionState = {
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
      const stateValue: IPropertyDefinitionState = {
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
    let currentValue: PropertyDefinitionSupportedType;
    // and here we will store what comes later
    let nextValue: PropertyDefinitionSupportedType;

    do {
      currentValue = typeof nextValue === "undefined" ? this.getCurrentValue(id, version) : nextValue;
      invalidReason = await this.isValidValue(id, version, currentValue);
      nextValue = this.getCurrentValue(id, version);
      // we will loop if there's a next value as in, it was enforced as well
      // and if something changed during the event
    } while (
      nextValue !== currentValue
    );

    const stateValue: IPropertyDefinitionState = {
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
    const actualValue = definition.nullableDefault === value ?
      null : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof actualValue !== definition.json) {
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue));
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
   */
  public setSuperEnforced(
    id: string,
    version: string,
    value: PropertyDefinitionSupportedType,
  ) {
    // let's get the definition
    const definition = supportedTypesStandard[this.rawData.type];
    // find whether there is a nullable value and if it matches
    const actualValue = definition.nullableDefault === value ?
      null : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof actualValue !== definition.json) {
        throw new Error("Invalid super enforced " + JSON.stringify(actualValue));
      }
    }

    const mergedID = id + "." + (version || "");
    this.stateSuperEnforcedValue[mergedID] = actualValue;

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
   */
  public clearSuperEnforced(
    id: string,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");
    const deletedValue = this.stateSuperEnforcedValue[mergedID];
    delete this.stateSuperEnforcedValue[mergedID];

    // clean cached values
    const mergedIDWithoutExternal1 = mergedID + ".t";
    const mergedIDWithoutExternal2 = mergedID + ".f";
    delete this.stateLastCachedWithExternal[mergedID];
    delete this.stateLastCached[mergedIDWithoutExternal1];
    delete this.stateLastCached[mergedIDWithoutExternal2];

    if (this.stateValue[mergedID] !== deletedValue) {
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
    const actualValue = definition.nullableDefault === value ?
      null : value;

    if (actualValue !== null && !(actualValue instanceof PropertyDefinition)) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof actualValue !== definition.json) {
        throw new Error("Invalid super default " + JSON.stringify(actualValue));
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
    const newActualValue = definition.nullableDefault === newValue ?
      null : newValue;

    if (newActualValue !== null) {
      // we run some very basic validations, if this is a number and you put in
      // a string then something is clearly wrong
      // other kinds of invalid values are ok
      if (definition.json && typeof newActualValue !== definition.json) {
        throw new Error("Invalid value " + JSON.stringify(newActualValue));
      }
    }

    const mergedID = id + "." + (version || "");
    const valueDiffers = this.listeners.length && !equals(this.stateValue[mergedID], newValue);

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
   * @param doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers to avoid hot updating
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
    doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers: boolean,
    rejectStateAppliedValue?: boolean,
  ) {
    if (modifiedState === false && value !== null) {
      console.warn("You have set the modified state of a property as false, which means this" +
        " property (" + this.rawData.id + ") has never been touched by the user/computer, yet the value specified (" +
        JSON.stringify(value) + ")" +
        " was not null, this means that the property is in a null state that defaults to the property default yet it is not null");
    }
    // if doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers
    // is false, then we don't care and apply the value
    // however if it's true, we need to check the manually set variable
    // in order to know where the value comes from
    const mergedID = id + "." + (version || "");
    let currentValue = this.stateValue[mergedID] || null;
    // two conditions apply, now we need to check if it differs
    if (
      doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers &&
      this.stateValueHasBeenManuallySet[mergedID]
    ) {
      const newValue = value;
      // The two of them are equal which means the internal value
      // is most likely just the same thing so we won't mess with it
      // as it's not necessary to modify it, even when this is technically a
      // new value
      if (equals(newValue, currentValue)) {
        this.stateValueModified[mergedID] = modifiedState;
        this.stateValueHasBeenManuallySet[mergedID] = false;
      }
    } else {
      this.stateValue[mergedID] = value;
      this.stateValueModified[mergedID] = modifiedState;
      this.stateInternalValue[mergedID] = null;
      this.stateValueHasBeenManuallySet[mergedID] = false;
    }

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

    if (this.listeners.length) {
      const valueDiffers = !equals(this.stateValue[mergedID] || null, currentValue);
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
            equals(this.stateLastUniqueCheck[mergedID].value, value)) &&
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
    return this.rawData.disableRangedSearch ||
      (this.rawData.type === "integer" && this.rawData.subtype === "reference") ||
      false;
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

  /**
   * Checks whether the property has specific defined valid values
   * @returns a boolean
   */
  public hasSpecificValidValues() {
    return !!this.rawData.values;
  }

  /**
   * Provides the specific valid values of the given property
   * @returns a boolean
   */
  public getSpecificValidValues() {
    return this.rawData.values;
  }

  /**
   * Provides the html level as defined as autocomplete="" in the html tag
   * attribute, this is mainly for usability
   * @returns a string or null
   */
  public getHTMLAutocomplete() {
    return this.rawData.htmlAutocomplete || null;
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
  public getSpecialProperty(name: string) {
    if (!this.rawData.specialProperties) {
      return null;
    }

    return typeof this.rawData.specialProperties[name] !== "undefined" ? this.rawData.specialProperties[name] : null;
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
  public isCoercedIntoDefaultWhenNull(): boolean {
    return !!this.rawData.coerceNullsIntoDefault;
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
      ) || rolesWithAccess.includes(role) || await rolesManager.checkRoleAccessFor(rolesWithAccess);

    // if no access then null
    if (!hasAccess) {
      return null;
    }

    // otherwise we get the request fields
    return this.getRequestFields();
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
    const hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) || (
      rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
    ) || (
        // or if OWNER_METAROLE is included and our user matches our owner user
        // note that this is why it's important to pass UNSPECIFIED_OWNER rather than null
        // because null === null in the case of eg. GUEST_METAROLE
        rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || rolesWithAccess.includes(role) || await rolesManager.checkRoleAccessFor(rolesWithAccess);

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
      let errorMessage = `Forbidden, user ${userId} with role ${role} has no ${action} access to property ${this.getId()}` +
        ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
      if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
        // this is the bit we add
        errorMessage += ", this error might have been avoided if an owner had" +
          " been specified which matched yourself as there's a self rule, if performing a search" +
          " you might have wanted to add the created_by filter in order to ensure this rule is followed";
      }

      // and we throw the error
      throw new EndpointError({
        message: errorMessage,
        code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : "FORBIDDEN",
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
