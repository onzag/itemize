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
} from "../../../../../constants";
import Module from "../..";
import supportedTypesStandard, { PropertyDefinitionSupportedType, PropertyDefinitionSupportedTypeName } from "./types";
import { EndpointError } from "../../../../errors";
import { DOMWindow } from "../../../../../util";
import equals from "deep-equal";
import { ISingleFilterRawJSONDataType } from "../../../../Autocomplete";
import { IGQLFile } from "../../../../../gql-querier";

export type PropertyDefinitionIncludedFileInfoType = IGQLFile;

export enum PropertyInvalidReason {
  INVALID_VALUE = "INVALID_VALUE",
  TOO_LARGE = "TOO_LARGE",
  TOO_SMALL = "TOO_SMALL",
  TOO_MANY_DECIMALS = "TOO_MANY_DECIMALS",
  TOO_FEW_DECIMALS = "TOO_FEW_DECIMALS",
  NOT_NULLABLE = "NOT_NULLABLE",
  INVALID_SUBTYPE_VALUE = "INVALID_SUBTYPE_VALUE",
  FROM_LARGER_THAN_TO = "FROM_LARGER_THAN_TO",
  TO_SMALLER_THAN_FROM = "TO_SMALLER_THAN_FROM",
  NOT_UNIQUE = "NOT_UNIQUE",
}

export interface IPropertyDefinitionRawJSONRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: IConditionalRuleSetRawJSONDataType;
}

export interface IPropertyDefinitionRawJSONInvalidRuleDataType {
  error: string;
  if: IConditionalRuleSetRawJSONDataType;
}

export type PropertyDefinitionRarityLevelsType =
  "standard" | "moderate" | "rare";

export interface IPropertyDefinitionRawJSONDataType {
  // the property identifier
  id: string;
  // the locale data, we don't know what it is
  // the structure is defined in the constants
  i18nData?: {
    [locale: string]: any,
  };
  // the type of the property
  type: PropertyDefinitionSupportedTypeName;
  subtype?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  maxDecimalCount?: number;
  minDecimalCount?: number;

  // values for the property set
  values?: PropertyDefinitionSupportedType[];
  // whether it is unique
  unique?: boolean;
  // whether it can be null or not
  nullable?: boolean;
  // Makes the value be null if hidden
  // doe not perform checks so it makes it valid
  nullIfHidden?: boolean;
  // Makes the field hidden if value is enforced
  hiddenIfEnforced?: boolean;
  // hidden does not show at all
  hidden?: boolean;
  // autocomplete is an endpoint of some sort that requests
  // data for autocomplete
  autocomplete?: string;
  // uses a property attribute
  autocompleteFilterFromProperty?: {
    [keyName: string]: string,
  };
  // whether it's enforced or not
  autocompleteIsEnforced?: boolean;
  // whether the autocomplete supports prefills
  autocompleteSupportsPrefills?: boolean;
  // whether the autocomplete supports locale
  autocompleteSupportsLocale?: boolean;
  // html style autocomplete
  htmlAutocomplete?: string;
  // default value
  default?: PropertyDefinitionSupportedType;
  defaultIf?: IPropertyDefinitionRawJSONRuleDataType[];
  // invalid value
  invalidIf?: IPropertyDefinitionRawJSONInvalidRuleDataType[];
  // enforced values
  enforcedValues?: IPropertyDefinitionRawJSONRuleDataType[];
  enforcedValue?: PropertyDefinitionSupportedType;
  // hidden if conditional
  hiddenIf?: IConditionalRuleSetRawJSONDataType;
  // search level
  searchable?: boolean;
  // disable ranged search
  disableRangedSearch?: boolean;
  // disable retrieval, property value is never retrieved
  // it can only be set or updated
  disableRetrieval?: boolean;
  // Special properties
  specialProperties: {
    [key: string]: string | boolean | number;
  };
  // whether nulls are coerced into their default value
  coerceNullsIntoDefault?: boolean;

