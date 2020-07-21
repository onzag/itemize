/**
 * This file contains the property definition that defines all the interactions
 * that occur within a property of an item
 *
 * @packageDocumentation
 */
import ItemDefinition, { ItemDefinitionIOActions } from "..";
import ConditionalRuleSet, { IConditionalRuleSetRawJSONDataType } from "../ConditionalRuleSet";
import Module from "../..";
import { PropertyDefinitionSupportedType, PropertyDefinitionSupportedTypeName } from "./types";
import Include from "../Include";
/**
 * These are the main errors a property is able to give
 */
export declare enum PropertyInvalidReason {
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
    MUST_BE_SPECIFIED = "MUST_BE_SPECIFIED"
}
declare type PropertyDefinitionListenerType = (id: number, version: string, newValue: PropertyDefinitionSupportedType) => void;
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
        [locale: string]: any;
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
export declare type PropertyDefinitionValueType = IPropertyDefinitionExactPropertyValue | IPropertyDefinitionReferredPropertyValue;
/**
 * Represents the external checkers that are used to
 * check index values
 */
export declare type PropertyDefinitionCheckerFunctionType = (itemDefinition: ItemDefinition, include: Include, property: PropertyDefinition, value: PropertyDefinitionSupportedType, id: number, version: string) => Promise<boolean>;
/**
 * The property definition class that defines how properties
 * are to be defined
 */
