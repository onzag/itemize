/**
 * Contains all the logic that is used within the modules and submodules
 * modules are containers that offer properties in common for item definitions
 *
 * @module
 */

import ItemDefinition, {
  IItemDefinitionRawJSONDataType, ItemDefinitionIOActions,
} from "./ItemDefinition";
import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "./ItemDefinition/PropertyDefinition";
import {
  MODULE_PREFIX,
  PREFIXED_CONCAT,
  ANYONE_METAROLE,
  OWNER_METAROLE,
  UNSPECIFIED_OWNER,
  GUEST_METAROLE,
  ANYONE_LOGGED_METAROLE,
  MAX_SEARCH_RECORDS_DEFAULT,
  MAX_SEARCH_RESULTS_DEFAULT,
  ENDPOINT_ERRORS,
} from "../../../constants";
import { buildSearchModeModule } from "./search-mode";
import Root, { ICustomRoleManager, Ii18NType, ISearchLimitersType } from "..";
import { EndpointError } from "../../errors";
import { IRQRequestFields, IRQValue } from "../../../rq-querier";

export interface II18nCountableObject {
  [key: string]: string;
}

/**
 * Specific locale information contained within modules and item
 * definitions, as this is how the i18n properties parsed from the
 * properties files comes to be
 */
export interface IRawJsonI18NSpecificLocaleDataType {
  /**
   * The name of the module or the item definition
   */
  name: string;
  /**
   * The full text search field label for full text search mode
   */
  search_field_label: string;
  /**
   * The full text search placeholder for full text search mode
   */
  search_field_placeholder: string;
  /**
   * The error that comes from the full text search mode when you have input too much data
   */
  search_value_too_large: string;
  /**
   * A comma separated list of strings for full text search mode
   */
  search_keywords: string;
  /**
   * Custom translation fields
   */
  custom?: {
    [key: string]: string | II18nCountableObject;
  };
  /**
   * Policies, which only really exists on item definitions
   * since modules do not hold policies
   */
  policies?: {
    delete?: {
      [policyName: string]: {
        label: string,
        failed: string,
      },
    },
    edit?: {
      [policyName: string]: {
        label: string,
        failed: string,
      },
    },
    read?: {
      [policyName: string]: {
        label: string,
        failed: string,
      },
    },
    parent?: {
      [policyName: string]: {
        label: string,
        failed: string,
      },
    },
  };
}

/**
 * This is the main form of the i18n data which now includes the namespace
 * for the specific language locale
 */
export interface IRawJSONI18NDataType {
  [locale: string]: IRawJsonI18NSpecificLocaleDataType;
}

/**
 * This is what a listener looks like in both modules
 * and item definitions
 */
export type ListenerType = () => any;

/**
 * This is the raw shape of a module after it has been
 * built and processed
 */
export interface IModuleRawJSONDataType {
  /**
   * The type is module
   */
  type: "module";

  /**
   * Location only exists during the building process and it's stripped
   * and represents the file location the file is
   */
  location?: string;
  /**
   * Also stripped after processed, represents the file location for the
   * i18n properties file
   */
  i18nDataLocation?: string;
  /**
   * The pointers come during the parsing method and are stripped as well
   * after built and it's used to create tracebacks from the raw data
   */
  pointers?: any;
  /**
   * This is the raw content of the file the pointers came from and it's also
   * stripped after built is done
   */
  raw?: string;
  /**
   * The prop extensions file location for the module, also stripped
   */
  propExtLocation?: string;
  /**
   * The prop extensions raw file source, stripped down as well
   */
  propExtRaw?: string;
  /**
   * The prop extensions pointers for use within the tracebacks during
   * the build process, stripped down after done
   */
  propExtPointers?: any;

  /**
   * The name of the file that now becomes a property
   */
  name: string;
  /**
   * The internationalization data
   */
  i18nData: IRawJSONI18NDataType;

  /**
   * The read role access
   */
  readRoleAccess?: string[];

