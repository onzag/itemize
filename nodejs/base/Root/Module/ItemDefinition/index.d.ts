/**
 * This is one of the hearts of itemize and represents the item definition
 * for items as it defines how they are meant to be conformed, by includes and properties
 *
 * @packageDocumentation
 */
import Include, { IIncludeRawJSONDataType, IIncludeState } from "./Include";
import PropertyDefinition, { IPropertyDefinitionRawJSONDataType, IPropertyDefinitionState } from "./PropertyDefinition";
import Module, { IModuleRawJSONDataType, ListenerType, IRawJSONI18NDataType, IRawJsonI18NSpecificLocaleDataType } from "..";
import { GraphQLOutputType, GraphQLObjectType } from "graphql";
import { IGQLValue, IGQLRequestFields } from "../../../../gql-querier";
/**
 * Policies eg, readRoleAccess, editRoleAccess, createRoleAccess
 * this is the form they have deep in after the name
 */
export interface IPolicyValueRawJSONDataType {
    roles: string[];
    properties: string[];
    applyingProperties?: string[];
    applyingPropertyOnlyAppliesWhenCurrentIsNonNull?: boolean;
    applyingIncludes?: string[];
    module?: string;
    itemDefinition?: string;
}
/**
 * Because a policy type can have many sub policies this
 * defines it all
 */
export interface IPolicyRawJSONDataType {
    [policyName: string]: IPolicyValueRawJSONDataType;
}
/**
 * This is basically the types themselves
 */
export interface IPoliciesRawJSONDataType {
    edit?: IPolicyRawJSONDataType;
    delete?: IPolicyRawJSONDataType;
    read?: IPolicyRawJSONDataType;
    parent?: IPolicyRawJSONDataType;
}
/**
 * When parenting is specified to the item definition by
 * canBeParentedBy this is the shape it comes as
 */
export interface IItemDefinitionParentingRawJSONDataType {
    module: string;
    itemDefinition?: string;
}
/**
 * The raw form of the item definition from the processed schema
 */
export interface IItemDefinitionRawJSONDataType {
    /**
     * Basic type
     */
    type: "item";
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
     * The name doesn't exist within the raw unprocessed data but it's added and
     * it's equal to the file name or the folder name in case of index.json
     */
    name: string;
    /**
     * The i18n data that is attached to that item definition it also doesn't exist
     * in the unprocessed data but comes from the properties file
     */
    i18nData: IRawJSONI18NDataType;
    /**
     * The includes exist within the item definition
     */
    includes?: IIncludeRawJSONDataType[];
    /**
     * The properties represent the list of properties it has
     */
    properties?: IPropertyDefinitionRawJSONDataType[];
    /**
     * Read role permissions
     */
    readRoleAccess?: string[];
    /**
     * Create role permissions
     */
    createRoleAccess?: string[];
    /**
     * Edit role permissions
     */
    editRoleAccess?: string[];
    /**
     * Delete role permissions
     */
    deleteRoleAccess?: string[];
    /**
     * This gets added during the building process
     * and represents the list of imported definitions
     * that exist within the module and are used for includes
     * these are paths
     */
    importedChildDefinitions?: string[][];
    /**
     * The actual child definitions that this item definition contains
     * this is appended during process as an array of this same object
     * aka it recurses as a tree
     */
    childDefinitions?: IItemDefinitionRawJSONDataType[];
    /**
     * the policies in the raw json form as they are specified
     * in the unprocessed file
     */
    policies?: IPoliciesRawJSONDataType;
    /**
     * This only really makes sense in the user case and it basically
     * shifts the ownership of the object to be its id rather than its created_by
     * attribute
     */
    ownerIsObjectId?: boolean;
    /**
     * Whether the item is searchable
     */
    searchable?: boolean;
    /**
     * A list of roles of which this item definition is allowed to be
     * used to create in behalf
     */
    canCreateInBehalfBy?: string[];
    /**
     * Whether it can be parented by other item definitions, these
     * represent a list of rules
     */
    canBeParentedBy?: IItemDefinitionParentingRawJSONDataType[];
    /**
     * Whether it actually must always be parented
     */
    mustBeParented?: boolean;
    /**
     * A list of roles who have access to parenting
     */
    parentingRoleAccess?: string[];
}
/**
 * Represents the state of policies for a given type
 */