  // role permissions
  readRoleAccess?: string[];
  createRoleAccess?: string[];
  editRoleAccess?: string[];
}

export interface IPropertyDefinitionRuleDataType {
  value: PropertyDefinitionSupportedType;
  if: ConditionalRuleSet;
}

export interface IPropertyDefinitionInvalidRuleDataType {
  error: string;
  if: ConditionalRuleSet;
}

export interface IPropertyDefinitionState {
  userSet: boolean;
  default: boolean;
  enforced: boolean;
  hidden: boolean;
  valid: boolean;
  invalidReason: PropertyInvalidReason | string;
  value: PropertyDefinitionSupportedType;
  internalValue: any;
  stateValue: any;
  stateValueModified: boolean;
  propertyId: string;
}

function nullIfUndefined<T>(value: T): T {
  if (typeof value === "undefined") {
    return null;
  }
  return value;
}

// OTHER EXPORTS

export interface IPropertyDefinitionAlternativePropertyType {
  property: string;
}

export type PropertyDefinitionCheckerFunctionType =
  (property: PropertyDefinition, value: PropertyDefinitionSupportedType, id: number) => Promise<boolean>;

async function clientSideIndexChecker(
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: number,
) {
  if (value === null) {
    return true;
  }

  if (
    property.stateLastUniqueCheck[id] &&
    (property.stateLastUniqueCheck[id].value === value || equals(property.stateLastUniqueCheck[id].value, value))
  ) {
    return property.stateLastUniqueCheck[id].valid;
  }

  const qualifiedParentName = property.isExtension() ?
    property.getParentModule().getQualifiedPathName() :
    property.getParentItemDefinition().getQualifiedPathName();
  try {
    const result = await fetch("/rest/index-check/" + qualifiedParentName + "/" + property.getId(), {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value,
        id,
      }),
    });
    const output = await result.json();
    property.stateLastUniqueCheck[id] = {
      valid: !!output,
      value,
    };
    return !!output;
  } catch (err) {
    return true;
  }
}

async function clientSideAutocompleteChecker(
  property: PropertyDefinition,
  value: PropertyDefinitionSupportedType,
  id: number,
) {
  if (value === null) {
    return true;
  }

  const filters = property.getAutocompletePopulatedFiltersFor(id);
  const autocompleteId = property.getAutocompleteId();

  if (
    property.stateLastAutocompleteCheck[id] &&
    property.stateLastAutocompleteCheck[id].value === value &&
    equals(property.stateLastAutocompleteCheck[id].filters, filters)
  ) {
    return property.stateLastAutocompleteCheck[id].valid;
  }

  try {
    const result =
      await fetch("/rest/autocomplete-check/" + autocompleteId +
        "?body=" + encodeURIComponent(JSON.stringify({
          value,
          filters,
        })),
        {
          headers: {
            "sw-cacheable": "true",
          },
        },
      );
    const output = await result.json();
    property.stateLastAutocompleteCheck[id] = {
      valid: !!output,
      value,
      filters,
    };
    return !!output;
  } catch (err) {
    return true;
  }
}

// The class itself
export default class PropertyDefinition {
  public static supportedTypesStandard = supportedTypesStandard;

