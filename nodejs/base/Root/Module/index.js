"use strict";
/**
 * Contains all the logic that is used within the modules and submodules
 * modules are containers that offer properties in common for item definitions
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
const ItemDefinition_1 = __importStar(require("./ItemDefinition"));
const PropertyDefinition_1 = __importDefault(require("./ItemDefinition/PropertyDefinition"));
const constants_1 = require("../../../constants");
const search_mode_1 = require("./search-mode");
const errors_1 = require("../../errors");
/**
 * The class module that defines how the module behaves
 */
class Module {
    /**
     * Builds a module from raw json data
     * @param rawJSON the raw json data of the module
     * @param parentRoot the root that contains the module
     * @param parentModule the parent module of the module, can be null
     * @param disableSearchModeRetrieval makes the search module be null and it's not calculated
     * this is for use because search modules are generated automatically on every instance
     * this would create an infite loop if this option wasn't available
     */
    constructor(rawJSON, parentRoot, parentModule, disableSearchModeRetrieval) {
        // Setting the raw variables
        this.rawData = rawJSON;
        // setting the root
        this.parentRoot = parentRoot;
        // the parent module might be null
        this.parentModule = parentModule;
        // Setting this as empty just starting
        this.childItemDefinitions = [];
        this.childModules = [];
        // if we are not denying this
        if (!disableSearchModeRetrieval) {
            // We build the search module, using the static function
            // with our current raw data, null as parent module because search
            // modules are detached from their parents, and we disable
            // the generation of a search module of this same module
            this.searchModeModule = new Module(Module.buildSearchMode(this.rawData), this.parentRoot, this, true);
        }
        // if we have prop extensions in the raw data we were provided
        if (this.rawData.propExtensions) {
            // we need to populate the prop extensions
            this.propExtensions = this.rawData.propExtensions.map((propExtensionRawJSONData) => {
                // the prop extension constructor is fed the raw json data
                // the current module as the parent module instance
                // no item definition as parent definition instance
                // and true as being an extension
                return new PropertyDefinition_1.default(propExtensionRawJSONData, this, null, true);
            });
        }
        else {
            // Otherwise if we have no prop extensions, we populate it as empty
            this.propExtensions = [];
        }
        // now we loop over the children
        this.rawData.children.forEach((childRawJSONData) => {
            // modules are not processed
            if (childRawJSONData.type === "module") {
                const newModule = new Module(childRawJSONData, this.parentRoot, this);
                this.childModules.push(newModule);
            }
            else if (childRawJSONData.type === "item") {
                // The item is fed to the item definition constructor
                // the parent module is going to be this
                // and null is the parent item definition of the module itself
                const newItemDefinition = new ItemDefinition_1.default(childRawJSONData, this, null);
                // We add this new definition to the list
                this.childItemDefinitions.push(newItemDefinition);
            }
            else {
                // Throw an error in case of invalid type
                throw new Error("Cannot handle type " + childRawJSONData.type);
            }
        });
        this.childPropExtensionItemDefinition = new ItemDefinition_1.default({
            type: "item",
            name: this.rawData.name,
            i18nData: this.rawData.i18nData,
            readRoleAccess: this.rawData.readRoleAccess,
        }, this, null);
        this.childPropExtensionItemDefinition.setAsExtensionsInstance();
        this.parentRoot.registry[this.getQualifiedPathName()] = this;
    }
    /**
     * Builds the search mode of a raw module
     * this gives a module that is the search module
     * of the given module
     * @param rawData the raw data of the module in json
     * @returns a raw json for the search module
     */
    static buildSearchMode(rawData) {
        return search_mode_1.buildSearchModeModule(rawData);
    }
    /**
     * provides the prop exension property for a given raw module and its id
     * @param parentModuleRaw the parent module in raw form
     * @param id the id of the property extension
     * @returns a raw property definition
     */
    static getPropExtensionRawFor(parentModuleRaw, id) {
        const propertyDefinition = parentModuleRaw.propExtensions.find((p) => p.id === id);
        return propertyDefinition;
    }
    /**
     * Provides a full item definition in raw form
     * given raw data of a module and a full path for
     * a name
     * @param parentModuleRaw the raw json module data
     * @param name the name of the item definition as a path
     */
    static getItemDefinitionRawFor(parentModuleRaw, name) {
        // Search for child items
        // remember children can be of type module or item
        // so we got to check
        let finalDefinition = parentModuleRaw.children
            .find((d) => d.type === "item" && d.name === name[0]);
        // if we don't find such definition, return null
        if (!finalDefinition) {
            return null;
        }
        // Make a copy of the name
        const nNameConsumable = [...name];
        nNameConsumable.shift();
        // Get the current name to work on
        let currentName = nNameConsumable.shift();
        if (currentName) {
            do {
                finalDefinition =
                    finalDefinition.childDefinitions.find((d) => d.name === currentName);
                // if we find a death end
                if (!finalDefinition) {
                    return null;
                }
                currentName = nNameConsumable.shift();
            } while (currentName);
        }
        return finalDefinition;
    }
    /**
     * Runs the initialization of the module, for cross access, this executes
     * once the entire tree is ready so this module other parts of the tree
     * Root class executes this function recursively
     */
    init() {
        this.childItemDefinitions.forEach((cidef) => {
            cidef.init();
        });
        this.childModules.forEach((cmod) => {
            cmod.init();
        });
        this.childPropExtensionItemDefinition.init();
        if (this.searchModeModule) {
            this.searchModeModule.init();
        }
    }
    /**
     * checks whether a module has an item definition for
     * an specific children given its full path
     * @param name the name path of the definition
     * @returns a boolean
     */
    hasItemDefinitionFor(name) {
        // Try to find the first path
        const finalDefinition = this.rawData.children
            .find((d) => d.type === "item" && d.name === name[0]);
        // if we don't find it, it's not there
        if (!finalDefinition) {
            return false;
        }
        // Make a copy
        const nNameConsumable = [...name];
        nNameConsumable.shift();
        // Get the current name to work on
        let currentName = nNameConsumable.shift();
        if (currentName) {
            // loop within
            do {
                finalDefinition.childDefinitions.find((d) => d.name === currentName);
                // if we get to a death end
                if (!finalDefinition) {
                    return false;
                }
                currentName = nNameConsumable.shift();
            } while (currentName);
        }
        return true;
    }
    /**
     * Gives you raw data for an item definition given its full
     * path
     * @throws an error if this item definition does not exist
     * @param name the full path of the item definition
     * @returns a raw item definition
     */
    getItemDefinitionRawFor(name) {
        // Use this helper function
        const definition = Module.getItemDefinitionRawFor(this.rawData, name);
        // Throw the error if not found
        if (!definition) {
            throw new Error("Searching for item definition " +
                name.join("/") + " failed");
        }
        return definition;
    }
    /**
     * Gets a live item definition given a specific path
     * the path has to be full
     * @throws an error if the path finds a dead end
     * @param name the path name for the item definition
     * @returns an item definition
     */
    getItemDefinitionFor(name) {
        // Search within the child definitions
        let finalDefinition = this.childItemDefinitions
            .find((d) => d.getName() === name[0]);
        if (!finalDefinition) {
            throw new Error("Searching for item definition " +
                name.join("/") + " failed");
        }
        // consume and loop like usual
        const nNameConsumable = [...name];
        nNameConsumable.shift();
        // Get the current name to work on
        let currentName = nNameConsumable.shift();
        if (currentName) {
            do {
                finalDefinition =
                    finalDefinition.getDirectlyAvailableItemDefinitionInContextFor(currentName, true);
                currentName = nNameConsumable.shift();
            } while (currentName);
        }
        return finalDefinition;
    }
    getPropExtensionItemDefinition() {
        return this.childPropExtensionItemDefinition;
    }
    /**
     * Gets a specific module given its name
     * @param name the name of the module
     * @returns a module that exists within this module
     */
    getModuleFor(name) {
        // Search within the child definitions
        const resultModule = this.childModules
            .find((m) => m.getName() === name[0]);
        if (!resultModule) {
            throw new Error("Searching for module " +
                name.join("/") + " failed");
        }
        // consume and loop like usual
        const nNameConsumable = [...name];
        nNameConsumable.shift();
        if (nNameConsumable.length === 0) {
            return resultModule;
        }
        else {
            return resultModule.getModuleFor(nNameConsumable);
        }
    }
    /**
     * Checks whether a property extension exists in this module
     * @param id the property definition id
     * @returns a boolean on whether this prop extension exists
     */
    hasPropExtensionFor(id) {
        // we use the rawdata to quickly check
        return (this.rawData.propExtensions || [])
            .some((p) => p.id === id);
    }
    /**
     * Provides a prop extension from the module
     * @throws error if the property does not exist
     * @param id the property definition id
     * @returns a property definition, or throws an error if it doesn't exist
     */
    getPropExtensionFor(id) {
        const propertyDefinition = this.propExtensions.find((p) => p.getId() === id);
        if (!propertyDefinition) {
            throw new Error("Requested invalid prop extension " + id);
        }
        return propertyDefinition;
    }
    /**
     * Provides all the prop extensions
     * @returns a list of property definitions
     */
    getAllPropExtensions() {
        return this.propExtensions;
    }
    /**
     * Provides all live child item definitions
     * @returns a list of item definitions
     */
    getAllChildItemDefinitions() {
        return this.childItemDefinitions;
    }
    /**
     * Gives the name of this module
     * @returns a string
     */
    getName() {
        return this.rawData.name;
    }
    /**
     * Provides the module locale data
     * @param  locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale) {
        return this.rawData.i18nData[locale] || null;
    }
    /**
     * list all module names it contains
     * @returns a list of string for the module names
     */
    listModuleNames() {
        return this.rawData.children.filter((c) => c.type === "module").map((m) => m.name);
    }
    /**
     * Provides all the modules it contains
     * should follow
     * @retuns a list of all the child modules as Module instances
     */
    getAllModules() {
        return this.childModules;
    }
    /**
     * Gets a specific module given its name
     * @param name the name of the module
     * @returns a Module instance for the child module, or throws an error
     */
    getChildModule(name) {
        const resultModule = this.childModules.find((m) => m.getName() === name);
        if (!resultModule) {
            throw new Error("invalid module " + name);
        }
        return resultModule;
    }
    /**
     * Provides the standard form of this module, will throw an error
     * if already in the standard form
     * @returns the standard form of the module
     */
    getStandardModule() {
        if (this.searchModeModule) {
            throw new Error("No standard module for " + this.getName());
        }
        // yes this is setup this way
        return this.parentModule;
    }
    /**
     * Provides the search form of this module, will throw an error if already
     * in the search form
     * @returns the search form of the module
     */
    getSearchModule() {
        if (!this.searchModeModule) {
            throw new Error("No search module for " + this.getName());
        }
        return this.searchModeModule;
    }
    /**
     * Checks whether the module is in search module
     * @returns a boolean
     */
    isInSearchMode() {
        return !this.searchModeModule;
    }
    /**
     * Just gives the parent module
     * @returns a module (or null)
     */
    getParentModule() {
        return this.parentModule;
    }
    /**
     * Just gives the parent root
     * @returns the parent root
     */
    getParentRoot() {
        return this.parentRoot;
    }
    /**
     * Provides the path of the module from the root
     * @returns an array of string that represents the path all the way to the root
     */
    getPath() {
        const parentPath = this.parentModule ? this.parentModule.getPath() : [];
        return parentPath.concat(this.getName());
    }
    /**
     * Tells whether it has a parent module
     * @returns a boolean on whether this module is parented
     */
    hasParentModule() {
        return !!this.parentModule;
    }
    /**
     * Provides the full qualified path name that is used for absolute reference of the whole
     * module, this is unique
     * @returns the string qualified path name
     */
    getQualifiedPathName() {
        if (this.parentModule) {
            return constants_1.PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), constants_1.MODULE_PREFIX + this.getName());
        }
        return constants_1.MODULE_PREFIX + this.getName();
    }
    /**
     * Provides the roles that have access to a given
     * action based on the rules that were set
     * @param action the action from the ItemDefinitionIOActions
     */
    getRolesWithAccessTo(action) {
        // in the case of module, only read makes sense as an action
        // this only happens in module based searches
        if (action === ItemDefinition_1.ItemDefinitionIOActions.READ) {
            return this.rawData.readRoleAccess || [constants_1.ANYONE_METAROLE];
        }
        return [];
    }
    /**
     * Provides the roles that have moderation access to
     * the moderation fileds for a given item definition
     */
    getRolesWithModerationAccess() {
        if (this.rawData.modRoleAccess) {
            return this.rawData.modRoleAccess;
        }
        return [];
    }
    /**
     * Provides the roles that are alowed to flag the
     * contents of an item definition
     */
    getRolesWithFlaggingAccess() {
        if (this.rawData.flagRoleAccess) {
            return this.rawData.flagRoleAccess;
        }
        return [constants_1.ANYONE_LOGGED_METAROLE];
    }
    /**
     * Tells whether module based searches are allowed
     * @returns a boolean on whether the module is setup as searchable
     */
    isSearchable() {
        if (typeof this.rawData.searchable !== "undefined") {
            return this.rawData.searchable;
        }
        return true;
    }
    /**
     * Checks the role access for an action in a module
     * @param action the IO action (for modules this can only logically be a READ action for module level searches)
     * @param role the role of the user attempting the action
     * @param userId the user id of the user attempting the action
     * @param ownerUserId the owner of that item definition
     * @param requestedFields the requested fields (single properties will be checked as well)
     * @param throwError whether to throw an error if failed (otherwise returns a boolean)
     * @returns a boolean on whether the user is granted role access
     */
    checkRoleAccessFor(action, role, userId, ownerUserId, requestedFields, throwError) {
        const rolesWithAccess = this.getRolesWithAccessTo(action);
        const modLevelAccess = rolesWithAccess.includes(constants_1.ANYONE_METAROLE) || (rolesWithAccess.includes(constants_1.OWNER_METAROLE) && userId === ownerUserId) || rolesWithAccess.includes(role);
        if (!modLevelAccess) {
            if (throwError) {
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
                    code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : "FORBIDDEN",
                });
            }
            return false;
        }
        return Object.keys(requestedFields).every((requestedField) => {
            const propDef = this.getPropExtensionFor(requestedField);
            return propDef.checkRoleAccessFor(action, role, userId, ownerUserId, throwError);
        });
    }
    /**
     * Merges two i18n data components, for example the i18n data for
     * the english build and the i18n data for the russian build, that way
     * the state is not lost
     * @param mod the raw module that is merging
     */
    mergeWithI18n(mod) {
        this.rawData.i18nData = {
            ...this.rawData.i18nData,
            ...mod.i18nData,
        };
        this.childModules.forEach((cMod) => {
            const nameOfMergeModule = cMod.getName();
            const mergeModuleRaw = mod.children &&
                mod.children.find((m) => m.type === "module" && m.name === nameOfMergeModule);
            if (mergeModuleRaw) {
                cMod.mergeWithI18n(mergeModuleRaw);
            }
        });
        this.childItemDefinitions.forEach((cIdef) => {
            const mergeIdefRaw = Module.getItemDefinitionRawFor(mod, [cIdef.getName()]);
            if (mergeIdefRaw) {
                cIdef.mergeWithI18n(mod, mergeIdefRaw);
            }
        });
        this.propExtensions.forEach((pExt) => {
            const mergePropertyRaw = Module.getPropExtensionRawFor(mod, pExt.getId());
            if (mergePropertyRaw) {
                pExt.mergeWithI18n(mergePropertyRaw);
            }
        });
        if (this.searchModeModule) {
            const searchModeRaw = Module.buildSearchMode(mod);
            this.searchModeModule.mergeWithI18n(searchModeRaw);
        }
    }
}
exports.default = Module;