export interface IPolicyStateType {
    [policyName: string]: IPropertyDefinitionState[];
}
/**
 * Represents all the state of policies
 */
export interface IPoliciesStateType {
    edit?: IPolicyStateType;
    delete?: IPolicyStateType;
    read?: IPolicyStateType;
    parent?: IPolicyStateType;
}
/**
 * Represents the whole item definition state
 */
export interface IItemDefinitionStateType {
    /**
     * The module this item definition resides (name only)
     */
    moduleName: string;
    /**
     * The qualified name of the item definition
     */
    itemDefQualifiedName: string;
    /**
     * The name of the item definition
     */
    itemDefName: string;
    /**
     * All the state of the includes within itself
     */
    includes: IIncludeState[];
    /**
     * All the states of the properties included
     */
    properties: IPropertyDefinitionState[];
    /**
     * All the policies state
     */
    policies: IPoliciesStateType;
    /**
     * The original graphql flattened value that was applied (if any)
     */
    gqlOriginalFlattenedValue: IGQLValue;
    /**
     * The id that was used
     */
    forId: number;
    /**
     * The version that was used
     */
    forVersion: string;
}
/**
 * Represents the possible io actions to be performed
 * within an item definition
 */
export declare enum ItemDefinitionIOActions {
    READ = "READ",
    CREATE = "CREATE",
    EDIT = "EDIT",
    DELETE = "DELETE"
}
/**
 * This is how graphql applied values are stored within
 * the item definition, using this structure, for the
 * application state
 */
export interface IItemDefinitionGQLValueType {
    /**
     * The user id that requested this
     */
    userIdRequester: number;
    /**
     * The role of the user that requested this
     */
    roleRequester: string;
    /**
     * The value as it came from graphql endpoint
     */
    rawValue: IGQLValue;
    /**
     * The flattened value without DATA fields
     */
    flattenedValue: IGQLValue;
    /**
     * The requested fields that were used
     */
    requestFields: IGQLRequestFields;
}
/**
 * This is the structure used for compiled policies
 * within the item definition, they are properties
 * so they are stored in such way, this is for
 * a single policy type
 */
export interface IPolicyType {
    [policyName: string]: PropertyDefinition[];
}
/**
 * This is the structure of all the policies
 * with all the possible types involved
 */
export interface IPoliciesType {
    edit?: IPolicyType;
    delete?: IPolicyType;
    read?: IPolicyType;
    parent?: IPolicyType;
}
/**
 * This is the max expression, the item definition class
 * which basically compounds all how this is defined
 */
