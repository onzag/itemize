import Include, { IIncludeRawJSONDataType, IIncludeState, IncludeExclusionState } from "./Include";
import PropertyDefinition,
  { IPropertyDefinitionRawJSONDataType, IPropertyDefinitionState } from "./PropertyDefinition";
import Module, { IModuleRawJSONDataType, ListenerType, IRawJSONI18NDataType, IRawJsonI18NSpecificLocaleDataType } from "..";
import {
  PREFIXED_CONCAT,
  ITEM_DEFINITION_PREFIX,
  INCLUDE_PREFIX,
  ANYONE_METAROLE,
  OWNER_METAROLE,
  ANYONE_LOGGED_METAROLE,
  GUEST_METAROLE,
  UNSPECIFIED_OWNER,
  EXCLUSION_STATE_SUFFIX,
} from "../../../../constants";
import { GraphQLOutputType, GraphQLObjectType } from "graphql";
import { GraphQLEndpointError } from "../../../errors";
import uuid from "uuid";
import { flattenRawGQLValueOrFields } from "../../../../gql-util";
import Root from "../..";

export interface IPolicyValueRawJSONDataType {
  roles: string[];
  properties: string[];
  applyingProperties?: string[];
  applyingIncludes?: string[];
}

export interface IPolicyRawJSONDataType {
  [policyName: string]: IPolicyValueRawJSONDataType;
}

export interface IPoliciesRawJSONDataType {
  edit?: IPolicyRawJSONDataType;
  delete?: IPolicyRawJSONDataType;
  read?: IPolicyRawJSONDataType;
}

export interface IItemDefinitionParentingRawJSONDataType {
  module: string;
  itemDefinition?: string;
}

export interface IItemDefinitionRawJSONDataType {
  // Builder data
  type: "item";

  // Avaialble for the builder
  location?: string;
  i18nDataLocation?: string;
  pointers?: any;
  raw?: string;

  // Avilable after a build
  name: string;
  i18nData: IRawJSONI18NDataType;

  // original data
  includes?: IIncludeRawJSONDataType[];
  properties?: IPropertyDefinitionRawJSONDataType[];
  // role permissions
  readRoleAccess?: string[];
  createRoleAccess?: string[];
  editRoleAccess?: string[];
  deleteRoleAccess?: string[];

  // roperty gets added during procesing and merging
  // replacing imports, gotta be there even if empty
  importedChildDefinitions?: string[][];
  childDefinitions?: IItemDefinitionRawJSONDataType[];

  // policies
  policies?: IPoliciesRawJSONDataType;

  // ownership
  ownerIsObjectId?: boolean;

  // searchable
  searchable?: boolean;

  // behalf creation
  canCreateInBehalfBy?: string[];

  // parenting
  canBeParentedBy?: IItemDefinitionParentingRawJSONDataType[];
  parentingRoleAccess?: string[];
}

export interface IPolicyStateType {
  [policyName: string]: IPropertyDefinitionState[];
}

export interface IPoliciesStateType {
  edit?: IPolicyStateType;
  delete?: IPolicyStateType;
  read?: IPolicyStateType;
}

export interface IItemDefinitionStateType {
  moduleName: string;
  itemDefQualifiedName: string;
  itemDefName: string;
  includes: IIncludeState[];
  properties: IPropertyDefinitionState[];
  policies: IPoliciesStateType;
  gqlOriginalFlattenedValue: any;
  forId: number;
}