  // this static is required to be set in order to check for indexes
  public static indexChecker: PropertyDefinitionCheckerFunctionType = clientSideIndexChecker;
  public static autocompleteChecker: PropertyDefinitionCheckerFunctionType = clientSideAutocompleteChecker;

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
   * and hence it cannot check for unique indexes and
   * autocomplete enforced results
   *
   * @param propertyDefinitionRaw The raw json property definition data
   * @param value the value to check against
   * @param checkAgainstValues if to check against its own values
   * some properties are enums, and this checks whether to check against
   * these enums, but for example, when checking the information on the enums
   * during the checkers.ts process, we don't want to check that because
   * then it will always be valid
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
    if (definition.gqlList) {
      if (!Array.isArray(value)) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
      if (definition.gqlAddFileToFields) {
        if (!(value as any).every((v: PropertyDefinitionIncludedFileInfoType) => {
          return typeof v.id === "string" &&
            typeof v.name === "string" &&
            typeof v.type === "string" &&
            typeof v.url === "string" &&
            typeof v.size === "number" &&
            v.size <= MAX_FILE_SIZE &&
            (
              v.src === null ||
              typeof v.src === "undefined" ||
              (v.src as Promise<any>).then ||
              (
                typeof File !== "undefined" &&
                v.src instanceof File
              )
            );
        })) {
          return PropertyInvalidReason.INVALID_VALUE;
        }
      }
    } else if (definition.gqlAddFileToFields) {
      if (
        typeof (value as any).id !== "string" ||
        typeof (value as any).name !== "string" ||
        typeof (value as any).type !== "string" ||
        typeof (value as any).url !== "string" ||
        typeof (value as any).size !== "number" ||
        (value as any).size > MAX_FILE_SIZE ||
          (
            (value as any).src !== null &&
            typeof value !== "undefined" &&
            !(value as any).src.then && (
              typeof File === "undefined" ||
              !((value as any).src instanceof File)
            )
          )
      ) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
    }
    if (definition.validate) {
      const invalidReason = definition.validate(
        value,
        propertyDefinitionRaw.subtype,
      );
      if (invalidReason) {
        return invalidReason;
      }
    }

    // Do the fancy checks
    if (typeof propertyDefinitionRaw.min !== "undefined" &&
      ((value as any).value ||
        value) < propertyDefinitionRaw.min) {
      return PropertyInvalidReason.TOO_SMALL;
    } else if (typeof propertyDefinitionRaw.max !== "undefined" &&
      ((value as any).value ||
        value) > propertyDefinitionRaw.max) {
      return PropertyInvalidReason.TOO_LARGE;
    } else if (typeof propertyDefinitionRaw.minLength !== "undefined" &&
      (value as string).length < propertyDefinitionRaw.minLength) {
      return PropertyInvalidReason.TOO_SMALL;
    } else if (typeof propertyDefinitionRaw.maxDecimalCount !== "undefined" ||
      typeof propertyDefinitionRaw.minDecimalCount !== "undefined") {
      const splittedDecimals =
        ((value as any).value || value)
        .toString().split(".");
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

    // Special length check
    if (
      typeof propertyDefinitionRaw.maxLength !== "undefined" ||
      typeof propertyDefinitionRaw.minLength !== "undefined"
    ) {
      let count: number;
      const isRichText = propertyDefinitionRaw.type === "text" && propertyDefinitionRaw.subtype === "html";
      if (Array.isArray(value)) {
        count = value.length;
      } else if (!isRichText) {
        count = value.toString().length;
      } else {
        const dummyElement = DOMWindow.document.createElement("template");
        dummyElement.innerHTML = value.toString();
        count = dummyElement.textContent.length;
        if (dummyElement.querySelector(".ql-cursor")) {
          count--;
        }
      }

      if (
        typeof propertyDefinitionRaw.maxLength !== "undefined" &&
        count > propertyDefinitionRaw.maxLength
      ) {
        return PropertyInvalidReason.TOO_LARGE;
      } else if (
        typeof propertyDefinitionRaw.minLength !== "undefined" &&
        count < propertyDefinitionRaw.minLength
      ) {
        return PropertyInvalidReason.TOO_SMALL;
      }
    }

    return null;
  }

  public rawData: IPropertyDefinitionRawJSONDataType;
  private parentModule: Module;
  private parentItemDefinition: ItemDefinition;
  private propertyIsExtension: boolean;
  private originatingInstance: PropertyDefinition;

  private defaultIf?: IPropertyDefinitionRuleDataType[];
  private invalidIf?: IPropertyDefinitionInvalidRuleDataType[];
  private enforcedValues?: IPropertyDefinitionRuleDataType[];
  private hiddenIf?: ConditionalRuleSet;