export default class PropertyDefinition {
    static supportedTypesStandard: Record<PropertyDefinitionSupportedTypeName, import("./types").IPropertyDefinitionSupportedType>;
    static indexChecker: PropertyDefinitionCheckerFunctionType;
    /**
     * A static method that provides the policy prefix for a given policy name and type
     * @param policyType the policy type
     * @param policyName the policy name
     * @returns a prefixed string that represents the qualified policy
     */
    static getQualifiedPolicyPrefix(policyType: string, policyName: string): string;
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
    static isValidValue(propertyDefinitionRaw: IPropertyDefinitionRawJSONDataType, value: PropertyDefinitionSupportedType, checkAgainstValues: boolean): PropertyInvalidReason;
    /**
     * the raw data for the property definition
     */
    rawData: IPropertyDefinitionRawJSONDataType;
    /**
     * the parent module of the property
     */
    private parentModule;
    /**
     * The parent item definition, if any, not available to extensions
     */
    private parentItemDefinition;
    /**
     * Whether the property is an extension
     */
    private propertyIsExtension;
    /**
     * when a property is instantiated this is the original property which is
     * directly attached to the tree
     */
    private originatingInstance;
    /**
     * Processed rules for default from the raw data
     */
    private defaultIf?;
    /**
     * Processed rules for invalid if from the raw data
     */
    private invalidIf?;
    /**
     * Processed enforced values from the raw data
     */
    private enforcedValues?;
    /**
     * Processed hidden conditions from the raw data
     */
    private hiddenIf?;
    /**
     * list of listeners
     */
    private listeners;
    /**
     * enforced values and defaulted values, this is usually set manually
     * and it applies to includes usually with enforced property values
     * hence the enforced value is global
     */
    private globalSuperEnforcedValue?;
    /**
     * this applies for predefined properties basically this is the new
     * default value
     */
    private globalSuperDefaultedValue?;
    /**
     * representing the state of the class
     */
    private stateValue;
    /**
     * representing the original applied state of the class
     */
    private stateAppliedValue;
    /**
     * this is less relevant than the single enforced and it
     * is used when the value is applied manually during
     * the user interaction, values are enforced
     */
    private stateSuperEnforcedValue;
    /**
     * refers to whether the value in the state value
     * has been modified by any interaction, either by
     * apply value or set value by user
     */
    private stateValueModified;
    /**
     * this only triggers as true when the value has been modified
     * when it has been set by the set value function which
     * is what is supposed to be used by the user
     */
    private stateValueHasBeenManuallySet;
    /**
     * an internal value
     */
    private stateInternalValue;
    /**
     * these are caches builtin the property
     * to be used in the client side
     */
    stateLastUniqueCheck: {
        [slotId: string]: {
            value: PropertyDefinitionSupportedType;
            valid: boolean;
        };
    };
    private canCacheState;
    stateLastCached: {
        [slotId: string]: IPropertyDefinitionState;
    };
    stateLastCachedWithExternal: {
        [slotId: string]: IPropertyDefinitionState;
    };
    /**
     * Builds a property definition
     * @param rawJSON the raw json structure
     * @param parentItemDefinition the parent item definition
     */
    constructor(rawJSON: IPropertyDefinitionRawJSONDataType, parentModule: Module, parentItemDefinition: ItemDefinition, isExtension: boolean, originatingInstance?: PropertyDefinition);
    cleanState(): void;
    /**
     * Provides the current enforced value (if any)
     * to a given slot id
     * @param id the slot id
     * @param version the slot version
     * @returns an object that specifies whether the value is enforced, and the value itself if true
     * the value can be null
     */
    getEnforcedValue(id: number, version: string): {
        enforced: boolean;
        value?: PropertyDefinitionSupportedType;
    };
    /**
     * checks if it's currently hidden (not phantom)
     * @param id the id
     * @param version the version
     * @returns a boolean
     */
    isCurrentlyHidden(id: number, version: string): boolean;
    /**
     * gives the id of this property defintion
     * @returns the id
     */
    getId(): string;
    /**
     * gives the type of this property defintion
     * @returns the type
     */
    getType(): PropertyDefinitionSupportedTypeName;
    addChangeListener(listener: PropertyDefinitionListenerType): void;
    removeChangeListener(listener: PropertyDefinitionListenerType): void;
    /**
     * Provides the request fields that are necessary
     * and contained within this property in order to be
     * graphql requested, these come from the property description
     * @returns the requested fields that are necessary
     */
    getRequestFields(): {};
    /**
     * Provides the current value of a property (as it is)
     * for a given slot id
     * @param id the slot id
     * @param verson the slot version
     * @returns the current value
     */
    getCurrentValue(id: number, version: string): PropertyDefinitionSupportedType;
    /**
     * Provides the applied value for a property
     * @param id the id
     * @param version the version
     * @returns the applied value
     */
    getAppliedValue(id: number, version: string): PropertyDefinitionSupportedType;
    /**
     * provides the current useful value for the property defintion without doing
     * any external checking, pass the id still as a cache of previously external
     * checked results might apply
     * @param id the id of the current item definition as stored, pass null if not stored
     * @param version the slot version
     * @returns the current value state
     */
    getStateNoExternalChecking(id: number, version: string, emulateExternalChecking?: boolean): IPropertyDefinitionState;
    /**
     * provides the current useful value for the property defintion
     * @param id the id of the current item definition as stored, pass null if not stored
     * this also represents the slot
     * @param version the version
     * @returns a promise for the current value state
     */
    getState(id: number, version: string): Promise<IPropertyDefinitionState>;
    /**
     * Sets a super enforced value that superseeds any enforced value or
     * values and makes the field enforced, the value might
     * be another property definition to extract the value from
     * @throws an error if the value is invalid
     * @param value the value to enforce it can be a property
     */
    setGlobalSuperEnforced(value: PropertyDefinitionSupportedType | PropertyDefinition): void;
    /**
     * Sets a super enforced value to a given property in a given
     * slot id, note a super enforced value won't override the global
     * @param id the slot id
     * @param version the slot version
     * @param value the value that has tobe super enforced
     */
    setSuperEnforced(id: number, version: string, value: PropertyDefinitionSupportedType): void;
    /**
     * Clears a super enforced value set in a slot id
     * @param id the slot id
     * @param version the slot version
     */
    clearSuperEnforced(id: number, version: string): void;
    /**
     * Sets a super default value that superseeds any default value or
     * values, the value might be another property definition to extract
     * the value from
     * @param value the value to default to it can be a property
     */
    setGlobalSuperDefault(value: PropertyDefinitionSupportedType | PropertyDefinition): void;
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
    setCurrentValue(id: number, version: string, newValue: PropertyDefinitionSupportedType, internalValue: any): void;
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
     */
    applyValue(id: number, version: string, value: PropertyDefinitionSupportedType, modifiedState: boolean, doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers: boolean): void;
    /**
     * Frees the memory of stored values in a given slot id
     * @param id the slot id
     * @param version the slot version
     */
    cleanValueFor(id: number, version: string): void;
    /**
     * Restores the value of the given slot id to the original
     * applied value
     * @param id the slot id
     * @param version the version
     */
    restoreValueFor(id: number, version: string): void;
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
    isValidValueNoExternalChecking(id: number, version: string, value: PropertyDefinitionSupportedType, emulateExternalChecking?: boolean): PropertyInvalidReason | string;
    /**
     * Externally checks a valid value for this input using all
     * its guns, this function is context aware
     *
     * @param value the value to check
     * @param id the id of the item as stored (pass null if new)
     * @param version the slot version
     * @returns the invalid reason as a string
     */
    isValidValue(id: number, version: string, value: PropertyDefinitionSupportedType): Promise<PropertyInvalidReason | string>;
    /**
     * Uses the raw data to instantiate a new instance of
     * the item definition, uses the same on state change
     * function for state changes so it remains linked to the
     * module
     * @returns a new instance
     */
    getNewInstance(): PropertyDefinition;
    /**
     * Provides the property definition description from the
     * supported standards
     * @returns the property definition description for its type
     */
    getPropertyDefinitionDescription(): import("./types").IPropertyDefinitionSupportedType;
    /**
     * Tells whether the current property is nullable
     * @returns a boolean
     */
    isNullable(): boolean;
    /**
     * Tells whether there's an unique index on it
     * @returns a boolean
     */
    isUnique(): boolean;
    /**
     * Whether the unique is not case sensitive
     * @returns a boolean
     */
    isNonCaseSensitiveUnique(): boolean;
    /**
     * Tells whether the current property is defined as being hidden
     * @returns a boolean
     */
    isHidden(): boolean;
    /**
     * Checks whether the property can be retrieved
     * @returns a boolean
     */
    isRetrievalDisabled(): boolean;
    /**
     * Checks whether the property can be range searched
     * @returns a boolean
     */
    isRangedSearchDisabled(): boolean;
    /**
     * Tells if it's searchable, either by default or because
     * of a search level
     * @returns a boolean
     */
    isSearchable(): boolean;
    /**
     * Checks whether the property has specific defined valid values
     * @returns a boolean
     */
    hasSpecificValidValues(): boolean;
    /**
     * Provides the specific valid values of the given property
     * @returns a boolean
     */
    getSpecificValidValues(): PropertyDefinitionSupportedType[];
    /**
     * Provides the html level as defined as autocomplete="" in the html tag
     * attribute, this is mainly for usability
     * @returns a string or null
     */
    getHTMLAutocomplete(): string;
    /**
     * Provides the subtype of the property, if available
     * @returns the subtype string or null
     */
    getSubtype(): string;
    /**
     * Check whether the type is text, and if it's a rich text type
     * @returns a boolean
     */
    isRichText(): boolean;
    /**
     * Provides the max length as defined, or null if not available
     * @returns a number or null
     */
    getMaxLength(): number;
    /**
     * Provides the min length as defined or null if not available
     * @returns a number or null
     */
    getMinLength(): number;
    /**
     * Provides the max decimal count as defined, does not provide
     * the limits as they are defined in the constant, returns null
     * simply if it's not defined
     * @returns a number or null
     */
    getMaxDecimalCount(): number;
    /**
     * Provides the min decimal count as defined, does not provide
     * the limits as they are defined in the constant, returns null
     * simply if it's not defined
     * @returns a number or null
     */
    getMinDecimalCount(): number;
    /**
     * Provides the value of a special property if it's available
     * they can only be of type, boolean, string, or number
     * @param name the name of that specifial property
     * @returns the special property value, either a boolean, number or string, or null
     */
    getSpecialProperty(name: string): any;
    /**
     * Just gives the parent module
     * @returns a Module
     */
    getParentModule(): Module;
    /**
     * Just gives the parent item definition
     * @returns a item definition that holds this property if any
     */
    getParentItemDefinition(): ItemDefinition;
    /**
     * Tells if the property is an extension
     * from the propext list, they usually have priority
     * @returns a boolean
     */
    isExtension(): boolean;
    /**
     * Tells whether the value is coerced into default when null
     * @returns a booean
     */
    isCoercedIntoDefaultWhenNull(): boolean;
    /**
     * Gives the default set value
     * @returns a property definition value, or null
     */
    getDefaultValue(): PropertyDefinitionSupportedType;
    /**
     * Returns the locale data definition, or null
     * @param  locale the locale
     * @returns the locale data
     */
    getI18nDataFor(locale: string): any;
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
    getRolesWithAccessTo(action: ItemDefinitionIOActions): string[];
    buildFieldsForRoleAccess(action: ItemDefinitionIOActions, role: string, userId: number, ownerUserId: number): {};
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
    checkRoleAccessFor(action: ItemDefinitionIOActions, role: string, userId: number, ownerUserId: number, throwError: boolean): boolean;
    /**
     * Gets the raw data of the property
     * @returns the json form
     */
    toJSON(): IPropertyDefinitionRawJSONDataType;
    /**
     * Provides the qualified property identifier for this specific property
     * @param policyType the policy type
     * @param policyName the policy name
     * @returns a string for the qualified policy prefix for this specific property id
     */
    getQualifiedPolicyIdentifier(policyType: string, policyName: string): string;
    /**
     * Merges the raw json data locale information of this property with another
     * of the same kind (only its language data)
     * @param pdef the property definition raw form
     */
    mergeWithI18n(pdef: IPropertyDefinitionRawJSONDataType): void;
}
export {};
