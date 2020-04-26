/**
 * This file contains the description and class for the Include, contains the state
 * managing as well as the values applied and naming conventions for includes
 *
 * Related files schema.ts and checkers.ts
 *
 * @packageDocumentation
 */
import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "..";
import { IConditionalRuleSetRawJSONDataType } from "../ConditionalRuleSet";
import Module from "../..";
import PropertyDefinition from "../PropertyDefinition";
import { IPropertiesValueMappingDefinitonRawJSONDataType } from "../PropertiesValueMappingDefiniton";
import { IGQLRequestFields, IGQLValue } from "../../../../../gql-querier";
/**
 * These represent the enum of the include and exclusion state of an include
 */
export declare enum IncludeExclusionState {
    EXCLUDED = "EXCLUDED",
    INCLUDED = "INCLUDED",
    ANY = "ANY"
}
/**
 * This represents the state of an include as it is fetched via
 * the getState function (with or without external checking)
 */
export interface IIncludeState {
    /**
     * The exclusion state as specified, an ANY exclusion state only occurs
     * in ternary mode
     */
    exclusionState: IncludeExclusionState;
    /**
     * Whether the exclusion can be set according to the current rules
     */
    canExclusionBeSet: boolean;
    /**
     * The include identifier from the item definition
     */
    includeId: string;
    /**
     * The item definition name it contains (not its parent)
     */
    itemDefinitionName: string;
    /**
     * The item definition state it contains (not its parent)
     */
    itemDefinitionState: IItemDefinitionStateType;
    /**
     * The state specified exclusion state by the user or another interaction
     */
    stateExclusion: IncludeExclusionState;
    /**
     * Whether this state has been modified by any action, either apply or set
     */
    stateExclusionModified: boolean;
}
/**
 * This is the raw json that comes from the json file that defines the schema
 */
export interface IIncludeRawJSONDataType {
    id: string;
    definition: string;
    i18nData?: {
        [locale: string]: {
            name?: string;
            exclusion_selector_label?: string;
            exclusion_ternary_selector_label?: string;
            callout_excluded_label?: string;
            excluded_label?: string;
            included_label?: string;
            any_label?: string;
        };
    };
    enforcedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
    predefinedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
    excludedIf?: IConditionalRuleSetRawJSONDataType;
    canUserExclude?: boolean;
    canUserExcludeIf?: IConditionalRuleSetRawJSONDataType;
    defaultExcluded?: boolean;
    defaultExcludedIf?: IConditionalRuleSetRawJSONDataType;
    ternaryExclusionState?: boolean;
    exclusionIsCallout?: boolean;
    disableSearch?: boolean;
    sinkIn?: string[];
}
/**
 * This class provides the utilities for the description of an item
 * it's one of the most important classes that defines how an item is added
 * based on an existant item defintion
 *
 * An item is described mainly by its name and such name must be a valid
 * import for the item definition that its parent holds, for example
 * lets say we have an item definition for Car which has wheels in it
 *
 * {
 *  "name": "wheels",
 *  "enforcedProperties": {
 *    "mainAmount": 4
 *  },
 *  "predefinedProperties": {
 *    "spares": 1
 *  },
 *  "excludedIf": {
 *    "property": "hover-car",
 *    "comparator": "equals",
 *    "value": true
 *  },
 *  "sinkIn": [
 *    "material"
 *  ]
 * },
 *
 * An item might also be a group of items with a gate
 */