  private superEnforcedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;
  private superDefaultedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;

  // representing the state of the class
  private stateValue: {
    [slotId: number]: PropertyDefinitionSupportedType,
  };
  private stateSuperEnforcedValue: {
    [slotId: number]: PropertyDefinitionSupportedType,
  };
  private stateValueModified: {
    [slotId: number]: boolean,
  };
  private stateValueHasBeenManuallySet: {
    [slotId: number]: boolean,
  };
  private stateInternalValue: {
    [slotId: number]: any,
  };
  // tslint:disable-next-line: member-ordering
  public stateLastUniqueCheck: {
    [slotId: number]: {
      value: PropertyDefinitionSupportedType,
      valid: boolean,
    },
  };
  // tslint:disable-next-line: member-ordering
  public stateLastAutocompleteCheck: {
    [slotId: number]: {
      value: PropertyDefinitionSupportedType,
      valid: boolean,
      filters: ISingleFilterRawJSONDataType,
    },
  };

  /**
   * Builds a property definition
   * @param rawJSON the raw json structure
   * @param parentItemDefinition the parent item definition
   */
  constructor(
    rawJSON: IPropertyDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    isExtension: boolean,
    originatingInstance?: PropertyDefinition,
  ) {
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

    // initial value for all namespaces is null
    this.stateValue = {};
    this.stateValueModified = {};
    this.stateValueHasBeenManuallySet = {};
    this.stateInternalValue = {};
    this.stateLastUniqueCheck = {};
    this.stateLastAutocompleteCheck = {};
    this.stateSuperEnforcedValue = {};
  }

  public getEnforcedValue(id: number): {
    enforced: boolean;
    value?: PropertyDefinitionSupportedType;
  } {
    if (
      typeof this.superEnforcedValue !== "undefined" ||
      typeof this.stateSuperEnforcedValue[id] !== "undefined" ||
      this.enforcedValues ||
      typeof this.rawData.enforcedValue !== "undefined"
    ) {

      // let's check if one matches the current situation
      // we first pick the superEnforcedValue or otherwise the enforcedValue
      // or otherwise the first enforcedValue that evaluates to true
      const enforcedValue = typeof this.superEnforcedValue !== "undefined" ?
        // superenforced might be a property definition so we got to
        // extract the value in such case
        (this.superEnforcedValue instanceof PropertyDefinition ?
          this.superEnforcedValue.getCurrentValue(id) :
          this.superEnforcedValue) :

        (
          // if the global super enforced value failed, we check for
          // the slotted value
          typeof this.stateSuperEnforcedValue[id] !== "undefined" ?
          this.stateSuperEnforcedValue[id] :

          // otherwise in other cases we check the enforced value
          // which has priority
          (typeof this.rawData.enforcedValue !== "undefined" ?
            this.rawData.enforcedValue :
            // otherwise we go to for evaluating the enforced values
            // or give undefined if nothing is found
            (this.enforcedValues.find((ev) => {
              return ev.if.evaluate(id);
            }) || {value: undefined}).value)
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
   * @returns a boolean
   */
  public isCurrentlyHidden(id: number) {
    return this.rawData.hidden ||
      (this.rawData.hiddenIfEnforced ? this.getEnforcedValue(id).enforced : false) ||
      (this.hiddenIf && this.hiddenIf.evaluate(id)) || false;
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
      };
    }

    return requestFields;
  }

  public getCurrentValue(id: number): PropertyDefinitionSupportedType {
    const possibleEnforcedValue = this.getEnforcedValue(id);

    if (possibleEnforcedValue.enforced) {
      return possibleEnforcedValue.value;
    }

    if (this.rawData.nullIfHidden && this.isCurrentlyHidden(id)) {
      return null;
    }

    if (!this.stateValueModified[id]) {
      // lets find the default value, first the super default
      // and we of course extract it in case of property definition
      // or otherwise use the default, which might be undefined
      let defaultValue = typeof this.superDefaultedValue !== "undefined" ?
        (this.superDefaultedValue instanceof PropertyDefinition ?
          this.superDefaultedValue.getCurrentValue(id) :
          this.superDefaultedValue) : this.rawData.default;

      // Also by condition
      if (this.defaultIf && typeof this.superDefaultedValue === "undefined") {
        // find a rule that passes
        const rulePasses = this.defaultIf.find((difRule) => difRule.if.evaluate(id));
        if (rulePasses) {
          // and set the default value to such
          defaultValue = rulePasses.value;
        }
      }

      return typeof defaultValue === "undefined" ? null : defaultValue;
    }

    return nullIfUndefined(this.stateValue[id]);
  }

  /**
   * provides the current useful value for the property defintion without doing
   * any external checking, pass the id still as a cache of previously external
   * checked results might apply
   * @param id the id of the current item definition as stored, pass null if not stored
   * @returns a bunch of information about the current value
   */
  public getStateNoExternalChecking(id: number, emulateExternalChecking?: boolean): IPropertyDefinitionState {
    const possibleEnforcedValue = this.getEnforcedValue(id);

    if (possibleEnforcedValue.enforced) {
      const possibleInvalidEnforcedReason = this.isValidValueNoExternalChecking(
        id, possibleEnforcedValue.value, emulateExternalChecking,
      );
      // we return the value that was set to be
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: !possibleInvalidEnforcedReason,
        invalidReason: possibleInvalidEnforcedReason,
        value: possibleEnforcedValue.value,
        hidden: this.rawData.hiddenIfEnforced ? true : this.isCurrentlyHidden(id),
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[id]),
        stateValueModified: this.stateValueModified[id] || false,
        propertyId: this.getId(),
      };
    }

