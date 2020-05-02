"use strict";
/**
 * This is one of the hearts of itemize and represents the item definition
 * for items as it defines how they are meant to be conformed, by includes and properties
 *
 * @packageDocumentation
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Include_1 = __importStar(require("./Include"));
const PropertyDefinition_1 = __importDefault(require("./PropertyDefinition"));
const __1 = __importDefault(require(".."));
const constants_1 = require("../../../../constants");
const errors_1 = require("../../../errors");
const uuid_1 = __importDefault(require("uuid"));
const gql_util_1 = require("../../../../gql-util");
/**
 * Represents the possible io actions to be performed
 * within an item definition
 */
var ItemDefinitionIOActions;
(function (ItemDefinitionIOActions) {
    ItemDefinitionIOActions["READ"] = "READ";
    ItemDefinitionIOActions["CREATE"] = "CREATE";
    ItemDefinitionIOActions["EDIT"] = "EDIT";
    ItemDefinitionIOActions["DELETE"] = "DELETE";
})(ItemDefinitionIOActions = exports.ItemDefinitionIOActions || (exports.ItemDefinitionIOActions = {}));
/**
 * This is the max expression, the item definition class
 * which basically compounds all how this is defined
 */
class ItemDefinition {
    /**
     * Build a new ItemDefinition instance
     * @param rawJSON the raw json form
     * @param parentModule the parent module instance
     * @param parentItemDefinition the parent item definition (or null)
     * @param originatingInstance an originating instance (for instantiated detached instances)
     */
    constructor(rawJSON, parentModule, parentItemDefinition, originatingInstance) {
        /**
         * whether this instance is for prop extensions in the module
         * that is an emulated item definition that only contains
         * the prop extensions and is generated in the module
         */
        this.extensionsInstance = false;
        /**
         * Events are triggered accross the tree, so this ensures that the event
         * doesn't trigger twice and creates a forever loop
         */
        this.lastListenerCallId = "";
        this.rawData = rawJSON;
        this.parentModule = parentModule;
        this.parentItemDefinition = parentItemDefinition;
        this.originatingInstance = originatingInstance || null;
        // assigning the item definitions that are child by
        // instantiating them
        this.childDefinitions = rawJSON.childDefinitions ? rawJSON.childDefinitions
            .map((d) => (new ItemDefinition(d, this.parentModule, this))) : [];
        // Assigning the imported child definitions by
        // instantiating a detached child definition from the
        // parent module
        this.importedChildDefinitions =
            rawJSON.importedChildDefinitions ?
                rawJSON.importedChildDefinitions.map((d) => ({
                    fullName: d.join("/"),
                    definition: this.parentModule.getItemDefinitionFor(d),
                })) : [];
        // assigning the property definition by using the
        // properties and instantiating those as well
        this.propertyDefinitions = rawJSON.properties ? rawJSON.properties
            .map((i) => (new PropertyDefinition_1.default(i, parentModule, this, false))) : [];
        // assigning the include instances by using the includes
        // and instantiating those
        this.includeInstances = rawJSON.includes ? rawJSON.includes
            .map((i) => (new Include_1.default(i, parentModule, this))) : [];
        this.stateHasAppliedValueTo = {};
        this.stateGQLAppliedValue = {};
        this.listeners = {};
        this.parentModule.getParentRoot().registry[this.getQualifiedPathName()] = this;
    }
    /**
     * A raw helper function that gets a child or imported
     * raw item definition for an item, it's static, so it works
     * with raw json data, it throws no error
     * @param itemDefinitionRaw the json for the item definition
     * @param parentModuleRaw the parent module that contains
     * this same item definition raw
     * @param name the name of the expected child item
     * @param avoidImports whether to avoid imported items from the module
     */
    static getItemDefinitionRawFor(itemDefinitionRaw, parentModuleRaw, name, avoidImports) {
        // Find the definition in the raw form
        let definition = itemDefinitionRaw.childDefinitions
            .find((d) => d.name === name);
        // if we don't get it let's check the imports if we are allowed
        if (!definition && !avoidImports) {
            // we take the location and we match it like this
            // /path/example/itemDefinition would be considered imported
            // as well as itemDefinition would be matched to
            // /path/example/itemDefinition
            const importedDefinitionLoc = itemDefinitionRaw.importedChildDefinitions
                .find((d) => d.join("/") === name || d[d.length - 1] === name);
            // if we got it
            if (importedDefinitionLoc) {
                // le'ts get the name and the imported path
                const importedDefinitionName = importedDefinitionLoc.join("/");
                const importedPath = itemDefinitionRaw.importedChildDefinitions
                    .find((d) => d.join("/") === importedDefinitionName);
                // There is an equal static function in the parent module for
                // handling this too
                if (importedPath) {
                    definition = __1.default.getItemDefinitionRawFor(parentModuleRaw, importedPath);
                }
            }
        }
        return definition || null;
    }
    /**
     * A raw helper function that takes raw json data and returns
     * a property definition if it finds it based on its id
     * it also checks prop extensions
     * @param itemDefinitionRaw the raw item definition to be searched
     * @param parentModuleRaw the raw module
     * @param id the id of the property
     * @param includeExtensions whether to include the extensions
     */
    static getPropertyDefinitionRawFor(itemDefinitionRaw, parentModuleRaw, id, includeExtensions) {
        // We try to find the item definition locally
        let definition = itemDefinitionRaw.properties &&
            itemDefinitionRaw.properties.find((p) => p.id === id);
        // Otherwise we might check the prop extensions in the parent module
        // To see if it's there
        if (!definition && includeExtensions && parentModuleRaw.propExtensions) {
            definition = parentModuleRaw.propExtensions.find((p) => p.id === id);
        }
        // We return the definition or null on its defect
        return definition || null;
    }
    /**
     * Runs the initialization of the item definition, for cross access, this executes
     * once the entire tree is ready so this item definition can access other parts of the tree
     * Root class executes this function recursively
     */
    init() {
        // we need to set the policy property definition, the reason it's done in init
        // and not in constructor is because we might need to get access to properties in
        // other item definitions for the purposes of the parenting rules
        this.policyPropertyDefinitions = {};
        // if we have policies at all
        if (this.rawData.policies) {
            // we loop within the types
            Object.keys(this.rawData.policies).forEach((policyType) => {
                this.policyPropertyDefinitions[policyType] = {};
                // now looping per name
                Object.keys(this.rawData.policies[policyType]).forEach((policyName) => {
                    // we get the policy value
                    const policyValue = this.rawData.policies[policyType][policyName];
                    // check if there's a module and item definition in question
                    const moduleInQuestionPath = policyValue.module;
                    const itemDefinitionInQuestionPath = policyValue.itemDefinition;
                    // by default the item definition in question is this same item definiton
                    // and properties referred are the same as this ones
                    let itemDefinition = this;
                    // but if we have a module specified
                    if (moduleInQuestionPath) {
                        // we need to get that referred module
                        const referredModule = this.getParentModule().getParentRoot().getModuleFor(moduleInQuestionPath.split("/"));
                        // and extract the item definition from it, notice how there might not be a path specified
                        if (itemDefinitionInQuestionPath) {
                            itemDefinition = referredModule.getItemDefinitionFor(itemDefinitionInQuestionPath.split("/"));
                        }
                        else {
                            // and in such case we use the extensions instance as a way to hack it
                            itemDefinition = referredModule.getPropExtensionItemDefinition();
                        }
                    }
                    // now we setup the property definition value by reinstantiating
                    this.policyPropertyDefinitions[policyType][policyName] =
                        policyValue.properties.map((propertyId) => {
                            return itemDefinition.getPropertyDefinitionFor(propertyId, true).getNewInstance();
                        });
                });
            });
        }
        // now we get all the child definitions and instantiate them
        this.childDefinitions.forEach((cd) => {
            cd.init();
        });
    }
    /**
     * Flags this item definition into an extensions instance
     */
    setAsExtensionsInstance() {
        this.extensionsInstance = true;
    }
    /**
     * Checks the flag for this item definition as being
     * an extensions instance
     * @returns a boolean
     */
    isExtensionsInstance() {
        return this.extensionsInstance;
    }
    /**
     * provides the raw name of the item definition
     * @returns the name as a string
     */
    getName() {
        return this.rawData.name;
    }
    /**
     * Provides the module name that contains this item definition
     * @returns a string
     */
    getModuleName() {
        return this.parentModule.getName();
    }
    /**
     * Tells whether an item definition has a child item definition for it
     * @param name the name of the item definition
     * @param avoidImports whether to avoid the imported detached definitions
     * @returns a boolean on whether it does or not
     */
    hasItemDefinitionFor(name, avoidImports) {
        // For this we use the raw data, we check if one
        // matches the name
        let status = this.rawData.childDefinitions.some((d) => d.name === name);
        // if we don't find it let's try searching in imports
        if (!status && !avoidImports) {
            // we take the location and we match it like this
            // /path/example/itemDefinition would be considered imported
            // as well as itemDefinition would be matched to
            // /path/example/itemDefinition
            const importedDefinitionLoc = this.rawData.importedChildDefinitions
                .find((d) => d.join("/") === name || d[d.length - 1] === name);
            // if we find an imported location that matches
            if (importedDefinitionLoc) {
                // we ask the module the same thing
                status =
                    this.parentModule.hasItemDefinitionFor(importedDefinitionLoc);
            }
        }
        // return that status
        return status;
    }
    /**
     * Gets a live item definition for the current item definition
     * either as a children or a detached instance that came from
     * another item definition as an import
     * @param name the name of the item definition
     * @param avoidImports whether to avoid imported items
     * @returns an item definition, will throw an error if not found
     */
    getDirectlyAvailableItemDefinitionInContextFor(name, avoidImports) {
        // We basically do the same as hasItemDefinition but we use
        // the live instances
        let definition = this.childDefinitions
            .find((d) => d.getName() === name);
        // if we don't have that definition
        if (!definition && !avoidImports) {
            // Do the same as before and do the matching
            const importedDefinitionLoc = this.rawData.importedChildDefinitions
                .find((d) => d.join("/") === name || d[d.length - 1] === name);
            // now we check we got something
            if (importedDefinitionLoc) {
                // And now let's use the full names for what we had
                // already requested to the parent
                const importedDefinitionName = importedDefinitionLoc.join("/");
                const found = this.importedChildDefinitions
                    .find((d) => d.fullName === importedDefinitionName);
                // if we find it, we assign it
                if (found) {
                    definition = found.definition;
                }
            }
        }
        // We throw an error in requested a non existant definition
        if (!definition) {
            throw new Error("Requested invalid definition " + name);
        }
        // return it
        return definition;
    }
    /**
     * Checks whether an item included in this item definition
     * has an specific id
     * @param id the id of the include
     * @returns a boolean on whether it has such include
     */
    hasIncludeFor(id) {
        return !!this.includeInstances.find((ii) => ii.getId() === id);
    }
    /**
     * provides an include within this item defintion that has that
     * specific id
     * @param id the id of the include
     * @returns the include if any, would throw an error if not found
     */
    getIncludeFor(id) {
        const include = this.includeInstances.find((ii) => ii.getId() === id);
        if (!include) {
            throw new Error("Requested invalid include " + id);
        }
        return include;
    }
    /**
     * Provides a raw json item definition that it has a children
     * @param name the name of the item definition
     * @throws an error if the item definition does not exist
     * @returns a raw item definition
     */
    getItemDefinitionRawFor(name, avoidImports) {
        // We basically pipe the data to the static
        const definition = ItemDefinition.getItemDefinitionRawFor(this.rawData, this.parentModule.rawData, name, avoidImports);
        //
        if (!definition) {
            throw new Error("Searching for item definition " +
                name + " failed");
        }
        return definition;
    }
    /**
     * Provides all the property definitions without
     * including the extensions
     * @returns a property definiton array
     */
    getAllPropertyDefinitions() {
        return this.propertyDefinitions;
    }
    /**
     * Provides all that property defintiions
     * including the extensions
     * @returns a property definition array
     */
    getAllPropertyDefinitionsAndExtensions() {
        return this.parentModule.getAllPropExtensions().concat(this.getAllPropertyDefinitions());
    }
    /**
     * Provides all the item instances
     * @returns an include array
     */
    getAllIncludes() {
        return this.includeInstances;
    }
    /**
     * Checks whether an item definition has a property definition
     * @param id the property definition id
     * @param includeExtensions whether to include extensions or not
     * @returns a boolean
     */
    hasPropertyDefinitionFor(id, includeExtensions) {
        // we use the rawdata to quickly check
        let found = (this.rawData.properties || [])
            .some((p) => p.id === id);
        if (!found && includeExtensions) {
            found = this.parentModule.hasPropExtensionFor(id);
        }
        return found;
    }
    /**
     * Provides a live property definition for an item definition
     * this property definition can trigger state changes
     * @param id the property definition id
     * @param includeExtensions whether to include extensions or not
     * @returns a property definition or throws an error if not found
     */
    getPropertyDefinitionFor(id, includeExtensions) {
        let definition = this.propertyDefinitions.find((p) => p.getId() === id);
        if (!definition && includeExtensions) {
            definition = this.parentModule.getPropExtensionFor(id);
        }
        if (!definition) {
            throw new Error("Requested invalid property " + id);
        }
        return definition;
    }
    /**
     * Provides a property definition based on a policy
     * this is a unique instance that holds its own state
     * and it's reflected in the item definition state
     * @param policyType the policy type
     * @param policyName the policy name
     * @param id the property id
     * @returns a property definition or throws an error if not found
     */
    getPropertyDefinitionForPolicy(policyType, policyName, id) {
        if (!this.policyPropertyDefinitions[policyType]) {
            throw new Error("There is no data regarding policy type " + policyType);
        }
        else if (!this.policyPropertyDefinitions[policyType][policyName]) {
            throw new Error("There is no data regarding policy type " + policyType + " in name " + policyName);
        }
        const definition = this.policyPropertyDefinitions[policyType][policyName]
            .find((p) => p.getId() === id);
        if (!definition) {
            throw new Error("There is no property in policy type " + policyType + " in name " + policyName + " for " + id);
        }
        return definition;
    }
    /**
     * Provides the qualified identifier for a given policy as it is described
     * @param policyType the policy type
     * @param policyName the policy name
     * @param id the property id
     * @returns a property definition or throws an error if not found
     */
    getQualifiedPolicyIdentifier(policyType, policyName, id) {
        return constants_1.PREFIX_BUILD(constants_1.POLICY_PREFIXES[policyType] + policyName) + id;
    }
    /**
     * Tells whether the current item definition has items itself
     * which are active and match the specific name
     * that means the item is not excluded and the item is
     * matches the name
     * @param id the slot id of the current state
     * @param version the slot version of the current state
     * @param name the name of the item
     * @returns a boolean
     */
    hasAtLeastOneActiveInstanceOf(id, version, name) {
        // we need a list of possible candidates
        // the might currently contain checks if an include
        // contains the include with the given name
        // otherwise it's not worth to check for activity
        const possibleCandidates = this.includeInstances
            .filter((i) => i.getItemDefinitionName() === name);
        // if there are no possible candidates return false
        if (!possibleCandidates.length) {
            return false;
        }
        return possibleCandidates.some((c) => c.getExclusionState(id, version) !== Include_1.IncludeExclusionState.EXCLUDED);
    }
    /**
     * Checks whether it has an active instance of an item
     * given its include id (not its name)
     * @param id the slot id
     * @param version the slot version
     * @param includeId the id of the item
     * @returns a boolean on whether it does
     */
    hasAnActiveIncludeInstanceOfId(id, version, includeId) {
        const candidate = this.includeInstances
            .find((i) => i.getId() === includeId);
        if (!candidate) {
            return false;
        }
        return candidate.getExclusionState(id, version) !== Include_1.IncludeExclusionState.EXCLUDED;
    }
    /**
     * Just gives the parent module
     * @returns a module instance
     */
    getParentModule() {
        return this.parentModule;
    }
    /**
     * Tells whether it has a parent item definition
     * @retuns a boolean
     */
    hasParentItemDefinition() {
        return !!this.parentItemDefinition;
    }
    /**
     * Provides the parent item definition
     * @returns an item definition or throws an error if no such a thing
     */
    getParentItemDefinition() {
        if (!this.parentItemDefinition) {
            throw new Error("Attempted to get parent definition while missing");
        }
        return this.parentItemDefinition;
    }
    /**
     * Provides the live child definitions
     * without imports
     * @returns an array of item definitions
     */
    getChildDefinitions() {
        return this.childDefinitions;
    }
    /**
     * Provides the live child definitions
     * without imports, recursively
     * @returns an array of item definitions
     */
    getChildDefinitionsRecursive() {
        let childDefinitions = this.getChildDefinitions();
        childDefinitions.forEach((idef) => {
            childDefinitions = childDefinitions.concat(idef.getChildDefinitionsRecursive());
        });
        return childDefinitions;
    }
    /**
     * Provides the live imported child definitions
     * @returns an array of item definitions
     */
    getImportedChildDefinitions() {
        return this.importedChildDefinitions.map((icd) => icd.definition);
    }
    /**
     * Uses the raw data to instantiate a new instance of
     * the item definition, uses the same on state change
     * function for state changes so it remains linked to the
     * module
     * @returns a new ItemDefiniton instance
     */
    getNewInstance() {
        return new ItemDefinition(this.rawData, this.parentModule, this.parentItemDefinition, this);
    }
    /**
     * Provides the item definition item locale data
     * @param locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale) {
        if (this.originatingInstance) {
            return this.originatingInstance.getI18nDataFor(locale);
        }
        return this.rawData.i18nData[locale] || null;
    }
    /**
     * same as getCurrentValue but ignores external checking
     * so it doesn't have to be async and no need to spend
     * network resources, checks most, but ignores unique checkings
     * in order to get cached previously checked results
     * @param id the stored value of the item definition, pass null if new
     * @param version the store value of the version, only applies if id specified
     * @param emulateExternalChecking emulates an externally checked
     * property as the get current value async leaves a cache behind
     * and this will use the cache rather than re-requesting
     * @param onlyIncludeProperties only includes these specific
     * properties, note property definitions are not fetched in
     * this case
     * @param onlyIncludeIncludes includes the includes in the list
     * @param excludePolicies excludes all the policies state
     * @retrns the item definition state without extenral checks
     */
    getStateNoExternalChecking(id, version, emulateExternalChecking, onlyIncludeProperties, onlyIncludeIncludes, excludePolicies) {
        const properties = onlyIncludeProperties ?
            onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, true)
                .getStateNoExternalChecking(id, version, emulateExternalChecking)) :
            this.getParentModule().getAllPropExtensions().concat(this.getAllPropertyDefinitions()).map((pd) => {
                return pd.getStateNoExternalChecking(id, version, emulateExternalChecking);
            });
        let policies = null;
        if (!excludePolicies) {
            policies = {};
            ["edit", "delete", "read", "parent"].map((policyType) => {
                if (this.policyPropertyDefinitions[policyType]) {
                    policies[policyType] = {};
                    Object.keys(this.policyPropertyDefinitions[policyType]).map((policyName) => {
                        policies[policyType][policyName] =
                            this.getPropertiesForPolicy(policyType, policyName)
                                .map((pd) => pd.getStateNoExternalChecking(id, version, emulateExternalChecking));
                    });
                }
            });
        }
        let includes;
        if (onlyIncludeIncludes) {
            includes = onlyIncludeIncludes.map((ii) => this.getIncludeFor(ii).getStateNoExternalChecking(id, version, emulateExternalChecking));
        }
        else {
            includes = this.includeInstances.map((ii) => ii.getStateNoExternalChecking(id, version, emulateExternalChecking));
        }
        const gqlOriginal = this.getGQLAppliedValue(id, version);
        return {
            moduleName: this.getModuleName(),
            itemDefQualifiedName: this.getQualifiedPathName(),
            itemDefName: this.getName(),
            includes,
            properties,
            policies,
            gqlOriginalFlattenedValue: (gqlOriginal && gqlOriginal.flattenedValue) || null,
            forId: id,
            forVersion: version,
        };
    }
    /**
     * provides the structure of the current item
     * as it is currently, the reason this is more efficient
     * is because getting the value of each item definition
     * wastes resources, so using this function is more
     * efficient than calling the functions
     * @param id the stored value of the item definition, pass null if new
     * this also represens the slot
     * @param version the stored value given a version pass null for default
     * @param onlyIncludeProperties only includes these specific
     * properties, note property definitions are not fetched in
     * this case
     * @param onlyIncludeIncludes includes the includes in the list
     * @param excludePolicies excludes all the policies state bit
     * @returns a promise for the item definition state
     */
    async getState(id, version, onlyIncludeProperties, onlyIncludeIncludes, excludePolicies) {
        const properties = await Promise.all(onlyIncludeProperties ?
            onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, true).getState(id, version)) :
            this.getParentModule().getAllPropExtensions().concat(this.getAllPropertyDefinitions()).map((pd) => {
                return pd.getState(id, version);
            }));
        let policies = null;
        if (!excludePolicies) {
            policies = {};
            await Promise.all(["edit", "delete", "read", "parent"].map(async (policyType) => {
                if (this.policyPropertyDefinitions[policyType]) {
                    policies[policyType] = {};
                    await Promise.all(Object.keys(this.policyPropertyDefinitions[policyType]).map(async (policyName) => {
                        policies[policyType][policyName] =
                            await Promise.all(this.getPropertiesForPolicy(policyType, policyName)
                                .map((pd) => pd.getState(id, version)));
                    }));
                }
            }));
        }
        let includes;
        if (onlyIncludeIncludes) {
            includes = await Promise.all(onlyIncludeIncludes.map((ii) => this.getIncludeFor(ii).getState(id, version)));
        }
        else {
            includes = await Promise.all(this.includeInstances.map((ii) => ii.getState(id, version)));
        }
        const gqlOriginal = this.getGQLAppliedValue(id, version);
        return {
            moduleName: this.getModuleName(),
            itemDefQualifiedName: this.getQualifiedPathName(),
            itemDefName: this.getName(),
            includes,
            properties,
            policies,
            gqlOriginalFlattenedValue: (gqlOriginal && gqlOriginal.flattenedValue) || null,
            forId: id,
            forVersion: version,
        };
    }
    /**
     * Applies a value from graphql to the item definition state
     * @param id the id that this state is for (can be null)
     * @param version the version of this state is for (can be null)
     * @param value the value itself from graphql, DATA values and flattened values are valid.
     * @param excludeExtensions whether to exclude the extensions for applying the value
     * @param graphqlRoleRequester the role that requested this data (can be null)
     * @param graphqlUserIdRequester the user id that requested this data (can be null)
     * @param requestFields the fields that were used to request this data (can be null) but be careful
     * this might be used for catching
     * @param doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers to avoid hot updating
     * values when the user is modifying them and an apply value has been called because
     * it has been updated somewhere else, we use this to avoid overriding, note that the value must also
     * not be equal, as in, it must differs; otherwise the value is applied, and manually set will go back
     * to false as it's been used applyValue on it, it's been set now by the computer
     */
    applyValue(id, version, value, excludeExtensions, graphqlUserIdRequester, graphqlRoleRequester, requestFields, doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers) {
        // first we flatten the value if necessary
        const flattenedValue = typeof value.DATA !== "undefined" ? gql_util_1.flattenRawGQLValueOrFields(value) : value;
        const mergedID = id + "." + (version || "");
        // we make it we have an applied value
        this.stateHasAppliedValueTo[mergedID] = true;
        // and set all the data regarding that value
        this.stateGQLAppliedValue[mergedID] = {
            userIdRequester: graphqlUserIdRequester,
            roleRequester: graphqlRoleRequester,
            rawValue: value,
            flattenedValue,
            requestFields,
        };
        // now we get all the properties that we are supposed to apply that value to
        const properties = excludeExtensions ?
            this.getAllPropertyDefinitions() :
            this.getAllPropertyDefinitionsAndExtensions();
        // and loop loop
        properties.forEach((property) => {
            // we get the value we are supposed to apply
            let givenValue = flattenedValue[property.getId()];
            // and decide whether we will set it as modified, if the value
            // is undefined, it acts like a delete, wipe, unmodified default
            // value
            let setAsModified = true;
            if (typeof givenValue === "undefined") {
                setAsModified = false;
                givenValue = null;
            }
            // and we apply such value
            property.applyValue(id, version, givenValue, setAsModified, doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers);
        });
        // now we get all the items
        this.getAllIncludes().forEach((include) => {
            // and we get the applied value for thae item
            let givenValue = flattenedValue[include.getQualifiedIdentifier()];
            if (typeof givenValue === "undefined") {
                givenValue = null;
            }
            // and the exclusion state, or excluded if not specified
            const givenExclusionState = flattenedValue[include.getQualifiedExclusionStateIdentifier()] || Include_1.IncludeExclusionState.EXCLUDED;
            // and we apply such value
            include.applyValue(id, version, givenValue, givenExclusionState, doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers);
        });
    }
    /**
     * Restores an applied value to the last applied value
     * @param id the id
     * @param version the version
     * @param excludeExtensions whether to exclude extensions of all this
     */
    restoreValueFor(id, version, excludeExtensions) {
        const mergedID = id + "." + (version || "");
        if (this.stateHasAppliedValueTo[mergedID]) {
            const entireValue = this.stateGQLAppliedValue[mergedID];
            this.applyValue(id, version, entireValue.rawValue, excludeExtensions, entireValue.userIdRequester, entireValue.roleRequester, entireValue.requestFields, false);
        }
        else {
            this.cleanValueFor(id, version, excludeExtensions);
        }
    }
    /**
     * Provides the owner that applied the value for the
     * applied value, basically the created_by value
     * (or id if owner is object id, which is only relevant for users honestly)
     * @param id the id of the state
     * @param version the version of the slot
     * @returns a number, will return UNSPECIFIED_OWNER if it cannot find anything
     */
    getAppliedValueOwnerIfAny(id, version) {
        const mergedID = id + "." + (version || "");
        if (!this.stateHasAppliedValueTo[mergedID] ||
            !this.stateGQLAppliedValue[mergedID] ||
            !this.stateGQLAppliedValue[mergedID].flattenedValue) {
            return constants_1.UNSPECIFIED_OWNER;
        }
        if (this.isOwnerObjectId()) {
            return (this.stateGQLAppliedValue[mergedID].flattenedValue.id || constants_1.UNSPECIFIED_OWNER);
        }
        return (this.stateGQLAppliedValue[mergedID].flattenedValue.created_by || constants_1.UNSPECIFIED_OWNER);
    }
    /**
     * Wipes down a value and its state and everything out of memory
     * this might not be important in the client side but very important
     * in the server side, not cleaning the memory can become a memory leak
     * @param id the id of the state
     * @param version the version of the state
     * @param excludeExtensions whether to include the extensions of the parent
     */
    cleanValueFor(id, version, excludeExtensions) {
        // delete all from memory
        const mergedID = id + "." + (version || "");
        delete this.stateHasAppliedValueTo[mergedID];
        delete this.stateGQLAppliedValue[mergedID];
        // gather the properties
        const properties = excludeExtensions ?
            this.getAllPropertyDefinitions() :
            this.getAllPropertyDefinitionsAndExtensions();
        // and wipe them
        properties.forEach((property) => {
            property.cleanValueFor(id, version);
        });
        // also the includes
        this.getAllIncludes().forEach((include) => {
            include.cleanValueFor(id, version);
        });
    }
    /**
     * Checks whether given the state id, there is an applied
     * value for it
     * @param id the id
     * @param version the version
     * @returns a boolean on whether it does or not
     */
    hasAppliedValueTo(id, version) {
        const mergedID = id + "." + (version || "");
        return this.stateHasAppliedValueTo[mergedID];
    }
    /**
     * Provides the applied value for the id
     * @param id the id
     * @param version the version
     * @returns the applied value structure
     */
    getGQLAppliedValue(id, version) {
        const mergedID = id + "." + (version || "");
        const appliedGQLValue = this.stateGQLAppliedValue[mergedID] || null;
        return appliedGQLValue;
    }
    /**
     * Provides the item definition that represent the search mode of this
     * same item definition
     * @returns an ItemDefinition, this function will crash if you are already
     * in the search mode counterpart
     */
    getSearchModeCounterpart() {
        if (this.isExtensionsInstance()) {
            return this.parentModule.getSearchModule().getPropExtensionItemDefinition();
        }
        return this.parentModule.getSearchModule().getItemDefinitionFor(this.getPath());
    }
    /**
     * Basically only works in search mode item definitions, and provides the standard
     * counterpart
     * @returns an ItemDefinition, this function will crash if you are already
     * in the standard mode counterpart
     */
    getStandardCounterpart() {
        if (this.isExtensionsInstance()) {
            return this.parentModule.getStandardModule().getPropExtensionItemDefinition();
        }
        return this.parentModule.getStandardModule().getItemDefinitionFor(this.getPath());
    }
    /**
     * Tells whether this item is the search mode item of another
     * item
     * @returns a boolean on whether it is in search mode
     */
    isInSearchMode() {
        return this.parentModule.isInSearchMode();
    }
    /**
     * Provides the roles that have access to a given
     * action based on the rules that were set
     * @param action the action from the ItemDefinitionIOActions
     * @retuns an array of string that represent the roles
     */
    getRolesWithAccessTo(action) {
        if (action === ItemDefinitionIOActions.READ) {
            // Anyone can read by default
            return this.rawData.readRoleAccess || [constants_1.ANYONE_METAROLE];
        }
        else if (action === ItemDefinitionIOActions.CREATE) {
            // Anyone logged can create by default
            return this.rawData.createRoleAccess || [constants_1.ANYONE_LOGGED_METAROLE];
        }
        else if (action === ItemDefinitionIOActions.EDIT) {
            // Only the owner of the item can edit by default
            return this.rawData.editRoleAccess || [constants_1.OWNER_METAROLE];
        }
        else if (action === ItemDefinitionIOActions.DELETE) {
            // Only the owner of the item can delete it by default
            return this.rawData.deleteRoleAccess || [constants_1.OWNER_METAROLE];
        }
        // ???? really this shouldn't happen
        return [];
    }
    /**
     * Provides the roles that have moderation access to
     * the moderation fileds for a given item definition
     * given its module rule
     */
    getRolesWithModerationAccess() {
        return this.parentModule.getRolesWithModerationAccess();
    }
    /**
     * Provides the roles that are alowed to flag the
     * contents of an item definition given its module
     */
    getRolesWithFlaggingAccess() {
        return this.parentModule.getRolesWithFlaggingAccess();
    }
    /**
     * Checks the role access for an action in an item
     * defintition
     * @param action the IO action
     * @param role the role of the user attempting the action
     * @param userId the user id of the user attempting the action
     * @param ownerUserId the owner of that item definition
     * @param requestedFields the requested fields (single properties will be checked as well)
     * @param throwError whether to throw an error if failed (otherwise returns a boolean)
     * @returns a boolean on whether the user is allowed
     */
    checkRoleAccessFor(action, role, userId, ownerUserId, requestedFields, throwError) {
        if (ownerUserId === null) {
            throw new Error("ownerUserId cannot be null");
        }
        // now let's get the roles that have access to the action
        const rolesWithAccess = this.getRolesWithAccessTo(action);
        // if anyone is included, or anyone logged is included and you are not
        // a guest, or your role is included
        const idefLevelAccess = rolesWithAccess.includes(constants_1.ANYONE_METAROLE) ||
            (rolesWithAccess.includes(constants_1.ANYONE_LOGGED_METAROLE) && role !== constants_1.GUEST_METAROLE) || (rolesWithAccess.includes(constants_1.OWNER_METAROLE) && userId === ownerUserId) || rolesWithAccess.includes(role);
        // if you got not access
        if (!idefLevelAccess) {
            // let's check the throw error flag
            if (throwError) {
                // if you are in guest mode, it is considered, that if you
                // fail, it's because you missed to login
                const notLoggedInWhenShould = role === constants_1.GUEST_METAROLE && rolesWithAccess.length;
                const errorMightHaveBeenAvoidedIfOwnerSpecified = ownerUserId === constants_1.UNSPECIFIED_OWNER &&
                    rolesWithAccess.includes(constants_1.OWNER_METAROLE);
                let errorMessage = `Forbidden, user ${userId} with role ${role} has no ${action} access to resource ${this.getName()}` +
                    ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
                if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
                    errorMessage += ", this error might have been avoided if an owner had" +
                        " been specified which matched yourself as there's a self rule, if performing a search" +
                        " you might have wanted to add the created_by filter in order to ensure this rule is followed";
                }
                throw new errors_1.EndpointError({
                    message: errorMessage,
                    // this is where the code comes in handy, it's forbidden by default, and must be logged in for guests
                    code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : "FORBIDDEN",
                });
            }
            return false;
        }
        // if the action is delete and we passsed, there are no properties to check
        // properties don't have a delete role filter, so we return true
        if (action === ItemDefinitionIOActions.DELETE) {
            return true;
        }
        // otherwise we go in the requested fields, in each one of them
        return Object.keys(requestedFields).every((requestedField) => {
            // and we check if it's an item (or a exclusion state)
            if (requestedField.startsWith(constants_1.INCLUDE_PREFIX)) {
                // so now we extract the item name from that
                let requestedFieldItemName = requestedField.replace(constants_1.INCLUDE_PREFIX, "");
                if (requestedFieldItemName.endsWith(constants_1.EXCLUSION_STATE_SUFFIX)) {
                    requestedFieldItemName = requestedFieldItemName.replace(constants_1.EXCLUSION_STATE_SUFFIX, "");
                }
                // request the include
                const include = this.getIncludeFor(requestedFieldItemName);
                // and check the role access for it
                return include.checkRoleAccessFor(action, role, userId, ownerUserId, requestedFields[requestedField], throwError);
            }
            else {
                // also for the property
                const propDef = this.getPropertyDefinitionFor(requestedField, true);
                return propDef.checkRoleAccessFor(action, role, userId, ownerUserId, throwError);
            }
        });
    }
    /**
     * Tells whether the object can be created in behalf of another user
     * rather than the user itself, this is incompatible with
     * ownerIsObjectId
     * @param role
     * @param throwError whether to throw an error if failed (otherwise returns a boolean)
     * @return a boolean on whether the user is allowed
     */
    checkRoleCanCreateInBehalf(role, throwError) {
        let canCreateInBehalf = false;
        if (this.rawData.canCreateInBehalfBy) {
            canCreateInBehalf = this.rawData.canCreateInBehalfBy.includes(constants_1.ANYONE_METAROLE) ||
                (this.rawData.canCreateInBehalfBy.includes(constants_1.ANYONE_LOGGED_METAROLE) && role !== constants_1.GUEST_METAROLE) || this.rawData.canCreateInBehalfBy.includes(role);
            const notLoggedInWhenShould = role === constants_1.GUEST_METAROLE;
            if (!canCreateInBehalf && throwError) {
                throw new errors_1.EndpointError({
                    message: `Forbidden, role ${role} cannot create in behalf in resource ${this.getName()}` +
                        ` only roles ${this.rawData.canCreateInBehalfBy.join(", ")} can do so`,
                    code: notLoggedInWhenShould ? constants_1.ENDPOINT_ERRORS.MUST_BE_LOGGED_IN : constants_1.ENDPOINT_ERRORS.FORBIDDEN,
                });
            }
        }
        else if (throwError) {
            throw new errors_1.EndpointError({
                message: "can create in behalf is not supported",
                // here we pass always forbidden simply because it's not supported at all
                // and it was not a login mistake
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
        return canCreateInBehalf;
    }
    /**
     * Tells whether this item definition has parenting enforced
     * @return a boolean on whether parenting is enforced
     */
    mustBeParented() {
        return !!this.rawData.mustBeParented;
    }
    /**
     * Given an item definition checks if this item definition allows itself to be parented
     * by it, that means the current item definition will be the children
     * @param parentItemDefinition the expected parent
     * @param throwError whether to throw an error if failed
     * @returns a boolean on whether the item definition is an allowed parent
     */
    checkCanBeParentedBy(parentItemDefinition, throwError) {
        // we need to get the module
        const parentModuleOfParent = parentItemDefinition.getParentModule();
        // and the paths of both in the slashed form, while the qualified is better
        // the raw info contains this
        const modulePath = parentModuleOfParent.getPath().join("/");
        const itemDefinitionPath = parentItemDefinition.getPath().join("/");
        // so now we check if it can be parented
        let canBeParentedBy = false;
        // now we check if we even have rules for parenting
        if (this.rawData.canBeParentedBy) {
            canBeParentedBy = this.rawData.canBeParentedBy.some((parentPossibility) => {
                if (!parentPossibility.itemDefinition) {
                    return parentPossibility.module === modulePath;
                }
                return parentPossibility.module === modulePath && parentPossibility.itemDefinition === itemDefinitionPath;
            });
            if (!canBeParentedBy && throwError) {
                throw new errors_1.EndpointError({
                    message: "parenting with '" + modulePath + "' and '" + itemDefinitionPath + "' is not allowed",
                    // here we pass always forbidden simply because it's not supported at all
                    // and it was not a login mistake
                    code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
                });
            }
        }
        else if (throwError) {
            throw new errors_1.EndpointError({
                message: "parenting is not supported",
                // here we pass always forbidden simply because it's not supported at all
                // and it was not a login mistake
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
        return canBeParentedBy;
    }
    /**
     * Checks whether the current user, has access to create an item and parent it
     * according to his role
     * @param role the role of the user
     * @param userId the user id
     * @param parentOwnerUserId the parent owner user id of the item this user is trying to parent
     * @param throwError whether to throw an error
     * @returns a boolean on whether parenting is allowed
     */
    checkRoleAccessForParenting(role, userId, parentOwnerUserId, throwError) {
        let hasParentingRoleAccess = false;
        if (this.rawData.parentingRoleAccess) {
            hasParentingRoleAccess = this.rawData.parentingRoleAccess.includes(constants_1.ANYONE_METAROLE) ||
                (this.rawData.parentingRoleAccess.includes(constants_1.ANYONE_LOGGED_METAROLE) && role !== constants_1.GUEST_METAROLE) || (this.rawData.parentingRoleAccess.includes(constants_1.OWNER_METAROLE) && userId === parentOwnerUserId) || this.rawData.parentingRoleAccess.includes(role);
            const notLoggedInWhenShould = role === constants_1.GUEST_METAROLE;
            if (!hasParentingRoleAccess && throwError) {
                throw new errors_1.EndpointError({
                    message: `Forbidden, user ${userId} with role ${role} has no parenting role access to resource ${this.getName()}` +
                        ` only roles ${this.rawData.parentingRoleAccess.join(", ")} can be granted access`,
                    code: notLoggedInWhenShould ? constants_1.ENDPOINT_ERRORS.MUST_BE_LOGGED_IN : constants_1.ENDPOINT_ERRORS.FORBIDDEN,
                });
            }
        }
        else {
            throw new errors_1.EndpointError({
                message: "parenting role access is not supported",
                // here we pass always forbidden simply because it's not supported at all
                // and it was not a login mistake
                code: constants_1.ENDPOINT_ERRORS.FORBIDDEN,
            });
        }
        return hasParentingRoleAccess;
    }
    /**
     * Basically returns the raw data itself
     * doesn't do much
     * @returns the json form
     */
    toJSON() {
        return this.rawData;
    }
    /**
     * Provides the path from the module
     * base, that is not absolute but a relative
     * path from the parent module
     * @returns an array of string that represent
     * the path concatenated all the way to the module path to the root
     */
    getPath() {
        if (this.parentItemDefinition) {
            return this.parentItemDefinition
                .getPath()
                .concat([
                this.getName(),
            ]);
        }
        return [this.getName()];
    }
    /**
     * Provides the absolute path all the way
     * from the root
     * @returns an array of string that represents
     * the whole absolute path from the root
     */
    getAbsolutePath() {
        if (this.parentItemDefinition) {
            return this.parentItemDefinition
                .getAbsolutePath()
                .concat([
                this.getName(),
            ]);
        }
        return this.parentModule
            .getPath()
            .concat([
            this.getName(),
        ]);
    }
    /**
     * Returns true is one of the property has to be externally checked
     * either by database or rest endpoints, this is basically unique
     * values
     * @param onlyCheckProperties only to check the properties in this list
     * @param ignoreIncludes whether to ignore the sinked in properties in the includes
     * @returns a boolean
     */
    containsAnExternallyCheckedProperty(onlyCheckProperties, ignoreIncludes) {
        const existInFirstLayer = this.getAllPropertyDefinitionsAndExtensions()
            .filter((pd) => !onlyCheckProperties ? true : onlyCheckProperties.includes(pd.getId()))
            .some((pd) => pd.isUnique());
        if (existInFirstLayer) {
            return true;
        }
        else if (ignoreIncludes) {
            return false;
        }
        return this.getAllIncludes().some((i) => i.containsAnExternallyCheckedProperty());
    }
    /**
     * Provides the qualified path name
     * of this item definition, which is unique for
     * this root instance
     * @returns the very useful qualified path name
     */
    getQualifiedPathName() {
        if (this.parentItemDefinition) {
            return constants_1.PREFIXED_CONCAT(this.parentItemDefinition.getQualifiedPathName(), constants_1.ITEM_DEFINITION_PREFIX + this.getName());
        }
        return constants_1.PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), constants_1.ITEM_DEFINITION_PREFIX + this.getName());
    }
    /**
     * Provides all policy names included in the policy of type
     * @param policyType the policy type, "edit", "read", "delete" or "parent"
     * @returns an array with strings of policy names
     */
    getPolicyNamesFor(policyType) {
        if (!this.rawData.policies || !this.rawData.policies[policyType]) {
            return [];
        }
        return Object.keys(this.rawData.policies[policyType]);
    }
    /**
     * Provides all live properties for a policy, these properties
     * are detached properties, new instances of the old property and hold
     * their own states
     * @param type the type "edit", "delete", "read" or "parent"
     * @param name the policy name that was set
     * @returns an array of properties
     */
    getPropertiesForPolicy(type, name) {
        return this.rawData.policies[type][name].properties.map((propertyId) => this.getPropertyDefinitionForPolicy(type, name, propertyId));
    }
    /**
     * Provides all the property ids that are affected by a given policy
     * @param type the policy type "edit", "delete", "read" or "parent"
     * @param name the policy name
     * @returns an array of string or null (if no applying properties)
     */
    getApplyingPropertyIdsForPolicy(type, name) {
        const applyingProperties = this.rawData.policies[type][name].applyingProperties;
        return applyingProperties || null;
    }
    /**
     * Tells whether the list of applying properties only applies when going from a non null
     * value to a new value
     * @param type the policy type
     * @param name the policy name
     * @return a boolean value
     */
    doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull(type, name) {
        const status = this.rawData.policies[type][name].applyingPropertyOnlyAppliesWhenCurrentIsNonNull;
        return !!status;
    }
    /**
     * Provides all the include ids that are affected by the given policy
     * @param type the policy type "edit", "delete", "read" or "parent"
     * @param name the policy name
     * @returns an array of string or null (if no applying includes)
     */
    getApplyingIncludeIdsForPolicy(type, name) {
        return this.rawData.policies[type][name].applyingIncludes || null;
    }
    /**
     * Provides all the roles that are affected by a policy
     * @param type the policy type "edit", "delete", "read" or "parent"
     * @param name the policy name
     * @returns an array of string
     */
    getRolesForPolicy(type, name) {
        return this.rawData.policies[type][name].roles;
    }
    /**
     * Adds a listener for an string event and id
     * @param event the event string
     * @param id the id
     * @param version the version
     * @param listener the listener
     */
    addListener(event, id, version, listener) {
        const mergedID = id + "." + (version || "");
        if (!this.listeners[event]) {
            this.listeners[event] = {};
        }
        this.listeners[event][mergedID] = this.listeners[event][mergedID] || [];
        this.listeners[event][mergedID].push(listener);
    }
    /**
     * Removes a listener
     * @param event the event string
     * @param id the id
     * @param version the version
     * @param listener the listener
     */
    removeListener(event, id, version, listener) {
        const mergedID = id + "." + (version || "");
        if (!this.listeners[event] || !this.listeners[event][mergedID]) {
            return;
        }
        const index = this.listeners[event][mergedID].indexOf(listener);
        if (index !== -1) {
            this.listeners[event][mergedID].splice(index, 1);
        }
    }
    /**
     * Triggers a listener for a given id
     * note this will affect the extensions as well because
     * their states are correlated
     * @param event the event
     * @param id the id
     * @param version the version
     * @param but a function not to trigger (one of the listeners)
     * @param callId a call id, it's an unique identifier for this event, it will be autogenerated if not provided
     * and it's the best to leave it be autogenerated
     */
    triggerListeners(event, id, version, but, callId) {
        if (this.lastListenerCallId !== callId) {
            this.lastListenerCallId = callId || uuid_1.default.v4();
            if (this.extensionsInstance) {
                this.parentModule.getAllChildItemDefinitions().forEach((cd) => {
                    cd.triggerListeners(event, id, version, but, this.lastListenerCallId);
                });
            }
            else {
                this.parentModule.getPropExtensionItemDefinition().triggerListeners(event, id, version, but, this.lastListenerCallId);
            }
            const mergedID = id + "." + (version || "");
            if (!this.listeners[event] || !this.listeners[event][mergedID]) {
                return;
            }
            this.listeners[event][mergedID].filter((l) => l !== but).forEach((l) => l());
        }
    }
    /**
     * Merges two i18n data components, for example the i18n data for
     * the english build and the i18n data for the russian build, that way
     * the state is not lost
     * @param mod the raw module that is merging
     * @param idef the raw item definition that is merging
     */
    mergeWithI18n(mod, idef) {
        this.rawData.i18nData = {
            ...this.rawData.i18nData,
            ...idef.i18nData,
        };
        this.childDefinitions.forEach((cIdef) => {
            const mergeIdefRaw = ItemDefinition.getItemDefinitionRawFor(idef, mod, cIdef.getName());
            if (mergeIdefRaw) {
                cIdef.mergeWithI18n(mod, mergeIdefRaw);
            }
        });
        this.propertyDefinitions.forEach((pD) => {
            const mergePropertyRaw = ItemDefinition.getPropertyDefinitionRawFor(idef, mod, pD.getId(), false);
            if (mergePropertyRaw) {
                pD.mergeWithI18n(mergePropertyRaw);
            }
        });
        this.includeInstances.forEach((ii) => {
            const mergeIncludeRaw = this.rawData.includes &&
                this.rawData.includes.find((include) => include.id === ii.getId());
            if (mergeIncludeRaw) {
                ii.mergeWithI18n(mergeIncludeRaw);
            }
        });
    }
    /**
     * Tells whether the item definition supports the search
     * endpoint and all what it entails
     * @returns a boolean
     */
    isSearchable() {
        if (typeof this.rawData.searchable !== "undefined") {
            return this.rawData.searchable;
        }
        return true;
    }
    /**
     * Checks whether the owner of this item definition is not supposed to be
     * the created_by field but rather the id field, this only makes sense
     * in users, an user owns itself
     * @returns a boolean
     */
    isOwnerObjectId() {
        return this.rawData.ownerIsObjectId || false;
    }
}
exports.default = ItemDefinition;