  /**
   * The search role access
   */
  searchRoleAccess?: string[];

  /**
   * The roles that have moderation capabilities
   * over the item definitions under this module
   * modding only exist at module level as well
   */
  modRoleAccess?: string[];
  /**
   * Whether the module, and only the module itself
   * is searchable
   */
  searchable?: boolean;
  /**
   * Wether it is to be indexed by elastic
   */
  searchEngineEnabled?: boolean;
  /**
   * the children either module or item definition as found during the folder
   * search
   */
  children: Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType>;
  /**
   * The prop extensions properties that this modules gives to all the item definitions
   */
  propExtensions?: IPropertyDefinitionRawJSONDataType[];

  /**
   * Affects both the module and the item definition, this determines
   * how big the page of requested values can be, for the limit and offset,
   * it also determines the size of GET_LIST query requests as well
   * that should give a value that is less or equal to this amount, the default for
   * this value is MAX_SEARCH_RESULTS_DEFAULT
   */
  maxSearchResults?: number;
  /**
   * Affects both the module and item definition, this determines the amount of match
   * results that can be retrieved at once, if not specified fallbacks to
   * MAX_SEARCH_RECORDS_DEFAULT
   */
  maxSearchRecords?: number;
  /**
   * And AND search limiter is a very powerful one as this would ensure
   * the creation of database indexes that will match and speed up these searches
   * createdAt creates a limiter that requests any search to contain created_at
   * createdBy creates a limiter that requests any search to contain created_by
   * parenting requests for a parent and custom adds to custom properties that will be
   * required at module level, these are basically args
   * And AND index will ensure to add an ordered btree index to these
   */
  searchLimiters?: ISearchLimitersType;
}

/**
 * The class module that defines how the module behaves
 */
export default class Module {
  /**
   * Builds the search mode of a raw module
   * this gives a module that is the search module
   * of the given module
   * @param rawData the raw data of the module in json
   * @param rootI18nData the root i18n data
   * @returns a raw json for the search module
   */
  public static buildSearchMode(
    rawData: IModuleRawJSONDataType,
    rootI18nData: Ii18NType,
  ): IModuleRawJSONDataType {
    return buildSearchModeModule(rawData, rootI18nData);
  }