export enum ItemDefinitionIOActions {
  READ = "READ",
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export interface IItemDefinitionGQLValueType {
  userIdRequester: number;
  roleRequester: string;
  rawValue: any;
  flattenedValue: any;
  requestFields: any;
}

export interface IPolicyType {
  [policyName: string]: PropertyDefinition[];
}

export interface IPoliciesType {
  edit?: IPolicyType;
  delete?: IPolicyType;
  read?: IPolicyType;
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
  public static getItemDefinitionRawFor(
    itemDefinitionRaw: IItemDefinitionRawJSONDataType,
    parentModuleRaw: IModuleRawJSONDataType,
    name: string,
    avoidImports?: boolean,
  ): IItemDefinitionRawJSONDataType {
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
          definition = Module.getItemDefinitionRawFor(
            parentModuleRaw,
            importedPath,
          );
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
  public static getPropertyDefinitionRawFor(
    itemDefinitionRaw: IItemDefinitionRawJSONDataType,
    parentModuleRaw: IModuleRawJSONDataType,
    id: string,
    includeExtensions: boolean,
  ): IPropertyDefinitionRawJSONDataType {
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

  public rawData: IItemDefinitionRawJSONDataType;
  // Functions for graphql
  // tslint:disable-next-line: variable-name
  public _gqlObj: GraphQLOutputType;
  // tslint:disable-next-line: variable-name
  public _gqlQueryObj: GraphQLObjectType;

  private includeInstances: Include[];
  private childDefinitions: ItemDefinition[];
  private importedChildDefinitions: Array<{
    fullName: string,
    definition: ItemDefinition,
  }>;
  private propertyDefinitions: PropertyDefinition[];
  private policyPropertyDefinitions: IPoliciesType;
  private parentModule: Module;
  private parentItemDefinition: ItemDefinition;
  private originatingInstance: ItemDefinition;
  private extensionsInstance: boolean = false;

  private listeners: {
    [event: string]: {
      [id: number]: ListenerType[],
    },
  };
  private lastListenerCallId: string = "";

  // state information
  private stateHasAppliedValueTo: {
    [id: number]: boolean,
  };
  private stateGQLAppliedValue: {
    [id: number]: IItemDefinitionGQLValueType;
  };

  constructor(
    rawJSON: IItemDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
    originatingInstance?: ItemDefinition,
  ) {
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;
    this.originatingInstance = originatingInstance || null;

    // assigning the item definitions that are child by
    // instantiating them
    this.childDefinitions = rawJSON.childDefinitions ? rawJSON.childDefinitions
      .map((d) => (new ItemDefinition(d, this.parentModule,
        this))) : [];

    // Assigning the imported child definitions by
    // instantiating a detached child definition from the
    // parent module
    this.importedChildDefinitions =
      rawJSON.importedChildDefinitions ?
      rawJSON.importedChildDefinitions.map(
        (d) => ({
          fullName: d.join("/"),
          definition: this.parentModule.getItemDefinitionFor(d),
        })) : [];

    // assigning the property definition by using the
    // properties and instantiating those as well
    this.propertyDefinitions = rawJSON.properties ? rawJSON.properties
      .map((i) => (new PropertyDefinition(i, parentModule,
        this, false))) : [];

    this.policyPropertyDefinitions = {};
    if (rawJSON.policies) {
      Object.keys(rawJSON.policies).forEach((policyType) => {
        this.policyPropertyDefinitions[policyType] = {};
        Object.keys(rawJSON.policies[policyType]).forEach((policyName) => {
          this.policyPropertyDefinitions[policyType][policyName] =
            rawJSON.policies[policyType][policyName].properties.map(
              (propertyId: string) =>
                this.getPropertyDefinitionFor(propertyId, true).getNewInstance(),
            );
        });
      });
    }

    // assigning the include instances by using the includes
    // and instantiating those
    this.includeInstances = rawJSON.includes ? rawJSON.includes
      .map((i) => (new Include(i, parentModule, this))) : [];

    this.stateHasAppliedValueTo = {};
    this.stateGQLAppliedValue = {};

    this.listeners = {};

    Root.Registry[this.getQualifiedPathName()] = this;
  }

  public setAsExtensionsInstance() {
    this.extensionsInstance = true;
  }

  public isExtensionsInstance() {
    return this.extensionsInstance;
  }

  /**
   * provides the raw name of the item definition
   */
  public getName(): string {
    return this.rawData.name;
  }

  /**
   * Provides the path of a given item definition from
   * the module root
   */
  public getPath(): string[] {
    const parentPath = this.parentItemDefinition ? this.parentItemDefinition.getPath() : [];
    return parentPath.concat(this.getName());
  }

  /**
   * Provides the module name that contains this item definition
   */
  public getModuleName(): string {
    return this.parentModule.getName();
  }

  /**
   * Tells whether an item definition has a child item definition for it
   * @param name the name of the item definition
   * @param avoidImports whether to avoid the imported detached definitions
   */
  public hasItemDefinitionFor(
    name: string,
    avoidImports?: boolean,
  ): boolean {
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
   * @throws an error if the item definition does not exist
   * @param name the name of the item definition
   * @param avoidImports whether to avoid imported items
   */
  public getDirectlyAvailableItemDefinitionInContextFor(
    name: string,
    avoidImports?: boolean,
  ): ItemDefinition {
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
   */
  public hasIncludeFor(id: string) {
    return !!this.includeInstances.find((ii) => ii.getId() === id);
  }

  /**
   * provides an include within this item defintion that has that
   * specific id
   * @param id the id of the include
   * @throws an error if it cannot find the item
   */
  public getIncludeFor(id: string) {
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
  public getItemDefinitionRawFor(
    name: string,
    avoidImports?: boolean,
  ) {
    // We basically pipe the data to the static
    const definition = ItemDefinition.getItemDefinitionRawFor(
      this.rawData,
      this.parentModule.rawData,
      name,
      avoidImports,
    );
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
   */
  public getAllPropertyDefinitions() {
    return this.propertyDefinitions;
  }

  /**
   * Provides all that property defintiions
   * including the extensions
   */
  public getAllPropertyDefinitionsAndExtensions() {
    return this.parentModule.getAllPropExtensions().concat(this.getAllPropertyDefinitions());
  }

  /**
   * Provides all the item instances
   */
  public getAllIncludes() {
    return this.includeInstances;
  }

  /**
   * Checks whether an item definition has a property definition
   * @param id the property definition id
   * @param includeExtensions whether to include extensions or not
   */
  public hasPropertyDefinitionFor(id: string, includeExtensions: boolean) {
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
   * @throws error if the property does not exist
   * @param id the property definition id
   * @param includeExtensions whether to include extensions or not
   */
  public getPropertyDefinitionFor(
    id: string,
    includeExtensions: boolean,
  ): PropertyDefinition {
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
   */
  public getPropertyDefinitionForPolicy(
    policyType: string,
    policyName: string,
    id: string,
  ): PropertyDefinition {
    if (!this.policyPropertyDefinitions[policyType]) {
      throw new Error("There is no data regarding policy type " + policyType);
    } else if (!this.policyPropertyDefinitions[policyType][policyName]) {
      throw new Error("There is no data regarding policy type " + policyType + " in name " + policyName);
    }
    const definition = this.policyPropertyDefinitions[policyType][policyName]
      .find((p: PropertyDefinition) => p.getId() === id);
    if (!definition) {
      throw new Error("There is no property in policy type " + policyType + " in name " + policyName + " for " + id);
    }
    return definition;
  }

  /**
   * Tells whether the current item definition has items itself
   * which are active and match the specific name
   * that means the item is not excluded and the item is
   * matches the name
   * @param id the id of the current state
   * @param name the name of the item
   */
  public hasAtLeastOneActiveInstanceOf(id: number, name: string): boolean {
    // we need a list of possible candidates
    // the might currently contain checks if an include
    // contains the include with the given name
    // otherwise it's not worth to check for activity
    const possibleCandidates = this.includeInstances
      .filter((i) => i.getName() === name);

    // if there are no possible candidates return false
    if (!possibleCandidates.length) {
      return false;
    }

    return possibleCandidates.some((c) => c.getExclusionState(id) !== IncludeExclusionState.EXCLUDED);
  }

  /**
   * Checks whether it has an active instance of an item
   * given its include id (not its name)
   * @param id the slot id
   * @param includeId the id of the item
   */
  public hasAnActiveIncludeInstanceOfId(id: number, includeId: string): boolean {
    const candidate = this.includeInstances
      .find((i) => i.getId() === includeId);

    if (!candidate) {
      return false;
    }

    return candidate.getExclusionState(id) !== IncludeExclusionState.EXCLUDED;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Tells whether it has a parent item definition
   */
  public hasParentItemDefinition() {
    return !!this.parentItemDefinition;
  }

  /**
   * Provides the parent item definition
   * @throws an error if nothing available
   */
  public getParentItemDefinition() {
    if (!this.parentItemDefinition) {
      throw new
        Error("Attempted to get parent definition while missing");
    }
    return this.parentItemDefinition;
  }

  /**
   * Provides the live child definitions
   * without imports
   */
  public getChildDefinitions() {
    return this.childDefinitions;
  }

  /**
   * Provides the live child definitions
   * without imports, recursively
   */
  public getChildDefinitionsRecursive() {
    let childDefinitions = this.getChildDefinitions();
    childDefinitions.forEach((idef) => {
      childDefinitions = childDefinitions.concat(idef.getChildDefinitionsRecursive());
    });
    return childDefinitions;
  }

  /**
   * Provides the live imported child definitions
   */
  public getImportedChildDefinitions() {
    return this.importedChildDefinitions.map((icd) => icd.definition);
  }

  /**
   * Uses the raw data to instantiate a new instance of
   * the item definition, uses the same on state change
   * function for state changes so it remains linked to the
   * module
   */
  public getNewInstance() {
    return new ItemDefinition(this.rawData, this.parentModule, this.parentItemDefinition, this);
  }

  /**
   * Provides the item definition item locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string): IRawJsonI18NSpecificLocaleDataType {
    if (this.originatingInstance) {
      return this.originatingInstance.getI18nDataFor(locale);
    }
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * same as getCurrentValue but ignores external checking
   * so it doesn't have to be async and no need to spend
   * network resources, checks most, but ignores unique and
   * autocomplete checkings; note that you should still pass id
   * in order to get cached previously checked results
   * @param id the stored value of the item definition, pass null if new
   * @param emulateExternalChecking emulates an externally checked
   * property as the get current value async leaves a cache behind
   * and this will use the cache rather than re-requesting
   * @param onlyIncludeProperties only includes these specific
   * properties, note property definitions are not fetched in
   * this case
   * @param onlyIncludeIncludes includes the includes in the list
   * @param excludePolicies excludes all the policies state
   */
  public getStateNoExternalChecking(
    id: number,
    emulateExternalChecking?: boolean,
    onlyIncludeProperties?: string[],
    onlyIncludeIncludes?: string[],
    excludePolicies?: boolean,
  ): IItemDefinitionStateType {
    const properties = onlyIncludeProperties ?
      onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, true)
        .getStateNoExternalChecking(id, emulateExternalChecking)) :
      this.getParentModule().getAllPropExtensions().concat(
        this.getAllPropertyDefinitions(),
      ).map((pd) => {
        return pd.getStateNoExternalChecking(id, emulateExternalChecking);
      });

    let policies: IPoliciesStateType = null;
    if (!excludePolicies) {
      policies = {};
      ["edit", "delete", "read"].map((policyType) => {
        if (this.policyPropertyDefinitions[policyType]) {
          policies[policyType] = {};
          Object.keys(this.policyPropertyDefinitions[policyType]).map((policyName) => {
            policies[policyType][policyName] =
              this.getPropertiesForPolicy(policyType, policyName)
              .map((pd) => pd.getStateNoExternalChecking(id, emulateExternalChecking));
          });
        }
      });
    }

    let includes: IIncludeState[];
    if (onlyIncludeIncludes) {
      includes = onlyIncludeIncludes.map((ii) =>
        this.getIncludeFor(ii).getStateNoExternalChecking(id, emulateExternalChecking));
    } else {
      includes = this.includeInstances.map((ii) =>
        ii.getStateNoExternalChecking(id, emulateExternalChecking));
    }

    const gqlOriginal = this.getGQLAppliedValue(id);
    return {
      moduleName: this.getModuleName(),
      itemDefQualifiedName: this.getQualifiedPathName(),
      itemDefName: this.getName(),
      includes,
      properties,
      policies,
      gqlOriginalFlattenedValue: (gqlOriginal && gqlOriginal.flattenedValue) || null,
      forId: id,
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
   * @param onlyIncludeProperties only includes these specific
   * properties, note property definitions are not fetched in
   * this case
   * @param onlyIncludeIncludes includes the includes in the list
   * @param excludePolicies excludes all the policies state bit
   */
  public async getState(
    id: number,
    onlyIncludeProperties?: string[],
    onlyIncludeIncludes?: string[],
    excludePolicies?: boolean,
  ): Promise<IItemDefinitionStateType> {
    const properties = await Promise.all(onlyIncludeProperties ?
      onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, true).getState(id)) :
      this.getParentModule().getAllPropExtensions().concat(
        this.getAllPropertyDefinitions(),
      ).map((pd) => {
        return pd.getState(id);
      }),
    );

    let policies: IPoliciesStateType = null;
    if (!excludePolicies) {
      policies = {};
      await Promise.all(["edit", "delete", "read"].map(async (policyType) => {
        if (this.policyPropertyDefinitions[policyType]) {
          policies[policyType] = {};
          await Promise.all(Object.keys(this.policyPropertyDefinitions[policyType]).map(async (policyName) => {
            policies[policyType][policyName] =
              await Promise.all(this.getPropertiesForPolicy(policyType, policyName).map((pd) => pd.getState(id)));
          }));
        }
      }));
    }

    let includes: IIncludeState[];
    if (onlyIncludeIncludes) {
      includes = await Promise.all(onlyIncludeIncludes.map((ii) => this.getIncludeFor(ii).getState(id)));
    } else {
      includes = await Promise.all(this.includeInstances.map((ii: Include) => ii.getState(id)));
    }

    const gqlOriginal = this.getGQLAppliedValue(id);
    return {
      moduleName: this.getModuleName(),
      itemDefQualifiedName: this.getQualifiedPathName(),
      itemDefName: this.getName(),
      includes,
      properties,
      policies,
      gqlOriginalFlattenedValue: (gqlOriginal && gqlOriginal.flattenedValue) || null,
      forId: id,
    };
  }

  /**
   * Applies a value from graphql to the item definition state
   * @param id the id that this state is for (can be null)
   * @param value the value itself from graphql, DATA values and flattened values are valid.
   * @param excludeExtensions whether to exclude the extensions for applying the value
   * @param graphqlRoleRequester the role that requested this data (can be null)
   * @param graphqlUserIdRequester the user id that requested this data (can be null)
   * @param requestFields the fields that were used to request this data (can be null) but be careful
   * this might be used for catching
   */
  public applyValue(
    id: number,
    value: {
      [key: string]: any,
    },
    excludeExtensions: boolean,
    graphqlUserIdRequester: number,
    graphqlRoleRequester: string,
    requestFields: any,
    doNotApplyValueInPropertyIfPropertyHasBeenManuallySet: boolean,
  ) {
    // first we flatten the value if necessary
    const flattenedValue = typeof value.DATA !== "undefined" ? flattenRawGQLValueOrFields(value) : value;
    // we make it we have an applied value
    this.stateHasAppliedValueTo[id] = true;
    // and set all the data regarding that value
    this.stateGQLAppliedValue[id] = {
      userIdRequester: graphqlUserIdRequester,
      roleRequester: graphqlRoleRequester,
      rawValue: value,
      flattenedValue,
      requestFields,
    };

    // now we get all the properties that we are supposed to apply that value to
    const properties =
      excludeExtensions ?
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
      property.applyValue(id, givenValue, setAsModified, doNotApplyValueInPropertyIfPropertyHasBeenManuallySet);
    });

    // now we get all the items
    this.getAllIncludes().forEach((include) => {
      // and we get the applied value for thae item
      let givenValue = flattenedValue[include.getQualifiedIdentifier()];
      if (typeof givenValue === "undefined") {
        givenValue = null;
      }
      // and the exclusion state, or excluded if not specified
      const givenExclusionState =
        flattenedValue[include.getQualifiedExclusionStateIdentifier()] || IncludeExclusionState.EXCLUDED;

      // and we apply such value
      include.applyValue(id, givenValue, givenExclusionState, doNotApplyValueInPropertyIfPropertyHasBeenManuallySet);
    });
  }

  /**
   * Provides the owner that applied the value for the
   * applied value, basically the created_by value
   * (or id if owner is object id, which is only relevant for users honestly)
   * @param id the id of the state
   */
  public getAppliedValueOwnerIfAny(id: number) {
    if (
      !this.stateHasAppliedValueTo[id] ||
      !this.stateGQLAppliedValue[id] ||
      !this.stateGQLAppliedValue[id].flattenedValue
    ) {
      return -1;
    }

    if (this.isOwnerObjectId()) {
      return this.stateGQLAppliedValue[id].flattenedValue.id || UNSPECIFIED_OWNER;
    }
    return this.stateGQLAppliedValue[id].flattenedValue.created_by || UNSPECIFIED_OWNER;
  }

  /**
   * Wipes down a value and its state and everything out of memory
   * this might not be important in the client side but very important
   * in the server side, not cleaning the memory can become a memory leak
   * @param id the id of the state
   * @param excludeExtensions whether to include the extensions of the parent
   */
  public cleanValueFor(id: number, excludeExtensions?: boolean) {
    // delete all from memory
    delete this.stateHasAppliedValueTo[id];
    delete this.stateGQLAppliedValue[id];

    // gather the properties
    const properties =
      excludeExtensions ?
        this.getAllPropertyDefinitions() :
        this.getAllPropertyDefinitionsAndExtensions();

    // and wipe them
    properties.forEach((property) => {
      property.cleanValueFor(id);
    });
    // also the includes
    this.getAllIncludes().forEach((include) => {
      include.cleanValueFor(id);
    });
  }

  /**
   * Checks whether given the state id, there is an applied
   * value for it
   * @param id the id
   */
  public hasAppliedValueTo(id: number): boolean {
    return this.stateHasAppliedValueTo[id];
  }

  /**
   * Provides the applied value for the id
   * @param id the id
   */
  public getGQLAppliedValue(id: number): IItemDefinitionGQLValueType {
    return this.stateGQLAppliedValue[id] || null;
  }

  /**
   * Provides the item definition that represent the search mode of this
   * same item definition
   */
  public getSearchModeCounterpart(): ItemDefinition {
    if (this.isExtensionsInstance()) {
      return this.parentModule.getSearchModule().getPropExtensionItemDefinition();
    }
    return this.parentModule.getSearchModule().getItemDefinitionFor(
      this.getModulePath(),
    );
  }

  /**
   * Basically only works in search mode item definitions, and provides the standard
   * counterpart
   */
  public getStandardCounterpart(): ItemDefinition {
    if (this.isExtensionsInstance()) {
      return this.parentModule.getStandardModule().getPropExtensionItemDefinition();
    }
    return this.parentModule.getStandardModule().getItemDefinitionFor(
      this.getModulePath(),
    );
  }

  /**
   * Tells whether this item is the search mode item of another
   * item
   */
  public isInSearchMode(): boolean {
    return this.parentModule.isInSearchMode();
  }

  /**
   * Provides the roles that have access to a given
   * action based on the rules that were set
   * @param action the action from the ItemDefinitionIOActions
   */
  public getRolesWithAccessTo(action: ItemDefinitionIOActions) {
    if (action === ItemDefinitionIOActions.READ) {
      // Anyone can read by default
      return this.rawData.readRoleAccess || [ANYONE_METAROLE];
    } else if (action === ItemDefinitionIOActions.CREATE) {
      // Anyone logged can create by default
      return this.rawData.createRoleAccess || [ANYONE_LOGGED_METAROLE];
    } else if (action === ItemDefinitionIOActions.EDIT) {
      // Only the owner of the item can edit by default
      return this.rawData.editRoleAccess || [OWNER_METAROLE];
    } else if (action === ItemDefinitionIOActions.DELETE) {
      // Only the owner of the item can delete it by default
      return this.rawData.deleteRoleAccess || [OWNER_METAROLE];
    }

    // ???? really this shouldn't happen
    return [];
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
   */
  public checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: number,
    ownerUserId: number,
    requestedFields: any,
    throwError: boolean,
  ) {
    if (ownerUserId === null) {
      throw new Error("ownerUserId cannot be null");
    }
    // now let's get the roles that have access to the action
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    // if anyone is included, or anyone logged is included and you are not
    // a guest, or your role is included
    const idefLevelAccess = rolesWithAccess.includes(ANYONE_METAROLE) ||
    (
      rolesWithAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
    ) || (
      rolesWithAccess.includes(OWNER_METAROLE) && userId === ownerUserId
    ) || rolesWithAccess.includes(role);

    // if you got not access
    if (!idefLevelAccess) {
      // let's check the throw error flag
      if (throwError) {
        // if you are in guest mode, it is considered, that if you
        // fail, it's because you missed to login
        const notLoggedInWhenShould = role === GUEST_METAROLE;
        const errorMightHaveBeenAvoidedIfOwnerSpecified = ownerUserId === UNSPECIFIED_OWNER &&
          rolesWithAccess.includes(OWNER_METAROLE);
        let errorMessage = `Forbidden, user ${userId} with role ${role} has no ${action} access to resource ${this.getName()}` +
          ` with only roles ${rolesWithAccess.join(", ")} can be granted access`;
        if (errorMightHaveBeenAvoidedIfOwnerSpecified) {
          errorMessage += ", this error might have been avoided if an owner had" +
          " been specified which matched yourself as there's a self rule, if performing a search" +
          " you might have wanted to add the created_by filter in order to ensure this rule is followed";
        }
        throw new GraphQLEndpointError({
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
      if (requestedField.startsWith(INCLUDE_PREFIX)) {
        // so now we extract the item name from that
        let requestedFieldItemName = requestedField.replace(INCLUDE_PREFIX, "");
        if (requestedFieldItemName.endsWith(EXCLUSION_STATE_SUFFIX)) {
          requestedFieldItemName = requestedFieldItemName.replace(EXCLUSION_STATE_SUFFIX, "");
        }
        // request the include
        const include = this.getIncludeFor(requestedFieldItemName);
        // and check the role access for it
        return include.checkRoleAccessFor(
          action, role, userId, ownerUserId, requestedFields[requestedField], throwError,
        );
      } else {
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
   */
  public checkRoleCanCreateInBehalf(role: string, throwError: boolean) {
    let canCreateInBehalf = false;
    if (this.rawData.canCreateInBehalfBy) {
      canCreateInBehalf = this.rawData.canCreateInBehalfBy.includes(ANYONE_METAROLE) ||
        (
          this.rawData.canCreateInBehalfBy.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
        ) || this.rawData.canCreateInBehalfBy.includes(role);

      const notLoggedInWhenShould = role === GUEST_METAROLE;

      if (!canCreateInBehalf && throwError) {
        throw new GraphQLEndpointError({
          message: `Forbidden, role ${role} cannot create in behalf in resource ${this.getName()}` +
          ` only roles ${this.rawData.canCreateInBehalfBy.join(", ")} can do so`,
          code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : "FORBIDDEN",
        });
      }
    } else if (throwError) {
      throw new GraphQLEndpointError({
        message: "can create in behalf is not supported",
        // here we pass always forbidden simply because it's not supported at all
        // and it was not a login mistake
        code: "FORBIDDEN",
      });
    }
    return canCreateInBehalf;
  }

  // TODO
  public checkCanBeParentedBy(modulePath: string, itemDefinitionPath: string, throwError: boolean) {
    let canBeParentedBy = false;
    if (this.rawData.canBeParentedBy) {
      canBeParentedBy = this.rawData.canBeParentedBy.some((parentPossibility) => {
        if (!parentPossibility.itemDefinition) {
          return parentPossibility.module === modulePath;
        }
        return parentPossibility.module === modulePath && parentPossibility.itemDefinition === itemDefinitionPath;
      });
      if (!canBeParentedBy && throwError) {
        throw new GraphQLEndpointError({
          message: "parenting with '" + modulePath + "' and '" + itemDefinitionPath + "' is not allowed",
          // here we pass always forbidden simply because it's not supported at all
          // and it was not a login mistake
          code: "FORBIDDEN",
        });
      }
    } else if (throwError) {
      throw new GraphQLEndpointError({
        message: "parenting role access is not supported",
        // here we pass always forbidden simply because it's not supported at all
        // and it was not a login mistake
        code: "FORBIDDEN",
      });
    }
    return canBeParentedBy;
  }

  // TODO
  public checkRoleAccessForParenting(
    role: string,
    userId: number,
    parentOwnerUserId: number,
    throwError: boolean,
  ) {
    let hasParentingRoleAccess = false;
    if (this.rawData.parentingRoleAccess) {
      hasParentingRoleAccess = this.rawData.parentingRoleAccess.includes(ANYONE_METAROLE) ||
      (
        this.rawData.parentingRoleAccess.includes(ANYONE_LOGGED_METAROLE) && role !== GUEST_METAROLE
      ) || (
        this.rawData.parentingRoleAccess.includes(OWNER_METAROLE) && userId === parentOwnerUserId
      ) || this.rawData.parentingRoleAccess.includes(role);

      const notLoggedInWhenShould = role === GUEST_METAROLE;

      if (!hasParentingRoleAccess && throwError) {
        throw new GraphQLEndpointError({
          message: `Forbidden, user ${userId} with role ${role} has no parenting role access to resource ${this.getName()}` +
          ` only roles ${this.rawData.parentingRoleAccess.join(", ")} can be granted access`,
          code: notLoggedInWhenShould ? "MUST_BE_LOGGED_IN" : "FORBIDDEN",
        });
      }
    } else {
      throw new GraphQLEndpointError({
        message: "parenting role access is not supported",
        // here we pass always forbidden simply because it's not supported at all
        // and it was not a login mistake
        code: "FORBIDDEN",
      });
    }
    return hasParentingRoleAccess;
  }

  /**
   * Basically returns the raw data itself
   * doesn't do much
   */
  public toJSON() {
    return this.rawData;
  }

  /**
   * Provides the path from the module
   * base, that is not absolute but a relative
   * path from the parent module
   */
  public getModulePath(): string[] {
    if (this.parentItemDefinition) {
      return this.parentItemDefinition
        .getModulePath()
        .concat([
          this.getName(),
        ]);
    }
    return [this.getName()];
  }

  /**
   * Provides the absolute path all the way
   * from the root
   */
  public getAbsolutePath(): string[] {
    if (this.parentItemDefinition) {
      return this.parentItemDefinition
        .getAbsolutePath()
        .concat([
          this.getName(),
        ]);
    }
    return this.parentModule
      .getAbsolutePath()
      .concat([
        this.getName(),
      ]);
  }

  /**
   * Returns true is one of the property has to be externally checked
   * either by database or rest endpoints, this is basically unique
   * and autocomplete indexed values
   * @param onlyCheckProperties only to check the properties in this list
   * @param ignoreIncludes whether to ignore the sinked in properties in the includes
   */
  public containsAnExternallyCheckedProperty(
    onlyCheckProperties?: string[],
    ignoreIncludes?: boolean,
  ): boolean {
    const existInFirstLayer: boolean =
      this.getAllPropertyDefinitionsAndExtensions()
      .filter((pd) => !onlyCheckProperties ? true : onlyCheckProperties.includes(pd.getId()))
      .some((pd) => pd.isUnique() || (pd.hasAutocomplete() && pd.isAutocompleteEnforced()));
    if (existInFirstLayer) {
      return true;
    } else if (ignoreIncludes) {
      return false;
    }
    return this.getAllIncludes().some((i) => i.containsAnExternallyCheckedProperty());
  }

  /**
   * Provides the qualified path name
   * of this item definition, which is unique for
   * this root instance
   */
  public getQualifiedPathName(): string {
    if (this.parentItemDefinition) {
      return PREFIXED_CONCAT(this.parentItemDefinition.getQualifiedPathName(), ITEM_DEFINITION_PREFIX + this.getName());
    }
    return PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), ITEM_DEFINITION_PREFIX + this.getName());
  }

  /**
   * Provides all policy names included in the policy of type
   * @param policyType the policy type, "edit", "read" or "delete"
   */
  public getPolicyNamesFor(policyType: string): string[] {
    if (!this.rawData.policies || !this.rawData.policies[policyType]) {
      return [];
    }
    return Object.keys(this.rawData.policies[policyType]);
  }

  /**
   * Provides all live properties for a policy, these properties
   * are detached properties, new instances of the old property and hold
   * their own states
   * @param type the type "edit", "delete", "read"
   * @param name the policy name that was set
   */
  public getPropertiesForPolicy(type: string, name: string): PropertyDefinition[] {
    return this.rawData.policies[type][name].properties.map(
      (propertyId: string) => this.getPropertyDefinitionForPolicy(type, name, propertyId),
    );
  }

  /**
   * Provides all the property ids that are affected by a given policy
   * @param type the policy type "edit", "delete", "read"
   * @param name the policy name
   */
  public getApplyingPropertyIdsForPolicy(type: string, name: string): string[] {
    const applyingProperties = this.rawData.policies[type][name].applyingProperties;
    return applyingProperties || null;
  }

  public getApplyingIncludeIdsForPolicy(type: string, name: string): string[] {
    return this.rawData.policies[type][name].applyingIncludes || null;
  }

  /**
   * Provides all the roles that are affected by a policy
   * @param type the policy type "edit", "delete", "read"
   * @param name the policy name
   */
  public getRolesForPolicy(type: string, name: string): string[] {
    return this.rawData.policies[type][name].roles;
  }

  /**
   * Adds a listener for an string event and id
   * @param event the event string
   * @param id the id
   * @param listener the listener
   */
  public addListener(event: string, id: number, listener: ListenerType) {
    if (!this.listeners[event]) {
      this.listeners[event] = {};
    }
    this.listeners[event][id] = this.listeners[event][id] || [];
    this.listeners[event][id].push(listener);
  }

  /**
   * Removes a listener
   * @param event the event string
   * @param id the id
   * @param listener the listener
   */
  public removeListener(event: string, id: number, listener: ListenerType) {
    if (!this.listeners[event] || !this.listeners[event][id]) {
      return;
    }
    const index = this.listeners[event][id].indexOf(listener);
    if (index !== -1) {
      this.listeners[event][id].splice(index, 1);
    }
  }

  /**
   * Triggers a listener for a given id
   * note this will affect the extensions as well because
   * their states are correlated
   * @param event the event
   * @param id the id
   * @param but a function not to trigger (one of the listeners)
   * @param callId a call id, it's an unique identifier for this event, it will be autogenerated if not provided
   * and it's the best to leave it be autogenerated
   */
  public triggerListeners(event: string, id: number, but?: ListenerType, callId?: string) {
    if (this.lastListenerCallId !== callId) {
      this.lastListenerCallId = callId || uuid.v4();
      if (this.extensionsInstance) {
        this.parentModule.getAllChildItemDefinitions().forEach((cd) => {
          cd.triggerListeners(event, id, but, this.lastListenerCallId);
        });
      } else {
        this.parentModule.getPropExtensionItemDefinition().triggerListeners(event, id, but, this.lastListenerCallId);
      }

      if (!this.listeners[event] || !this.listeners[event][id]) {
        return;
      }
      this.listeners[event][id].filter((l) => l !== but).forEach((l) => l());
    }
  }

  /**
   * Merges two i18n data components, for example the i18n data for
   * the english build and the i18n data for the russian build, that way
   * the state is not lost
   * @param mod the raw module that is merging
   * @param idef the raw item definition that is merging
   */
  public mergeWithI18n(
    mod: IModuleRawJSONDataType,
    idef: IItemDefinitionRawJSONDataType,
  ) {
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
   */
  public isSearchable() {
    if (typeof this.rawData.searchable !== "undefined") {
      return this.rawData.searchable;
    }
    return true;
  }

  /**
   * Checks whether the owner of this item definition is not supposed to be
   * the created_by field but rather the id field, this only makes sense
   * in users, an user owns itself
   */
  public isOwnerObjectId() {
    return this.rawData.ownerIsObjectId || false;
  }
}