export default class Include {
    /**
     * The raw data that comes from the compiled schema
     */
    rawData: IIncludeRawJSONDataType;
    /**
     * The parent item definition of this include
     */
    parentItemDefinition: ItemDefinition;
    /**
     * The parent module where this include sits
     */
    parentModule: Module;
    _gqlInObj: any;
    _gqlOutObj: any;
    _gqlInObjOpt: any;
    _gqlOutObjOpt: any;
    /**
     * The item definition the include refers to
     */
    private itemDefinition;
    /**
     * The excluded if rules (compiled)
     */
    private excludedIf?;
    /**
     * The allowance of exclusion (compiled)
     */
    private canUserExcludeIf?;
    /**
     * The default exclusion state rule (compiled)
     */
    private defaultExcludedIf?;
    /**
     * Enforced properties (compiled)
     */
    private enforcedProperties?;
    /**
     * Predefined properties (compiled)
     */
    private predefinedProperties?;
    /**
     * This is the state exclusion of the class, not the defaulted, not
     * the enforced, but the stateful
     */
    private stateExclusion;
    /**
     * This also shows whether the state has been modified, either
     * by the user or a value has been applied
     */
    private stateExclusionModified;
    /**
     * The constructor for an Include
     * @param rawJSON the raw data as JSON
     * @param parentModule the parent module
     * @param parentItemDefinition   the item definition that this node is
     * located, its root; for the example above that
     * would be the vehicle item definition
     */
    constructor(rawJSON: IIncludeRawJSONDataType, parentModule: Module, parentItemDefinition: ItemDefinition);
    /**
     * Provides the ids of the sinking properties
     * @returns an array of the sinking properties ids
     */
    getSinkingPropertiesIds(): string[];
    /**
     * Propvides a single sinking property for a given id
     * @param id the property id
     * @returns a single property, if available, otherwise throws an error
     */
    getSinkingPropertyFor(id: string): PropertyDefinition;
    /**
     * Provides all the sinking properties as property definition
     * instances
     * @returns all sinking properties as instances
     */
    getSinkingProperties(): PropertyDefinition[];
    /**
     * Checks the role access for a given include to be accessed given a IO action
     * @param action the action that wants to be executed
     * @param role the role of the user wanting to execute that action
     * @param userId the user id of the user wanting to execute (can be null)
     * @param ownerUserId the owner of the user wanting to execute (or UNSPECIFIED_OWNER)
     * @param requestedFields the requested fields that are requested from the include these basically
     * represent the sinking properties where the IO action is being applied
     * @param throwError whether to throw an error in failure
     * @returns a boolean on whether it has role access
     */
    checkRoleAccessFor(action: ItemDefinitionIOActions, role: string, userId: number, ownerUserId: number, requestedFields: IGQLRequestFields, throwError: boolean): boolean;
    /**
     * Tells whether the current item is excluded
     * @returns a boolean whether it's excluded or not
     */
    getExclusionState(id: number, version: string): IncludeExclusionState;
    /**
     * Tells whether the exclusion state can be toggled externally
     * This is for when an item might be included
     * like how a car might have a spare wheel or not usually the
     * case is true but it might be false as well
     * @returns a boolean that tells whether if it can be toggled
     */
    canExclusionBeSet(id: number, version: string): boolean;
    /**
     * Checks whether the exclusion state is a ternary type,
     * this basically only exists in search item definition items
     * because it's used during the search mode
     * @returns a boolean on whether the exclusion is ternary
     */
    isExclusionTernary(): boolean;
    /**
     * Checks whether excluding this item (while possible) will cause
     * a callout, that is, a clear display that the item definition
     * instance is missing it, this is for key items, eg. car, wheels missing.
     * @returns a boolean on whether the exclusion must be called out
     */
    isExclusionCallout(): boolean;
    /**
     * Sets the exclusion state to a new value
     * @param value the value for the exclusion state
     */
    setExclusionState(id: number, version: string, value: IncludeExclusionState): void;
    /**
     * Provides the name for this item, the name represents
     * the item definition children this item is attached to
     * @returns a string with the item definition name
     */
    getItemDefinitionName(): string;
    /**
     * Provides the unique id of this item definition
     * the unique id is, well, unique for this item
     * @returns the unique id of the include
     */
    getId(): string;
    /**
     * Provides the qualified identifier of the include
     * that is an INCLUDE prefixed with the identifier
     * @returns a string that is the qualified identifier
     */
    getQualifiedIdentifier(): string;
    /**
     * Provides the qualified identifier for prefixing
     * other things
     * @returns a prefixed string that is the prefixed qualified identifier
     */
    getPrefixedQualifiedIdentifier(): string;
    /**
     * Provides the qualfiied name for the exclusion state
     * @returns the string that represents the exclusion identifier
     */
    getQualifiedExclusionStateIdentifier(): string;
    /**
     * Provides the current value of this item
     * @param id the id of the stored item definition or module
     * @param version the slot version
     * @returns the state of the include
     */
    getStateNoExternalChecking(id: number, version: string, emulateExternalChecking?: boolean): IIncludeState;
    /**
     * Provides the current value of this item
     * @param id the id of the stored item definition or module
     * @param version the version
     * @returns a promise for the state of the include
     */
    getState(id: number, version: string): Promise<IIncludeState>;
    /**
     * Applies a value to an include
     * @param id the slot id to use
     * @param version the slot version to use
     * @param value the value that is applied
     * @param exclusionState the exclusion state
     * @param doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers to avoid hot updating
     * values when the user is modifying them and an apply value has been called because
     * it has been updated somewhere else, we use this to avoid overriding, note that the value must also
     * not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back
     * to false as it's been used applyValue on it, it's been set now by the computer
     */
    applyValue(id: number, version: string, value: IGQLValue, exclusionState: IncludeExclusionState, doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers: boolean): void;
    /**
     * Memory cleans the value in an item
     * @param id the slot id
     */
    cleanValueFor(id: number, version: string): void;
    /**
     * Gives the i18 name that was specified
     * or otherwise gives the item definition i18 name
     * @param  locale the locale iso form
     * @returns a string or null (if locale not valid)
     */
    getI18nNameFor(locale: string): string;
    /**
     * Provides the item definition item locale data
     * @param  locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale: string): {
        name?: string;
        exclusion_selector_label?: string;
        exclusion_ternary_selector_label?: string;
        callout_excluded_label?: string;
        excluded_label?: string;
        included_label?: string;
        any_label?: string;
    };
    /**
     * Basically returns the raw data of this item
     * @returns the json value raw data
     */
    toJSON(): IIncludeRawJSONDataType;
    /**
     * Returns true if the item contains a property that needs to be
     * extenrally checked, either an indexed one
     * @returns a boolean on whether it contains such a property or not
     */
    containsAnExternallyCheckedProperty(): boolean;
    /**
     * Provides the item definition that this include refers to
     * @returns the item definition
     */
    getItemDefinition(): ItemDefinition;
    /**
     * Merges the i18n data of another include in another language
     * @param includeRaw the include itself
     */
    mergeWithI18n(includeRaw: IIncludeRawJSONDataType): void;
}
