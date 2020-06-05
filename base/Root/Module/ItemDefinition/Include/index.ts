/**
 * This file contains the description and class for the Include, contains the state
 * managing as well as the values applied and naming conventions for includes
 *
 * Related files schema.ts and checkers.ts
 *
 * @packageDocumentation
 */

import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "..";
import ConditionalRuleSet, {
  IConditionalRuleSetRawJSONDataType,
} from "../ConditionalRuleSet";
import Module from "../..";
import PropertyDefinition from "../PropertyDefinition";
import PropertiesValueMappingDefiniton, { IPropertiesValueMappingDefinitonRawJSONDataType } from "../PropertiesValueMappingDefiniton";
import { INCLUDE_PREFIX, PREFIX_BUILD, EXCLUSION_STATE_SUFFIX } from "../../../../../constants";
import { IGQLRequestFields, IGQLValue } from "../../../../../gql-querier";

/**
 * These represent the enum of the include and exclusion state of an include
 */
export enum IncludeExclusionState {
  EXCLUDED = "EXCLUDED",
  INCLUDED = "INCLUDED",
  ANY = "ANY",
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
   * The state specified exclusion that has been applied using the apply value functionality
   */
  stateExclusionApplied: IncludeExclusionState;
  /**
   * Whether this state has been modified by any action, either apply or set
   */
  stateExclusionModified: boolean;
  /**
   * Whether this state has been manually set
   */
  stateExclusionHasBeenManuallySet: boolean;
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
      exclusion_selector_label?: string;   // label for the selector to toggle exclusion in normal mode
      exclusion_ternary_selector_label?: string;
      callout_excluded_label?: string;     // label in the title for when the item is callout excluded
      excluded_label?: string;            // describe when the item is excluded, for descriptions and the ternary mode
      included_label?: string;            // describe when the item is included, used only for ternary mode
      any_label?: string;                 // describe the inbetween, used only for ternary mode
    },
  };
  enforcedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  predefinedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  excludedIf?: IConditionalRuleSetRawJSONDataType;
  canUserExclude?: boolean;
  canUserExcludeIf?: IConditionalRuleSetRawJSONDataType;
  defaultExcluded?: boolean;
  defaultExcludedIf?: IConditionalRuleSetRawJSONDataType;
  ternaryExclusionState?: boolean;
  // Exclusions are called out at UI level, basically the item is considered incomplete
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
  public rawData: IIncludeRawJSONDataType;
  /**
   * The parent item definition of this include
   */
  public parentItemDefinition: ItemDefinition;
  /**
   * The parent module where this include sits
   */
  public parentModule: Module;

  // graphql helper
  // tslint:disable-next-line: variable-name
  public _gqlInObj: any;
  // tslint:disable-next-line: variable-name
  public _gqlOutObj: any;
  // tslint:disable-next-line: variable-name
  public _gqlInObjOpt: any;
  // tslint:disable-next-line: variable-name
  public _gqlOutObjOpt: any;

  /**
   * The item definition the include refers to
   */
  private itemDefinition: ItemDefinition;
  /**
   * The excluded if rules (compiled)
   */
  private excludedIf?: ConditionalRuleSet;
  /**
   * The allowance of exclusion (compiled)
   */
  private canUserExcludeIf?: ConditionalRuleSet;
  /**
   * The default exclusion state rule (compiled)
   */
  private defaultExcludedIf?: ConditionalRuleSet;

  /**
   * Enforced properties (compiled)
   */
  private enforcedProperties?: PropertiesValueMappingDefiniton;
  /**
   * Predefined properties (compiled)
   */
  private predefinedProperties?: PropertiesValueMappingDefiniton;

  /**
   * This is the state exclusion of the class, not the defaulted, not
   * the enforced, but the stateful
   */
  private stateExclusion: {
    [mergedID: string]: IncludeExclusionState,
  };
  /**
   * This also shows whether the state has been modified, either
   * by the user or a value has been applied
   */
  private stateExclusionModified: {
    [mergedID: string]: boolean,
  };
  /**
   * The applied exclusion
   */
  private stateExclusionApplied: {
    [mergedID: string]: IncludeExclusionState,
  };
  /**
   * This also shows whether the state has been modified, either
   * by the user or a value has been applied
   */
  private stateExclusionHasBeenManuallySet: {
    [mergedID: string]: boolean,
  };

  /**
   * The constructor for an Include
   * @param rawJSON the raw data as JSON
   * @param parentModule the parent module
   * @param parentItemDefinition   the item definition that this node is
   * located, its root; for the example above that
   * would be the vehicle item definition
   */
  constructor(
    rawJSON: IIncludeRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
  ) {
    this.rawData = rawJSON;

    // lets get an instance for the item definition for this
    // item, if there's one, and let's detach it
    this.itemDefinition = parentItemDefinition
      .getDirectlyAvailableItemDefinitionInContextFor(rawJSON.definition).getNewInstance();

    // the enforced properties list
    this.enforcedProperties = rawJSON.enforcedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.enforcedProperties,
        parentItemDefinition, this.itemDefinition);

    // the predefined properties list
    this.predefinedProperties = rawJSON.predefinedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.predefinedProperties,
        parentItemDefinition, this.itemDefinition);

    // If this is going to be excluded
    this.excludedIf = rawJSON.excludedIf &&
      new ConditionalRuleSet(rawJSON.excludedIf,
        parentModule, parentItemDefinition, null, this);

    // If it might be excluded
    this.canUserExcludeIf = rawJSON.canUserExcludeIf &&
      new ConditionalRuleSet(rawJSON.canUserExcludeIf,
        parentModule, parentItemDefinition, null, this);

    // if it's default excluded
    this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
      new ConditionalRuleSet(
        rawJSON.defaultExcludedIf,
        parentModule,
        parentItemDefinition,
        null,
        this,
      );

    // parent item definition
    this.parentItemDefinition = parentItemDefinition;
    this.parentModule = parentModule;

    this.cleanState(true);
  }

  public cleanState(init?: boolean) {
    if (!init) {
      this.itemDefinition.cleanState();
    }

    // set the enforced and predefined properties overwrites
    // if needed to
    if (this.enforcedProperties) {
      this.enforcedProperties.getPropertyMap().forEach((p) => {
        this.itemDefinition.getPropertyDefinitionFor(p.id, true)
          .setGlobalSuperEnforced(p.value);
      });
    }

    if (this.predefinedProperties) {
      this.predefinedProperties.getPropertyMap().forEach((p) => {
        this.itemDefinition.getPropertyDefinitionFor(p.id, true)
          .setGlobalSuperDefault(p.value);
      });
    }

    // State management
    this.stateExclusion = {};
    // initially the state hasn't been modified
    this.stateExclusionModified = {};
    this.stateExclusionApplied = {};
    this.stateExclusionHasBeenManuallySet = {};
  }

  /**
   * Provides the ids of the sinking properties
   * @returns an array of the sinking properties ids
   */
  public getSinkingPropertiesIds(): string[] {
    return this.rawData.sinkIn || [];
  }

  /**
   * Propvides a single sinking property for a given id
   * @param id the property id
   * @returns a single property, if available, otherwise throws an error
   */
  public getSinkingPropertyFor(id: string) {
    if (!this.rawData.sinkIn.includes(id)) {
      throw new Error("Invalid sinking property: " + id);
    }

    return this.itemDefinition.getPropertyDefinitionFor(id, false);
  }

  /**
   * Provides all the sinking properties as property definition
   * instances
   * @returns all sinking properties as instances
   */
  public getSinkingProperties(): PropertyDefinition[] {
    return this.getSinkingPropertiesIds()
      .map((propertyId) => this.itemDefinition.getPropertyDefinitionFor(propertyId, false));
  }

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
  public checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: number,
    ownerUserId: number,
    requestedFields: IGQLRequestFields,
    throwError: boolean,
  ) {
    return Object.keys(requestedFields || {}).every((requestedField) => {
      const propDef = this.itemDefinition.getPropertyDefinitionFor(requestedField, false);
      return propDef.checkRoleAccessFor(action, role, userId, ownerUserId, throwError);
    });
  }

  public buildFieldsForRoleAccess(
    action: ItemDefinitionIOActions,
    role: string,
    userId: number,
    ownerUserId: number,
  ) {
    if (action === ItemDefinitionIOActions.DELETE) {
      return null;
    }

    if (ownerUserId === null) {
      throw new Error("ownerUserId cannot be null");
    }

    const requestFields: IGQLRequestFields = {};

    this.getSinkingProperties().forEach((sp) => {
      if (sp.isRetrievalDisabled()) {
        return;
      }
      const fieldsForProperty = sp.buildFieldsForRoleAccess(action, role, userId, ownerUserId);
      if (fieldsForProperty) {
        requestFields[sp.getId()] = fieldsForProperty;
      }
    });

    return requestFields;
  }

  /**
   * Tells whether the current item is excluded
   * @returns a boolean whether it's excluded or not
   */
  public getExclusionState(id: number, version: string): IncludeExclusionState {
    // let's check if it's excluded by force
    const isExcludedByForce = this.excludedIf && this.excludedIf.evaluate(id, version);

    if (isExcludedByForce) {
      return IncludeExclusionState.EXCLUDED;
    }

    // if it can be excluded
    const canBeExcludedByUser = this.rawData.canUserExclude || (this.canUserExcludeIf &&
      this.canUserExcludeIf.evaluate(id, version));
    if (canBeExcludedByUser) {
      const mergedID = id + "." + (version || "");
      // if it hasn't been modified we return the default state
      if (!this.stateExclusionModified[mergedID]) {
        // depending on the condition
        const isDefaultExcluded = this.rawData.defaultExcluded ||
          (this.defaultExcludedIf && this.defaultExcludedIf.evaluate(id, version)) ||
          false;
        // by default the excluded would be false
        if (isDefaultExcluded) {
          return IncludeExclusionState.EXCLUDED;
        } else if (this.rawData.ternaryExclusionState) {
          return IncludeExclusionState.ANY;
        }
        return IncludeExclusionState.INCLUDED;
      }

      if (
        !this.rawData.ternaryExclusionState &&
        this.stateExclusion[mergedID] === IncludeExclusionState.ANY ||
        !this.stateExclusion[mergedID]
      ) {
        return IncludeExclusionState.INCLUDED;
      }
      return this.stateExclusion[mergedID];
    } else if (this.rawData.ternaryExclusionState) {
      return IncludeExclusionState.ANY;
    }
    return IncludeExclusionState.INCLUDED;
  }

  /**
   * Tells whether the exclusion state can be toggled externally
   * This is for when an item might be included
   * like how a car might have a spare wheel or not usually the
   * case is true but it might be false as well
   * @returns a boolean that tells whether if it can be toggled
   */
  public canExclusionBeSet(id: number, version: string): boolean {
    // if it's excluded by force the default is false, you cannot toggle
    // anything excluded by force
    const isExcludedByForce = this.excludedIf && this.excludedIf.evaluate(id, version);
    if (isExcludedByForce) {
      return false;
    }

    // otherwise it depends to what might exclude provides
    return this.rawData.canUserExclude || (this.canUserExcludeIf &&
      this.canUserExcludeIf.evaluate(id, version)) || false;
  }

  /**
   * Checks whether the exclusion state is a ternary type,
   * this basically only exists in search item definition items
   * because it's used during the search mode
   * @returns a boolean on whether the exclusion is ternary
   */
  public isExclusionTernary(): boolean {
    return this.rawData.ternaryExclusionState || false;
  }

  /**
   * Checks whether excluding this item (while possible) will cause
   * a callout, that is, a clear display that the item definition
   * instance is missing it, this is for key items, eg. car, wheels missing.
   * @returns a boolean on whether the exclusion must be called out
   */
  public isExclusionCallout(): boolean {
    return this.rawData.exclusionIsCallout || false;
  }

  /**
   * Sets the exclusion state to a new value
   * @param value the value for the exclusion state
   */
  public setExclusionState(id: number, version: string, value: IncludeExclusionState) {
    const mergedID = id + "." + (version || null);
    this.stateExclusion[mergedID] = value;
    this.stateExclusionModified[mergedID] = true;
    this.stateExclusionHasBeenManuallySet[mergedID] = true;
  }

  /**
   * Provides the name for this item, the name represents
   * the item definition children this item is attached to
   * @returns a string with the item definition name
   */
  public getItemDefinitionName() {
    return this.rawData.definition;
  }

  /**
   * Provides the unique id of this item definition
   * the unique id is, well, unique for this item
   * @returns the unique id of the include
   */
  public getId() {
    return this.rawData.id;
  }

  /**
   * Provides the qualified identifier of the include
   * that is an INCLUDE prefixed with the identifier
   * @returns a string that is the qualified identifier
   */
  public getQualifiedIdentifier() {
    return INCLUDE_PREFIX + this.getId();
  }

  /**
   * Provides the qualified identifier for prefixing
   * other things
   * @returns a prefixed string that is the prefixed qualified identifier
   */
  public getPrefixedQualifiedIdentifier() {
    return PREFIX_BUILD(this.getQualifiedIdentifier());
  }

  /**
   * Provides the qualfiied name for the exclusion state
   * @returns the string that represents the exclusion identifier
   */
  public getQualifiedExclusionStateIdentifier() {
    return this.getPrefixedQualifiedIdentifier() + EXCLUSION_STATE_SUFFIX;
  }

  /**
   * Provides the applied value for a property
   * @param id the id
   * @param version the version
   * @returns the applied value
   */
  public getAppliedExclusionState(
    id: number,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");
    const appliedState = this.stateExclusionApplied[mergedID];
    return typeof appliedState === "undefined" ? null : appliedState;
  }

  /**
   * Provides the current value of this item
   * @param id the id of the stored item definition or module
   * @param version the slot version
   * @returns the state of the include
   */
  public getStateNoExternalChecking(id: number, version: string, emulateExternalChecking?: boolean): IIncludeState {
    const exclusionState = this.getExclusionState(id, version);
    const mergedID = id + "." + (version || "");
    return {
      exclusionState,
      canExclusionBeSet: this.canExclusionBeSet(id, version),
      includeId: this.getId(),
      itemDefinitionName: this.getItemDefinitionName(),
      itemDefinitionState: exclusionState === IncludeExclusionState.EXCLUDED ? null :
        this.itemDefinition.getStateNoExternalChecking(id, version,
          emulateExternalChecking, this.rawData.sinkIn || [], [], true),
      stateExclusion: this.stateExclusion[mergedID] || IncludeExclusionState.ANY,
      stateExclusionModified: this.stateExclusionModified[mergedID] || false,
      stateExclusionHasBeenManuallySet: this.stateExclusionHasBeenManuallySet[mergedID] || false,
      stateExclusionApplied: this.getAppliedExclusionState(id, version),
    };
  }

  /**
   * Provides the current value of this item
   * @param id the id of the stored item definition or module
   * @param version the version
   * @returns a promise for the state of the include
   */
  public async getState(id: number, version: string): Promise<IIncludeState> {
    const exclusionState = this.getExclusionState(id, version);
    const mergedID = id + "." + (version || "");
    return {
      exclusionState,
      canExclusionBeSet: this.canExclusionBeSet(id, version),
      includeId: this.getId(),
      itemDefinitionName: this.getItemDefinitionName(),
      itemDefinitionState: exclusionState === IncludeExclusionState.EXCLUDED ? null :
        (await this.itemDefinition.getState(id, version, this.rawData.sinkIn || [], [], true)),
      stateExclusion: this.stateExclusion[mergedID] || IncludeExclusionState.ANY,
      stateExclusionModified: this.stateExclusionModified[mergedID] || false,
      stateExclusionHasBeenManuallySet: this.stateExclusionHasBeenManuallySet[mergedID] || false,
      stateExclusionApplied: this.getAppliedExclusionState(id, version),
    };
  }

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
  public applyValue(
    id: number,
    version: string,
    value: IGQLValue,
    exclusionState: IncludeExclusionState,
    doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers: boolean,
  ) {
    const mergedID = id + "." + (version || "");

    // update the state
    if (
      doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers &&
      this.stateExclusionHasBeenManuallySet[mergedID]
    ) {
      // The two of them are equal which means the internal value
      // is most likely just the same thing so we won't mess with it
      // as it's not necessary to modify it, even when this is technically a
      // new value
      if (this.stateExclusion[mergedID] === exclusionState) {
        this.stateExclusionModified[mergedID] = true;
        this.stateExclusionHasBeenManuallySet[mergedID] = false;
      }
    } else {
      this.stateExclusion[mergedID] = exclusionState;
      this.stateExclusionModified[mergedID] = true;
      this.stateExclusionHasBeenManuallySet[mergedID] = false;
    }
    this.stateExclusionApplied[mergedID] = exclusionState;

    // applying the value in the item definition
    // which is another instance
    this.itemDefinition.applyValue(
      id,
      version,
      // value might be null
      value || {},
      // exclude all extensions
      true,
      // graphql user id, unknown
      null,
      // grapqhl role, unknown
      null,
      // graphql requested fields, none
      null,
      doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers,
    );
  }

  /**
   * Memory cleans the value in an item
   * @param id the slot id
   * @param version the slot version
   */
  public cleanValueFor(
    id: number,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");
    delete this.stateExclusion[mergedID];
    delete this.stateExclusionModified[mergedID];
    delete this.stateExclusionHasBeenManuallySet[mergedID];
    delete this.stateExclusionApplied[mergedID];

    this.itemDefinition.cleanValueFor(id, version, true);
  }

  /**
   * restores the include value to the applied value
   * @param id the slot id
   * @param version the slot version
   */
  public restoreValueFor(
    id: number,
    version: string,
  ) {
    const mergedID = id + "." + (version || "");
    if (typeof this.stateExclusionApplied[mergedID] !== "undefined") {
      this.stateExclusion[mergedID] = this.stateExclusionApplied[mergedID];
      this.stateExclusionModified[mergedID] = true;
      this.stateExclusionHasBeenManuallySet[mergedID] = false;
    } else {
      delete this.stateExclusion[mergedID];
      delete this.stateExclusionModified[mergedID];
      delete this.stateExclusionHasBeenManuallySet[mergedID];
    }

    this.itemDefinition.restoreValueFor(id, version, true);
  }

  /**
   * Gives the i18 name that was specified
   * or otherwise gives the item definition i18 name
   * @param  locale the locale iso form
   * @returns a string or null (if locale not valid)
   */
  public getI18nNameFor(locale: string) {
    if (this.rawData.i18nData &&
      this.rawData.i18nData[locale] &&
      this.rawData.i18nData[locale].name) {
      return this.rawData.i18nData[locale].name;
    }

    const parentItemDefinitionI18nData = this.itemDefinition.getI18nDataFor(locale);
    return (parentItemDefinitionI18nData && parentItemDefinitionI18nData.name) || null;
  }

  /**
   * Provides the item definition item locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * Basically returns the raw data of this item
   * @returns the json value raw data
   */
  public toJSON() {
    return this.rawData;
  }

  /**
   * Returns true if the item contains a property that needs to be
   * extenrally checked, either an indexed one
   * @returns a boolean on whether it contains such a property or not
   */
  public containsAnExternallyCheckedProperty(): boolean {
    return this.itemDefinition.containsAnExternallyCheckedProperty(this.rawData.sinkIn, true);
  }

  /**
   * Provides the item definition that this include refers to
   * @returns the item definition
   */
  public getItemDefinition() {
    return this.itemDefinition;
  }

  /**
   * Merges the i18n data of another include in another language
   * @param includeRaw the include itself
   */
  public mergeWithI18n(
    includeRaw: IIncludeRawJSONDataType,
  ) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...includeRaw.i18nData,
    };
  }
}