  /**
   * provides the prop exension property for a given raw module and its id
   * @param parentModuleRaw the parent module in raw form
   * @param id the id of the property extension
   * @returns a raw property definition
   */
  public static getPropExtensionRawFor(parentModuleRaw: IModuleRawJSONDataType, id: string) {
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
  public static getItemDefinitionRawFor(
    parentModuleRaw: IModuleRawJSONDataType,
    name: string[],
  ): IItemDefinitionRawJSONDataType {
    // Search for child items
    // remember children can be of type module or item
    // so we got to check
    let finalDefinition = parentModuleRaw.children
      .find((d) => d.type === "item" && d.name === name[0]) as
      IItemDefinitionRawJSONDataType;

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

  // Standard properties of the class instance, statics aside
  /**
   * The raw data of the module
   */
  public rawData: IModuleRawJSONDataType;

  /**
   * The root that contains the module
   */
  private parentRoot: Root;
  /**
   * The parent module, if any of this module instance
   * as an instance
   */
  private parentModule: Module;
  /**
   * The search mode of this module, it is generated
   * automatically based on the data using the build search mode
   * functionality
   */
  private searchModeModule: Module;

  /**
   * The children item definitions, as instances
   */
  private childItemDefinitions: ItemDefinition[];
  /**
   * The children modules as instances
   */
  private childModules: Module[];
  /**
   * The prop extensions emulated item definition that contains
   * all the prop extensions as an item definition itself
   */
  private childPropExtensionItemDefinition: ItemDefinition;
  /**
   * The property definitions that the module itself
   * has, and every item defintion in itself hence
   * inherits
   */
  private propExtensions: PropertyDefinition[];

  /**
   * Builds a module from raw json data
   * @param rawJSON the raw json data of the module
   * @param parentRoot the root that contains the module
   * @param parentModule the parent module of the module, can be null
   * @param disableSearchModeRetrieval makes the search module be null and it's not calculated
   * this is for use because search modules are generated automatically on every instance
   * this would create an infite loop if this option wasn't available
   */
  constructor(
    rawJSON: IModuleRawJSONDataType,
    parentRoot: Root,
    parentModule: Module,
    disableSearchModeRetrieval?: boolean,
  ) {
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
      this.searchModeModule = new Module(
        Module.buildSearchMode(this.rawData, this.parentRoot.getI18nData()),
        this.parentRoot,
        this,
        true,
      );
    }

    // if we have prop extensions in the raw data we were provided
    if (this.rawData.propExtensions) {
      const isInSearchMode = this.isInSearchMode();
      // we need to populate the prop extensions
      this.propExtensions = this.rawData.propExtensions
        .filter((p) => isInSearchMode ? true : !p.searchOnlyProperty)
        .map((propExtensionRawJSONData) => {
          // the prop extension constructor is fed the raw json data
          // the current module as the parent module instance
          // no item definition as parent definition instance
          // and true as being an extension
          return new PropertyDefinition(
            propExtensionRawJSONData,
            this,
            null,
            true,
          );
        });
    } else {
      // Otherwise if we have no prop extensions, we populate it as empty
      this.propExtensions = [];
    }

    // now we loop over the children
    this.rawData.children.forEach((childRawJSONData) => {
      // modules are not processed
      if (childRawJSONData.type === "module") {
        const newModule = new Module(
          childRawJSONData,
          this.parentRoot,
          this,
        );
        this.childModules.push(
          newModule,
        );
      } else if (childRawJSONData.type === "item") {
        // The item is fed to the item definition constructor
        // the parent module is going to be this
        // and null is the parent item definition of the module itself
        const newItemDefinition = new ItemDefinition(
          childRawJSONData,
          this,
          null,
        );

        // We add this new definition to the list
        this.childItemDefinitions.push(
          newItemDefinition,
        );
      } else {
        // Throw an error in case of invalid type
        throw new Error("Cannot handle type " + (childRawJSONData as any).type);
      }
    });

    this.childPropExtensionItemDefinition = new ItemDefinition({
      type: "item",
      name: this.rawData.name + "__PROPEXT_IDEF",
      i18nData: this.rawData.i18nData,
      readRoleAccess: this.rawData.readRoleAccess,
      searchRoleAccess: this.rawData.searchRoleAccess,
    }, this, null);
    this.childPropExtensionItemDefinition.setAsExtensionsInstance();

    this.parentRoot.registry[this.getQualifiedPathName()] = this;
    this.parentRoot.registry[this.getPath().join("/")] = this;
  }

  public cleanState() {
    this.childPropExtensionItemDefinition.cleanState();
    this.searchModeModule && this.searchModeModule.cleanState();
    this.propExtensions && this.propExtensions.forEach((pe) => pe.cleanState());
    this.childModules && this.childModules.forEach((cm) => cm.cleanState());
    this.childItemDefinitions && this.childItemDefinitions.forEach((cidef) => cidef.cleanState());
  }

  /**
   * Runs the initialization of the module, for cross access, this executes
   * once the entire tree is ready so this module other parts of the tree
   * Root class executes this function recursively
   */
  public init() {
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
  public hasItemDefinitionFor(name: string[]): boolean {
    // Try to find the first path
    const finalDefinition = this.rawData.children
      .find((d) => d.type === "item" && d.name === name[0]) as
      IItemDefinitionRawJSONDataType;

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
  public getItemDefinitionRawFor(name: string[]): IItemDefinitionRawJSONDataType {
    // Use this helper function
    const definition = Module.getItemDefinitionRawFor(
      this.rawData,
      name,
    );
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
  public getItemDefinitionFor(name: string[]): ItemDefinition {
    // Search within the child definitions
    let finalDefinition = this.childItemDefinitions
      .find((d) => d.getName() === name[0]) as ItemDefinition;

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

  public getPropExtensionItemDefinition() {
    return this.childPropExtensionItemDefinition;
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   * @returns a module that exists within this module
   */
  public getModuleFor(name: string[]): Module {
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
    } else {
      return resultModule.getModuleFor(nNameConsumable);
    }
  }

  /**
   * Checks whether a property extension exists in this module
   * @param id the property definition id
   * @returns a boolean on whether this prop extension exists
   */
  public hasPropExtensionFor(id: string) {
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
  public getPropExtensionFor(id: string) {
    const propertyDefinition = this.propExtensions.find((p) => p.getId() === id);
    if (!propertyDefinition) {
      throw new Error("Requested invalid prop extension " + id);
    }
    return propertyDefinition;
  }

  /**
   * Given a string id it specifies whether it is considered
   * a search only property only available in the search mode
   * @param id the id of the property
   * @returns a boolean
   */
  public isPropExtensionInSearchModeOnly(
    id: string,
  ): boolean {
    return !!(this.rawData.propExtensions && this.rawData.propExtensions.some((p) => p.id === id && p.searchOnlyProperty));
  }

  /**
   * Provides all the prop extensions
   * @returns a list of property definitions
   */
  public getAllPropExtensions() {
    return this.propExtensions;
  }

  /**
   * Provides all live child item definitions
   * @returns a list of item definitions
   */
  public getAllChildItemDefinitions() {
    return this.childItemDefinitions;
  }

  /**
   * Provides the live child definitions
   * recursively, it does not get in Module children
   * @returns an array of item definitions
   */
  public getAllChildDefinitionsRecursive() {
    let childDefinitions = this.getAllChildItemDefinitions();
    childDefinitions.forEach((idef) => {
      childDefinitions = childDefinitions.concat(idef.getChildDefinitionsRecursive());
    });
    return childDefinitions;
  }

  /**
   * Gives the name of this module
   * @returns a string
   */
  public getName() {
    return this.rawData.name;
  }

  /**
   * Provides the module locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * list all module names it contains
   * @returns a list of string for the module names
   */
  public listModuleNames() {
    return this.rawData.children.filter((c) => c.type === "module").map((m) => m.name);
  }

  /**
   * Provides all the modules it contains
   * should follow
   * @retuns a list of all the child modules as Module instances
   */
  public getAllModules() {
    return this.childModules;
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   * @returns a Module instance for the child module, or throws an error
   */
  public getChildModule(name: string) {
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
  public getStandardModule(): Module {
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
  public getSearchModule(): Module {
    if (!this.searchModeModule) {
      throw new Error("No search module for " + this.getName());
    }
    return this.searchModeModule;
  }

  /**
   * Checks whether the module is in search module
   * @returns a boolean
   */
  public isInSearchMode(): boolean {
    return !this.searchModeModule;
  }

  /**
   * Just gives the parent module
   * @returns a module (or null)
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Just gives the parent root
   * @returns the parent root
   */
  public getParentRoot() {
    return this.parentRoot;
  }

  /**
   * Provides the path of the module from the root
   * @returns an array of string that represents the path all the way to the root
   */
  public getPath(): string[] {
    const parentPath = this.parentModule ? this.parentModule.getPath() : [];
    return parentPath.concat(this.getName());
  }

  /**
   * Tells whether it has a parent module
   * @returns a boolean on whether this module is parented
   */
  public hasParentModule() {
    return !!this.parentModule;
  }

  /**
   * Provides the full qualified path name that is used for absolute reference of the whole
   * module, this is unique
   * @returns the string qualified path name
   */
  public getQualifiedPathName(): string {
    if (this.parentModule) {
      return PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), MODULE_PREFIX + this.getName());
    }
    return MODULE_PREFIX + this.getName();
  }

  /**
   * An utility function that returns the table name
   * for the module
   */
  public getTableName(): string {
    return this.getQualifiedPathName();
  }

  /**
   * Provides the search access for the given module
   * @retuns an array with the approved roles or the anyone metarole
   */
  public getRolesWithSearchAccess() {
    return this.rawData.searchRoleAccess || [ANYONE_METAROLE];
  }

  /**
   * Provides the roles that have access to a given
   * action based on the rules that were set
   * @param action the action from the ItemDefinitionIOActions
   * @returns an array of string with the roles that have the specific io role access
   */
  public getRolesWithAccessTo(action: ItemDefinitionIOActions) {
    // in the case of module, only read makes sense as an action
    // this only happens in module based searches
    if (action === ItemDefinitionIOActions.READ) {
      return this.rawData.readRoleAccess || [ANYONE_METAROLE];
    }
    return [];
  }

  /**
   * Provides the roles that have moderation access to
   * the moderation fileds for a given module
   * @returns an array of string with the roles that have moderation access
   */
  public getRolesWithModerationAccess(): string[] {
    if (this.rawData.modRoleAccess) {
      return this.rawData.modRoleAccess;
    }
    return [];
  }

  /**
   * Tells whether module based searches are allowed
   * @returns a boolean on whether the module is setup as searchable
   */
  public isSearchable() {
    if (typeof this.rawData.searchable !== "undefined") {
      return this.rawData.searchable;
    }
    return true;
  }

  /**
   * Wether the item is search engine enabled
   * @returns a boolean
   */
   public isSearchEngineEnabled() {
    return !!this.rawData.searchEngineEnabled;
  }

  /**
   * For a given requested rq value it will
   * tell which fields need to be filtered for soft
   * read role access
   * @param role 
   * @param userId 
   * @param ownerUserId 
   * @param rolesManager 
   * @returns 
   */
  public async applySoftReadRoleAccessTo(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    value: IRQValue,
  ): Promise<void> {

    if (!value) {
      return;
    }

    // otherwise we go in the requested fields, in each one of them
    for (const requestedField of Object.keys(value)) {
      if (!this.hasPropExtensionFor(requestedField)) {
        continue;
      }
      // also for the property
      const propDef = this.getPropExtensionFor(requestedField);
      const hasSoftAccess = await propDef.checkSoftReadRoleAccessFor(role, userId, ownerUserId, rolesManager);
      if (!hasSoftAccess) {
        value[requestedField] = null;
      }
    }
  }

  public async checkRoleAccessForIgnoreLimiters(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    const limiters = this.getSearchLimiters();
    const ignoreRoles = limiters?.ignoreRoleAccess;

    if (!ignoreRoles) {
      return false;
    }
    let canIgnore = ignoreRoles.includes(ANYONE_METAROLE) ||
      (
        ignoreRoles.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        ignoreRoles.includes(OWNER_METAROLE) && userId === ownerUserId
      ) || ignoreRoles.includes(role);

    let code: string = null;
    let message: string = null;

    if (!canIgnore) {
      const managerStatus = await rolesManager.checkRoleAccessFor(ignoreRoles);
      canIgnore = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    if (!canIgnore && throwError) {
      throw new EndpointError({
        message: message || "Your role has no access to moderation",
        code: code || ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    return canIgnore;
  }

  public async checkRoleAccessForModeration(
    role: string,
    userId: string,
    ownerUserId: string,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ): Promise<boolean> {
    const rolesWithAccess = this.getRolesWithModerationAccess();
    let hasAccess = rolesWithAccess.includes(ANYONE_METAROLE) ||
      (
        rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
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

    if (!hasAccess && throwError) {
      throw new EndpointError({
        message: message || "Your role has no access to moderation",
        code: code || ENDPOINT_ERRORS.FORBIDDEN,
      });
    }

    return hasAccess;
  }

  /**
   * Checks the role access for an action in a module
   * @param action the IO action (for modules this can only logically be a READ action for module level searches)
   * @param role the role of the user attempting the action
   * @param userId the user id of the user attempting the action
   * @param ownerUserId the owner of that item definition
   * @param requestedFields the requested fields (single properties will be checked as well)
   * @param rolesManager a roles manager instance
   * @param throwError whether to throw an error if failed (otherwise returns a boolean)
   * @returns a boolean on whether the user is granted role access
   */
  public async checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: string,
    ownerUserId: string,
    requestedFields: IRQRequestFields,
    rolesManager: ICustomRoleManager,
    throwError: boolean,
  ) {
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    let modLevelAccess = rolesWithAccess.includes(ANYONE_METAROLE) || (
      rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
    ) || rolesWithAccess.includes(role);

    let code: string = null;
    let message: string = null;

    if (!modLevelAccess) {
      const managerStatus = await rolesManager.checkRoleAccessFor(rolesWithAccess);
      modLevelAccess = managerStatus.granted;
      code = managerStatus.errorCode;
      message = managerStatus.errorMessage;
    }

    if (!modLevelAccess) {
      if (throwError) {
        const notLoggedInWhenShould = role === GUEST_METAROLE && rolesWithAccess.length;
        const errorMightHaveBeenAvoidedIfOwnerSpecified = ownerUserId === UNSPECIFIED_OWNER &&
          rolesWithAccess.includes(OWNER_METAROLE);

        if (message === null) {
          message = `Forbidden, user ${userId} with role ${role} has no ${action} access to resource ${this.getName()}` +
            ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
          if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
            message += ", this error might have been avoided if an owner had" +
              " been specified which matched yourself as there's a self rule, if performing a search" +
              " you might have wanted to add the created_by filter in order to ensure this rule is followed";
          }
        }

        throw new EndpointError({
          message,
          code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : (code || ENDPOINT_ERRORS.FORBIDDEN),
        });
      }
      return false;
    }

    for (const requestedField of Object.keys(requestedFields)) {
      const propDef = this.getPropExtensionFor(requestedField);
      const hasAccess = await propDef.checkRoleAccessFor(action, role, userId, ownerUserId, rolesManager, throwError);
      if (!hasAccess) {
        return false;
      }
    }

    return true;
  }

  /**
   * Provides the module request limiters
   * @returns the request limiters object or null
   */
  public getSearchLimiters() {
    return this.rawData.searchLimiters || null;
  }

  /**
   * Specifies how many search records might be obtained at once
   * @returns an integer
   */
  public getMaxSearchRecords() {
    return this.rawData.maxSearchRecords || MAX_SEARCH_RECORDS_DEFAULT;
  }

  /**
   * Specifies how many search results might be obtained at once
   * @returns an integer
   */
  public getMaxSearchResults() {
    return this.rawData.maxSearchResults || MAX_SEARCH_RESULTS_DEFAULT;
  }

  /**
   * Merges two i18n data components, for example the i18n data for
   * the english build and the i18n data for the russian build, that way
   * the state is not lost
   * @param mod the raw module that is merging
   * @param rootI18nData the i18n data of the root
   */
  public mergeWithI18n(
    mod: IModuleRawJSONDataType,
    rootI18nData: Ii18NType,
  ) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...mod.i18nData,
    };

    this.childModules.forEach((cMod) => {
      const nameOfMergeModule = cMod.getName();
      const mergeModuleRaw: IModuleRawJSONDataType = mod.children &&
        mod.children.find((m) => m.type === "module" && m.name === nameOfMergeModule) as IModuleRawJSONDataType;
      if (mergeModuleRaw) {
        cMod.mergeWithI18n(mergeModuleRaw, rootI18nData);
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
      const searchModeRaw = Module.buildSearchMode(mod, rootI18nData);
      this.searchModeModule.mergeWithI18n(searchModeRaw, rootI18nData);
    }
  }
}
