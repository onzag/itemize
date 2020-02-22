"use strict";
/**
 * This file contains the description and class for the Include, contains the state
 * managing as well as the values applied and naming conventions for includes
 *
 * Related files schema.ts and checkers.ts
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConditionalRuleSet_1 = __importDefault(require("../ConditionalRuleSet"));
const PropertiesValueMappingDefiniton_1 = __importDefault(require("../PropertiesValueMappingDefiniton"));
const constants_1 = require("../../../../../constants");
/**
 * These represent the enum of the include and exclusion state of an include
 */
var IncludeExclusionState;
(function (IncludeExclusionState) {
    IncludeExclusionState["EXCLUDED"] = "EXCLUDED";
    IncludeExclusionState["INCLUDED"] = "INCLUDED";
    IncludeExclusionState["ANY"] = "ANY";
})(IncludeExclusionState = exports.IncludeExclusionState || (exports.IncludeExclusionState = {}));
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
class Include {
    /**
     * The constructor for an Include
     * @param rawJSON the raw data as JSON
     * @param parentModule the parent module
     * @param parentItemDefinition   the item definition that this node is
     * located, its root; for the example above that
     * would be the vehicle item definition
     */
    constructor(rawJSON, parentModule, parentItemDefinition) {
        this.rawData = rawJSON;
        // lets get an instance for the item definition for this
        // item, if there's one, and let's detach it
        this.itemDefinition = parentItemDefinition
            .getDirectlyAvailableItemDefinitionInContextFor(rawJSON.definition).getNewInstance();
        // the enforced properties list
        this.enforcedProperties = rawJSON.enforcedProperties &&
            new PropertiesValueMappingDefiniton_1.default(rawJSON.enforcedProperties, parentItemDefinition, this.itemDefinition);
        // the predefined properties list
        this.predefinedProperties = rawJSON.predefinedProperties &&
            new PropertiesValueMappingDefiniton_1.default(rawJSON.predefinedProperties, parentItemDefinition, this.itemDefinition);
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
        // If this is going to be excluded
        this.excludedIf = rawJSON.excludedIf &&
            new ConditionalRuleSet_1.default(rawJSON.excludedIf, parentModule, parentItemDefinition, null, this);
        // If it might be excluded
        this.canUserExcludeIf = rawJSON.canUserExcludeIf &&
            new ConditionalRuleSet_1.default(rawJSON.canUserExcludeIf, parentModule, parentItemDefinition, null, this);
        // if it's default excluded
        this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
            new ConditionalRuleSet_1.default(rawJSON.defaultExcludedIf, parentModule, parentItemDefinition, null, this);
        // parent item definition
        this.parentItemDefinition = parentItemDefinition;
        this.parentModule = parentModule;
        // State management
        this.stateExclusion = {};
        // initially the state hasn't been modified
        this.stateExclusionModified = {};
    }
    /**
     * Provides the ids of the sinking properties
     * @returns an array of the sinking properties ids
     */
    getSinkingPropertiesIds() {
        return this.rawData.sinkIn || [];
    }
    /**
     * Propvides a single sinking property for a given id
     * @param id the property id
     * @returns a single property, if available, otherwise throws an error
     */
    getSinkingPropertyFor(id) {
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
    getSinkingProperties() {
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
    checkRoleAccessFor(action, role, userId, ownerUserId, requestedFields, throwError) {
        return Object.keys(requestedFields || {}).every((requestedField) => {
            const propDef = this.itemDefinition.getPropertyDefinitionFor(requestedField, false);
            return propDef.checkRoleAccessFor(action, role, userId, ownerUserId, throwError);
        });
    }
    /**
     * Tells whether the current item is excluded
     * @returns a boolean whether it's excluded or not
     */
    getExclusionState(id, version) {
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
                }
                else if (this.rawData.ternaryExclusionState) {
                    return IncludeExclusionState.ANY;
                }
                return IncludeExclusionState.INCLUDED;
            }
            if (!this.rawData.ternaryExclusionState &&
                this.stateExclusion[mergedID] === IncludeExclusionState.ANY ||
                !this.stateExclusion[mergedID]) {
                return IncludeExclusionState.INCLUDED;
            }
            return this.stateExclusion[mergedID];
        }
        else if (this.rawData.ternaryExclusionState) {
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
    canExclusionBeSet(id, version) {
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
    isExclusionTernary() {
        return this.rawData.ternaryExclusionState || false;
    }
    /**
     * Checks whether excluding this item (while possible) will cause
     * a callout, that is, a clear display that the item definition
     * instance is missing it, this is for key items, eg. car, wheels missing.
     * @returns a boolean on whether the exclusion must be called out
     */
    isExclusionCallout() {
        return this.rawData.exclusionIsCallout || false;
    }
    /**
     * Sets the exclusion state to a new value
     * @param value the value for the exclusion state
     */
    setExclusionState(id, version, value) {
        const mergedID = id + "." + (version || null);
        this.stateExclusion[mergedID] = value;
        this.stateExclusionModified[mergedID] = true;
    }
    /**
     * Provides the name for this item, the name represents
     * the item definition children this item is attached to
     * @returns a string with the item definition name
     */
    getItemDefinitionName() {
        return this.rawData.definition;
    }
    /**
     * Provides the unique id of this item definition
     * the unique id is, well, unique for this item
     * @returns the unique id of the include
     */
    getId() {
        return this.rawData.id;
    }
    /**
     * Provides the qualified identifier of the include
     * that is an INCLUDE prefixed with the identifier
     * @returns a string that is the qualified identifier
     */
    getQualifiedIdentifier() {
        return constants_1.INCLUDE_PREFIX + this.getId();
    }
    /**
     * Provides the qualified identifier for prefixing
     * other things
     * @returns a prefixed string that is the prefixed qualified identifier
     */
    getPrefixedQualifiedIdentifier() {
        return constants_1.PREFIX_BUILD(this.getQualifiedIdentifier());
    }
    /**
     * Provides the qualfiied name for the exclusion state
     * @returns the string that represents the exclusion identifier
     */
    getQualifiedExclusionStateIdentifier() {
        return this.getPrefixedQualifiedIdentifier() + constants_1.EXCLUSION_STATE_SUFFIX;
    }
    /**
     * Provides the current value of this item
     * @param id the id of the stored item definition or module
     * @param version the slot version
     * @returns the state of the include
     */
    getStateNoExternalChecking(id, version, emulateExternalChecking) {
        const exclusionState = this.getExclusionState(id, version);
        const mergedID = id + "." + (version || "");
        return {
            exclusionState,
            canExclusionBeSet: this.canExclusionBeSet(id, version),
            includeId: this.getId(),
            itemDefinitionName: this.getItemDefinitionName(),
            itemDefinitionState: exclusionState === IncludeExclusionState.EXCLUDED ? null :
                this.itemDefinition.getStateNoExternalChecking(id, version, emulateExternalChecking, this.rawData.sinkIn || [], [], true),
            stateExclusion: this.stateExclusion[mergedID] || IncludeExclusionState.ANY,
            stateExclusionModified: this.stateExclusionModified[mergedID] || false,
        };
    }
    /**
     * Provides the current value of this item
     * @param id the id of the stored item definition or module
     * @param version the version
     * @returns a promise for the state of the include
     */
    async getState(id, version) {
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
        };
    }
    /**
     * Applies a value to an include
     * @param id the slot id to use
     * @param version the slot version to use
     * @param value the value that is applied
     * @param exclusionState the exclusion state
     * @param doNotApplyValueInPropertyIfPropertyHasBeenManuallySet whether if not applying
     * for manually set values (to avoid overriding user input)
     */
    applyValue(id, version, value, exclusionState, doNotApplyValueInPropertyIfPropertyHasBeenManuallySet) {
        const mergedID = id + "." + (version || "");
        // update the state
        this.stateExclusion[mergedID] = exclusionState;
        this.stateExclusionModified[mergedID] = true;
        // applying the value in the item definition
        // which is another instance
        this.itemDefinition.applyValue(id, version, 
        // value might be null
        value || {}, 
        // exclude all extensions
        true, 
        // graphql user id, unknown
        null, 
        // grapqhl role, unknown
        null, 
        // graphql requested fields, none
        null, doNotApplyValueInPropertyIfPropertyHasBeenManuallySet);
    }
    /**
     * Memory cleans the value in an item
     * @param id the slot id
     */
    cleanValueFor(id, version) {
        const mergedID = id + "." + (version || "");
        delete this.stateExclusion[mergedID];
        delete this.stateExclusionModified[mergedID];
        this.itemDefinition.cleanValueFor(id, version, true);
    }
    /**
     * Gives the i18 name that was specified
     * or otherwise gives the item definition i18 name
     * @param  locale the locale iso form
     * @returns a string or null (if locale not valid)
     */
    getI18nNameFor(locale) {
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
    getI18nDataFor(locale) {
        return this.rawData.i18nData[locale] || null;
    }
    /**
     * Basically returns the raw data of this item
     * @returns the json value raw data
     */
    toJSON() {
        return this.rawData;
    }
    /**
     * Returns true if the item contains a property that needs to be
     * extenrally checked, either an autocompleted property or an indexed one
     * @returns a boolean on whether it contains such a property or not
     */
    containsAnExternallyCheckedProperty() {
        return this.itemDefinition.containsAnExternallyCheckedProperty(this.rawData.sinkIn, true);
    }
    /**
     * Provides the item definition that this include refers to
     * @returns the item definition
     */
    getItemDefinition() {
        return this.itemDefinition;
    }
    /**
     * Merges the i18n data of another include in another language
     * @param includeRaw the include itself
     */
    mergeWithI18n(includeRaw) {
        this.rawData.i18nData = {
            ...this.rawData.i18nData,
            ...includeRaw.i18nData,
        };
    }
}
exports.default = Include;