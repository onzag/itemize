/**
 * Contains all the logic that is used within the modules and submodules
 * modules are containers that offer properties in common for item definitions
 *
 * @packageDocumentation
 */
import ItemDefinition, { IItemDefinitionRawJSONDataType, ItemDefinitionIOActions } from "./ItemDefinition";
import PropertyDefinition, { IPropertyDefinitionRawJSONDataType } from "./ItemDefinition/PropertyDefinition";
import { GraphQLObjectType } from "graphql";
import Root from "..";
import { IGQLRequestFields } from "../../../gql-querier";
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
        [key: string]: string;
    };
    /**
     * Policies, which only really exists on item definitions
     * since modules do not hold policies
     */
    policies?: {
        delete?: {
            [policyName: string]: {
                label: string;
                failed: string;
            };
        };
        edit?: {
            [policyName: string]: {
                label: string;
                failed: string;
            };
        };
        read?: {
            [policyName: string]: {
                label: string;
                failed: string;
            };
        };
        parent?: {
            [policyName: string]: {
                label: string;
                failed: string;
            };
        };
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
export declare type ListenerType = () => any;
export interface IRequestLimitersType {
    condition: "AND" | "OR";
    since?: number;
    createdBy?: boolean;
    parenting?: boolean;
    custom?: string[];
}
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
     * The roles that have moderation capabilities
     * over the item definitions under this module
     * modding only exist at module level as well
     */
    modRoleAccess?: string[];
    /**
     * The roles that have flagging capabilities over
     * the item definitions of this module, if not
     * specified defaults to anyone logged, flagging only
     * exists at module level and affects all the children
     */
    flagRoleAccess?: string[];
    /**
     * Whether the module, and only the module itself
     * is searchable
     */
    searchable?: boolean;
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
     * this value is MAX_SEARCH_RESULTS_FALLBACK
     */
    maxSearchResults?: number;
    /**
     * Affects both the module and item definition, this determines the amount of match
     * results that can be retrieved at once, if not specified fallbacks to
     * MAX_SEARCH_RECORDS_FALLBACK
     */
    maxSearchRecords?: number;
    /**
     * And AND request limiter is a very powerful one as this would ensure
     * the creation of database indexes that will match and speed up these searches
     * createdAt creates a limiter that requests any search to contain created_at
     * createdBy creates a limiter that requests any search to contain created_by
     * parenting requests for a parent and custom adds to custom properties that will be
     * required at module level, these are basically args
     * And AND index will ensure to add an ordered btree index to these
     */
    requestLimiters?: IRequestLimitersType;
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
     * @returns a raw json for the search module
     */
    static buildSearchMode(rawData: IModuleRawJSONDataType): IModuleRawJSONDataType;
    /**
     * provides the prop exension property for a given raw module and its id
     * @param parentModuleRaw the parent module in raw form
     * @param id the id of the property extension
     * @returns a raw property definition
     */
    static getPropExtensionRawFor(parentModuleRaw: IModuleRawJSONDataType, id: string): IPropertyDefinitionRawJSONDataType;
    /**
     * Provides a full item definition in raw form
     * given raw data of a module and a full path for
     * a name
     * @param parentModuleRaw the raw json module data
     * @param name the name of the item definition as a path
     */
    static getItemDefinitionRawFor(parentModuleRaw: IModuleRawJSONDataType, name: string[]): IItemDefinitionRawJSONDataType;
    /**
     * The raw data of the module
     */
    rawData: IModuleRawJSONDataType;
    /**
     * The graphql object for this module (cached)
     * only exists when used the graphql functions
     */
    _gqlObj: GraphQLObjectType;
    /**
     * The graphql query object for this module (cached)
     * only exists when used the graphql functions
     */
    _gqlQueryObj: GraphQLObjectType;
    /**
     * The root that contains the module
     */
    private parentRoot;
    /**
     * The parent module, if any of this module instance
     * as an instance
     */
    private parentModule;
    /**
     * The search mode of this module, it is generated
     * automatically based on the data using the build search mode
     * functionality
     */
    private searchModeModule;
    /**
     * The children item definitions, as instances
     */
    private childItemDefinitions;
    /**
     * The children modules as instances
     */
    private childModules;
    /**
     * The prop extensions emulated item definition that contains
     * all the prop extensions as an item definition itself
     */
    private childPropExtensionItemDefinition;
    /**
     * The property definitions that the module itself
     * has, and every item defintion in itself hence
     * inherits
     */
    private propExtensions;
    /**
     * Builds a module from raw json data
     * @param rawJSON the raw json data of the module
     * @param parentRoot the root that contains the module
     * @param parentModule the parent module of the module, can be null
     * @param disableSearchModeRetrieval makes the search module be null and it's not calculated
     * this is for use because search modules are generated automatically on every instance
     * this would create an infite loop if this option wasn't available
     */
    constructor(rawJSON: IModuleRawJSONDataType, parentRoot: Root, parentModule: Module, disableSearchModeRetrieval?: boolean);
    cleanState(): void;
    /**
     * Runs the initialization of the module, for cross access, this executes
     * once the entire tree is ready so this module other parts of the tree
     * Root class executes this function recursively
     */
    init(): void;
    /**
     * checks whether a module has an item definition for
     * an specific children given its full path
     * @param name the name path of the definition
     * @returns a boolean
     */
    hasItemDefinitionFor(name: string[]): boolean;
    /**
     * Gives you raw data for an item definition given its full
     * path
     * @throws an error if this item definition does not exist
     * @param name the full path of the item definition
     * @returns a raw item definition
     */
    getItemDefinitionRawFor(name: string[]): IItemDefinitionRawJSONDataType;
    /**
     * Gets a live item definition given a specific path
     * the path has to be full
     * @throws an error if the path finds a dead end
     * @param name the path name for the item definition
     * @returns an item definition
     */
    getItemDefinitionFor(name: string[]): ItemDefinition;
    getPropExtensionItemDefinition(): ItemDefinition;
    /**
     * Gets a specific module given its name
     * @param name the name of the module
     * @returns a module that exists within this module
     */
    getModuleFor(name: string[]): Module;
    /**
     * Checks whether a property extension exists in this module
     * @param id the property definition id
     * @returns a boolean on whether this prop extension exists
     */
    hasPropExtensionFor(id: string): boolean;
    /**
     * Provides a prop extension from the module
     * @throws error if the property does not exist
     * @param id the property definition id
     * @returns a property definition, or throws an error if it doesn't exist
     */
    getPropExtensionFor(id: string): PropertyDefinition;
    /**
     * Provides all the prop extensions
     * @returns a list of property definitions
     */
    getAllPropExtensions(): PropertyDefinition[];
    /**
     * Provides all live child item definitions
     * @returns a list of item definitions
     */
    getAllChildItemDefinitions(): ItemDefinition[];
    /**
     * Gives the name of this module
     * @returns a string
     */
    getName(): string;
    /**
     * Provides the module locale data
     * @param  locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale: string): IRawJsonI18NSpecificLocaleDataType;
    /**
     * list all module names it contains
     * @returns a list of string for the module names
     */
    listModuleNames(): string[];
    /**
     * Provides all the modules it contains
     * should follow
     * @retuns a list of all the child modules as Module instances
     */
    getAllModules(): Module[];
    /**
     * Gets a specific module given its name
     * @param name the name of the module
     * @returns a Module instance for the child module, or throws an error
     */
    getChildModule(name: string): Module;
    /**
     * Provides the standard form of this module, will throw an error
     * if already in the standard form
     * @returns the standard form of the module
     */
    getStandardModule(): Module;
    /**
     * Provides the search form of this module, will throw an error if already
     * in the search form
     * @returns the search form of the module
     */
    getSearchModule(): Module;
    /**
     * Checks whether the module is in search module
     * @returns a boolean
     */
    isInSearchMode(): boolean;
    /**
     * Just gives the parent module
     * @returns a module (or null)
     */
    getParentModule(): Module;
    /**
     * Just gives the parent root
     * @returns the parent root
     */
    getParentRoot(): Root;
    /**
     * Provides the path of the module from the root
     * @returns an array of string that represents the path all the way to the root
     */
    getPath(): string[];
    /**
     * Tells whether it has a parent module
     * @returns a boolean on whether this module is parented
     */
    hasParentModule(): boolean;
    /**
     * Provides the full qualified path name that is used for absolute reference of the whole
     * module, this is unique
     * @returns the string qualified path name
     */
    getQualifiedPathName(): string;
    /**
     * Provides the roles that have access to a given
     * action based on the rules that were set
     * @param action the action from the ItemDefinitionIOActions
     */
    getRolesWithAccessTo(action: ItemDefinitionIOActions): string[];
    /**
     * Provides the roles that have moderation access to
     * the moderation fileds for a given item definition
     */
    getRolesWithModerationAccess(): string[];
    /**
     * Provides the roles that are alowed to flag the
     * contents of an item definition
     */
    getRolesWithFlaggingAccess(): string[];
    /**
     * Tells whether module based searches are allowed
     * @returns a boolean on whether the module is setup as searchable
     */
    isSearchable(): boolean;
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
    checkRoleAccessFor(action: ItemDefinitionIOActions, role: string, userId: number, ownerUserId: number, requestedFields: IGQLRequestFields, throwError: boolean): boolean;
    getRequestLimiters(): IRequestLimitersType;
    getMaxSearchRecords(): number;
    getMaxSearchResults(): number;
    /**
     * Merges two i18n data components, for example the i18n data for
     * the english build and the i18n data for the russian build, that way
     * the state is not lost
     * @param mod the raw module that is merging
     */
    mergeWithI18n(mod: IModuleRawJSONDataType): void;
}