    // make if hidden if null if hidden is set to true
    // note nulls set this way are always valid
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden(id)) {
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        invalidReason: null,
        value: null,
        hidden: true,
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[id]),
        stateValueModified: this.stateValueModified[id] || false,
        propertyId: this.getId(),
      };
    }

    const value = this.getCurrentValue(id);
    const invalidReason = this.isValidValueNoExternalChecking(id, value, emulateExternalChecking);
    return {
      userSet: this.stateValueModified[id] || false,
      enforced: false,
      default: !this.stateValueModified[id],
      valid: !invalidReason,
      invalidReason,
      value,
      hidden: this.isCurrentlyHidden(id),
      internalValue: this.stateValueModified[id] ? this.stateInternalValue[id] : null,
      stateValue: nullIfUndefined(this.stateValue[id]),
      stateValueModified: this.stateValueModified[id] || false,
      propertyId: this.getId(),
    };
  }

  /**
   * provides the current useful value for the property defintion
   * @param id the id of the current item definition as stored, pass null if not stored
   * this also represents the slot
   * @returns a bunch of information about the current value
   */
  public async getState(id: number): Promise<IPropertyDefinitionState> {

    const possibleEnforcedValue = this.getEnforcedValue(id);

    if (possibleEnforcedValue.enforced) {
      const possibleInvalidEnforcedReason = await this.isValidValue(id, possibleEnforcedValue.value);
      // we return the value that was set to be
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: !possibleInvalidEnforcedReason,
        invalidReason: possibleInvalidEnforcedReason,
        value: possibleEnforcedValue.value,
        hidden: this.rawData.hiddenIfEnforced ? true : this.isCurrentlyHidden(id),
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[id]),
        stateValueModified: this.stateValueModified[id] || false,
        propertyId: this.getId(),
      };
    }

    // make if hidden if null if hidden is set to true
    // note nulls set this way are always valid
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden(id)) {
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        invalidReason: null,
        value: null,
        hidden: true,
        internalValue: null,
        stateValue: nullIfUndefined(this.stateValue[id]),
        stateValueModified: this.stateValueModified[id] || false,
        propertyId: this.getId(),
      };
    }

    const value = this.getCurrentValue(id);
    const invalidReason = await this.isValidValue(id, value);
    return {
      userSet: this.stateValueModified[id] || false,
      enforced: false,
      default: !this.stateValueModified[id],
      valid: !invalidReason,
      invalidReason,
      value,
      hidden: this.isCurrentlyHidden(id),
      internalValue: this.stateValueModified[id] ? this.stateInternalValue[id] : null,
      stateValue: nullIfUndefined(this.stateValue[id]),
      stateValueModified: this.stateValueModified[id] || false,
      propertyId: this.getId(),
    };
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

    this.superEnforcedValue = actualValue;
  }

  public setSuperEnforced(
    id: number,
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

    this.stateSuperEnforcedValue[id] = actualValue;
  }

  public clearSuperEnforced(
    id: number,
  ) {
    delete this.stateSuperEnforcedValue[id];
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

    this.superDefaultedValue = actualValue;
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
   * @param  newValue the new value
   */
  public setCurrentValue(
    id: number,
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

    // note that the value is set and never check
    this.stateValue[id] = newActualValue;
    this.stateValueModified[id] = true;
    this.stateValueHasBeenManuallySet[id] = true;
    this.stateInternalValue[id] = internalValue;
  }

  // TODO add undo function, canUndo and add the gql applied value
  // here in order to turn it back to that applied value
  public applyValue(
    id: number,
    value: any,
    modifiedState: boolean,
    doNotApplyValueInPropertyIfPropertyHasBeenManuallySet: boolean,
  ) {
    // if doNotApplyValueInPropertyIfPropertyHasBeenManuallySet
    // is false, then we don't care and apply the value
    // however if it's true, we need to check the manually set variable
    // in order to know where the value comes from
    if (
      !doNotApplyValueInPropertyIfPropertyHasBeenManuallySet ||
      !this.stateValueHasBeenManuallySet[id]
    ) {
      this.stateValue[id] = value;
      this.stateValueModified[id] = modifiedState;
      this.stateInternalValue[id] = null;
    }
  }

  public cleanValueFor(
    id: number,
  ) {
    delete this.stateValue[id];
    delete this.stateValueModified[id];
    delete this.stateInternalValue[id];
    delete this.stateValueHasBeenManuallySet[id];
    delete this.stateSuperEnforcedValue[id];
  }

  /**
   * Checks the valid value but ignores external checking
   * pass the value still because cache might apply of previous
   * external checking
   *
   * @param value the value to check
   * @param id the id of the item as stored (pass null if new)
   * @return the invalid reason as a string
   */
  public isValidValueNoExternalChecking(
    id: number,
    value: PropertyDefinitionSupportedType,
    emulateExternalChecking?: boolean,
  ): PropertyInvalidReason | string {
    // Cache check
    if (emulateExternalChecking) {
      const hasIndex = this.isUnique();
      if (hasIndex) {
        if (
          this.stateLastUniqueCheck[id] &&
          (this.stateLastUniqueCheck[id].value === value || equals(this.stateLastUniqueCheck[id].value, value)) &&
          !this.stateLastUniqueCheck[id].valid
        ) {
          return PropertyInvalidReason.NOT_UNIQUE;
        }
      }

      if (this.hasAutocomplete() && this.isAutocompleteEnforced()) {
        const filters = this.getAutocompletePopulatedFiltersFor(id);
        if (
          this.stateLastAutocompleteCheck[id] &&
          this.stateLastAutocompleteCheck[id].value === value &&
          equals(this.stateLastAutocompleteCheck[id].filters, filters)
        ) {
          return PropertyInvalidReason.INVALID_VALUE;
        }
      }
    }

    if (this.invalidIf) {
      const invalidMatch = this.invalidIf.find((ii) => ii.if.evaluate(id));
      if (invalidMatch) {
        return invalidMatch.error;
      }
    }
    return PropertyDefinition.isValidValue(
      this.rawData,
      value,
      true,
    );
  }

  /**
   * Externally checks a valid value for this input using all
   * its guns, this function is context aware
   *
   * @param value the value to check
   * @param id the id of the item as stored (pass null if new)
   * @return the invalid reason as a string
   */
  public async isValidValue(
    id: number,
    value: PropertyDefinitionSupportedType,
  ): Promise<PropertyInvalidReason | string> {
    const standardErrOutput = this.isValidValueNoExternalChecking(id, value);

    if (standardErrOutput) {
      return standardErrOutput;
    }

    const hasIndex = this.isUnique();
    if (hasIndex) {
      const isValidIndex = await PropertyDefinition.indexChecker(this, value, id);
      if (!isValidIndex) {
        return PropertyInvalidReason.NOT_UNIQUE;
      }
    }

    if (this.hasAutocomplete() && this.isAutocompleteEnforced()) {
      const isValidAutocomplete = await PropertyDefinition.autocompleteChecker(this, value, id);
      if (!isValidAutocomplete) {
        return PropertyInvalidReason.INVALID_VALUE;
      }
    }
    return null;
  }

  /**
   * Uses the raw data to instantiate a new instance of
   * the item definition, uses the same on state change
   * function for state changes so it remains linked to the
   * module
   */
  public getNewInstance() {
    return new PropertyDefinition(this.rawData, this.parentModule,
      this.parentItemDefinition, this.propertyIsExtension, this);
  }

  /**
   * Provides the property definition description from the
   * supported standards
   */
  public getPropertyDefinitionDescription() {
    return PropertyDefinition.supportedTypesStandard[this.getType()];
  }

  /**
   * Tells whether the current property is nullable
   */
  public isNullable() {
    return this.rawData.nullable;
  }

  public isUnique() {
    return this.rawData.unique;
  }

  /**
   * Tells whether the current property is defined as being hidden
   */
  public isHidden() {
    return this.rawData.hidden;
  }

  /**
   * Checks whether the property can be retrieved
   */
  public isRetrievalDisabled() {
    return this.rawData.disableRetrieval || false;
  }

  /**
   * Checks whether the property can be range searched
   */
  public isRangedSearchDisabled() {
    return this.rawData.disableRangedSearch || false;
  }

  /**
   * Tells if it's searchable, either by default or because
   * of a search level
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
   */
  public hasSpecificValidValues() {
    return !!this.rawData.values;
  }

  /**
   * Provides the specific valid values of the given property
   */
  public getSpecificValidValues() {
    return this.rawData.values;
  }

  /**
   * Checks whether the property is defined as autocomplete
   */
  public hasAutocomplete() {
    return !!this.rawData.autocomplete;
  }

  /**
   * Returns the autocomplete id
   */
  public getAutocompleteId() {
    return this.rawData.autocomplete;
  }

  /**
   * Checks whether the property autocomplete is enforced
   */
  public isAutocompleteEnforced() {
    return !!this.rawData.autocompleteIsEnforced;
  }

  /**
   * Checks whether the property autocomplete supports locale
   */
  public isAutocompleteLocalized() {
    return !!this.rawData.autocompleteSupportsLocale;
  }

  public getAutocompletePopulatedFiltersFor(id: number): ISingleFilterRawJSONDataType {
    if (!this.rawData.autocompleteFilterFromProperty) {
      return null;
    }

    const result: ISingleFilterRawJSONDataType = {};
    Object.keys(this.rawData.autocompleteFilterFromProperty).forEach((key) => {
      result[key] = this.parentItemDefinition
        .getPropertyDefinitionFor(this.rawData.autocompleteFilterFromProperty[key], true).getCurrentValue(id);
    });

    return result;
  }

  /**
   * Provides the html level as defined as autocomplete="" in the html tag
   * attribute, this is mainly for usability
   */
  public getHTMLAutocomplete() {
    return this.rawData.htmlAutocomplete || null;
  }

  /**
   * Provides the subtype of the property, if available
   */
  public getSubtype() {
    return this.rawData.subtype || null;
  }

  /**
   * Check whether the type is text, and if it's a rich text type
   */
  public isRichText() {
    return this.rawData.type === "text" && this.rawData.subtype === "html";
  }

  /**
   * Provides the max length as defined, or null if not available
   */
  public getMaxLength() {
    return typeof this.rawData.maxLength !== "undefined" ?
      this.rawData.maxLength : null;
  }

  /**
   * Provides the min length as defined or null if not available
   */
  public getMinLength() {
    return typeof this.rawData.minLength !== "undefined" ?
      this.rawData.minLength : null;
  }

  /**
   * Provides the max decimal count as defined, does not provide
   * the limits as they are defined in the constant, returns null
   * simply if it's not defined
   */
  public getMaxDecimalCount() {
    return this.rawData.maxDecimalCount || null;
  }

  /**
   * Provides the min decimal count as defined, does not provide
   * the limits as they are defined in the constant, returns null
   * simply if it's not defined
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
   */
  public getSpecialProperty(name: string) {
    if (!this.rawData.specialProperties) {
      return null;
    }

    return typeof this.rawData.specialProperties[name] !== "undefined" ? this.rawData.specialProperties[name] : null;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Just gives the parent item definition
   */
  public getParentItemDefinition() {
    return this.parentItemDefinition;
  }

  /**
   * Tells if the property is an extension
   * from the propext list, they usually have priority
   * @return a boolean
   */
  public isExtension(): boolean {
    return this.propertyIsExtension;
  }

  public isCoercedIntoDefaultWhenNull(): boolean {
    return !!this.rawData.coerceNullsIntoDefault;
  }

  public getDefaultValue(): PropertyDefinitionSupportedType {
    return this.rawData.default;
  }

  /**
   * Returns the locale data definition, or null
   * @param  locale the locale
   * @returns the locale data
   */
  public getI18nDataFor(locale: string): any {
    if (this.originatingInstance) {
      return this.originatingInstance.getI18nDataFor(locale);
    }
    if (!this.rawData.i18nData) {
      return null;
    }
    return this.rawData.i18nData[locale] || null;
  }

  public getRolesWithAccessTo(action: ItemDefinitionIOActions) {
    if (action === ItemDefinitionIOActions.READ) {
      return this.rawData.readRoleAccess || [ANYONE_METAROLE];
    } else if (action === ItemDefinitionIOActions.CREATE) {
      return this.rawData.createRoleAccess || [ANYONE_METAROLE];
    } else if (action === ItemDefinitionIOActions.EDIT) {
      return this.rawData.editRoleAccess || [OWNER_METAROLE];
    }
    return [];
  }

  public checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: number,
    ownerUserId: number,
    throwError: boolean,
  ) {
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    const hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) || (
      rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
    ) || rolesWithAccess.includes(role);
    if (!hasAccess && throwError) {
      const notLoggedInWhenShould = role === GUEST_METAROLE;
      const errorMightHaveBeenAvoidedIfOwnerSpecified = ownerUserId === UNSPECIFIED_OWNER &&
        rolesWithAccess.includes(OWNER_METAROLE);
      let errorMessage = `Forbidden, user ${userId} with role ${role} has no ${action} access to property ${this.getId()}` +
        ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
      if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
        errorMessage += ", this error might have been avoided if an owner had" +
        " been specified which matched yourself as there's a self rule, if performing a search" +
        " you might have wanted to add the created_by filter in order to ensure this rule is followed";
      }
      throw new EndpointError({
        message: errorMessage,
        code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : "FORBIDDEN",
      });
    }
    return hasAccess;
  }

  public toJSON() {
    return this.rawData;
  }

  public getQualifiedPolicyIdentifier(policyType: string, policyName: string) {
    return PropertyDefinition.getQualifiedPolicyPrefix(policyType, policyName) + this.getId();
  }

  public mergeWithI18n(
    pdef: IPropertyDefinitionRawJSONDataType,
  ) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...pdef.i18nData,
    };
  }
}