export default class ItemDefinition {
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
    static getItemDefinitionRawFor(itemDefinitionRaw: IItemDefinitionRawJSONDataType, parentModuleRaw: IModuleRawJSONDataType, name: string, avoidImports?: boolean): IItemDefinitionRawJSONDataType;
    /**
     * A raw helper function that takes raw json data and returns
     * a property definition if it finds it based on its id
     * it also checks prop extensions
     * @param itemDefinitionRaw the raw item definition to be searched
     * @param parentModuleRaw the raw module
     * @param id the id of the property
     * @param includeExtensions whether to include the extensions
     */
    static getPropertyDefinitionRawFor(itemDefinitionRaw: IItemDefinitionRawJSONDataType, parentModuleRaw: IModuleRawJSONDataType, id: string, includeExtensions: boolean): IPropertyDefinitionRawJSONDataType;
    /**
     * The raw data of the item definition as it was
     * compiled
     */
    rawData: IItemDefinitionRawJSONDataType;
    /**
     * A cached graphql object
     */
    _gqlObj: GraphQLOutputType;
    /**
     * A cached graphql query object
     */
    _gqlQueryObj: GraphQLObjectType;
    /**
     * The include instances compiled from the raw data
     */
    private includeInstances;
    /**
     * The child definitions the item definition contains
     */
    private childDefinitions;
    /**
     * Imported definitions that are included in the
     * raw data using the import mechanism, this is the
     * compiled form
     */
    private importedChildDefinitions;
    /**
     * All the properties within the item definition
     */
    private propertyDefinitions;
    /**
     * All the policies within the item definition
     */
    private policyPropertyDefinitions;
    /**
     * The parent module
     */
    private parentModule;
    /**
     * A parent item definition or null
     */
    private parentItemDefinition;
    /**
     * The originating instance exists only if the current
     * item definition was instantiated from another and detached from
     * the tree, this is the tree instance it came from
     */
    private originatingInstance;
    /**
     * whether this instance is for prop extensions in the module
     * that is an emulated item definition that only contains
     * the prop extensions and is generated in the module
     */
    private extensionsInstance;
    /**
     * Listeners are simple callbacks that are added and operate within
     * the item definition, usually added for UI level functionality
     */
    private listeners;
    /**
     * Events are triggered accross the tree, so this ensures that the event
     * doesn't trigger twice and creates a forever loop
     */
    private lastListenerCallId;
    /**
     * Containst state information about applied values to slots
     */
    private stateHasAppliedValueTo;
    /**
     * Contains the information about the specific applied value to an slot
     */
    private stateGQLAppliedValue;
    /**
     * Build a new ItemDefinition instance
     * @param rawJSON the raw json form
     * @param parentModule the parent module instance
     * @param parentItemDefinition the parent item definition (or null)
     * @param originatingInstance an originating instance (for instantiated detached instances)
     */
    constructor(rawJSON: IItemDefinitionRawJSONDataType, parentModule: Module, parentItemDefinition: ItemDefinition, originatingInstance?: ItemDefinition);
    /**
     * Runs the initialization of the item definition, for cross access, this executes
     * once the entire tree is ready so this item definition can access other parts of the tree
     * Root class executes this function recursively
     */
    init(): void;
    /**
     * Flags this item definition into an extensions instance
     */
    setAsExtensionsInstance(): void;
    /**
     * Checks the flag for this item definition as being
     * an extensions instance
     * @returns a boolean
     */
    isExtensionsInstance(): boolean;
    /**
     * provides the raw name of the item definition
     * @returns the name as a string
     */
    getName(): string;
    /**
     * Provides the module name that contains this item definition
     * @returns a string
     */
    getModuleName(): string;
    /**
     * Tells whether an item definition has a child item definition for it
     * @param name the name of the item definition
     * @param avoidImports whether to avoid the imported detached definitions
     * @returns a boolean on whether it does or not
     */
    hasItemDefinitionFor(name: string, avoidImports?: boolean): boolean;
    /**
     * Gets a live item definition for the current item definition
     * either as a children or a detached instance that came from
     * another item definition as an import
     * @param name the name of the item definition
     * @param avoidImports whether to avoid imported items
     * @returns an item definition, will throw an error if not found
     */
    getDirectlyAvailableItemDefinitionInContextFor(name: string, avoidImports?: boolean): ItemDefinition;
    /**
     * Checks whether an item included in this item definition
     * has an specific id
     * @param id the id of the include
     * @returns a boolean on whether it has such include
     */
    hasIncludeFor(id: string): boolean;
    /**
     * provides an include within this item defintion that has that
     * specific id
     * @param id the id of the include
     * @returns the include if any, would throw an error if not found
     */
    getIncludeFor(id: string): Include;
    /**
     * Provides a raw json item definition that it has a children
     * @param name the name of the item definition
     * @throws an error if the item definition does not exist
     * @returns a raw item definition
     */
    getItemDefinitionRawFor(name: string, avoidImports?: boolean): IItemDefinitionRawJSONDataType;
    /**
     * Provides all the property definitions without
     * including the extensions
     * @returns a property definiton array
     */
    getAllPropertyDefinitions(): PropertyDefinition[];
    /**
     * Provides all that property defintiions
     * including the extensions
     * @returns a property definition array
     */
    getAllPropertyDefinitionsAndExtensions(): PropertyDefinition[];
    /**
     * Provides all the item instances
     * @returns an include array
     */
    getAllIncludes(): Include[];
    /**
     * Checks whether an item definition has a property definition
     * @param id the property definition id
     * @param includeExtensions whether to include extensions or not
     * @returns a boolean
     */
    hasPropertyDefinitionFor(id: string, includeExtensions: boolean): boolean;
    /**
     * Provides a live property definition for an item definition
     * this property definition can trigger state changes
     * @param id the property definition id
     * @param includeExtensions whether to include extensions or not
     * @returns a property definition or throws an error if not found
     */
    getPropertyDefinitionFor(id: string, includeExtensions: boolean): PropertyDefinition;
    /**
     * Provides a property definition based on a policy
     * this is a unique instance that holds its own state
     * and it's reflected in the item definition state
     * @param policyType the policy type
     * @param policyName the policy name
     * @param id the property id
     * @returns a property definition or throws an error if not found
     */
    getPropertyDefinitionForPolicy(policyType: string, policyName: string, id: string): PropertyDefinition;
    /**
     * Provides the qualified identifier for a given policy as it is described
     * @param policyType the policy type
     * @param policyName the policy name
     * @param id the property id
     * @returns a property definition or throws an error if not found
     */
    getQualifiedPolicyIdentifier(policyType: string, policyName: string, id: string): string;
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
    hasAtLeastOneActiveInstanceOf(id: number, version: string, name: string): boolean;
    /**
     * Checks whether it has an active instance of an item
     * given its include id (not its name)
     * @param id the slot id
     * @param version the slot version
     * @param includeId the id of the item
     * @returns a boolean on whether it does
     */
    hasAnActiveIncludeInstanceOfId(id: number, version: string, includeId: string): boolean;
    /**
     * Just gives the parent module
     * @returns a module instance
     */
    getParentModule(): Module;
    /**
     * Tells whether it has a parent item definition
     * @retuns a boolean
     */
    hasParentItemDefinition(): boolean;
    /**
     * Provides the parent item definition
     * @returns an item definition or throws an error if no such a thing
     */
    getParentItemDefinition(): ItemDefinition;
    /**
     * Provides the live child definitions
     * without imports
     * @returns an array of item definitions
     */
    getChildDefinitions(): ItemDefinition[];
    /**
     * Provides the live child definitions
     * without imports, recursively
     * @returns an array of item definitions
     */
    getChildDefinitionsRecursive(): ItemDefinition[];
    /**
     * Provides the live imported child definitions
     * @returns an array of item definitions
     */
    getImportedChildDefinitions(): ItemDefinition[];
    /**
     * Uses the raw data to instantiate a new instance of
     * the item definition, uses the same on state change
     * function for state changes so it remains linked to the
     * module
     * @returns a new ItemDefiniton instance
     */
    getNewInstance(): ItemDefinition;
    /**
     * Provides the item definition item locale data
     * @param locale the locale in iso form
     * @returns an object or null (if locale not valid)
     */
    getI18nDataFor(locale: string): IRawJsonI18NSpecificLocaleDataType;
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
    getStateNoExternalChecking(id: number, version: string, emulateExternalChecking?: boolean, onlyIncludeProperties?: string[], onlyIncludeIncludes?: string[], excludePolicies?: boolean): IItemDefinitionStateType;
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
    getState(id: number, version: string, onlyIncludeProperties?: string[], onlyIncludeIncludes?: string[], excludePolicies?: boolean): Promise<IItemDefinitionStateType>;
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
    applyValue(id: number, version: string, value: IGQLValue, excludeExtensions: boolean, graphqlUserIdRequester: number, graphqlRoleRequester: string, requestFields: IGQLRequestFields, doNotApplyValueInPropertyIfPropertyHasBeenManuallySetAndDiffers: boolean): void;
    /**
     * Provides the owner that applied the value for the
     * applied value, basically the created_by value
     * (or id if owner is object id, which is only relevant for users honestly)
     * @param id the id of the state
     * @param version the version of the slot
     * @returns a number, will return UNSPECIFIED_OWNER if it cannot find anything
     */
    getAppliedValueOwnerIfAny(id: number, version: string): number;
    /**
     * Wipes down a value and its state and everything out of memory
     * this might not be important in the client side but very important
     * in the server side, not cleaning the memory can become a memory leak
     * @param id the id of the state
     * @param version the version of the state
     * @param excludeExtensions whether to include the extensions of the parent
     */
    cleanValueFor(id: number, version: string, excludeExtensions?: boolean): void;
    /**
     * Checks whether given the state id, there is an applied
     * value for it
     * @param id the id
     * @param version the version
     * @returns a boolean on whether it does or not
     */
    hasAppliedValueTo(id: number, version: string): boolean;
    /**
     * Provides the applied value for the id
     * @param id the id
     * @param version the version
     * @returns the applied value structure
     */
    getGQLAppliedValue(id: number, version: string): IItemDefinitionGQLValueType;
    /**
     * Provides the item definition that represent the search mode of this
     * same item definition
     * @returns an ItemDefinition, this function will crash if you are already
     * in the search mode counterpart
     */
    getSearchModeCounterpart(): ItemDefinition;
    /**
     * Basically only works in search mode item definitions, and provides the standard
     * counterpart
     * @returns an ItemDefinition, this function will crash if you are already
     * in the standard mode counterpart
     */
    getStandardCounterpart(): ItemDefinition;
    /**
     * Tells whether this item is the search mode item of another
     * item
     * @returns a boolean on whether it is in search mode
     */
    isInSearchMode(): boolean;
    /**
     * Provides the roles that have access to a given
     * action based on the rules that were set
     * @param action the action from the ItemDefinitionIOActions
     * @retuns an array of string that represent the roles
     */
    getRolesWithAccessTo(action: ItemDefinitionIOActions): string[];
    /**
     * Provides the roles that have moderation access to
     * the moderation fileds for a given item definition
     * given its module rule
     */
    getRolesWithModerationAccess(): string[];
    /**
     * Provides the roles that are alowed to flag the
     * contents of an item definition given its module
     */
    getRolesWithFlaggingAccess(): string[];
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
    checkRoleAccessFor(action: ItemDefinitionIOActions, role: string, userId: number, ownerUserId: number, requestedFields: IGQLRequestFields, throwError: boolean): boolean;
    /**
     * Tells whether the object can be created in behalf of another user
     * rather than the user itself, this is incompatible with
     * ownerIsObjectId
     * @param role
     * @param throwError whether to throw an error if failed (otherwise returns a boolean)
     * @return a boolean on whether the user is allowed
     */
    checkRoleCanCreateInBehalf(role: string, throwError: boolean): boolean;
    /**
     * Tells whether this item definition has parenting enforced
     * @return a boolean on whether parenting is enforced
     */
    mustBeParented(): boolean;
    /**
     * Given an item definition checks if this item definition allows itself to be parented
     * by it, that means the current item definition will be the children
     * @param parentItemDefinition the expected parent
     * @param throwError whether to throw an error if failed
     * @returns a boolean on whether the item definition is an allowed parent
     */
    checkCanBeParentedBy(parentItemDefinition: ItemDefinition, throwError: boolean): boolean;
    /**
     * Checks whether the current user, has access to create an item and parent it
     * according to his role
     * @param role the role of the user
     * @param userId the user id
     * @param parentOwnerUserId the parent owner user id of the item this user is trying to parent
     * @param throwError whether to throw an error
     * @returns a boolean on whether parenting is allowed
     */
    checkRoleAccessForParenting(role: string, userId: number, parentOwnerUserId: number, throwError: boolean): boolean;
    /**
     * Basically returns the raw data itself
     * doesn't do much
     * @returns the json form
     */
    toJSON(): IItemDefinitionRawJSONDataType;
    /**
     * Provides the path from the module
     * base, that is not absolute but a relative
     * path from the parent module
     * @returns an array of string that represent
     * the path concatenated all the way to the module path to the root
     */
    getPath(): string[];
    /**
     * Provides the absolute path all the way
     * from the root
     * @returns an array of string that represents
     * the whole absolute path from the root
     */
    getAbsolutePath(): string[];
    /**
     * Returns true is one of the property has to be externally checked
     * either by database or rest endpoints, this is basically unique
     * values
     * @param onlyCheckProperties only to check the properties in this list
     * @param ignoreIncludes whether to ignore the sinked in properties in the includes
     * @returns a boolean
     */
    containsAnExternallyCheckedProperty(onlyCheckProperties?: string[], ignoreIncludes?: boolean): boolean;
    /**
     * Provides the qualified path name
     * of this item definition, which is unique for
     * this root instance
     * @returns the very useful qualified path name
     */
    getQualifiedPathName(): string;
    /**
     * Provides all policy names included in the policy of type
     * @param policyType the policy type, "edit", "read", "delete" or "parent"
     * @returns an array with strings of policy names
     */
    getPolicyNamesFor(policyType: string): string[];
    /**
     * Provides all live properties for a policy, these properties
     * are detached properties, new instances of the old property and hold
     * their own states
     * @param type the type "edit", "delete", "read" or "parent"
     * @param name the policy name that was set
     * @returns an array of properties
     */
    getPropertiesForPolicy(type: string, name: string): PropertyDefinition[];
    /**
     * Provides all the property ids that are affected by a given policy
     * @param type the policy type "edit", "delete", "read" or "parent"
     * @param name the policy name
     * @returns an array of string or null (if no applying properties)
     */
    getApplyingPropertyIdsForPolicy(type: string, name: string): string[];
    /**
     * Tells whether the list of applying properties only applies when going from a non null
     * value to a new value
     * @param type the policy type
     * @param name the policy name
     * @return a boolean value
     */
    doesApplyingPropertyOnlyAppliesWhenCurrentIsNonNull(type: string, name: string): boolean;
    /**
     * Provides all the include ids that are affected by the given policy
     * @param type the policy type "edit", "delete", "read" or "parent"
     * @param name the policy name
     * @returns an array of string or null (if no applying includes)
     */
    getApplyingIncludeIdsForPolicy(type: string, name: string): string[];
    /**
     * Provides all the roles that are affected by a policy
     * @param type the policy type "edit", "delete", "read" or "parent"
     * @param name the policy name
     * @returns an array of string
     */
    getRolesForPolicy(type: string, name: string): string[];
    /**
     * Adds a listener for an string event and id
     * @param event the event string
     * @param id the id
     * @param version the version
     * @param listener the listener
     */
    addListener(event: string, id: number, version: string, listener: ListenerType): void;
    /**
     * Removes a listener
     * @param event the event string
     * @param id the id
     * @param version the version
     * @param listener the listener
     */
    removeListener(event: string, id: number, version: string, listener: ListenerType): void;
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
    triggerListeners(event: string, id: number, version: string, but?: ListenerType, callId?: string): void;
    /**
     * Merges two i18n data components, for example the i18n data for
     * the english build and the i18n data for the russian build, that way
     * the state is not lost
     * @param mod the raw module that is merging
     * @param idef the raw item definition that is merging
     */
    mergeWithI18n(mod: IModuleRawJSONDataType, idef: IItemDefinitionRawJSONDataType): void;
    /**
     * Tells whether the item definition supports the search
     * endpoint and all what it entails
     * @returns a boolean
     */
    isSearchable(): boolean;
    /**
     * Checks whether the owner of this item definition is not supposed to be
     * the created_by field but rather the id field, this only makes sense
     * in users, an user owns itself
     * @returns a boolean
     */
    isOwnerObjectId(): boolean;
}
